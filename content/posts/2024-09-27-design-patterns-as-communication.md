---
categories:
  -
comments: true
date: "2024-10-13T00:00:00Z"
description: "'I did not study computer science to work with people’—sounds familiar? Well, I’ve got news for you: you’re still working with people, you just communicate not in the way you might think. Your code speaks volumes about your intentions and ideas. Design Patterns can amplify your coding ‘voice’ when used wisely."
image: posts/design-patterns-communication/dp-communication.jpg
tags:
  - design patterns
  - communication
  - software engineering
title: "Using Design Patterns as Communication Skill"
toc: true
url: 2024-10-13-Design-patterns-as-communication-skill
draft: false
---
## Hermits
The man, the legend once said "I did not study computer science to work with people", when asked to be present at a meeting. It's a popular slogan present on coffee mugs and T-shirts of software engineers. [At least in my country :) ](https://koszulkowy.pl/1708-nie-po-to-studiowalem-informatyke-zeby-teraz-pracowac-z-ludzmi-meska-koszulka-z-nadrukiem.html?search_query=informatyke&results=3)
Are meetings and calls the only way we, engineers, communicate? If we limit those to the bare minimum, work like hermits in our basements, do not answer Slack messages or emails, and do not write any documentation, there is one way we do talk to each other, that we won't get rid of. **It's code.**

Line by line we lay down our intentions and ideas. We usually work in teams, so we must be clear to others (and our future selves) what we mean to do. Programming languages are fairly structured and limited to only those words that are required for performing commands. But often we need more than that to express more complex ideas. We need patterns. Code structures that are built with programming grammar but expressed in a higher abstraction layer than bare code.

### What are Design Patterns?
When my wife asks "What's for dinner?", she doesn't need 10 minutes of recitation of ingredients and how I will make it eatable. My cooking intention would be clear to her after just saying the dish's name.
Design Pattern name or shape should tell other developers enough intention details. The point of the Design Pattern is to provide a common vocabulary and structure for common problems. It's called a pattern because it is repeated, in multiple projects and places. So when I see a Builder, I know how to use it. When I see a Factory, I know what it does. So let me cook.

All patterns have names, but do you need to know the name and encyclopedia-like definition to effectively use it? Are all patterns equally valuable in all technologies? Is the [Gang Of Four design patterns book](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) from 30 years ago everything you need to know or is it obsolete? Can you overuse patterns?

## My take

I personally enjoy learning about patterns. I did a [series of articles](/series/kotlin-design-patterns/) implementing classical Gang of Four patterns in Kotlin. Triggered, by a conversation I had in a workplace, where a colleague claimed there is no need to use the `Builder Pattern` in Objective-C, while in Java it's everywhere.

How do other patterns hold today? It seems that after 30 years our modern languages are solving multiple issues that used to be solved by using patterns. Or we learned that using some patterns makes code less readable, more verbose, hiding logic in the wrong places, and it's better to not use them. Finally, we learned how to divide problems into smaller chunks, modules, deliverables, and microservices. So even a messy codebase in one place has a smaller influence on the whole system.

### The Builder's case
Let's zoom in on the Builder pattern. It's used to always create a valid object instance, with potentially multiple fields that have to be set. Some fields may depend on other fields. We don't like big constructors. We don't want to pass the same values every time if we need eg. 2 objects with a single field difference. Doing so is error-prone, and hard to detect during PR with huge blocks of constructor code.
Builder solves it, by providing structure related to the created object, setting fields to default values, and exposing methods to set all settable fields with optional values. Cool.

Well, Kotlin has named arguments with default values, so... I don't find the need for Builder. The same result is achieved by using the constructor.

Objective-C is using initializer methods (or something, IDK).

