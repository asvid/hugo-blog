---
categories:
  -
comments: true
date: "2024-05-07T00:00:00Z"
summary: " "
image: /assets/posts/mvi.png
tags:
  -
title: "Veni, Vidi, Rewrite"
toc: true
url: 2024-05-07-rewrite-seems-like-a-bad-idea
draft: true
---

## What made me think

Once I worked in a company, where we had native mobile apps for Android and iOS, including tablets. With mostly the same features. Mostly looked the same, so the Android app was imitating native iOS behaviors (for whatever reason). But since platforms are different, and Android had to mimic what iOS was getting for free, the development cycles were often out of sync. Which was not good when you made a media announcement about a new feature. Because of feature-driven-development, with a spice of "we need to show something for CES" and "users are asking when it's gonna be ready", we had little to no time to take a step back and refactor. The app was like 7 years old, with tons of legacy and burgen from questionable design decisions, justified with simple "CEO wanted it that way".
The release process was long and painful. Occupied with manual testing by the QA unit in the company. Oh, BTW the app was talking not only with the cloud backend but also with the local server, which could be one of few hardware versions and one of many software versions with changes in API. And the app should handle it all - that is always making things easy :)
I still think that the team did a great job in maintaining this hell of a project for so many years. But it became stressful, slow, and error-prone to work on it. At some point decision was made: let's rewrite it. The decision was not made by the engineering team. We were against it. And even more against the direction that was taken with using ReactNative.

I will spare you the details but the outcome after releasing this new app (developed externally), was managers asking us "how to reset user reviews on app stores". They were so bad.

## But a lot of companies rewrite their apps, right?

The decision was kinda justified with examples from other companies that went the same path. From native apps to ReactNative rewrite, with huge success of course. Well, I recently did some research. I didn't find any success stories. Even if sometimes you can find post headers like "AirBnB moved to React Native", or "Linkedin moved from Scala to Java", it's a huge simplification, or simply not true at all. Some examples I found:

