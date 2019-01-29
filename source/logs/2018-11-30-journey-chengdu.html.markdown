---

title: I'll Take Fun Over Useful (At Least For Hackathons)
date: 2018-11-30
tags:
layout: article_layout
slug: journey-chengdu

---

# Simulating 'Fog of War' and Winning a Hackathon

<p class="subtitle">Ditching safe ideas and building something cool in 48 hours</p>

<div class="tldr-container">
  <p class="tldr"><strong>tl;dr</strong><br> I entered a hackathon with 2 others, we simulated the fog of war effect in video games, encountered some interesting problems and learned quite a bit about the quirks of programming GPS-based services in China.</p>
</div>

In 2017, I entered a city-wide FreeCodeCamp hackathon in Chengdu with designer Grace Yang (@yaycake) and mentor Steve Jackson.

The theme of the hackathon was ‘Code For the City’, so we initially had some pretty utilitarian and boring ideas like:

* Pot hole/city maintenance reporting (lots of those here)
* Flash rental listings (lots of storefronts changing hands frequently)

We ultimately decided we couldn’t motivate ourselves to bust our asses on these kinds ideas. So Grace came up with an alternative: simulate the [‘fog of war’](https://en.wikipedia.org/wiki/Fog_of_war#In_video_games) feature in video games on a mobile phone map. This sounded a lot more fun but presented a host of different challenges.

## The Challenges
1. Being a map-based app, we had to decide on a framework that accommodated Chinese map APIs. This was early on in WeChat miniprograms’ life, and support for Baidu or Gaode maps was questionable and we didn’t have time to test, so we decided to try Tencent’s map API.

2. With a map API decided upon, we had to figure out how to cover the map with ‘fog’. Our initial idea was based on something we knew existed in Google Maps, based on their ‘[tile coordinates](https://developers.google.com/maps/documentation/javascript/coordinates)’. When we looked at the Tencent Maps documentation, it seemed we were out of luck — nothing like that came out of the box. Instead we ended up making our own grid and placing 100s of _grey square map markers_ on the page. It was hacky, but by golly it got the job done!

3. The final (main) challenge was removing tiles as we explored their part of the map. We did this by putting a behavior on each tile, with the simple rule that when the current position was a certain distance away from the center of a tile, it would be deleted from the PostGIS database.

## wgs84 vs. GCJ-02
We were able to address the main problems stated above within the first day of coding, with relative ease. But then it came to testing it out, and everytime I stepped outside I was always disappearing the wrong tiles, on a different block or sometimes even a different street. Not super far off, but enough that it was clear something was wrong.

Long story short: China uses a different coordinate system for national security reasons.

> Online map providers offering street maps of China must obtain an authorization from the [National Administration of Surveying, Mapping and Geoinformation of China]. These maps must use the GCJ-02 datum, instead of the WGS-84 that the most of the world uses. This causes WGS-84 coordinates, such as those coming from a regular GPS chip, to be plotted incorrectly on GCJ-02 maps.
source: [wgs84 - What causes the GPS offset/shift in China? - Geographic Information Systems Stack Exchange](https://gis.stackexchange.com/questions/141542/what-causes-the-gps-offset-shift-in-china)

This was a simple fix, but was absolutely flummoxing in the time-crunch atmosphere of the hackathon! If you want to read more about it, check out [this Wikipedia page](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China#GCJ-02).

Anyways, that fact is a real bummer. But on the positive side: we got the program working. The rest was style and some gameifying aspects (calculating percentage of city explored, applying ranks, etc.)

## Reception
So we ended up winning the “People’s Choice Award” which was pretty rad. Some old black and white photo colorizing app ended up with 1st prize. I think ours was a bit more on-theme but I’m not salty about it. I wasn’t expecting to win anything, let alone build something that was so gratifying! That’s the real prize, innit?

[Here’s](https://www.youtube.com/watch?v=jNQcDpv_7ao) a video of the final result that we presented at the hackathon award ceremony.

## Lessons Learned?
It seems web development in China will always throw a curveball at you, even if you think you’ve accounted for every detail. But nothing is impossible and often in tackling the challenge you end up learning so much more.

Creating ‘Journey’  in 2 days felt impossible at first — now it feels like making it as a miniprogram was actually an excellent way to prototype something that people could use and we could receive immediate feedback on. ‘Journey’ is the one idea that’s at the top of my list for “projects to return to” — the result of the hackathon was a true “proof of concept”, in the sense that it was 1) doable and 2) interested other people. For those reasons, I’ll definitely return to it someday.



