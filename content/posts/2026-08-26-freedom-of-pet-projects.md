---
comments: true
date: "2026-08-26T00:00:00Z"
description: "In June, I learned how to change diapers and convinced myself that 5 hours of sleep is a luxury. Somewhere in between, I also shipped iOS for Kombine — which was absolutely not on the roadmap. The roadmap said Android → Backend → Webapp → iOS sometime later. It was a good plan, and that's exactly the kind of plan a pet project doesn't have to follow."
image: posts/freedom-of-pet-projects/title.jpg
tags:
  - pet project
  - Kotlin Multiplatform
  - software engineering
  - career
  - personal development
  - rant
title: "The Freedom of Pet Projects"
toc: true
url: 2026-08-26-freedom-of-pet-projects
draft: false
---

In June, I learned how to change diapers and convinced myself that 5 hours of sleep is a luxury. Somewhere in between, I also shipped iOS for Kombine — which was absolutely not on the roadmap.

The roadmap said: Android → Backend → Webapp → iOS sometime later. It was a good plan. Reasonable order. And that's exactly the kind of plan a pet project doesn't have to follow.

## I got bored, so I stopped

The web app worked. Golang backend, HTMX, a bit of Alpine.js — clean stack, no JS framework nonsense, exactly what I wanted to build.

And I couldn't make myself care.

It took me a while to realize why, but I get it now. While I created a core scaffold for the mobile app and oversaw the backend build, I completely delegated the web app to AI. No, it's not slop. Not entirely. It's just... I don't know what is going on there. I get the principle—server-side HTML generation based on templates, plus some JS for handling real-time events. It doesn't feel like mine. And when I was reviewing the web app after it was feature-ready, I had no idea how to debug it, or even how to guide the LLM to fix things effectively. I became the vibe-coder meme — "make me a website" kind of guy — and I didn't like it.

I'm a proud engineer. I enjoy my craft. I'll take any new tool that makes me faster, as long as I'm still in control. Here I wasn't. And it struck me after weeks of "developing" this service.

What initially felt like boredom was actually hidden procrastination, under an "I have no idea what I'm doing here" sign.

So I stopped. No sprint was at risk. No stakeholder was waiting. No performance review depended on it.

Kombine started two years ago as a rough Android scaffold with no deadline — the kind of project that sits when work eats your energy. What's changed since then is Claude Code: rebuilding a module went from a week to an afternoon, so nothing I built ever got too precious to abandon. That's why boredom-driven pivots are affordable now. I shipped Android, built the webapp far enough to test pomodoro sync on a real second client, then lost interest — same as always. I went back to Android. The iOS migration looked too complex to touch. A month later I tried it anyway, and went from quick spike to App Store release without really planning to. And I was really curious whether Kotlin Multiplatform with Compose would actually work on iOS. It does.

## Boredom is a signal, not a problem

The best decision I made wasn't the KMP migration. It was listening to the feeling that told me the web app wasn't worth my Saturday.

Pet projects have one job: bring joy. That's the whole deal — you don't owe them a timeline, an order of operations, or a roadmap. The moment you're working through something that stopped being interesting, you've lost the one thing that made it worth doing at all.

## Pivot again?

This project began its life because I had a thought: how hard can it be to sync a pomodoro timer perfectly across multiple devices? I got that sorted. I added a task manager, started using it daily, moved from Todoist, and haven't looked back.

Recently I implemented a simple container for horizon goals: weekly, monthly, and so on. Something I used to do on paper. Sometimes. And I like it — it actually helps me track what I want to achieve and keeps me focused. Paper is great for writing and planning, but not for tracking. So instead of the automatic activity tracker I had on the roadmap, I'm exploring this direction instead.

Obviously.

## Stay foolish

I'd encourage anyone to have a pet project like this — to fool around, make stupid decisions, and invest time in them, because that's all that's at stake: your time—exchanged for learning, experience, and the joy of building. I had projects before this one that all died in a sad and lonely place when I got bored — too complex, too simple, stuck on something trivial, momentum gone. Every software engineer has a graveyard like that.

I would never randomly pivot the roadmap in an organization with multiple teams and other devs depending on it. Don't try it at work. Do try it at home. I went where my curiosity dragged me, and the worst case was wasting some time learning KMP isn't what I want on iOS — and since I am not a fan of React, I'd rewrite it natively. OK, sure, Claude Code would.

I didn't optimize for time or money. I didn't follow the roadmap. I got carried away by curiosity.

That's a pretty good compass.

> Don't ever hire me as a project manager. Just leave me with the technology.
