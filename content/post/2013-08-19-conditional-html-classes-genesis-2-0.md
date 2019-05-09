---
categories:
  - Web Development
date: 2013-08-19T00:00:00Z
description:
  Code for adding conditional html element tags in Genesis 2.0 to target
  older Internet Explorer versions, similar to HTML5 Boilerplate.
image: images/posts/genesis2.jpg
tags:
  - genesis
  - html5
  - html5 boilerplate
  - old ie
  - wordpress
title: Adding Conditional Classes to the HTML Tag in Genesis 2.0
slug: conditional-html-classes-genesis-2-0
excerpt: Have you upgraded to Genesis 2.0 and love the new HTML5 features, but want to target older Internet Explorer versions with classes like with HTML5 Boilerplate? Just drop this code into your child theme's functions.php file and you're off and running.
---

Have you upgraded to [Genesis 2.0][genesis] and love the new HTML5 features, but want to target older Internet Explorer versions with classes like with [HTML5 Boilerplate][html5boilerplate]? Just drop this code into your child theme's functions.php file and you're off and running.

{{< highlight php >}}
/\*\*

- HTML5 DOCTYPE
- removes the default Genesis doctype, adds new html5 doctype with IE8 detection
  \*/

function mb_html5_doctype() {
?>

<!DOCTYPE html>
<!--[if IE 8]> <html class="lt-ie9" <?php language_attributes( 'html' ); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes( 'html' ); ?>> <!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<?php
}

remove_action( 'genesis_doctype', 'genesis_do_doctype' );
add_action( 'genesis_doctype', 'mb_html5_doctype' );
{{< / highlight >}}

If you want to target IE7 or below, you can add those classes in as well (I'm only targeting IE8 here since I don't support IE7 and below).

This code is part of [my base Genesis Child Theme on Github][genesis-starter] as well.

[genesis]: http://my.studiopress.com/themes/genesis/
[html5boilerplate]: http://html5boilerplate.com/
[genesis-starter]: https://github.com/mattbanks/Genesis-Starter-Child-Theme