- AirBnB - had purely native apps for Android and iOS, and faced similar issues to what I had in my job. They decided to adopt ReactNative for some components, not the whole app rewrite. Which makes more sense IMO. [Whole process documented here](https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c). But it didn't work all that well and they went back to 100% native. The reasoning is linked in Medium stories, some more info [here](https://news.ycombinator.com/item?id=32485178).
- LinkedIn - started with some older Java, adopted Scala at some point (even rewrote parts of the service with it) but then decided to go back with newer Java versions. [Interesting info about it here](https://news.ycombinator.com/item?id=13477954). At the time Scala was adopted, Java 5/6 didn't look that great, and functional programming with Scala definitely has some advantages. But with Java 7/8 differences melted to the point it was not worth investing into Scala anymore.
- Twitter - similar to Linkedin, they adopted Scala after the initial Ruby on Rails setup couldn't handle the scale. From the [same post linked above](https://news.ycombinator.com/item?id=13477954):
  > The former VP of Platform Eng at Twitter said in 2015, "What I would have done differently four years ago is use Java and not used Scala as part of this rewrite. [...] it would take an engineer two months before they're fully productive and writing Scala code." The VP of Platform Eng at Twitter expressed regret for the choice of Scala.

This is not ranting about how Scala is a bad choice - it has its place. But may not be the best pick for rewriting parts of service, when the team is not familiar with it.
In my story, there was an expectation that the externally developed ReactNative app would be later maintained by native Android and iOS teams. It didn't work for Airbnb, it did not work for us.

There are multiple other eligibly "great rewrites", and "ditching some tech" headers about companies like Facebook, Netflix, Instagram, Pinterest, and Slack. And they all share a similar story behind it. It's not a rewrite, it's scaling with multiple dedicated services. Written in the most fitting tech, according to team capabilities, functional requirements, infra and tooling available, and what makes the most sense, looking at multiple factors. Ain't nobody has the time and money to make biased decisions here and fight language wars. It's all business after all.

Often company starts with some technology that just works for the initial team. I assume they are sane and start with an MVP monolith that just works. Then (if the product is successful) they add more and more code there, and problems start to appear. There are not enough devs available in an exotic tech stack in the local area, tools are not that great at scale, nobody solved some problem yet with existing tools and there is no one to ask for help. One solution is to start splitting your business into smaller parts, that can be created in a different from the core technology, and use some universally accepted protocols to communicate. This is not a "rewrite". By splitting into services you get all the nice benefits of scaling only parts that need that, in the way they need it. Also using tech that makes the most sense. Some problems are more functional, some are more procedural, and some DBs perform better for particular cases. Some services are barely utilized most of the time and then spike because of IDK Superbowl or Black Friday.

In another project, I had to work with old-ish Java code. I already was using Kotlin in a previous project so it was a noticeable downgrade. Other developers felt similar. But we didn't push to rewrite. We agreed, that the new code **can** use Kotlin because of its interoperability with Java (AFAIR we actually had some minor issues with it). Can, not should. Inviting devs to use Kotlin, and not creating a hard rule to do so. Some stuff was still faster/easier/safer done in Java. We also tried to not rewrite too much, unless it was seriously beneficial. There is little value in PRs with automatically translated code, just for the sake of having a higher percentage of Kotlin used in the project. And I'm guilty of creating some of those. Typically the new modules were created it was 100% Kotlin.

## The Chaos

> [Inspired by talk by Wojtek Ptak and Andrzej Grzesik on Boiling Frogs 2024](https://2024.boilingfrogs.pl/schedule/architecture-uncomplicated-tools-for-simplified-large-scale-systems/)

> Using multiple technologies in the same organisation creates chaos.

Complicating infra, tools, monitoring, and teams or team members are not interchangeable. Building a silos. Hiring is way more complex and general managing of the projects can become hell. So maybe let's limit possible tools to pick for developers. It can get way stricter than "we use Java here". Eg. "we use just a specific version of this logging library" (so you have to update 100s of services because Log4j vulnerability or something :) ). Sounds like hell but... it works. And you, as a developer, can switch teams easily because the stack is the same everywhere. It also triggers building internal tools that are well-suited to the solution. In opposition to using the contemporary hyped tool and bending the project to utilize it. Devs may not be happy in such a constrained environment. IMO as long as the constraints are reasonable, it's actually better. No time wasted for decisions, just pure delivering results. Creativity thrives under constraints, too much freedom is actually blocking.

Not all code is written equal. Some parts are more critical than others, some are never ever modified and just grimly do their job (like a server Anton in "Silicon Valley"). Why rewrite it to a different tech stack? Because team's personal preference? Sounds like a bad reason.

Tech is rarely if ever "the business". It's a tool, like a hammer. Switching to another tool should be business-justified. Slow and risky development IS a valid business need. But rewrite is rarely the right answer to that.

OK, so rewriting to a different tech stack is usually a bad idea. How about rewriting to the same tech stack that you already use? It's called refactoring, and it's best to not scream about it too loud, just like writing tests. Just do it while you deliver features and managers won't even notice :)

## Why it's usually a bad idea

In an organization that allowed things to go really bad, without thinking too much about "why", how do you expect to apply the same principles just use different tech and make it magically work? You still won't have nice documentation, requirements, or understanding of the system. It does matter very little that you already have a working system. Does it have tests? What is tested? It's not testable and that's why you need a rewrite? So the same team that was not testing or using CI will now do it differently? The same management that was feature envy to show stakeholders some fancy demo will now take a long break and allow you to rewrite 1:1 the same system? Can your business even survive freezing feature development in an existing app to rewrite it? You reviewed features and half is not used, but did you ask users about it? Some may be used once a year but be essential.

As a developer I like technology, I like new shiny things, and I am influenced by currently hyped topics. This is not a valid reason to rewrite or even refactor perfectly working code. JavaScript gets a new framework bravely fighting the inconveniences of previous ones every 2 weeks. And this is OK, but you won't be rewriting all your stuff every 2 weeks. You will pick something and stick to it for years, so make a good decision, and don't experiment (too much).
There was a time in the Android world when everything started to be reactive. RX was the solution for callback hell and threading in general in Java. But early on, the callback hell was replaced with streams hell, with harder (IMO) to track data flows, a new set of issues, and a completely new very wide API created by 3rd party library. It infected the community so badly, that there were libraries that only had RX API. I remember I wanted to use some library that was using RxJava 1, and my project was already using RxJava 2. Please don't use 3rd party libs as the only API for your open-source libs... callbacks are not that bad. Anyway, now we have Coroutines embedded in Kotlin itself so the problem is solved, right? Well, not if you've rewritten your callbacks to RX :)

## When it might be a good idea

When rewrite is a planned ahead step in creating a new product. Take this situation: you have a business idea to create new capability in your product, you start with MVP and it works but you were ~30% right about the design and expected features, the product may pivot, etc. Since this is a new/additional feature and not the core product, it's relatively smaller. Rewriting after finding out what works and what areas are worth investing more time, in seems like a natural step.
Another place where rewrite may fit is finding out that some areas in a few services are coupled tighter together than with services they live in. So you extract it to a new product/service. Calling it a rewrite may seem like a big stretch, but you will be replacing whole parts of services and you are not limited to using the same language or framework, so...
I can also imagine that unfreezing a project created with some exotic technology when no one from the original creators is available to work on it, may be challenging to add new features. So if the docs are there, or at least tests - rewriting to modern techstack may be faster and safer than forcing people to use punch cards.

## What to do instead

[Divide et impera](https://en.wikipedia.org/wiki/Divide_and_rule) - Divide and conquer. If anyone suggests a rewrite, it's because of a set of reasons, not a single reason. Identify them, prioritize issues, and find a few possible solutions to every one of them, keeping the whole project in mind.
Some solutions may NOT be technical. But requires organization change, and no rewrite or refactor will fix it.

- Multiple teams working on a single codebase, blocking each other and pulling projects in different directions? Find context boundaries, create modules, or maybe microservices. Remember, if you have 1 team and 60 microservices you are doing something wrong.
- You need features released at the same time on iOS and Android? Plan it ahead, use feature toggles. Rewriting to ReactNative/Flutter will not help you if the project is poorly planned.
- Releases are scary and take long hours of manual testing? Write automated tests :)
- The code is not testable? **Refactor** so it is testable. No rewrite is needed (usually).
- Backward compatibility is slowing down the development of new features? Calculate the risks of limiting support for older versions. It may not be worth supporting eg. 10yo Android phones.
- Infrastructure is slowing down releases? Leave poor DevOps alone, and increase the autonomy of the dev team.
- Parts of the application are changing daily, and others never do, so it's old-fashioned legacy code? Don't touch it :)
- You think the project was built with the wrong architecture? If basic and generic principles are followed (SOLID, CUPID, AHA, YAGNI, DRY, WET), it shouldn't matter that much. You can change architecture and reuse whole chunks of existing logic, by refactoring.

We developers don't like huge PRs. Bigbang rewrite or even refactor is like enormous PR that you ask your users to review. On rare occasions, it may be worth it, but it's introducing risks that are rarely known beforehand.

Reduce the chaos, and refactor your code.
