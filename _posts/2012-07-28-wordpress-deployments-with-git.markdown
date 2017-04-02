---
layout: post
title: "Managing WordPress Theme Deployments with Git"
date: 2012-07-28
---

<p class="intro"><span class="dropcap">Y</span>ou're using version control for all of your code, right?</p>

One part of the process that took me longer than I would have liked to master is deployments via git. I use [Bitbucket][bitbucket] for all of my private repositories (I have a free unlimited account, so I haven't found a need to pay for [Github][github]) and I wanted to find a way to deploy via the command line in the same way I push code to Bitbucket. After a lot of searching and trials and errors, I've come up with a good system that works for me. It might not be the best or most efficient, but it's what makes the most sense to me. Most of my deployments will be [WordPress][wordpress] themes and plugins that I [develop for clients][kernel], so that's where I focused my efforts.

I read a lot of code examples and blog posts while searching for this technique and a few things never clicked for me, so I wanted to highlight the process for anyone that might have been in the same boat as me.

Before we start, let's get some requirements out of the way:

- You have SSH access to your server (if you have shared hosting, make sure you can get SSH access)
- Git is installed on your local machine and on your server
- You have a local git repository already setup with your code (I'll be using a WordPress theme as an example)

I'm using a Mac for local development, so if you're using Windows, things will be slightly different in how you access the command line.

## What's this Capistrano thing?

[Capistrano][capistrano] is a terrific deployment tool build on Ruby. You can use it to automate deployments, quickly roll back to previous versions, etc. I spent a good part of a day learning Capistrano and what it can do, only to find out it won't work with shared hosting environments very well. Why is that?

Well, Capistrano creates a directory structure in your deployment location (using /public_html as an example):

{% highlight shell %}
public_html
-- releases
-- shared
-- current (symlink pointing to your latest deployed code in /releases)
{% endhighlight %}

The problem here is that to effectively use Capistrano, you need to change your Apache settings to point the DocumentRoot to `/public_html/current`, which isn't possible with most shared hosts (or most hosts running cPanel). So, while it's a great tool, it's not the tool for what I need.

## Git Remotes to the Rescue

You should be aware of git remotes by using Github, Bitbucket or some other repository management system. It's a way to push your code changes somewhere offsite for sharing, collaboration, backup, etc. With any repository, you can add as many remotes as you'd like. So let's get right to it.

In this example, I'm going to use a WordPress theme as my deployment code. I'm not using the entire WordPress structure as the repository for a few reasons (simplicity in the case of this example, and also for needs of the client website that I'm developing).

Here's a look at the local repository:

<img src="{{ '/assets/img/posts/kernelmedia-git-repo.jpg' | prepend: site.baseurl }}" alt="" />

To create your repository, open Terminal (or [iTerm 2][iterm], which I strongly prefer) and navigate to your code directory:

{% highlight shell %}
cd your-project
git init
git add .
git commit -m "initial commit"
{% endhighlight %}

We're now ready to create a remote repository. I'm using a shared hosting environment with [Bluehost][bluehost] for this example deployment, where I have an SSH connection setup with public key authentication. The big thing to remember here, which took me a while to grasp, is that the remote repository you're going to push to will be a __*separate directory*__ than the actual WordPress theme we're deploying. Locally, the repository is always the code directory, but for remote deployments, we need to do things a bit differently.

So, let's connect to our server (replace your user details and directory structure). We're going to a create a folder named `repos` outside of the `public_html` directory that will house our remote repositories.

{% highlight shell %}
ssh user@example.org
mkdir repos && cd repos
mkdir your-project.git && cd your-project.git
git --bare init
{% endhighlight %}

We've now created a bare repository on our web server that we will use as our remote location. Still with me? We're getting closer! The next step is to setup our post-receive hook. This is a script that will run every time you push code to the remote repository. Here's how to set that up (I'm going to use vim, but you can use any editor you choose - you'll run this while still connected to your server by SSH):

{% highlight shell %}
vim hooks/post-receive
{% endhighlight %}

Now, put this code into your `post-receive` file (replacing the path with the full path to where you want the code deployed).

{% highlight shell %}
#!/bin/sh
GIT_WORK_TREE=/home/myuser/public_html/wp-content/themes/mytheme git checkout -f
{% endhighlight %}

After that's done, you'll need to give the `post-receive` file execute rights so it'll actually do the work:

{% highlight shell %}
chmod +x hooks/post-receive
{% endhighlight %}

_[UPDATE: Thanks to [Martin Sjåstad][martin] for pointing out I forgot the chmod +x line!]_

That's it! We're now ready to deploy our code by just using:

{% highlight shell %}
git push
{% endhighlight %}

## Let's Deploy that WordPress Theme

Back on our local machine, let's add our server to the git remote (replace `myserver` with whatever name you'd like to give the remote and add your login credentials):

{% highlight shell %}
cd your-project
git remote add myserver ssh://username@your-website.com/~/repos/your-project.git
git push myserver +master:refs/heads/master
{% endhighlight %}

Your code will now be pushed to the bare repository you created, and then the post-receive hook will checkout the code to the location you specified. In my case, that's my theme directory:

{% highlight shell %}
/public_html/wp-content/themes/mytheme
{% endhighlight %}

To update your code later with a new push, just run:

{% highlight shell %}
git push myserver
{% endhighlight %}

## That wasn't so bad, was it?

While it might be daunting for those new to version control, it's really a quite simple process once you wrap your mind around keeping your bare repository separate from your deployed code. I've used services like [Beanstalk][beanstalk] in the past for deployments, but decided I didn't want to pay for that when I can do it myself easily from the command line.

Hopefully this helped some of you that were in the same position I was while setting up remote deployments. A lot of credit is due to [an article I found from Abhijit Menon-Sen][howto]. Also thanks to [Mubashar Iqbal][mubs], [Jack McDade][jack] and [Jonathan Christopher][jonathan] for tips. If you have thoughts on how to do this better, by all means let me know in the comments or send me a message on [Twitter (@mattbanks)][twitter].


[bitbucket]: https://bitbucket.org/
[github]: https://github.com/
[wordpress]: http://wordpress.org
[kernel]: http://www.kernelcreativemedia.com
[capistrano]: https://github.com/capistrano/capistrano
[iterm]: https://www.iterm2.com/
[bluehost]: http://www.bluehost.com/track/mattbanks
[martin]: http://www.martinsjastad.com/
[beanstalk]: http://beanstalkapp.com/
[howto]: http://toroid.org/ams/git-website-howto
[mubs]: http://www.twitter.com/mubashariqbal
[jack]: https://twitter.com/jackmcdade
[jonathan]: https://twitter.com/jchristopher
[twitter]: https://twitter.com/mattbanks
