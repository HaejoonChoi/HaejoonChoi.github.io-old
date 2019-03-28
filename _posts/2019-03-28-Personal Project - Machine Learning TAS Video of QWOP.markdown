---
layout: post
title: Personal Project - Machine Learning TAS Video. QWOP.
date: 2019-03-28 16:48:00 -0700
description: You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. # Add post description (optional)
img: # Add image post (optional)
tags: MachineLearning PersonalProject # add tag
---

# Personal Project - Machine Learning TAS Video of QWOP

I wanted to make a TAS (Tool Assisted Gamemovies) for QWOP game.



You can find more info about TAS here.

<http://tasvideos.org/>



You can find more info about QWOP game here

<http://www.foddy.net/Athletics.html>



First thing I wanted to do was, rebuilding a Mario TAS video myself. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/qv6UVOQ0F44" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This is it. Using Machine Learning, the computer learned how to play Mario well. 

The first thing I want to do is finding the source code of the program, build it in my computer, and learn how to code that "Genetic Algorithm". 



Good thing is, he posted his source code on *Pastebin*. 

<https://pastebin.com/ZZmSNaHX>

```
-- MarI/O by SethBling
-- Feel free to use this code, but please do not redistribute it.
-- Intended for use with the BizHawk emulator and Super Mario World or Super Mario Bros. ROM.
-- For SMW, make sure you have a save state named "DP1.state" at the beginning of a level,
-- and put a copy in both the Lua folder and the root directory of BizHawk.
```

In the comment, he said he used BizHawk emulator and Super Mario World or Super Mario Bros. ROM. 



The first task was installing BizHawk emulator on my mac and make it work. 

So, according to *tasvideo.org*, Mac computer can run the emulator with Mono. 

<http://tasvideos.org/EmulatorResources.html

![image-20190328163727093](/Users/haejoonchoi/Library/Application Support/typora-user-images/image-20190328163727093.png)

Hmm.. 

I don't know what Mono is. 



> Mono : 
>
> Sponsored by [Microsoft](https://www.microsoft.com/), Mono is an open source implementation of Microsoft's .NET Framework based on the [ECMA](https://www.mono-project.com/docs/about-mono/languages/ecma/) standards for [C#](https://www.mono-project.com/docs/about-mono/languages/csharp/)and the [Common Language Runtime](https://www.mono-project.com/docs/advanced/runtime/). A growing family of solutions and an active and enthusiastic contributing community is helping position Mono to become the leading choice for development of cross platform applications.
>
> <https://www.mono-project.com/docs/advanced/runtime/>



Okay, so mono is runtime that implement Microsoft's .NET Framework! 

I think I need to install mono and need Mac version build?? according to this article.

<http://tasvideos.org/forum/viewtopic.php?t=12659&start=175> 