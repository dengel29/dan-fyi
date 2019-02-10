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

Inspiration is everywhere, and it's not a matter of where you look but a matter of mindset. Looking at my most recent little project – and it is indeed a small one – I can now see a few of the things that made it appealing enough to pursue.

Besides the fabulous podcast 'Ologies' and every nature doc featuring David Attenborough, one big chunk of inspiration for Genus Absurdus is the almost-completely procedurally generated video game No Man's Sky. The game generates universes, alien inhabitants, planets, and the flora and fauna that populates each planet. You can 'scan' the flora and fauna for details about them: like, for flora, you can learn its age, root structure, nutrient source, and, among other things, their 'scientific name'.

When I bought the game I never imagined I'd end up role playing an intergalactic botanist, but here we are.

## How It Was Made

Gathering the names was a chance to revisit scraping library Nokogiri and get familiar with Mechanize which automates actions on websites, like clicking through links. I simply found a few good sources for Latin prefixes and suffixes for scientific discoveries, both flora and fauna alike, inspected the DOM structure, put Nokogiri + Mechanize to work, and saved the results to CSV files.

After gathering and normalizing those portions of names, it could have been as easy as randomly sticking them together. However, a fair amount of the prexies and suffixes are hyphenated which created potential for unnatural-looking combinations, so these required some treatment. I found the <a href="https://ruby-doc.org/core-2.6.1/Enumerable.html#method-i-partition">`#partition` </a>enumerator helpful for detecting and separating hyphenated terms.

I also became interested in how many potential permutations were available. It is always a delight to find built-in Ruby methods that <a href="https://ruby-doc.org/core-2.6.1/Array.html#method-i-permutation">do precisely what you need</a>.

## Making It Presentable

Finally, to make this small site a bit more attractive, I used the <a href="https://fonts.google.com/specimen/Old+Standard+TT">'Old Standard TT'</a> font. You may feel like this font feels familiar:

<div class="img-container"><img src="../images/darwin.jpg"></div>

In fact, I wasn't even thinking of making this a website until I realized just how well-suited this font family was for imbuing a sense of legitimacy to these fabricated scientific names. Old Standard's description even refers to this particular feature:

<blockquote>
   ...this lettertype still has at least two advantages: it can be considered a good choice for typesetting scientific papers... as its specific features are closely associated in people's eyes with old books they learned on
</blockquote>

Genus Absurdus' functionality is so limited in scope that it feels almost silly to go the extra mile and make it a website... on the other hand, if you can make it look good, then there's a chance people will get some pleasure from it. And what's the point of learning how to develop for the web if you don't turn every silly idea you have into a website?! Anyways, if you're one of those people, thanks for trying and feel free to reach out and let me know.



