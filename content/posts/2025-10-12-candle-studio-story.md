---
comments: true
date: "2025-10-12T00:00:00Z"
description: "My wife needed a candle calculator app. I only know Android. So I used Claude Code to build a native iOS app without writing Swift. 19 days, 3 Apple rejections, and 5 hours of certificate hell later—it's live, it works, and she's happy."
image: posts/mvi.png
tags:
  - iOS
  - mobile
  - Claude
  - AI
title: "Look at Me, I'm the iOS Developer Now"
toc: true
url: 2022-10-12-candle-studio-story
---


# Look at Me, I'm the iOS Developer Now

- **Timeline:** September 14 - October 3, 2025 (19 days)
- **Lines of code I wrote:** 0 (Claude did it all)
- **Apple Store rejections:** 3
- **Hours debugging CI/CD:** 5
- **Result:** Live app with paid subscriptions

**[Check the app!](https://apps.apple.com/pl/app/candle-studio/id6752621480)**

---

I'm the iOS developer now. I mean, kinda, I just released my first purely native iOS app to the App Store. It took just a week of filling out forms and being rejected because some rule, 9.5.1, was broken. It feels like dealing with insurance companies...

I didn't write a single line of code, though. **Even if Swift looks nice, like Kotlin with untreated ADHD**.

It was all written by Claude Code :)

## Building What She Asked For

I did the opposite of what I (and most developers) usually do. I didn't set up CI/CD pipelines, I didn't design architecture, and I didn't go to tutorial hell to learn new technology. I just started building what my wife asked me to.

My wife has recently taken up candle making, and she was a bit annoyed with the manual calculation of fragrance. There are some rules to follow, but it's a trial-and-error process. She was making some notes, but it's just inconvenient to follow, especially after a week or two, when you test the candle burning and the compiled scent. She asked if I could make an app to help with calculating fragrance load in the candle. Of course I can't. We are an Apple household, and I'm only familiar with Android development. But Claude can do anything, and I have a general idea of what I want to build. I have over a decade of software development experience, and I've gained gray hair as a result.

I built it locally on my machine. I heard about not using MVVM, Viper, or any other framework, and instead using SwiftUI as it was designed to be used, and asked Claude to follow this approach. And I don't even know how to create "Hello World" in Swift. (This is a lie, I wrote it once ~8 years ago, as soon as it was possible to compile and run Swift on Ubuntu)

The app began as a simple calculator for wax-to-fragrance ratios. However, it now features multiple panels for calculating candle-related information, a recipe management system with a photo gallery, notes, and rates, a label designer, and a timer. And a few other things are not finished or working well yet that are hidden for now :)

---

## Xcode Culture Shock

My biggest pain so far is the overall developer experience, compared to Android development. Xcode is a very different IDE compared to JetBrains' Android Studio. The app configuration is in menus, not in files. So Claude couldn't edit those, just wrote me step-by-step instructions on where to click. In 2025, with the help of an LLM, I followed a generated tutorial on which button to click and what to type to make my app compliant with Apple App Store regulations. I know that Java XML files are not the nicest thing to deal with. Android used to have its own Groovy configurations, but LLM could edit those without me even knowing. Why, for iOS, do I have to manually find options hidden in multi-level settings?

I didn't use any task management system, not even a to-do list. If I had some ideas or feedback from my wife, the tester, or the product owner, I would write them down on paper or start working on them right away. No deadlines, no expectations, just building. It's pretty therapeutic after working a 9-to-5 job. I could focus on features, UI, and creating something valuable, rather than dealing with Jira bureaucracy. With no CI and tests, I was not slowed down by this one flaky test that needed to be rerun, or the few that I had to change every time. I knew everything would be changing a lot, so why bother with unit tests when the unit lifespan is only two days? Since I wasn't writing code, I didn't feel any anxiety before a PR or commit. I was conducting a code review, and since I'm not familiar with writing idiomatic Swift, I focused on higher-level aspects rather than nitpicking. So even Claude could chill and bring me more features.

The first commit was on September 14; the app was released in the store on October 3. I worked on it in my spare time, on weekends, and occasionally in the evenings. Not hustling. Not grinding.

---

## Apple's Bureaucracy

Applying to the app store is from hell. Oh, you want to have an app available in France? Extra form. What taxes are you going to pay in Micronesia? Do you have your Kazakhstan tax ID? It's been a while since I released an app to Google, and I recall a storm of forms surrounding content and child safety, but man... This is on another level.

The biggest challenge was adding subscriptions to the app. I wanted to check how it's done and have some premium features. Of course, it has to go through Apple; they take 15% for in-app purchases. The app must use product IDs set in the website form; there is no direct link between Xcode and App Store Connect. It's your job to put the products together and then use them in the app. The products, like subscriptions, are also reviewed. Separately from the app, unless it's the first release, then together - even Claude wasn't sure. The warnings about missing data are useless: "metadata missing" tells me nothing about what and where I should put. "ready to submission" status doesn't help me to submit it for review. There is no button to click to submit. I have no idea why Apple, a company that has always valued UX, is doing so much to make developer life harder. I couldn't condone such bad practices, even if I were paid to do so.

