---
layout: post
title: "Using Gulp for WordPress Theme Development"
date: 2014-02-04
image: posts/gulpjs-cover.png
categories:
- Web Development
tags:
- development
- genesis
- git
- github
- grunt
- gruntjs
- gulp
- gulpjs
- themes
- wordpress
description: Learn how to setup and use gulp to optimize and speed up your WordPress theme development. Works with Genesis Framework.
---

<p class="intro"><span class="dropcap">G</span>ulp is the new kid on the block when it comes to JavaScript task runners. It's gotten off the ground running extremely quickly with its emphasis on code over configuration when compared with Grunt. While still a very young product, I've switched my development away from Grunt and am now using gulp for all of my new coding.</p>

Keep reading to find out how to use gulp with your WordPress themes to speed up your development and stay on the bleeding edge.

## What is gulp?

gulp is a Node.js based task runner, similar to Grunt, but built for speed and efficiency. gulp uses Node streams, meaning it can build faster as it doesn't need to read and write temporary files as it pipes things through the tasks. If you want to learn all about streams, [check out this great write-up on Github][streams]. Breaking it down, gulp allows you to configure your actual tasks, such as processing your styles or processing your JavaScript, with code instead of configuring each option by itself.

It makes sense to look at how it works compared to Grunt, since that's how I wrapped my head around gulp.

<img class="center" src="{{ '/assets/img/posts/gulp.png' | prepend: site.baseurl }}" alt="" />

## How is gulp different than Grunt?

I first saw [a great comparison of Grunt and gulp from Mark Goodyear][getting-started-gulp] and my interest was piqued. What really clicked for me was seeing that I'm writing one block of code to process my CSS, one block of code to process my images, and another block of code to process my JavaScript. Compare that to Grunt, where I'm configuring Compass and Autoprefixer separately for my CSS, Uglify and JSHint separately for my JavaScript, and Imagemin for my images. Instead of configuring a plugin, you're writing short, manageable blocks of code that are logically separated based on what you need to do with your development environment.

Let's dive right in and see how to use gulp for developing WordPress themes.

## Using gulp with WordPress Themes

I have two WordPress starter themes setup that I use and you can watch, fork or download as well: [one for use with most WordPress themes][wp-starter] and [one for use with the Genesis Framework][genesis-starter]. The master branch on Github currently uses Grunt, as broken down in my article on [Using Grunt for WordPress Theme Development and Deployments]({% post_url 2014-02-04-gulp-wordpress-development %}), but there are separate "gulp" branches for each configured to use gulp tasks ([WordPress Starter Theme gulp branch][wp-starter-gulp] / [Genesis Starter Child Theme gulp branch][genesis-starter-gulp]). I plan on merging the gulp branches into the master branch at some point in the near future as I plan on using gulp going forward.

First, make sure Node and gulp are installed on your system, and then create a `package.json` file in the root of your theme to define your dependencies.

{% highlight json %}
{
  "name": "wordpress-starter-theme",
  "version": "1.0.0",
  "dependencies": {},
  "devDependencies": {
    "gulp": "~3.5.1",
    "gulp-autoprefixer": "0.0.6",
    "gulp-cache": "~0.1.1",
    "gulp-concat": "~2.1.7",
    "gulp-imagemin": "~0.1.4",
    "gulp-jshint": "~1.3.4",
    "gulp-livereload": "~0.3.2",
    "gulp-load-plugins": "~0.2.0",
    "gulp-minify-css": "~0.2.0",
    "gulp-notify": "~0.4.0",
    "gulp-rename": "~0.2.2",
    "gulp-ruby-sass": "~0.3.0",
    "gulp-uglify": "~0.2.0",
    "tiny-lr": "0.0.5"
  }
}
{% endhighlight %}

_[* Please note, package.json is subject to change. [Check my Grunt WordPress and Drupal repositories on Github for the latest versions]({% post_url 2013-03-13-wordpress-drupal-starter-themes-grunt %})]_

With that in your theme, you can then open the theme folder in your Terminal and run:

{% highlight shell %}
npm install
{% endhighlight %}

This will tell NPM to download all dependencies and put them in a `node_modules` folder. Now we're ready to create our `gulpfile.js`.

