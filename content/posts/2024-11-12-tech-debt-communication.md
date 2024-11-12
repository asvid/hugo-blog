---
categories:
  -
comments: true
date: "2024-11-12T00:00:00Z"
description: "A chance encounter at the airport leads to insights into the real nature of technical debt in software development. Through the lens of Stoic philosophy and Lord of the Rings metaphors, this post explores how better communication between engineers and management can prevent our own Mines of Moria situations. Practical tips included for both technical leads and managers on how to discuss, document, and decide which technical dragons are worth slaying."
image: /assets/posts/tech-debt-balrog.jpeg
tags:
  - tech-debt
  - software engineering
  - communication
title: "The Stoic Engineer's Guide to Technical Debt"
toc: true
url: 2024-11-12-tech-debt-communication
draft: false
---

> TL;DR: Technical debt isn't just a coding problem—it's a communication challenge. Through better dialogue between engineers and management, we can transform it from a source of conflict into a strategic tool. This post explores practical ways to discuss, document, and decide which technical challenges are worth addressing.
> 
## The Encounter

**While waiting for my flight at the airport, I overheard a conversation that made me rethink how we handle technical debt.**

Behind me were 3-4 middle-aged guys talking about work, and what else. From the context, I understood that they are product/project managers in some IT companies. They stated some triggering stuff like "**there is no difference when managing digital or physical product, it's just managing timelines and resources**", etc. Fine. Have your opinions. But then they went into a "tech dept" discussion. Blaming software engineers for its existence. Complaining that they reserve a portion of time each week to fix things that should work already, and are not even bugs. They need to rewrite everything constantly.

Little did they know, as a software engineer sitting right behind their backs, that **I've created, solved, and sometimes intentionally ignored vast amounts of technical debt**. I probably have a better understanding of it than managers. Most of us engineers do.

So why are they so ignorant about it? Why can't they put a little effort into trying to understand the origins, cost, and benefits of technical debt?

And then it struck me.

## This is our fault.

Maybe I got this thought inspired by the "Daily Stoic" podcast I've been listening to, or quotes from Mark Aurelius' "Meditations":

> Begin the morning by saying to yourself, I shall meet with the busy-body, the ungrateful, arrogant, deceitful, envious, unsocial. All these things happen to them because of their ignorance of what good and evil are. (Book II, 1)

>Consider whether thou shouldst not rather blame thyself, because thou didst not expect such a man to err in such a way. For thou hadst means given thee by thy reason to suppose that it was likely that he would commit this error, and yet thou hast forgotten and art amazed that he has erred. (Book IX, 9)

> Fifth, consider that thou dost not even understand whether men are doing wrong or not, for many things are done with a certain reference to circumstances. In short, a man must learn a great deal to enable him to pass a correct judgment on another man’s acts. (Book XI, 18)

I shouldn't expect any manager to have the same level of technical knowledge as I have. They don't care about details but about the results. They manage budgets, and timelines, play courtyard games, company politics, etc. They (should) have a bigger picture image in their head.

Technical details are our thing to manage. And we do it well; we just communicate it poorly.

## The Nature of the Beast

> Technical debt is like a Balrog woken up by Dwarfs. It was already there, just greedy diggers forced it to come out. And kill everyone.

The "debt" part is screaming "problem". While it's not always that big of a deal.
**There are different types of debt.** You can use a credit card to get a LV bag for the girl you like - this is bad. You can take a mortgage to buy a flat - depending on circumstances it's good, or at least better than the previous example. And you can **take a loan to invest** in technology, machines, whatever that will make your business thrive in a long shot - perfect.

Technical debt also has multiple faces. Taking shortcuts to deliver features and take over the market, knowing that it will need to be redone to handle scaling is not a problem. But the cost of moving faster now needs to be clearly communicated and planned.
**Quickly delivered feature may be a one-time use, and won't be relevant anymore after some "Black Friday"** or other "Superbowl" kinda thing. No need to do it according to the same standard that software lasting decades is.
Computer Games eg. are often written... quickly, because of deadlines, or new experimental mechanics that may work or be trashed after internal testing. They are often not maintained too much after the release, with few patches and bug fixes, and thats it.

**Having a technical debt doesn't mean it has to be paid off**. As long as it's not limiting or slowing down too much other development. When the suboptimal function is running once a year, does it really make a difference if you rewrite it up to perfectionist standards, shaving 0.5s of its runtime? Making it more readable and maintainable, even though the last change was made there 3 years ago and nobody plans to touch it in the future?