**[The app is finally approved](https://apps.apple.com/pl/app/candle-studio/id6752621480)**. Take it, enjoy your candles. Pay me for premium :)

## CI/CD and Certificate Hell

Now the next episode is coming: marketing and making the app discoverable and appealing to users. This is just barely working as an MVP. I have a backlog of features and ideas; there are no tests, no CI, and no Fastlane configured. I should add those, but on the other hand... if my wife is happy with what it is now and nobody else uses it... Why bother?

I forgot how cool it is to use Fastlane. Even though it was designed to streamline iOS deployments, since they are arguably ~more complex~ more annoying than Android ones, I was using it with Android apps, back in a day when we used Jenkins running on a PC next to my desk as a CI agent. It has now expanded in terms of utilities and tools, but the ease of use and configuration remain. It's reassuring when tools last for many years.

I used the free Canva tier to draw a logo and some promo screenshots. The premium version offers some lovely templates and a wide range of backgrounds, but... I plan to do it once within 5 minutes; there's no need for a monthly subscription.

After releasing the app and being approved by the App Store gods, I decided that manually building and uploading it was beneath my standards. How hard can it be to have a GitHub action build, sign, and push the new app to the App Store? On Android, it was relatively easy, as long as you didn't lose that one precious certificate file; however, it was eventually changed to Google Play, which handles signing. But it was a simple few-step process. Apple can't make this hard, right?

Five hours later, I can say with complete confidence that Apple can.

It's not generating a cert. It's generating a cert, to create a profile, to generate a cert, to bundle it with a key, to get the base64 of it while adding a password, to then set 7 GitHub secrets, to then debug some more, because the first cert was for development, not distribution, and the profile is wrong. **And I'm a single dev in a shed, hammering my cute little app**. I can barely imagine this process in larger companies. IT has to love it. Or maybe the process is so complex because it's designed for larger companies with multiple teams, where not everyone should have access to everything? I choose to believe that.

I have 3 pages full of failed builds in the GitHub actions tab. Some errors surprised even Claude Code, and it responded with `this is a weird error, it shouldn't be there`. My list of errors:

1. Certificate installation error
2. Profile UUID mismatch
3. Another certificate error (after regenerating)
4. Build succeeded, but TestFlight upload failed (password auth)
5. Bundle version conflict (build 2 vs existing 22)
6. Invalid Pre-Release Train (version 1.0 closed)
7. Altool error with bundle version 22
8. Train version 1.0 closed error
9. CFBundleShortVersionString still 1.0
10. Still version 1.0 after increment_version_number
11. agvtool can't find Xcode project files
12. agvtool "Cannot find project.xcodeproj/../YES" error

After all that 5h grind, Claude said it's a good time anyway, because it's normal to spend days debugging Apple app signing issues.

**Writing code was not the central part of developing this app**. The road from 'it works on my machine' to 'you can get it on your phone' was pretty long. I want to believe that each next project would be easier to set up, but I cannot remember all those steps, even if my life depended on it. They are also not written in stone; they are written in ever-changing policies, rules, and workflows in digital form. Adding and removing steps is part of the game.

---

## App update

A few days after the successful release, I updated the graphics in the store and fixed some minor UI bugs. To update graphics in store I had to release new build - OK, your store your rules. And pass another review... waited over a day for the review to even start. I really hoped each following review would be quicker... It went smooth this time, but if I had a critical bug in prod, waiting a day for the review to even start is scary.

---

## What I Actually Learned

1. **LLM-assisted development works** - I built a functional iOS app without knowing Swift. However, I can't imagine this happening without my previous experience of over a decade as a mobile developer.
2. **Developer experience matters** - Xcode feels like time travel to 2010. Multi-level menus with tabs that I had to manually tune to pass App Store requirements. LLMs can't work with that; they can with text-file-based settings.
3. **Apple's bureaucracy is real** - Forms, reviews, certificates, profiles, more forms.
4. **Shipping beats perfecting** - No tests, no CI initially, but it works and my wife is happy. Fortunately, she is not a professional product owner, so she wasn't changing her mind five times for each feature and was very open-minded about how I implemented things.
5. **Building without JIRA is therapeutic** - Paper notes and just doing it felt liberating. I recommend that every developer on the edge of burning out have such a pet project, one without deadlines and with a simple enough goal to complete in two weeks. Use the initial motivational spark to bring something to life.
6. **Fastlane is still cool** - I wonder if it's still used on Android, or if we have even better tools?
7. **iOS apps look good with minimum effort** - I didn't design any UI, just used most native elements I could find, and it looks great. On the brand-new iOS 26 and on older iOS 18, the design language is totally different. On Android, it would require a shitload of support libraries with juggling their versions to fit other dependencies. My iOS app has no external dependencies.

---

## What's Next

The app works. My wife is happy. That's technically a success.

But now comes the hard part: making it discoverable, appealing to actual users who aren't married to me, adding tests, proper CI, and all the things "real" apps should have.

Or it's already good enough. If the only user is satisfied, why add complexity?

(And yes, I'm tempted to build the Android version just to compare the pain. Stay tuned.)
