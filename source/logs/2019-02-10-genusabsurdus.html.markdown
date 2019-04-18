---
title: Generating Latin Names for New Species
layout: article_layout
date: 2019-02-10
slug: genus-absurdus
tags:

---
# Scraping For Fake Scientific Names


<div class="tldr-container">
  <div class="tldr-label">tl;dr</div><p class="tldr">I made a fake Latin name generator called 'Genus Absurdus'. You can try it out <a href="http://genusabsurdus.herokuapp.com/" target="_blank">here.</a></p>
</div>

## Inspiration for Genus Absurdus

The main inspiration for Genus Absurdus is the procedurally generated video game No Man's Sky. NMS generates universes, alien inhabitants, planets, and the flora and fauna that populates each planet. You can 'scan' the flora and fauna for details about them: like, for flora, you can learn its age, root structure, nutrient source, and, among other things, their 'scientific name'.

When I bought NMS I never imagined I'd end up role playing an intergalactic botanist, but here we are.

## Making Genus Absurdus

Gathering a high volume of Latin words was a chance to revisit scraping library Nokogiri and get familiar with Mechanize which automates actions on websites, like clicking through links. I found a few good sources for Latin prefixes and suffixes for scientific discoveries, both flora and fauna alike, inspected the DOM, put Nokogiri + Mechanize to work, and saved the results to CSV files.

After gathering and normalizing the Latin, it could have been as easy as randomly sticking them together, but a fair amount of the prefixes and suffixes are hyphenated which created potential for unnatural-looking combinations, so these required some treatment. To solve this I utitlized the <a href="https://ruby-doc.org/core-2.6.1/Enumerable.html#method-i-partition">`#partition` </a>enumerator, which was helpful for detecting whether a term was hyphenated, then deciding whether to place those terms as a pre- or suffix.

I also became interested in how many potential permutations were available. It is always a delight to find built-in Ruby methods that <a href="https://ruby-doc.org/core-2.6.1/Array.html#method-i-permutation">do precisely what you need</a>.

## Making It Presentable

Finally, to make this small site a bit more attractive, I used the <a href="https://fonts.google.com/specimen/Old+Standard+TT">'Old Standard TT'</a> font. You may feel like this font feels familiar:

<div class="img-container"><img src="../images/darwin.jpg"></div>

In fact, I wasn't even thinking of making this a website until I realized how well-suited this font family was for imbuing a sense of legitimacy to these fake scientific names. The introduction to Old Standard even refers to this particular feature:

<blockquote>
   ...[this lettertype] can be considered a good choice for typesetting scientific papers... as its specific features are closely associated in people's eyes with old books they learned on...
</blockquote>

Who doesn't appreicate a false sense of legitimacy?

Genus Absurdus' functionality is so limited in scope that it almost felt silly to go the extra mile and make it a website... on the other hand, if I could make it look presentable, then there's a chance people would get some pleasure from it. So I took decided to expand it beyond a simple Ruby script into a small Heroku app. Having just one function and a single view, I decided to use the Sinatra framework. I appreciate Sinatra's architectural simplicity of combining router with controller, meaning I wasn't forced to make too many decisions while transitioning this simple Ruby script into a simple website.

Getting a website up and running can be a complex affair, and the fewer barriers to seeing your prototype online, the better. There will always time to overcomplicate things later.



