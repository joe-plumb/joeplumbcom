---
title: Fourth post - migration to 11ty.
description: This is a post on My Blog about touchpoints and circling wagons.
date: 2021-01-06
tags: 
  - meta
  - tech
layout: layouts/post.njk
---
Well, there we are folks. Boris Johnson announces another national lockdown and it seems the best response I can come up with is ... refactoring my blog to 11ty!

It's been about 6 months since I updated my Angular-based site with blogging capabilities, which was a great learning experience, as well as incredibly basic, fragile (very 2020), and lacking some features which I really wanted to have like tags, RSS, and section deeplinks. Enter, Eleventy (11ty).

In my initial search for frameworks I could use last year, I did review 11ty - in fact, the main feature I was after was the ability to write in markdown and have everything else handled for me. I was instead attracted by the simplicity of a blog that I read, and the fact that I thought I would want some server-side compute element, and so stumbled down the rabbit hole of angular-ness, which was great fun but ultimately a classic case of over-engineering. At least I didn't deploy it on kubernetes.

So, here we are. Visually similar, perhaps a little faster (thanks to this being pre-generated), and heaps more functionality, for a few hours work. The power of open source!