---
layout: post
title: "Adding Conditional Classes to the HTML Tag in Genesis 2.0"
date: 2013-08-19
image: posts/genesis2.jpg
---

<p class="intro"><span class="dropcap">H</span>ave you upgraded to <a href="http://my.studiopress.com/themes/genesis/">Genesis 2.0</a> and love the new HTML5 features, but want to target older Internet Explorer versions with classes like with <a href="http://html5boilerplate.com/">HTML5 Boilerplate</a>? Just drop this code into your child theme's functions.php file and you're off and running.</p>

{% highlight php %}
/**
 * HTML5 DOCTYPE
 * removes the default Genesis doctype, adds new html5 doctype with IE8 detection
*/

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
{% endhighlight %}

If you want to target IE7 or below, you can add those classes in as well (I'm only targeting IE8 here since I don't support IE7 and below).

This code is part of [my base Genesis Child Theme on Github][genesis-starter] as well.

[genesis-starter]: https://github.com/mattbanks/Genesis-Starter-Child-Theme