GoLang has an interesting take on this problem, its called `functional options`, where functions setting fields are optionally passed to a factory method. I saw this pattern in [this video](https://www.youtube.com/watch?v=MDy7JQN5MN4) where the author admits, that he doesn't know the name of it. Someone in the comments helped.

And it got me thinking...

### Do we need to learn patterns from books?
Or can we use them, instinctively? Monkey see monkey do, as I write my Typescript code :) I often notice some structure in the code written by other developers, can understand why it exists and what problem it solves, and start using it to solve similar problems. I do a little research on it, but that's post-factum. Patterns often communicate intentions so well, that can be used without studying too much.

**But there is a catch.** It does require experience with using various patterns, causing and solving multiple code issues, actually reading books and articles, and having some opinions on your own to do it that way. Otherwise, there is a danger of mindless coping code here and there and praying for PR to be approved, and not causing more issues than solving.

It is worth knowing a few commonly used patterns from the GoF book, but not all of them. The useful ones in any technology would be **Strategy, Factory, Command, and Facade.**
Others are optional, or currently useless, or plain dangerous and disliked.

Long IF or SWITCH statements are eye-sore but less confusing than solving simple problems with convoluted object hierarchy. Especially if it is rarely revisited, changed, or updated.

I've never created in a production code Abstract Factory, Interpreter, or Visitor. You may say, that I didn't work with complex enough problems. And that would be true. I was usually doing some variant of CRUD with presentation logic. And I'm not special. **You are not special**. Most projects are not special. So I like to think, not that my projects were simple, but that **I didn't add additional complexity**. It is a common flex of software engineers. And trust me, I have a tendency to overengineer :) Or maybe it's just Post-Fintech-Stress-Disorder.

### Enterprise patterns
So far I've talked only about "small" patterns in code, single or few classes or functions creating some structure. Software Engineering is a broad field, where you can work solo or in a team, in a small company or global megacorp. And there are patterns for each level of communication challenges. Solving issues between services or entire systems. Described in [books like this](https://www.amazon.com/o/asin/0321200683/ref=nosim/enterpriseint-20) that I have not read, and maybe will never need to.
Another examples are Martin Fowler's [Patterns of Enterprise Application Architecture](https://www.amazon.pl/Patterns-Enterprise-Application-Architecture-Martin/dp/0321127420/ref=zg-te-pba_d_sccl_2_2/258-7091817-8921600?pd_rd_w=WHKsM&content-id=amzn1.sym.51352be5-b545-4b4a-9087-316ea981b81f&pf_rd_p=51352be5-b545-4b4a-9087-316ea981b81f&pf_rd_r=2ZG69WVW2GQ7T0VRC4C3&pd_rd_wg=4enUw&pd_rd_r=9c530356-4275-4f9e-90ac-24f15c51932a&pd_rd_i=0321127420&psc=1) and [Analysis Patterns: Reusable Object Models](https://www.amazon.pl/Analysis-Patterns-Reusable-Object-Models/dp/0134186052#customerReviews). The [Enterprise Patterns and MDA: Building Better Software with Archetype Patterns and UML](https://www.amazon.pl/Enterprise-Patterns-MDA-Building-Archetype/dp/032111230X) is also being suggested in that field.

With that caliber of patterns, I don't think there is a way around without reading books and articles about them. They are typically way too complex to just copy-paste without deeply understanding the problem and consequences. And making the wrong choice at this scale will be expensive.

### Archetypes
We engineers like to think we need to invent the wheel every few months. This is why we have so many JS frameworks. But the reality is **we are using those wheels to create similar vehicles** each time.

When building a scheduling system, someone probably did that already. Hotel reservations or some other availability problem sounds like known to humanity and solved multiple times until now. There are books with models called Archetypes, that contain generic data structures that exactly fit those kinds of problems. With some adjusting, bending, and twisting you don't have to reinvent the solution. There is ongoing work to implement some archetypes [here](https://softwarearchetypes.com/).

## Code quality
There are some studies around this topic, and I did briefly read a few. The usual conclusion is, that there is some sort of correlation between using Design Patterns in the project and a smaller number of code smells. And that it's hard to measure this topic reliably. Code smells are not yet errors or bugs. They show potential to be problematic and could be implemented better. What does it mean "better"? Whatever is agreed as a good practice in a particular situation.