{% highlight javascript %}
// Load plugins
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({ camelize: true }),
	lr = require('tiny-lr'),
	server = lr();

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/styles/source/*.scss')
	.pipe(plugins.rubySass({ style: 'expanded', compass: true }))
	.pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
	.pipe(gulp.dest('assets/styles/build'))
	.pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
	.pipe(plugins.livereload(server))
	.pipe(gulp.dest('./'))
	.pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Vendor Plugin Scripts
gulp.task('plugins', function() {
  return gulp.src(['assets/js/source/plugins.js', 'assets/js/vendor/*.js'])
	.pipe(plugins.concat('plugins.js'))
	.pipe(gulp.dest('assets/js/build'))
	.pipe(plugins.rename({ suffix: '.min' }))
	.pipe(plugins.uglify())
	.pipe(plugins.livereload(server))
	.pipe(gulp.dest('assets/js'))
	.pipe(plugins.notify({ message: 'Scripts task complete' }));
});

// Site Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/js/source/*.js', '!assets/js/source/plugins.js'])
	.pipe(plugins.jshint('.jshintrc'))
	.pipe(plugins.jshint.reporter('default'))
	.pipe(plugins.concat('main.js'))
	.pipe(gulp.dest('assets/js/build'))
	.pipe(plugins.rename({ suffix: '.min' }))
	.pipe(plugins.uglify())
	.pipe(plugins.livereload(server))
	.pipe(gulp.dest('assets/js'))
	.pipe(plugins.notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
	.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
	.pipe(plugins.livereload(server))
	.pipe(gulp.dest('assets/images'))
	.pipe(plugins.notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
	if (err) {
	  return console.log(err)
	};

	// Watch .scss files
	gulp.watch('assets/styles/source/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('assets/js/**/*.js', ['plugins', 'scripts']);

	// Watch image files
	gulp.watch('assets/images/**/*', ['images']);

  });

});

// Default task
gulp.task('default', ['styles', 'plugins', 'scripts', 'images', 'watch']);
{% endhighlight %}

_[* Please note, Gruntfile.js is subject to change. [Check my Grunt WordPress and Drupal repositories on Github for the latest versions]({% post_url 2013-03-13-wordpress-drupal-starter-themes-grunt %})]_

We first load all of our plugins and setup the `livereload` server. You'll need to install the LiveReload browser extension to connect, which you can get for Chrome, Firefox or Safari. Next, we setup our tasks for our stylesheets. The `gulp.src` of the tasks defines which files will be processed when the task runs. Here, we specify all SCSS files inside `assets/styles/source` (but not files in subfolders). We then use Node.js piping to take those files and process them with SASS, run Autoprefixer to put in vendor prefixes as needed, copy the files into a build directory uncompressed, then minify the stylesheets and place them in the theme root, as well as triggering a LiveReload in the browser.

Instead of configuring SASS, Autoprefixer, Minification and LiveReload separately, we have them all piped together in code block for our stylesheets. For me, this is so much more logical and easier to use, maintain and extend. Plus, piping makes it extremely fast!

Separate script processing blocks are setup for vendor plugins and app/site scripts to spit out `plugins.min.js` and `main.min.js` files. In those blocks, we're concatenating plugins and scripts, running them through JSHint to check for syntax issues and Uglify to compress everything, and then copying files to proper destinations and triggering a LiveReload.

Images are processed in the next gulp task, where any new images are passed through Imagemin to compress JPG, GIF and PNG images down before triggering a LiveReload. The `cache` plugin makes sure that images aren't processed multiple times, so you don't need to worry about tasks bogging down every time you add a new image.

You'll notice that each task has a `notify` plugin associated at the end, which triggers an operating system notification to let you know the task is complete (in Mac, it's in Notification Center). You can safely remove them if you don't want to be bothered every time gulp processes a file.

We next setup our `watch` task, where we're monitoring files for changes and triggering our appropriate gulp tasks as needed. Lastly, we define our default task to run each of the tasks initially and then start watching our files for changes.

To get going, fire up your Terminal and navigate to your theme directory and run:

{% highlight shell %}
gulp
{% endhighlight %}

<img class="center" src="{{ '/assets/img/posts/rocket.png' | prepend: site.baseurl }}" alt="" />

## Gulp could use more tasks

One thing you might notice that's missing from gulp here compared to my Grunt setup is deployments. Right now, there is no rsync task for gulp to deploy files. There is [a really nice FTP deployment task][gulp-ftp] from [Sindre Sorhus][sindre] that's available to use if FTP is your deployment tool. Being that gulp is still early in its life cycle, the plugin community is still growing and developing content that people need. I fully expect all of the best Grunt plugins to be ported over to gulp shortly as it seems that the JavaScript community is moving in that direction.

## Wrap Up

I'm really enjoying gulp as a task runner, particularly for speed and efficiency of setting up the `gulpfile`. Yes, WordPress Core uses Grunt for development now, and the beauty of both systems is that you can use either wherever you choose. I have both installed on my Mac and use both daily for multiple projects. Grunt v0.5 looks to bring Node.js streams and piping into play, which will make the JavaScript task runner landscape even more interesting. For now, I'm a big of gulp!

[streams]: https://github.com/substack/stream-handbook
[getting-started-gulp]: http://markgoodyear.com/2014/01/getting-started-with-gulp/
[wp-starter]: https://github.com/mattbanks/WordPress-Starter-Theme
[genesis-starter]: https://github.com/mattbanks/Genesis-Starter-Child-Theme
[wp-starter-gulp]: https://github.com/mattbanks/WordPress-Starter-Theme/tree/gulp
[genesis-starter-gulp]: https://github.com/mattbanks/Genesis-Starter-Child-Theme/tree/gulp
[gulp-ftp]: https://github.com/sindresorhus/gulp-ftp
[sindre]: https://twitter.com/sindresorhus
