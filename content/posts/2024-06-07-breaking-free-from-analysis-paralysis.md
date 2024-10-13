---
categories:
  -
comments: true
date: '2024-06-07T00:00:00Z'
description: >-
  Ever felt overwhelmed by endless choices when starting a new project? Join me
  as I dive into the chaos of backend development, battling analysis paralysis
  and procrastination. Discover how I learned to focus on building rather than
  endlessly researching, and find tips to keep your own projects on track.
image: /assets/posts/analysis-paralysis.png
tags:
  - procrastination
  - backend
  - project
title: Breaking Free from Analysis Paralysis
toc: true
url: 2024-06-07-breaking-free-from-analysis-paralysis
draft: false
---
## Pet project

Ever found yourself paralyzed by endless choices when starting a new project? I recently did, and it all began with binge-watching way too much [ThePrimeagen](https://www.youtube.com/@ThePrimeTimeagen/featured). Inspired, I decided to learn GoLang, thinking it would be the perfect next step for my half-baked Vim skills. I had this pet project idea simmering for months, and GoLang seemed like a solid choice for the backend. But as I soon discovered, the journey from idea to implementation is riddled with obstacles, especially when you’re not a seasoned backend developer.

## Paralysis

There are a lot of questions when working on the backend:

- Where to host it?
- What DB to use?
- How will I use Kafka with it, and where to put the AI engine and blockchain?

I started by creating a new project in Todoist (no way I’m using Jira for a pet project) and started adding tasks: set repo, write hello world app, add REST API endpoint, set CI, deploy... to where?
I do have a VPS that I sometimes use for pet projects, but it’s not an all-in-one solution, more like a remote Linux I can run things on. I need to host the DB somewhere, have monitoring and alerting, a notification service, a messaging queue… I don’t want to do it all. I don’t know how to do it all. What’s the point of even starting a project when I don’t know the basics?

Let me start googling for…

## Service Vendors

There are three standard choices: AWS, Google, and Microsoft, which provide all possible services out of the box. I used AWS, and I don't like it, no particular reason, just the look and feel. Google, as for an Android dev, looks familiar to me, but Google can kill the whole platform next week, I'll pass. Microsoft seems nice, and we use it in our current work project. Is it a good choice? I don’t want to be vendor-locked from the very beginning of the project. Or regret the choice, migrate to something else…

> "Do you pine for the nice days of minix-1.1, when men were men and wrote their own device drivers?" - Linus Torvalds

I won’t be writing my own DB, and I don’t even want to host and administer it. I don’t want to write my own OAuth or keep users' data. I need 3rd party vendors: Firebase for notifications, an OAuth provider with SDKs for mobile and web, and a DB provider.

Which DB to use? There is about a gazillion of those, in various paradigms. Later I may need an event store or message queue. Even more, decisions to make.

![Stop it, get some help](https://media1.tenor.com/m/mZZoOtDcouoAAAAC/stop-it-get-some-help.gif)

## Stop it, get some help

What am I doing here, I simply want to build an app.

For now, I decided to screw all this and build it locally as much as possible. When I'm satisfied with the results, I’ll happily pay someone to figure out how to put it online. I can go pretty far with the Docker Compose setup I made in 3 minutes. **And it works on my machine**. Good enough for the next few months :)

I’ve spent way too much time trying to find the best hosting/DB. And even more when trying to make it work. Comparing free/paid plans, calculating how much horsepower and space I will need. Going through tutorials, YT videos, and setup guides.

I don’t even have a concrete plan of what and how I want to implement it yet. But I’m burning time finding a nice place to put it online. There’s like a 95% chance it won’t even leave my computer. And it’s still gonna be worth it if I learn a new language or other tech.

But I don’t. I want to build an app, not fiddle with infra. **Infra is my kryptonite.**

It’s easy to fall into flashy vendor websites after attending meetups and conferences where their logos are omnipresent. It’s not a bad thing, it’s business.
But it obfuscates the true need I have. I want to build a working software solution and have fun learning new tech along the way.

### Procrastination

Since I don’t know the language well or have a concrete app design in my head (or documented like an adult), it’s easy to escape into googling all possible tools I may or may not need for this project. Doing endless research rather than working on the project itself. The project is doomed to fail that way. I’m losing my motivation momentum on comparing `Azure` to `Digital Ocean`. My app should have a working API, data models, and DB collections by now. Or at least a directory structure. Having a high-level design wouldn’t hurt.

But no, let’s compare OAuth providers when I don’t even have endpoints.

How is it that when I write code, I divide the problem into smaller pieces and conquer them one by one, but when I’m about to start a whole new greenfield project, I fall into this trap? I try everything new at once, losing sight of the actual problem I want to solve. Is it that when working in a team, other devs are subconsciously holding my horses, before I go too deep into details? Or I feel more responsible in my daily job, while a pet project may never be finished, and it’s not there to earn any money (so it should cost little to build).

Maybe I should change my approach and treat a pet project seriously. As an investment. Plan it better, and see potential future income. But will it be fun and a learning experience or just another job?

It’s hard to merge those two faces of software development. One where I’m being paid for doing my job, which may not always be fun and joyful. And the other, where I don’t have to be paid, but I need to have fun. I will enjoy it more when the thing I’m building works and even has users. But ultimately, it’s the journey that matters in pet projects.

Starting the journey with options paralysis is often its end.

### Oops I did it again

While writing this post, I decided to test a few writing apps. I mainly used [iA Writer](https://ia.net/writer), but I also downloaded [Paper](https://papereditor.app/), [Ulysses](https://www.ulysses.app/), and [Scrivener](https://www.literatureandlatte.com/scrivener/overview). Distraction-free writing is amazing. I can configure my Vim and Obsidian to look and feel similar. Wait… What am I doing?

Instead of writing this post, I was doing tutorials and watching comparisons between writing software.

I did it again. The same thing I did when starting the backend project.

Is it procrastination that drives me more into simple, non-measurable tasks, like “doing research” and “checking out tools” rather than doing real work? It reminds me of when I had exams and suddenly house chores became exciting.

How to escape that?

## Tips

I came up with a few tips to help me stay focused:

- **Start Small**: Begin with a minimal viable product (MVP) to avoid getting overwhelmed.
- **Set Clear Goals**: Define specific, achievable milestones for your project.
- **Use Local Development**: Focus on building and testing locally before worrying about deployment.
- **Leverage Simple Tools**: Use straightforward tools and services to avoid decision paralysis.
- **Time-Box Research**: Allocate a fixed amount of time for research to prevent endless comparisons.
- **Iterate Quickly**: Regularly review and refine your project to maintain momentum.

This should help me keep motivated and make progress. With just a slight scent of pet project being another job :)

## Conclusion

I think I’ve made the same mistake multiple times in my life. It starts with a pet project idea, but instead of working on the unique part of the solution, I dive into checking tools for the most commonly solved problems. I want to pick the best one while having zero experience with the topic, and I’m scared of making a wrong decision. Selecting the wrong tool would feed my Impostor Syndrome, and destroy the joy of creating something cool.
Later I started to think that picking ANY tool would be just fine, and I wasted hours. I’m losing the creative urge to build something; the momentum was wasted on useless work, and I’ve built nothing. And I’m already tired.

I hope that noticing my tendencies and acting on them fast, using the tips I put above will save me from doing it again.

Have you been there?