Be smart-lazy about technical debt management. Not all debt needs immediate attention, and some can just be left alone there because the interest rate is so low.

On the opposite side, **if your system does not have any technical debt, it was probably over-engineered in the first place**. Too much time and resources were used to prepare for the volume of users that never came. You've built an F1 bolid when you needed a city car.

## The Origins

The managers I've unwillingly listened to at the airport probably don't realize how often they are the source of issues. Changing plans, priorities, shifting deadlines - it's not helping us engineers. In a way, managing software and physical products may be similar. No point in focusing on the roof shape and color when the house model is not decided yet. If you build a roof first and then want to build foundations you will suffer some engineering challenges. Just like in software... It's easy to imagine how to build a building, everyone saw some construction site. The problem with software products is that they are abstract, it is hard to see the order of things or the magnitude of issues caused by decisions. If you are a non-technical manager.

We, engineers are guilty of picking the mythical industry standard solution, without questioning it. Does it fit our needs? Is it an overkill? Do we know how to use it? What are the tradeoffs?
Or try the latest hyped one from a talk at the conference, promising to solve everything.
Or simply allow feature-driven development, where there is no time to step back and look at what could be redesigned and refactored. When there is no true planning, architecture is random or a mix of a few randomly picked, loosely glued together, but somehow it works. It's not (entirely) non-technical managers' fault for making wrong calls when engineers could stop this madness. But it depends heavily on the organization's culture.

## Communication debt

The ignorance shown by managers at the airport is triggering. But possibly nobody from our guild has taken the time to explain it to them. We assume they are not interested in reasons, they will just complain a bit, and then we can come back to our cave and just fix stuff.

I'm a bit spoiled with having technical-aware managers and/or tech leads who were shielding us from higher-ups' ignorance. But I faced it from time to time. So I wonder, **how can we refactor communication?**

The most important thing that we as engineers can do is **be aware of the consequences of our decisions**. The more senior I get, the more long-cost decisions I see. Unfortunately, you mostly learn that from your own errors. Reading books, blogposts, etc. can give you some ideas but nothing leaves a permanent mark as making bad decisions and fixing their consequences.

There are tools to facilitate the decision process, like tech proposals (or other RFC documents). Ask the manager for insights, and understand their motivations. When a decision is made, put it in the Decision Log (ADR). It is for your own sanity, so in a few months, you can recall why you picked some framework, some library, or vendor and not the other.

Always assume the decision is made with maximum knowledge available for the time of making. You will know later if it was good or bad when new information comes. But it won't help the project to postpone everything until all risks and possibilities are known.

When you have an educated decision, communicate it to the manager if it may cause technical debt that will need to be paid off. Mention it daily, put a ticket in Jira to discuss during refinement, and don't let it die just in your head. You are building here the "ass shield" :) Manage your managers a bit.
There is no better feeling than pointing someone to the document or ticket that they approved when being blamed for it.

You can use ChatGPT to explain concepts or reasoning "like to 5yo" or "to people with MBA".

Plan implementation for the priority shifts. Even if project goals change, or there are pivots, etc. try to plan work so at any point there is some value generated. Even if it's paused halfway through. Or in the worst case, parts of the project can be scrapped without harming others. Use feature toggles, configs, and design patterns. That is a sign of good engineering when lots of code can be removed and users don't notice.

Nobody said it's gonna be easy.

## In the end

It doesn't even matter how well you communicate and plan. There will always be some misunderstanding between engineers and managers, and it's OK. **It's expected**, don't be surprised by it. It takes some extra effort to document, plan, and communicate, but I don't think there is another way around it.

Seniority in engineering manifests itself not by slaying every Balrog of technical debt you encounter, but by knowing which ones are worth fighting and which should be left dormant in their ancient caves. Sometimes, the best strategy isn't charging in with a "YOU SHALL NOT PASS" attitude, but rather carefully mapping the tunnels, marking the dangers, and making sure everyone knows where not to dig too deep and too greedily.

**Your manager will react differently on mentioning technical debt if you manage it well**. Working only on places that are worth fixing, are slowing you down, or are vulnerable. Demanding the time for refactors just because the code isn't to your liking won't make you friends, or make you look professional.

After all, technical debt, like the Balrog, isn't inherently evil - it's a force of nature in software development. Our job isn't to eliminate it completely but to understand it, manage it wisely, and know when to stand our ground.