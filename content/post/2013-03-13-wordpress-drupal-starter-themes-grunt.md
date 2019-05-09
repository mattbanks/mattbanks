---
categories:
  - Web Development
date: 2013-03-13T00:00:00Z
description:
  Github repositories for WordPress, Genesis Framework and Drupal 7 starter
  themes using SCSS, Compass and Grunt for development and deployment
image: images/posts/githuboctacat.jpg
tags:
  - drupal
  - genesis
  - github
  - grunt
  - gruntjs
  - themes
  - wordpress
title: WordPress and Drupal Starter Themes Using Grunt on Github
slug: wordpress-drupal-starter-themes-grunt
---

Yesterday, I wrote an article on <a href="{{< relref "2013-03-12-grunt-wordpress-development-deployments.md" >}}">how I use Grunt with my WordPress theme development and deployment</a>.

I casually mentioned the starter themes I have, both for core WordPress development and for use with the Genesis Framework. Being that I use Drupal for clients as well, I figured I would push my latest Drupal 7 Starter Theme up to [Github][github] so everyone can use it as they see fit.

## Theme Links

[WordPress Starter Theme on Github][wp-starter]

[Genesis Starter Child Theme on Github][genesis-starter]

[Drupal 7 Starter Theme on Github][drupal-starter]

All three use SCSS and Compass for preprocessing and are setup with the same Gruntfile and folder structure to keep things clean. If you're looking for recommended plugins/modules, check out the Readme's for each repository for what I use on most projects. More information and instructions can be found there as well.

Feel free to clone, fork, create an issue and send pull requests with anything you'd like to see changed or added!

![wordpress drupal grunt](/images/posts/wordpress-drupal-grunt.jpg)

## Using Grunt with the WordPress and Drupal Themes

Just as a quick recap, to use Grunt with the themes, open the theme directory in your Terminal and run

{{< highlight shell >}}
npm install
{{< / highlight >}}

Once that installs all dependencies, just run

{{< highlight shell >}}
grunt
{{< / highlight >}}

which will start the watch tasks to monitor and update your files as you go along. Your SCSS will be processed and your JavaScript will be linted, concatenated and minified. Image optimization and rsync deployments are there as well - refer back to [my article on using Grunt for WordPress deployments]({{< relref "2013-03-12-grunt-wordpress-development-deployments.md" >}}) for how that works.

If you have any questions or suggestions for using Grunt with your CMS, leave a comment or send me a message on [Twitter][twitter].

[github]: https://github.com/mattbanks
[wp-starter]: https://github.com/mattbanks/WordPress-Starter-Theme
[genesis-starter]: https://github.com/mattbanks/Genesis-Starter-Child-Theme
[drupal-starter]: https://github.com/mattbanks/Drupal-7-Starter-Theme
[twitter]: https://twitter.com/mattbanks
