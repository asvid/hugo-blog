---
categories:
  -
comments: true
date: "2026-01-28T00:00:00Z"
description: "Most software teams are split up by technical layers—backend, frontend, and mobile. This seems logical, but it often creates bottlenecks, delays, and frustration. Mission teams flip the script: cross-functional developers own features end to end, from idea to release. This approach speeds up delivery, builds real ownership, and cuts down on endless handoffs. Too perfect to be true? It demands more upfront effort in communication and shared knowledge, but the payoff is worth it."
image: posts/mission-team.jpg
tags:
  - team work
  - cooperation
  - career
  - communication
  - agile
title: "Bomb the Silo From Inside: Why Mission Teams Work"
toc: true
url: 2026-01-28-mission-teams
draft: false
---

Most software teams are split up by technical layers—backend, frontend, and mobile. This seems logical, but it often creates bottlenecks, delays, and frustration. **Mission teams flip the script: cross-functional developers own features end to end, from idea to release.** This approach speeds up delivery, builds real ownership, and cuts down on endless handoffs. Too perfect to be true? It demands more upfront effort in communication and shared knowledge, but the payoff is worth it.

> I heard `mission team` term first from Moritz Wilfer at Payworks

## The bottleneck problem

Early in my career, I was the lone frontend developer supporting a squad of four backend engineers. Unsurprisingly, I became the bottleneck. To keep the wheels turning, I taught them how to run the frontend app and make simple tweaks. Features kept moving forward, and I could polish things up later. It was a scrappy solution that kept us afloat until reinforcements arrived.

Even though we used PHP for the backend and JS for the frontend, cross-functional development still worked. Some backend developers liked seeing visual feedback and got a better sense of how their API design affected the frontend.

## Mission team pattern

Much later, I joined a team as an Android developer that was called 'the mission team.' **We had backend developers, iOS, and me for Android. We were responsible for adding new features and making sure we met new market requirements on our own.** Each of us had our own area of expertise, like mobile SDKs or the core backend service. But to deliver what was needed, whether for legal reasons or other needs, we often had to work across the whole system, including services owned by other teams.

The goal was for us to work independently, without taking too much time from other teams. They had their own work and priorities, and might not be able to help when we needed it. Timing was usually critical.

And it worked, thanks to careful planning. We had a rough plan for each quarter, clear sprint goals, and reviews every two weeks. **This setup takes effort, but it delivers faster results, clearer accountability, and more flexibility than layered teams.**

For example, we knew we needed to add an enum and a short method to one service in the next sprint. This let us finish a whole feature in two sprints and hit our quarterly goal. It required a good understanding of how our whole system worked, and the learning curve was steep, especially in fintech. But with that knowledge, we delivered many complex features on time. Often, these features were just a few lines of code in different places, like adding a new card transaction type or generating configs for terminals, all while keeping things secure and backwards compatible.

When I say 'we had our own field of expertise,' I don't mean we owned it completely. We just knew those parts best, unlike some of the satellite services, which we only understood in a general way. Since we used Java and Spring everywhere, all the services looked similar, so it was easy to ignore the framework code and focus on the domain.

Many teams contributed to the core service and SDK. In fact, I think every developer in the company had committed something to the core service. The SDK was just for mobile developers, but since we had several mobile teams, there were still many contributors. Each team owned a part of the project, and an architect helped guide its direction. We held guild meetings to sync on ideas, refactoring, and needed changes.

## The silo consequence

Being part of an effective mission team was a much better experience than my earlier jobs with the classic layered approach, where managers had to sync projects, align tasks, and coordinate features across teams.

But that approach never really worked.

I once worked where backend, frontend, and mobile devs sat close, juggling ongoing projects and demos that depended on backend support. Coordination across teams was weak. As a result, crucial discussions often stayed isolated, and mobile frequently got stuck with APIs designed for the web, missing backward compatibility—critical for users updating at their own pace.

**Two mobile developers once found out during a coffee chat that they were building the same thing twice for different projects because of poor communication, even though managers were sitting nearby.**

Smoke breaks unexpectedly became a way to share information across teams, since there weren't good official communication channels.

There were many reasons for this situation: poor communication skills, bad team organization, lack of transparency, and no single mobile architect to connect the teams.

## The hero manager trap

At another job, my manager handled all the sync work, meetings, and task prep. Developers had it easy—we just picked a task with a clear description, and any issues with other teams were already sorted out. As convenient as this was, I felt disconnected from the project. I was more of a code monkey than someone with real ownership.

One manager can only do so much; it doesn't scale, and working 14 hours a day isn't healthy. If some meetings and sync work were shared, the risk of project delays would go down. You know the bus factor rule.

A previous manager encouraged us to take the lead on features or epics. Everyone became a specialist and owner of part of the work, but no one person was a single point of failure. I grew to like this approach, even though leading isn't really my style. Later, I missed it when all I had to do was pick a task. **This way, the manager could lead several teams by focusing on unblocking us instead of micromanaging.**

## The tradeoffs

Empowered feature teams don't come cheap. There are challenges, like scheduling sync meetings, setting boundaries, team collaboration, and engineering maturity.

From my experience, mostly Android SDK work, merge conflicts were rare because we had our own areas to work in and kept PRs as small as possible, using feature flags extensively. We just couldn't afford 10k lines of changes after 3 weeks of work in the cave. Nobody would even read this - rightfully so. After a few days without rebase, it would be based on an out-of-date codebase anyway, so good luck solving conflicts.

Releasing the SDK wasn't as dramatic as releasing a new backend version. Our CI built a jar, and we published it on our page. Sometimes, teams introduced flaky tests or bugs that delayed releases for others. At some point, a release train procedure was being introduced to avoid these issues.

