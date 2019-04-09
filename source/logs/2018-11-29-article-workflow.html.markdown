---

title: Bear + Middleman + Markdown = Nice Workflow
date: 2018-11-29
tags:
layout: article_layout
slug: blog-workflow

---
# A Nice Workflow for Making New Blog Posts

<div class="tldr-container">
  <div class="tldr-label">tl;dr</div>
  <p class="tldr"> 
    A short post on my current blog workflow.
  </p>
</div>

<p class="subtitle">Simple and clean is the way it should be</p>

One of my main objectives when building my personal website was to make sure the workflow for posting new articles would be as easy as possible. At the same time, I also wanted to do this without relying on some third-party CMS, or worse yet, building one on my own.

What I decided on was a really simple mix of HTML and Markdown, supported by Middleman’s blog extension. That’s how this and the rest of the articles I’ve posted got made. The workflow looks like this:

1. Draft and complete the article in [Bear](https://bear.app) (my note-taking app)
2. Generate a new article in my Middleman project with `middleman article TITLE`
3. Fill in the front-matter for title, tags, date, slug
4. Use the ‘Copy As Markdown’ option in Bear
5. Copy the MD article into my project
6. Preview then publish!

This affords me a lot of flexibility despite the lack of CMS. For instance, if I want to publish a blog post featuring some media I haven’t used in previous articles, I can just deal with the styling when I have to. And because all articles use the article_layout which all use the same stylesheet, I’ll have that for the next instance I use that type of media.

I also get all the nice little benefits of Middleman’s blog extension, namely the customizable front-matter, the ability to ‘unpublish’ an article without deleting it, all without relying on a chunky CMS. This way I can focus on the content, be 100% in control of the style and create new articles with ease.

There are so many ways to approach making a blog and I’m sure there are some drawbacks to this way, but this way really seems to make sense to me and has been a snap so far!
