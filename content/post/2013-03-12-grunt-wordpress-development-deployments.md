---
categories:
  - Web Development
date: 2013-03-12T00:00:00Z
description:
  How to setup Grunt to optimize and speed up your WordPress theme development
  and deploy code to your server. Works with Genesis Framework.
image: images/posts/grunt.jpg
tags:
  - deployment
  - development
  - genesis
  - git
  - github
  - grunt
  - gruntjs
  - themes
  - wordpress
title: Using Grunt for WordPress Theme Development and Deployments
slug: using-grunt-for-wordpress-theme-development-and-deployments
---

There are plenty of options if you're looking to use CSS preprocessors and JavaScript linting in your development workflow, but none as flexible and extensible as [Grunt][grunt].

In the past, I used [CodeKit][codekit] to handle all of this work, but Grunt has since taken over, giving me additional options such as deployments with greater control over the entire process. With one JavaScript file in the root of my WordPress theme, I can control Compass output paths, JSHint options, UglifyJS concatenation and minification, setup browser live reloading and multiple server deployments, allowing for easy expansion and adaption as things continue to change and grow.

Keep reading to find out how to use Grunt with your WordPress themes to speed up your development and allow you to deploy your code to your servers.

_[**Update 2013-05-15:** I'm now using [grunt-contrib-watch][grunt-watch] instead of grunt-regarde and grunt-livereload. It has a built in LiveReload server and is more streamlined. I updated the Gists, the tutorials, and my [WordPress Starter Theme][wp-starter], [Genesis Starter Child Theme][genesis-starter], and [Drupal 7 Starter Theme][drupal-starter].]_

## What is Grunt?

Grunt is an elegant task runner from [Ben Alman][ben-alman] written in [Node][node]. In it's latest version 0.4, Grunt has become an elegant wrapper for any task you can imagine. There is a large community behind Grunt with many  contributed plugins that you can add to your projects. Whether you're looking to create a full build process or just watch files for changes, Grunt has you covered.

I'm not going to get too in depth on how to install Grunt - [check out their Getting Started guide][grunt-getting-started] for getting up and running on your system.

## What Can Grunt Do?

There are countless tasks that Grunt can do for you, but in this case, we're going to focus on those that will help our WordPress theme development: [Compass][grunt-compass] preprocessing, [JSHint][grunt-jshint] to check out JavaScript, [UglifyJS][grunt-uglify] to concatenate and minify all JavaScript files, [Watch][grunt-watch] to watch files for changes, trigger our tasks and [LiveReload][grunt-livereload] the browser, [ImageMin][grunt-imagemin] to optimize all PNG and JPG images, and [Rsync][grunt-rsync] to deploy our files to remote servers.

All of this is accomplished by adding two files to your theme, a `package.json` to define which Grunt plugins to use as dependencies, and a `Gruntfile.js` to define our tasks and options. For more information on getting that all setup, my friend [Jonathan Christopher][jonathan-article] has a great article about using Grunt with WordPress.

## Using Grunt with WordPress Themes

Before we begin, I'd like to note that I have two WordPress starter themes setup that you use: [one for use with most WordPress themes][wp-starter] and [one for use with the Genesis Framework][genesis-starter]. Both utilize all of the Grunt tasks we're going to go talk about in this article, with plenty of theme functions and grids to get you started.

Let's get going, shall we? Make sure Node and Grunt are installed on your system, and then create a `package.json` file in the root of your theme to define your dependencies.

{{< highlight json >}}
{
"name": "wordpress-starter-theme",
"version": "1.0.0",
"dependencies": {},
"devDependencies": {
"grunt": "~0.4.1",
"grunt-contrib-compass": "~0.2.0",
"grunt-contrib-imagemin": "~0.1.4",
"grunt-contrib-jshint": "~0.4.3",
"grunt-contrib-uglify": "~0.2.0",
"grunt-contrib-watch": "~0.4.3",
"grunt-rsync": "~0.1.1",
"matchdep": "~0.1.2"
}
}
{{< / highlight >}}

_[\* Please note, package.json is subject to change. [Check my Grunt WordPress and Drupal repositories on Github for the latest versions]({% post_url 2013-03-13-wordpress-drupal-starter-themes-grunt %})]_

With that in your theme, you can then open the theme folder in your Terminal and run:

{{< highlight shell >}}
npm install
{{< / highlight >}}

This will tell NPM to download all dependencies and put them in a `node_modules` folder. Now we're ready to create our `Gruntfile.js`.

{{< highlight javascript >}}
'use strict';
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            options: {
                livereload: true,
            },
            compass: {
                files: ['assets/scss/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
            livereload: {
                files: ['*.html', '*.php', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },

        // compass and scss
        compass: {
            dist: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'assets/js/source/**/*.js'
            ]
        },

        // uglify to concat, minify, and make source maps
        uglify: {
            dist: {
                options: {
                    sourceMap: 'assets/js/map/source-map.js'
                },
                files: {
                    'assets/js/plugins.min.js': [
                        'assets/js/source/plugins.js',
                        'assets/js/vendor/**/*.js',
                        '!assets/js/vendor/modernizr*.js'
                    ],
                    'assets/js/main.min.js': [
                        'assets/js/source/main.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: '**/*',
                    dest: 'assets/images/'
                }]
            }
        },

        // deploy via rsync
        deploy: {
            staging: {
                src: "./",
                dest: "~/path/to/theme",
                host: "user@host.com",
                recursive: true,
                syncDest: true,
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc']
            },
            production: {
                src: "./",
                dest: "~/path/to/theme",
                host: "user@host.com",
                recursive: true,
                syncDest: true,
                exclude: '<%= rsync.staging.exclude %>'
            }
        }

    });

    // rename tasks
    grunt.renameTask('rsync', 'deploy');

    // register task
    grunt.registerTask('default', ['watch']);

};
{{< / highlight >}}

_[Please note, Gruntfile.js is subject to change. [Check my Grunt WordPress and Drupal repositories on Github for the latest versions]({% post_url 2013-03-13-wordpress-drupal-starter-themes-grunt %})]_

~~We first setup the `livereload` task, but give it no options (you can change the port here if you feel the need).~~ _[__*Update:*__ This is now handled the Watch task.]_ You'll need to install the LiveReload browser extension to connect, which you can get for Chrome, Firefox or Safari. Next, we give JSHint our options for how to lint our JavaScript and tell it which files to check in the `all` setting, followed by configuring Uglify to create source maps and concatenate and minify our files. In my setup, I have it automatically pull `assets/js/source/plugins.js` and all files inside `assets/js/vendor` other than Modernizr and put them into `assets/js/plugins.min.js`, as well as taking our main.js script and minifying.

Next, we tell Compass to use the settings in our external `config.rb` file for processing our SCSS. I chose to break `config.rb` out into a separate file instead of putting the options directly inside the `Gruntfile.js` in case I wanted to use the Compass ruby gem directly or use CodeKit, as both will work using the `config.rb` file.

The next section sets up Regarde for our watch task to monitor for changed files and triggering our tasks. The reason for using Regarde instead of [Grunt Watch][grunt-watch] is that Watch doesn't give access to changed files because it spawns tasks in subprocesses, which doesn't play nice with LiveReload. It's essentially a drop-in replacement, so swapping back to Watch won't be an issue if the way it spawns processes changes. We tell Regarde to fire the `compass` and `livereload` tasks whenever an SCSS file is changed, and to fire `jshint`, `uglify` and `livereload` whenever a JS file is changed.

_[__Update:__ Watch now works with LiveReload and has it built in, so the above Regarde code is swapped out for Watch. It's essentially the same code, we're just adding an option to LiveReload the browser.]_

The last task for this section is imagemin, which doesn't automatically run as file are changed, but run manually with:

{{< highlight shell >}}
grunt imagemin
{{< / highlight >}}

This will run [OptiPNG][optipng] and [jpegtran][jpegtran] on your images to optimize them before you deploy to save on bandwidth.

At the end of the `Gruntfile.js`, we load all our tasks and register our default task. To run Grunt, at the terminal, just enter

{{< highlight shell >}}
grunt
{{< / highlight >}}

Now, let's get right on the most fun part: using Grunt to deploy your theme to your servers.

![grunt iterm](/images/posts/grunt-iterm.jpg)

## Deploying Your WordPress Theme with Grunt

There are a number of deployment choices when it comes to Grunt tasks. [You can use SSH][grunt-ssh] to connect and run commands or transfer files over SFTP, [you can use FTP][grunt-deploy] to transfer files if you don't have SSH access, or [you can use Rsync][grunt-rsync] to sync up your directories over an SSH connection. After trying all three, I settled on Rsync as it provided the best and quickest way to update my theme files on the servers I use most. I typically have SSH or SFTP access, so it's not an issue for me, but if you have only have FTP access, it's trivial to swap out the Rsync plugin with the FTP plugin for your deployments. I've used this method for client sites in the past and it works seemlessly.

In our `Gruntfile.js`, we have two servers setup: staging and production. Each sets the source as the root of our theme project locally and sets a destination and hostname for our remote server. Setting `recursive` tells rsync to traverse all subdirectories to make sure we're getting all of our files, and `syncDest` will delete any files on the remote server that no longer exist in your local repository. I'm excluding a number of files as they aren't needed for the theme to run on the server.

To trigger a deployment, at the Terminal, enter:

{{< highlight shell >}}
grunt rsync:staging
{{< / highlight >}}

or

{{< highlight shell >}}
grunt rsync:production
{{< / highlight >}}

And like that, you've now deployed your files to your server!

## Wrap Up

I've changed over my deployments to using Grunt now instead of [setting up Git post-commit hooks and bare repositories]({% post_url 2012-07-28-wordpress-deployments-with-git %}). Having the general framework in Grunt makes it quicker than configuring post-commit hooks on multiple servers, and it works just as well. With so many tasks available to extend and customize Grunt, it's an invaluable tool for any development process.

This method can be easily tweaked to work with any development process, from Drupal themes to ExpressionEngine sites to static site builds and use in other systems. I love the flexibility of Grunt and plan to keep using and evolving my Gruntfile going forward. I hope you do the same!

[grunt]: http://gruntjs.com/
[codekit]: http://incident57.com/codekit/
[grunt-watch]: https://github.com/gruntjs/grunt-contrib-watch
[wp-starter]: https://github.com/mattbanks/WordPress-Starter-Theme
[genesis-starter]: https://github.com/mattbanks/Genesis-Starter-Child-Theme
[drupal-starter]: https://github.com/mattbanks/Drupal-7-Starter-Theme
[ben-alman]: http://benalman.com/
[node]: http://nodejs.org/
[grunt-getting-started]: http://gruntjs.com/getting-started
[grunt-compass]: https://github.com/gruntjs/grunt-contrib-compass
[grunt-jshint]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt-uglify]: https://github.com/gruntjs/grunt-contrib-uglify
[grunt-livereload]: https://github.com/gruntjs/grunt-contrib-livereload
[grunt-imagemin]: https://github.com/gruntjs/grunt-contrib-imagemin
[grunt-rsync]: https://github.com/jedrichards/grunt-rsync
[jonathan-article]: http://mondaybynoon.com/20130310/grunt-wordpress-theme-development/
[optipng]: http://optipng.sourceforge.net/
[jpegtran]: http://jpegclub.org/jpegtran
[grunt-ssh]: https://github.com/andrewrjones/grunt-ssh
[grunt-deploy]: https://github.com/zonak/grunt-ftp-deploy
