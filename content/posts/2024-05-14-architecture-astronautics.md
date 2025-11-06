---
comments: true
date: "2024-05-14T00:00:00Z"
description: "Ever felt like your code is an engineering marvel, only to realize you overengineered and built the wrong thing? Or maybe you over-abstracted, blindly following instincts and so-called good practices? I surely did, and I want to share some thoughts on this topic. Let's explore a path toward more practical, sustainable software engineering."
image: posts/archastro.png
tags:
  - software architecture
  - overengineering
  - best practices
  - pragmatic programming
title: "Avoiding the pitfalls of Architecture Astronautics"
toc: true
url: 2024-05-14-architecture-astronautics
---

## Exegi Monumentum

> I’ve crafted software more lasting than bronze,  
> Loftier than pyramids, resilient and strong,

_Paraphrase of Horace's 'Exegi Monumentum' poem._

Have you ever felt that way about your code? You've just created a piece of engineering art, not just some working solution that meets the requirements. You didn't even look at the requirements, who needs them when you can focus on technology and architecture? Utilizing modern tech and approaches you've heard about at conferences and meetups. Following complex patterns and designs to handle the Facebook and Netflix scale of users and processes. Every concept is abstracted, so much, you don't even see the code anymore, just interfaces. Testable code, with injected dependencies, following DDD religiously.