With the backend and multiple services, we had to juggle things. Ideally, all services would be independent and could be released separately, but that's not how it works in reality. We had to deploy them in order or at least in sync, and then update flags.

The way we organized our work and cooperated with other teams was impressive, but it took time to reach that point.

We had to understand the whole system layout, not in great detail, but more or less who to talk to, to get things done in some area. Without using a black market approach([as described in this book](https://www.goodreads.com/book/show/49828197-the-software-architect-elevator)).

We had to plan ahead and know what we needed to do. That way, we could give other teams a heads-up: 'Hey, we need to add this and that next sprint, and we'd appreciate some support and a code review.' Usually, it only took a few minutes of their time to review code, plus maybe a quick ad hoc huddle or pair programming. Nothing dramatic, and no managers needed.

Here's what we managed to avoid:

You'd have to create a ticket on another team's board. Then, managers would talk to each other to prioritize it. There would be pushback because everyone is busy and already has work planned far ahead, so squeezing in a new enum or a quick fix is tough. Even if the other team started the work, they wouldn't have context, know the impact, or have much incentive to do it quickly or well, since they have their own priorities.

And we would wait, and wait, and ping them, and wait, and then ping some more, and then threaten to kill their cat… wait, that was before AI. No threats, HR was looking. We were nice to each other.

We'd get blocked by another team that didn't understand what needed to be done or why. Then we'd have calls to explain, everyone would get frustrated, and the feature would be delayed.

Then, a bug would show up because someone guessed the requirements when creating a ticket on another team's board. Both teams would have to debug their parts, probably asynchronously at first, then together, and maybe play the blame game. **After that, you might just want to Google how to become a beekeeper and never look at the code again.**

It's a waste of time and people's potential.

It was much faster to get some space and do the work ourselves, even if we had to learn about extra services first. We were in control and made the decisions. Cooperation was still important, but it was up to us to handle it, and we didn't fully depend on other teams. We needed their support and help, but not their actual work. This approach worked well for small changes, but if we had to rebuild a large part of someone else's service, it wouldn't go as smoothly—and we shouldn't be doing that. For us, those services were building blocks we might tweak or add to, but the main structure stayed the same. The owner team was responsible for major refactoring and guiding the service's direction. We could add or change things within the existing framework, but we were guests and needed to respect the owners.

**Resist the urge to be a good Boy Scout by refactoring an unfamiliar codebase when you're only supposed to make minor changes.** There are stories of people who tried that and [ended up wasting a month because they got lost in refactoring an unknown project](https://medium.com/lets-code-future/refactoring-15-year-old-code-everything-i-broke-in-3-weeks-675570209c51). It's better to leave that to the maintainers.

Of course, my own changes sometimes blocked or conflicted with other teams' work. That's why we have guilds. **It's not just encouraged—it's required to be proactive about planned changes that might affect others and to let people know well in advance.** Use open documents, tech proposals, or Request For Comments. Share updates on guild Slack, email lists, or even Teams. Remind developers at the next sync meeting. Add reviewers from other teams to the pull request and make the needed changes.

And sometimes, you'll still hear complaints that they didn't get the memo. Some people just can't be helped.

I was part of the mobile developers guild, but I sometimes worked on backend features too. Did that mean I had to join the backend guild? No, because we had backend developers on the team who could guide me on my tasks while focusing on their own work. That way, they weren't a bottleneck when most of our work needed backend changes. Sometimes, roles switched, and they worked on the mobile part with my help, just like in my first example.

## Why it's worth it

Building a silo and protecting it from outside interference slows down development and creates unnecessary tension between stakeholders. Still, it can feel like the natural way to work. **Changing mindsets and culture is much harder in organizations than making technical changes.**

This kind of setup brings new challenges. Who handles end-to-end QA? Who controls or blocks releases? There's no single answer—it depends on the organization's structure and specific issues. You'll make mistakes and wrong decisions when changing team cooperation policies, but that's part of progress.

I'm biased by my own experience, but I saw this approach work well in a complex, regulated, and time-sensitive environment. I believe it can work anywhere. My mission team was cross-functional but it doesn't have to be, not all features need UI or client apps, but may stretch across multiple backend services.

If you work on a client-side app, you probably know the backend service API well. How hard would it be to add a new field? **Be curious, ask a colleague from another team, and get it done before the manager even replies to your email.**

A platform guild helps teams coordinate planned maintenance and refactoring, so important or urgent work by other teams isn't blocked.

**Empower people to do their jobs instead of waiting for someone in the 'ivory tower' to prepare detailed task descriptions, requirements, screens, and flows, while managing complex features at every level.**

Not all teams are mission teams. For mission teams to succeed, you need platform teams to support them and hybrid teams to deliver business features, while also making room for fully feature-oriented teams.

Then you can benefit from true cooperation, without a whole manager-orchestration-ticket-golem being involved. Allowing other teams to step in and change stuff under the main repo owner's supervision reduces a lot of planning and work, syncing with the repo owner team, and allows features to be brought in faster.

---

## References

Hohpe, G. (2020). *The Software Architect Elevator: Redefining the Architect's Role in the Digital Enterprise*. O'Reilly Media. Chapters 30-32 (Part IV: Organizations). Available at: https://www.goodreads.com/book/show/49828197-the-software-architect-elevator

Ozcay, D. (2026). *Refactoring 15-Year-Old Code: Everything I Broke in 3 Weeks*. Medium. https://medium.com/lets-code-future/refactoring-15-year-old-code-everything-i-broke-in-3-weeks-675570209c51
