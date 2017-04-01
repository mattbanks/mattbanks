---
layout: post
title: "WordPress and Drupal Starter Themes Using Grunt on Github"
date: 2013-03-13
---

<p>Yesterday, I wrote an article on <a title="Using Grunt for WordPress Theme Development and Deployments" href="http://mattbanks.me/grunt-wordpress-development-deployments/">how I use Grunt with my WordPress theme development and deployment</a>. I casually mentioned the starter themes I have, both for core WordPress development and for use with the Genesis Framework. Being that I use Drupal for clients as well, I figured I would push my latest Drupal 7 Starter Theme up to <a href="https://github.com/mattbanks">Github</a> so everyone can use it as they see fit.</p>
<h2>Theme Links</h2>
<p><a href="https://github.com/mattbanks/WordPress-Starter-Theme">WordPress Starter Theme on Github</a></p>
<p><a href="https://github.com/mattbanks/Genesis-Starter-Child-Theme">Genesis Starter Child Theme on Github</a></p>
<p><a href="https://github.com/mattbanks/Drupal-7-Starter-Theme">Drupal 7 Starter Theme on Github</a></p>
<p><!--more--></p>
<p>All three use SCSS and Compass for preprocessing and are setup with the same Gruntfile and folder structure to keep things clean. If you're looking for recommended plugins/modules, check out the Readme's for each repository for what I use on most projects. More information and instructions can be found there as well.</p>
<p>Feel free to clone, fork, create an issue and send pull requests with anything you'd like to see changed or added!</p>
<p><img class="alignnone size-full wp-image-2165" alt="WordPress Drupal and Grunt Logos" src="{{ site.baseurl }}/assets/wordpress-drupal-grunt.jpg" width="740" height="287" /></p>
<h2>Using Grunt with the WordPress and Drupal Themes</h2>
<p>Just as a quick recap, to use Grunt with the themes, open the theme directory in your Terminal and run</p>
<p>[code]npm install[/code]</p>
<p>Once that installs all dependencies, just run</p>
<p>[code]grunt[/code]</p>
<p>which will start the watch tasks to monitor and update your files as you go along. Your SCSS will be processed and your JavaScript will be linted, concatenated and minified. Image optimization and rsync deployments are there as well - refer back to <a title="Using Grunt for WordPress Theme Development and Deployments" href="http://mattbanks.me/grunt-wordpress-development-deployments/">my article on using Grunt for WordPress deployments</a> for how that works.</p>
<p>If you have any questions or suggestions for using Grunt with your CMS, leave a comment or send me a message on <a href="https://twitter.com/mattbanks">Twitter</a> or <a href="https://alpha.app.net/mattbanks">App.net</a>.</p>
