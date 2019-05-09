---
categories:
  - Web Development
date: 2013-03-01T00:00:00Z
description:
  Detailing my process of migrating from a custom WordPress Starter theme
  to Genesis Framework. It's rock solid and a joy to use!
image: images/posts/genesis-framework-header.jpg
tags:
  - framework
  - genesis
  - studiopress
  - wordpress
title: "Genesis Framework: My new WordPress Starting Point"
slug: genesis-framework-my-wordpress-starter
---

When it comes to developing WordPress themes, there are plenty of options. You can start from scratch every time, you can build you own starter theme as a base to tweak, or you can use a theme framework and create a child theme.

In my time as a WordPress developer, I've gone through all stages, but have now settled on a theme framework, using [Genesis Framework][genesis] from [StudioPress][studiopress] for all of the sites I develop. Not only is it powerful with hooks for everything you can image, but it's also secure as hell with each major release vetted by core WordPress team members. So what all does it offer? Let's dig in, shall we?

## Old Process: Write each theme from scratch

Back in the old days, I would create a new folder and start coding a theme from scratch, adding every file as needed. Thinking back, I want to smack myself for writing the Loop in every template over and over, but I was young and things were just starting out for me in WordPress. Some of you may still be in this boat, and I would recommend moving up as soon as possible to speed up your development.

## Moving in the right direction: My starter theme

It didn't take long for me to create a starter theme to use on all sites. At first it just lived in a folder on my computer, then in Dropbox, and then [it went up on Github][wp-starter] when I started using git for version control (which everyone should be doing). It's gone through many iterations, adding new functionality, refactored code, and streamlined the whole process.

![wordpress starter theme](/images/posts/wordpress-starter-theme.jpg)

In its current form, my starter theme uses Compass and SASS (specifically SCSS) for all of the CSS wizardry - preprocessors make things so much easier, so I recommend checking them out if you haven't yet. I added in a responsive grid framework from [Chris Coyier][css-tricks-grids], broke out most of the content into template parts, and built out theme functions to define everything I think is needed as a starting point for a new theme. Feel free to [clone or fork it on Github][wp-starter] and send pull requests with anything you think might make it better!

This technique has worked well for me, but then I found Genesis and it will be powering the vast majority of projects going forward.

## Genesis Framework: My new process

Enter [Genesis Framework][genesis], the core theme from [StudioPress][studiopress]. After hearing great things on Twitter from well respected WordPress developers such as [Bill Erickson][bill] and [Jared Atchison][jared], I decided to pick up a copy for myself. I grabbed the [Minimum child theme][minimum] with it (which is what powers this site) and went to town digging into the documentation, reading the source code, and adding functionality. I immediately loved what I saw - Genesis is rock solid!

In addition to the security and speed of the platform, it offers a full grid setup that I can easily implement to speed up theme development. With the numerous hooks available, it's easily to drop in any additional content or modify things for any output needed. You can also change the page layout on the fly on a per-post/page basis, which makes it very easy for clients to tweak settings without breaking their site. It's updated frequently, adding features, hooks and functions to make developing with Genesis even better.

To make things even quicker, [I adapted my WordPress Starter Theme for Genesis and put it up on Github][genesis-starter] - [fork it and contribute][genesis-starter] with anything that might make it better for everyone!

![genesis starter theme](/images/posts/genesis-starter-theme.png)

Genesis fits my development style perfectly. The support included when you buy Genesis is also top notch, so if run into any issues, StudioPress is there to help you out.

## Where do we go from here?

The one current limitation of Genesis for my development style is that it doesn't have native HTML5 support. In my [Genesis Starter Child Theme][genesis-starter], I have an HTML5 doctype in place, but it's still not using header, nav, section, aside, footer and other HTML5 elements I typically use. There are ways to override each area in Genesis to use the elements, but I decided to leave it be since these are all coming in version 2.0 in the near future, so this won't be an issue for much longer. My plan going forward is to use Genesis on every WordPress project I can, which should be all of them once full HTML5 support comes in version 2.0.

I would highly recommend buying a copy of Genesis if you do theme development for clients or yourself. It's only \$59.95 and you get updates and support for the life of the product, which is worth every single penny!

[genesis]: http://my.studiopress.com/themes/genesis/
[studiopress]: http://www.studiopress.com/
[wp-starter]: https://github.com/mattbanks/WordPress-Starter-Theme
[css-tricks-grids]: http://css-tricks.com/dont-overthink-it-grids/
[bill]: http://www.twitter.com/billerickson
[jared]: http://twitter.com/jaredatch
[minimum]: http://my.studiopress.com/themes/minimum/
[genesis-starter]: https://github.com/mattbanks/Genesis-Starter-Child-Theme