While it sounds nice, you may be an Architecture Astronaut, as [Joel Spolsky](https://www.joelonsoftware.com/2001/04/21/dont-let-architecture-astronauts-scare-you/) wrote in 2001. You went so far up with abstractions, generalizations, and new flashy tech, that there is no oxygen around you anymore. Yup, this is nothing new. We engineers have always been like this to some extent.

> Software architecture is a set of decisions made for a particular product, shaping its form. Not just code organization, but the tools used, how they communicate, and where they exist.

### Visual aid

In the '90s, Poland saw a wave of new building designs. The communism period has ended, and we were opened for new, western technologies, materials, designs, and money to build somewhat interesting structures. Like this monstrosity:

![Solpol building in Wrocław, Poland](/assets/posts/solpol.jpg)
_Solpol building in Wrocław, Poland_

Over-the-top form dominates the function. It was demolished in 2022.
It looks like a toddler that just learned 3 basic shapes wanted to put all of them at the same time everywhere.
Reminds me of hype-ego-cv-driven overengineered software design.

On the other hand, we have:

!["Okrąglak" building in Poznań, Poland](/assets/posts/okraglak.jpg)
_"Okrąglak" building in Poznań, Poland_

It was finished in 1954. Simple form, repeatable shapes. Elegant. Still serves people (in a different role than originally) and it is a city landmark.
Just like simple, pragmatic architecture, that can serve its purpose for years, and is adaptable to needs.

## The pitfalls

As Architecture Astronaut, you take deep pride in your work and try to deliver a great piece of software. No doubt here. But in the process, you may lose sight of what and why you are building.

### Tool hunger and overengineering

You don't build software to use Kafka (put any other tool here), you use Kafka to provide better products. And you may not even need it in the first place. The same goes for every other tech, design pattern, and methodics. We often fall into bias, when we learn a new tool and now every place seems perfect to use it. The golden hammer, where everything is a nail. And while new tools often solve some problems, they come with a bundle of new ones you just haven't experienced yet. It's a hidden cost of using hyped technology. You know the term "cure worse than disease"?

Greenfield projects are especially vulnerable. After working on legacy code, you might be eager to try new fancy stuff.
Instead of the simple CRUD, you were asked for, you build a lofty bronze piece of art.
Pet projects can help release your unused creativity, and test new tools outside of work projects.
The sad truth about being a professional software engineer is that we rarely do interesting things. Or so it seems after some years of practice.

Using too many similar tools in a single project is also problematic.
Testing is a gray area. In Java/Kotlin it's not rare to see 3 mocking libraries in one project. Added because one could do something cool that others do weirdly.
Or Cucumber for e2e tests, because non-programmers can then write those, but they never do. You end up with additional tools to learn and maintain instead of having pure code tests using the same language everywhere.

Overcomplicating, overabstracting, and overengineering will make you an astronaut.
Expecting unforeseen use cases for your code, making it as generic and reusable as possible.
Or following "Clean Code" religiously can obfuscate readability.
Using modern but unnecessary design patterns adds useless layers of abstraction.

Having explicit boundaries between modules, and keeping dependencies between them straightforward is nice. But a simple app with 20+ Gradle modules, where half of them contain just 2 classes and an interface, is worth it. Especially when a simple change (like adding a field) is spreading across multiple modules each time.

Try onboarding a junior dev or intern into such a project.

> I've heard once about adding fake layers to the project, because after the initial solution was presented the client was under the impression that "this is too simple, it won't work in our complex situation". So the consultants designed a few pass-through layers so it looked more like the client would like :D can anyone confirm or deny this is happening?

### Big architecture upfront is a waste

In CS class, we designed software using some UML tools that generated code. The professor believed this was the future.
But 15 years later, I still write code, but I rarely see UML. Diagrams are useful for general concepts but not strict UML notation.

Designing the whole system first and coding it later was the old mindset. It probably made more sense when you had to put your code on the perforated cards, which was an annoying and time-consuming process. But now? With automated tests, debuggers, and refactoring tools?

There is a nice part of [The Primeagen interview with Uncle Bob](https://www.youtube.com/watch?v=UBXXw2JSloo), where they touch on this. Robert Martin would seem like old old-fashioned "design first" kind of guy, but actually, he is much more practical. He knows it doesn't work. What he does, is think about the problem to solve for a while and then start implementation.
And often implementation ends up as something different from the initial idea.
Big design upfront can't be right, because you don't know what you don't know.
Gathering all intel is time-consuming, and keeping everything in the context when designing is impossible.
Implementation will twist and bend the actual working solution into the frame of the initial design.

Your time is a resource. Building unnecessarily complicated architecture wastes it. Sometimes, MVP won't meet market needs and will be scraped.
[Minimum Viable Architecture](https://www.infoq.com/articles/minimum-viable-architecture/), answers: what is the minimum set of architecture decisions to make this MVP work now and scale later?
If you don't know you will need to work on a huge scale, why waste efforts supporting it upfront?

### Perfectionism

Combining all of the above and adding perfectionism you may never actually release a product. Constantly rewriting, redesigning, and reimplementing the ideal solution.
Discovering new requirements breaks the design.
You need to create a new, equally big upfront design.
Or even worse, production doesn't perform as expected, and you start over.

I was working as an Android developer, on the Backend For Frontend service, serving data from some ERP to the app. Glorified proxy as I called it :)
Service was simple, it had 3 layers: HTTP Controller, Service, and External API Client.
No DB, or any sort of persistence or cache (which was a mistake IMO).
At some point, I started to hate that the Service layer was throwing HTTP exceptions, rather than domain-specific errors, that later the HTTP layer would translate to statuses and error messages.
So I implemented a bunch of custom exceptions, handling them in ExceptionHandler (we used Spring), and I had to rewrite a few tests.
Effect? Well, it worked the same.
There was more code, but it was cleaner.
The service layer became so independent that I could even move it to an Android or desktop app using UI and not HTTP responses.

But from a time perspective, I think it was a waste of time, in a way.

The project had a fixed scope and was almost done.
The code was testable before and was tested.
So I minimized the already small cognitive load while adding indirect mapping of exceptions to status codes... which may raise the cognitive load.
I've created concrete boundaries between layers, so the code was more testable, while it was already testable.
I enabled moving code to other services or apps, while it was never going to happen.
My changes allowed faster and more secure growth of the service, while it was already feature-wise done.

And if I were about to do it now, I think I still would, but using Kotlin `Result` instead of throwing exceptions. Guilty as charged.

## Creating practical architecture

Well, every project needs some sort of architecture. Some decisions have to be made, some structure has to exist. Here are a few ways to approach it.

### Use familiar tools

The best tool for the job is the one you know best. Remember that [some dude made a 3D rollercoaster in Excel](https://www.youtube.com/watch?v=5IOB2NKTOS0). It might not be the ultimate best tool, but it was the one he knew most.

Pick whatever the team is comfortable with, not what is currently hyped.
I've heard about MongoDB used as relational DB, because NoSQL is cool and seems to be a good fit, but the team was familiar only with SQL databases.
If your team knows TypeScript well, maybe don't go with Scala or Lisp just because someone suggested it's great.

### Follow industry standards

When solving common problems, use common solutions.
Your problem is likely 95% the same as every other (CRUD, auth, logging, DBs, message queues). Use tools with good community support, most problems solved on StackOverflow, and decent tooling.
Experimenting with new technologies is refreshing, but don't experiment on every part of your system.
Even if the project is Proof of Concept, keep it focused.
Each problem may have multiple common solutions, narrow it down with team capabilities and...

### Define Architectural Drivers

Start from describing QARs, and finding the architectural drivers. Knowing what is important and what is not helps pick the right tools. Set requirements for security, performance, and reliability.

There are some more ideas about architecture design pitfalls in [this post](https://www.infoq.com/articles/avoid-architecture-pitfalls/)

I like to keep the design as minimal, obvious, simple, and flexible as possible. The more custom structures, naming conventions, and rules you put into your project, the more likely developers will diverge from the "ultimate" architecture design you've crafted.

## Conclusion

Crafting software architecture is a balancing act between innovation and practicality.
While it's tempting to dive into the latest tech and complex designs, staying grounded in the project's core goals is crucial.
Overengineering, tool obsession, and perfectionism can derail even the best intentions.
Instead, focus on simplicity, team capabilities, and actual user needs.

Remember, the best architecture serves its purpose efficiently without unnecessary complexity.
Stay pragmatic, use what works, and always keep the end-user in mind.
This approach not only ensures functionality but also makes your code maintainable and adaptable for the future.

---

What’s your biggest challenge in software architecture? Share your thoughts in the comments!
