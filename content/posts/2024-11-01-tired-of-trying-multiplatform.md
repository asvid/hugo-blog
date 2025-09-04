---
categories:
  -
comments: true
date: "2024-11-01T00:00:00Z"
description: "I had several chances to try a few ways of multiplatform software development. However, I was curious about the Kotlin Compose Multiplatform way. So I could use the technology I already know to build Android, desktop, and iOS apps, sharing internal logic, and UI elements. How hard can it be?"
image: posts/multiplatform.jpeg
tags:
  - kotlin
  - multiplatform
  - software engineering
title: "I'm done with multiplatform software development"
toc: true
url: 2024-11-01-done-with-multiplatform
draft: false 
---

## How I got here

I had several chances to try a few ways of multiplatform software development. I used `Ionic/Phonegap` in the early days of mobile development. I enjoyed `Flutter` and bounced away from `ReactNative`. However, I was curious about the Kotlin Compose Multiplatform way. So I could use the technology I already know to build Android, desktop, and iOS apps, sharing internal logic, and UI elements.

It's supposed to be stable on the desktop. Stable, as a dead man's heartbeat.

## Reality check

I started with the Android app, which is the thing I know best. I could deliver basic features quickly. Then I wanted to do a desktop app, using the same services, domain models, etc. Maybe even UI elements.
How naive I was.

My Android App was using the `Material3` library for basic UI elements, it's fresh and modern, nice and snappy.

> **It's not supported on Desktop.**
I can't directly reuse UI elements. That is unless I decide to downgrade the Android app.

I used `Hilt` as a state-of-the-art and recommended DI library. BTW it's not that much nicer than `Dagger` in terms of how much boilerplate code it requires... when it works it works, but when it crashes, it's bad.

> **The `Hilt` is not supported on a multiplatform setup.**

Well ok, I don't have that much code done, I can reimplement everything using `Kodein` - suppose the only DI (or rather service locator?) lib that claims to support multiplatform.
I don't know yet if it works. I decided to remove all DI to make at least something work. **Passing stuff through the constructor is also DI**, you third-party library perverts.

After a **few hours of countless fixes**, combining versions of multiple libraries, and plugins, and using various AI assistants to figure shit out (chatGPT, built-in Android Studio Gemini, Claude Sonnet)...

I finally compiled and ran a desktop app, using some shared components.

> **But not ViewModels because it's a separate thing for Android/Mobile and Desktop**. 

That made me sad because it handles UI state and proxies commands further the line... but well. I can rewrite the same thing twice just using 2 dedicated libraries. At least I can share the domain code, I guess.

**The desktop app is crashing after I press the button.**

## The Final Straw

After another hour of digging, I learned that the Material button implementation may not work correctly on the desktop. Or rather just the animation part. **So it's better to implement it separately**.

No problem.
That's why I want to go multiplatform, to reimplement the simplest, most common UI elements on my own. To not use the same DI abstraction/abomination. To rewrite stuff that should work because it's not platform-specific.

And I didn't even touch things like using Bluetooth, playing sounds or notifications, using file systems, etc. There was no 3rd party auths or even HTTP client implemented. I'm already tired.

**It will literally take me less time to perfect what I'm building on a single platform and then use AI to rewrite it natively to another one.**

## Lessons learned 

This is not the promise I was given "**Write once, run everywhere**" if I have to rewrite most things 3-4 times. I'd rather use native at this point. **Fewer limitations, worries, and dependencies.** Or I can write once, but it won't be code I would write normally. I would bend and twist it just to work in a multiplatform setup rather than focus on delivering features. And then I would have to maintain it...

If I'm lucky, I could get everything working together, in a single codebase, reusing themes, UI components, and everything else. I'm 213,7% sure that an update of some dependency will break it.

To keep socially acceptable levels of sanity I've decided to **drop multiplatform dream**. I will write acceptable MVP Android app, add backend service and see how it goes. Adding desktop, iOS or web clients with already battle tested features and API seems like a better idea than experimenting on 5 fronts.

### Key takeaways:
- The "write once, run everywhere" promise comes with an asterisk the size of Mount Everest
- Shared code is great for platform-agnostic domain logic, but UI components are a different beast entirely
- Fighting with compatibility issues takes more time than writing platform-specific code
- The maintenance burden of a multiplatform setup might outweigh its benefits
- Current state of tooling feels more like an experiment than a production-ready solution
- True "write once" happens at the backend level - a proper API service serves all platforms equally well
