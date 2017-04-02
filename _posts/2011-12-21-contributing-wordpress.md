---
layout: post
title: "Contributing to WordPress Core - It's Time to Give Back"
date: 2011-12-21
image: posts/WordPress-Logo.png
categories:
- Web Development
tags:
- coda
- contribute
- subversion
- svn
- textmate
description: As a WordPress user and developer for a number of years, I recently decided to begin contributing to WordPress core. This is my story.
---

<p class="intro"><em>[<strong>Update 2012-07-28</strong>: It's been almost 3/4 a year since I wrote this and time hasn't been on my side for getting involved in WordPress core/trac. Hopefully soon...]</em><p>

I've been using [WordPress][wordpress] for a number of years now. What started as hobby has turned into a business, as [Kernel Creative Media][kernel] uses WordPress for the majority of our projects. Seeing as I'm constantly writing PHP, CSS and JavaScript to extend and customize the content management system, I figured it's about time I start giving back. Yesterday, I decided that I would begin contributing to WordPress core. What all does that mean? A lot, actually.

## History with WordPress

My first foray with WordPress came about 7 years ago, before I really knew much about the platform. I wanted to write a blog, which no one ended up reading (hopefully people read this, but that's another can of worms). Then I started [Loot Ninja][lootninja], a video game reviews and editorial website, and we chose WordPress as our platform. It was pretty sparse at first, just grabbing some off the shelf themes and plugins. As time went on, I wrote a couple custom themes, functions and plugins to suit the site's needs. Fast forward to today, where client projects for Kernel Creative Media are bending and shaping WordPress in ways I never would have imagined in those early days. I've used more content management systems than I'd care to count and I always come back to WordPress as my go-to favorite.

Deciding to contribute wasn't just an "oh, I'll do that" decision. It requires time and dedication to make the platform and code better. The first thing I did was read up on the ways to [contribute to WordPress][codex-contributing]. I already participate in the IRC chat (I'm "mattbanks" on Freenode), and post occasionally in the [Support Forums][wp-support], but I wanted to do even more, so I decided I would take a look at WordPress Core and see if I could work and test any patches. There are some caveats if you're in a similar situation, which are all fine by me. You have to be familiar and comfortable working from the command line. You have to be able to articulate and document bugs and patches. You have to be patient enough to know that anything broken can be fixed. I feel it's time for me to help.

As you're reading this, keep in mind that I'm a beginner at contributing to WordPress. If you're a seasoned vet, you'll know this already, but I wanted to document my experiences so others might join in and contribute as well.

## Subversion on Mac - It's Just That Easy

<img src="{{ '/assets/img/posts/Mac-Terminal-Subversion-screenshot.jpg' | prepend: site.baseurl }}" alt="" />

If you're running Windows, I'm sorry. I'm a big Mac fan and use them both at work at home. Things are just easier and the tools you need are readily at your disposal. And with a Mac, checking out the source code with Subversion is a snap. One of the WordPress lead developers, Mark Jaquith, [has a lovely tutorial for getting setup quickly on his blog][jaquith]. The gist of is that you want to create a folder to house the WordPress files (I made one on Dropbox so I can use multiple machines easily), and then run the following command from Terminal:

{% highlight shell %}
svn co http://svn.automattic.com/wordpress/trunk/
{% endhighlight %}

Note the space and period at the end there. When I first ran the command without them, a sub-folder called "trunk" was created to separate the trunk branch from any other branches I might check out. Since I'll only be working from trunk, having it an extra folder level deep isn't necessary, so I started over. Once I had the files downloaded, it's just a matter of updating my local files before I start any work. A simple command from Terminal takes care of that:

{% highlight shell %}
svn up
{% endhighlight %}

So why use Terminal for all of this instead of an app like [Versions][versions] or [Cornerstone][cornerstone]? Being a comfortable git fan who uses [Tower][tower], [Github's Mac App][github-mac] as well as the git command line, my first instinct was to grab a copy of either Versions of Cornerstone and go to work, but Andrew Nacin, another core developer for WordPress, [let me know about issues with patching and creating diff files with the Mac software][nacin].

## Patching, Diffs, and the World of Contribution

So what are these diff files? When you change something to create a patch, you want to create a diff file to send the differences to the [WordPress Trac][wp-trac] for testing. This patch allows other developers to test what you've just written to make sure it's secure, has good performance, and actually fixes what you say it does. Creating diff files is easy with Subversion in Terminal. You can either make a patch for a particular filename:

{% highlight shell %}
svn diff filename.php > filename.diff
{% endhighlight %}

Or you can make a big patch for all the files you've changed:

{% highlight shell %}
svn diff > big_patch.diff
{% endhighlight %}

Once you're ready, post an issue over at the WordPress Trac with your diff file to queue it up for testing. You'll get responses form other developers, possibly some debate on whether the change is necessary, and it'll either get approved or not.

Many times, though, you'll be testing other people's patches. Reading through the issue list is a great way to find out what needs fixing. If something needs a patch, hop in and code it if it you can, or test a patch that someone else submitted. Again, it's a simple process at the command line. Download the file, place it in the WordPress directory you cloned earlier, and drop this bad boy into Terminal (obviously, with all of these examples, you need to replace paths and filenames to suit your environment):

{% highlight shell %}
patch -p0 < patch.diff
{% endhighlight %}

If you find problems applying the patch or bugs afterwards, posting back in Trac lets everyone know. It's a fairly simple process if you're comfortable with all of the tools.

## What's in it for Me?

So why did I decide this was for me? Like I said earlier, I wanted to give back and help make the system I use on a daily basis better for myself and all of its users. I had a patch ready to go for a bug I've been noticing (rel="category tag" causing HTML5 validation errors), but someone beat me to it and patched it in already. I tested the patch and am moving on to some other issues that I'd like to assist with. Overall, it just makes me feel good.

If you know how to write code and love WordPress like I do, why don't you jump on it and help in the development process? You just might end up getting your name in the Credits page on everyone's dashboard!

[wordpress]: http://www.wordpress.org
[kernel]: http://www.kernelcreativemedia.com
[lootninja]: http://www.loot-ninja.com
[codex-contributing]: http://codex.wordpress.org/Contributing_to_WordPress
[wp-support]: http://www.wordpress.org/support
[jaquith]: http://markjaquith.wordpress.com/2005/11/02/my-wordpress-toolbox/
[versions]: http://versionsapp.com/
[cornerstone]: http://www.zennaware.com/cornerstone/index.php
[tower]: http://www.git-tower.com/
[github-mac]: http://mac.github.com/
[nacin]: https://twitter.com/nacin/status/145305649788628992
[wp-trac]: http://trac.wordpress.org/