**I think that fewer code problems, when patterns are used come from better communication, or better coding skills and experience of the people who know patterns, compared to those who don't. Correlation, not causation.**
![Weird correlation chart](/assets/posts/design-patterns-communication/correlation.png)

## Consistent Pattern Set

Having a consistent set of patterns shared inside the codebase makes reading and writing code faster. If you start mixing programming paradigms (object, functional, reactive), and adding new style patterns to address issues that are already solved another way, you will make reading code slower, and you will surprise the reader. That is making communicating the intentions worse, introducing gray areas for bugs to pop.

Each generation, each subculture will use their own slang, and it's still all within the same official language boundaries. If you put GenZ Rizzer, 80' punk, elder old money snob, and soccer mom in 1 room, they may have communication issues, even if they all speak English. Same with putting patterns from different worlds in the same project, without thinking too much "Is it the right solution for the problem, **in the context of the existing codebase**".

## Patterns Antipatterns?
Obviously, patterns can be misused. Like whatever Spring did [here](
https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/aop/framework/AbstractSingletonProxyFactoryBean.html) with `Class AbstractSingletonProxyFactoryBean`

### Hold your horses
When I learned about the command pattern, I started seeing the use of it everywhere. I mean EVERYWHERE. **I had a golden hammer, and every screw was suddenly a nail.**

I used it in some pet Android projects, worked well. It was way before the RX era. I had to figure out how to refresh the data on display after the command was done. I went through a few concepts, did some research, etc. As a result, I used some sort of CQRS before I knew what it was. Valuable experience, but it doesn't change the initial bias I had.

We often fall into this trap with every new shiny piece of tech we learn about. It's cool to experiment, but the older I get the more conservative I am, and I like to understand the consequences of it before I invest my time into it.

### Don't reinvent the wheel
Everyone knows what a Builder pattern is. [Just like everyone knows what a horse is](https://www.youtube.com/watch?v=s35n-eaqwTE). Don't do something like
```kotlin
class Product private constructor(creator: Creator) {
    val name: String = creator.name
    val price: Double = creator.price

    class Creator { // fancy builder
        var name: String = ""
        var price: Double = 0.0

        fun setName(name: String) = apply { this.name = name }
        fun setPrice(price: Double) = apply { this.price = price }
        fun create() = Product(this)
    }
}

// Usage:
val product = Product.Creator()
    .setName("Coffee")
    .setPrice(2.99)
    .create()
```
Implementing a well-known pattern but naming it differently just for the sake of it, or because you didn't do your research. There are a lot of patterns, I know. Sometimes, like I mentioned, you don't even have to know their name, but just the structure. But don't reinvent them, rename basic parts and confuse people reading them later.
Other examples could be `BobTheBuilder` or `FactoryGirl`.

### Abusing patterns

Everything can be a poison, it's the dose that kills.
![OOP makes everything unnecessarily convoluted](/assets/posts/design-patterns-communication/chart.png)

The hardest thing is not to know all the patterns, it's to **know when to use them, and when not**. Popular patterns make code easier to extend in the future, giving you building blocks so you don't have to think too much about it, just focus on the value you are adding.

But if you work solo, and won't need to extend the code later or maintain it for 20 years... [Undertale game dialog system is a single switch statement with some nested IFs](https://www.reddit.com/r/programminghorror/comments/1exqik2/undertale_dialog_system_is_one_giant_switch/) And it made $45.1m on Steam with 96.7%
positive reviews. It wouldn't be 100% with clever use of design patterns. It could be never released, if the author focused more on technical excellence than on the fun the game should bring.


## Conclusion
As a software engineer, you may want to be a hermit and limit verbal communication with people. Sounds mentally unhealthy, but you do you. You will communicate with others using code anyway. 

So make it nice, readable, and understandable. Use common patterns, and understand their traits and consequences. Try not to abrupt the existing codebase ecosystem with clever ideas that just don't fit. Be strategic in planning implementation and making abstractions. 

Ultra-generic flexible solutions often end up handling one thing in a corner.
