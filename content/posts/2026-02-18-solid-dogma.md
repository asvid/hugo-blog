---
categories:
comments: true
date: "2026-02-18T00:00:00Z"
description: "I find myself with a fresh golden hammer in hand every now and then, only to realize a screw would've been better. Following principles blindly doesn't automatically render 'better code'—there are always tradeoffs, and managing them is a sign of seniority and actual craftsmanship."
image: posts/solid.jpg
tags:
  - software engineering
  - best practices
  - design patterns
  - career
  - pragmatic programming
  - rant
  - personal development
title: "Do You Want to Learn About Our Lord and Savior SOLID"
toc: true
url: 2026-02-18-solid-dogma
draft: false
---

I woke up with the flu, felt adventurous, and, for a while, wanted to disrupt things. So this one is going to be about not praising the SOLID principles.

There are no rocks that you could hide from this acronym. Doesn't matter what technology, languages, or frameworks you use. But maybe it should?

Quick reminder, the acronym stands for:

- **S**ingle Responsibility Principle (SRP)
- **O**pen/Closed Principle (OCP)
- **L**iskov Substitution Principle (LSP)
- **I**nterface Segregation Principle (ISP)
- **D**ependency Inversion Principle (DIP)

You would be right to connect it to Uncle Bob, but he just wrapped it into an acronym; those rules have been around since 70. Again, **there is nothing new in software engineering since 70, change my mind.** I will wait here with hot cocoa while sneezing.

This whole post was triggered by a fantastic conversation between Kevlin Henney and Daniel Terhorst-North exploring whether clean code is a myth or timeless truth[^6].

> Although the phrase "clean code" itself does not appear in the 1974 book The Elements of Programming Style, Kernighan and Plauger emphasized the importance of writing programs for readability and maintainability, principles that later became central to the concept of clean code[^1]

Robert C. Martin did take the principles he had used for years and imposed on himself the role of Moses with tablets of rules, writing "Clean Code" in 2008[^2]. Which is a book you get suggested as a junior developer from the mid-senior one, that you praise like a gospel at first, get annoyed with it later, like with that overly spirited art teacher, and find it's detached from reality and unfitting for actual projects.

> **Don't get me wrong - I own Clean Code, I've read it, and I learned from it. Uncle Bob did valuable work collecting these principles. The issue isn't the book itself, but the religious adherence it inspires. It's a field guide, not scripture.**

Clean code contains rules like the maximum function length, which originated from the size of displays at the time - but don't quote me on that. 

Or, strictly speaking, passing booleans into functions is forbidden: if you pass a boolean, you need 2 functions and call the right one according to the boolean value. 

Or that, ideally, you would have a function that reads like a story, with few calls here and there, all well-named methods, clean with no side effects, going like:

```kotlin
fun suchFantasticFunction(aSingleArgument: String){
 val response = whatADayToBeAlive(aSingleArgument)
 pleaseLogItOut(aSingleArgument, response)
 myJobHereIsDone()
 letsWrapItUp(response)
}
```

I was that junior trying to write like this. And it's amazing at first, super annoying after a while, and not effective after 2 months of having millions of 3-line functions calling other functions that call other 5-line functions just to see… each one also calls 3 short functions. Those loose connections are then moved to files, modules, etc., and get spread out, even when used together, because some methods feel like 'util' and can be used later in a different context. So let's make everything nice and generic. Watering down the whole purpose for which it was created in the first place. 

**Have you ever opened up a project and tried to trace the call stack through a maze of tiny, abstracted functions, only to forget where you started?** Did you ever find yourself burrowing through folders and files thinking, "Surely there's one place where these all come together,"—but there isn't? If you've wrestled with this kind of code jungle, you know the pain I'm talking about.

And after having millions of those nice, short, generic, reusable, testable methods, a new guy (or gal) comes in and starts writing their own, because they didn't spend 3 months learning all the existing 'utils'. You, the one developer who never wrote a util function just to be reminded on codereview that one already exists, you can throw your stone now.

Clean Code and SOLID were created with object-oriented programming in mind, so are they useless for scripts and functional programming? Do we have a dedicated list of rules for those? Or is it more about adjusting which principles matter most, rather than inventing everything from scratch? 

Personally, I think most of the core ideas can still apply, but often need a shift in emphasis rather than a total replacement. Common sense and context-aware choices might be enough, and sometimes, thanks to their constraints, functional or scripted codebases almost self-organize anyway.

But you may wonder: are there alternatives?

## CUPID

While SOLID is a lumberjack-level manly man demanding you follow safety code or you get hurt and die under a falling timber, CUPID is all nice and fluffy, a chubby little guy that wants everyone to be in love.

And it's a bit of a joke on SOLID, actually.

Again, it's nothing new, just wrapped into a nice acronym. Backronym to be fair. The 'CUPID' was first, and then Daniel Terhorst-North started to think what words it could actually describe[^3].

- **C**omposable (plays well with others)
- **U**nix philosophy (does one thing well)
- **P**redictable (does what you expect)
- **I**diomatic (feels natural)
- **D**omain-based (models the problem domain)

Isn't it nice?

But is it any different, actually?

They both want us to make code that is maintainable. Some say **SOLID is like pregnancy: you can't be 50% SOLID; it's all or nothing.** This is when you see people creating millions of interfaces with a single method, and composing their abstract classes with them, within a complex inheritance tree, because you know - SOLID. Or creating interfaces everywhere, when all of them have a single implementation, because you know - good practices.

More boilerplate than actual code.

What does 'predictable' mean in CUPID? How to measure it? How can I make it a KPI so my annual bonus depends on it?

Well, if you name your method `generatePdf()`, maybe it shouldn't modify the database. It feels fishy; something is off.

Imagine this mess:

```kotlin
fun generatePdf(invoiceId: Int) {
    val invoice = fetchInvoiceFromDb(invoiceId)
    val pdf = pureMagic(invoice)
    val userConfig = getUserConfig(invoice.user)
    val sendEmail = checkEmailPermissions(userConfig)
    if (sendEmail){
        sendPdfByEmail(invoice.email, pdf)
    }
    invoice.markAsProcessed()
    updateInvoiceInDb(invoice)
}
```

Looks innocent, but suddenly, asking for a PDF accidentally updates your database, checks user preferences, and sends an email. And not even return the pdf. Predictable? Not so much.

Now compare that to something like:

```kotlin
fun generatePdf(invoice: Invoice): Pdf {
    val pdf = pureMagic(invoice)
    return pdf
}
```

Here, you give the function everything it needs. No hidden fetches, no side effects. Calling it does what it says on the tin. Predictable.

Could it read from the DB, with an injected connection pool? I'd say no, let's just give it all the static data to generate the PDF. 

Should it have 150 arguments passed in when generating the PDF? Nope, let's have an object with those arguments organized, using domain-language naming conventions. 

Should it be tested through and through using 1547 edge cases? Depends: if this PDF is your money maker and it's used billions of times a day, you want it to work in all cases. If it's used by 3 people twice a year, internally, and sometimes one column gets border cut by the page margin - well, I could live with that.

And this is how to use CUPID. Composable function, doing one thing well, predictable outcome, and no surprises with side effects inside, feels natural to use - you pass stuff that gets onto pdf, and is using domain-based names and models.

## Habitable Code

CUPID wasn't the first way of having fluffy principles, describing the overall vibe of the code rather than giving a SOLID prescription (pun intended). Richard Gabriel coined the term 'habitable code,' describing how it's comfortable for developers[^4]. It focuses on experience and emphasizes human understanding in software design. It is very vague by design. 

With some experience, you know which parts of your project are 'less habitable' than others. The parts that are scary to change, the parts you need to spend 2 days reminding yourself what is going on. We don't want to be there. **It's easier to spot the unhabitable code than to pinpoint the actual issues. The issues are rarely 'not having enough interfaces' and abstraction layers.**

Sometimes, the term 'cognitive load' is used in this topic. For me, it often comes down to this: **how many places do I have to keep in my head when working with a particular part of the code?** If it takes twenty tabs to grok a fix, that's a red flag. 

**I'd rather wrangle a single monstrous 1000-line method with no side effects than chase through 15 short methods scattered all around**, some buried in generic utils, some in domain-specific folders, all intricately tangled. Here's a quick rule-of-thumb you can try: count how many files or functions you actually touch or jump between to implement a single task, or put breakpoints to debug. **"Jumps per task" or "files touched per fix" makes a concrete yardstick for cognitive load** the next time you check your codebase. Try tracking this next time you dig into unfamiliar code and see how much mental energy it actually costs.

In my first job, we had a function we called 'godly 300' - it was more than 300 lines of code, and was doing way more than a single thing. It was used frequently across multiple contexts. Changes were scary; we had no tests - it's hard to test a multi-headed monster that does a lot of things, has side effects, and calls a lot of smaller creatures.

After over a decade in the industry (man, I sound like an experienced pornstar), I know **300 LoC is rookie numbers**. Check how big the methods and classes are in the Android framework. Google devs having no idea how to write good code? Not really. Methods may be huge, but still do mostly one thing; but the thing is complex. And I like it better kept in this one place than scattered around in an unholy set of generic, short functions used once.

## Write Everything at Least Twice

Another principle we like to follow blindly is not to repeat ourselves. At first, as a junior dev, you copy-paste code, change or add a few arguments, and call it a day.

Then you have to change the same line of code in 20 places, and you get the idea that extracting that code to a separate place and reusing it would actually be an improvement.

Yes, it is a good idea to have a single place to change that is then used in multiple places in code. 

**No, it's not a good idea to create this single place right from the start. You don't know what you want until you have it.**

This sentence is always blocking me from using a pure TDD approach. I do not know what to test or how, because I have no idea what the solution will look like, what methods, objects, and structure I will end up with. How can I write a test at the beginning? Well, you can, and it's a fun experience I do sometimes, but it's another topic. Testable code is generally nicer to work with; you can train yourself to write it using the TDD approach and some kata programming problems, but I rarely, if ever, use it in prod code.

Anyway, you get a better understanding of what to extract, which abstraction to create, after you've written the same thing twice. 

Not exactly the same thing, static code analysers would point it out if you actually copy-paste code, but close logically enough that you go 'huh…' when looking at both parts. And then, my friend, you can build an abstraction. Can, but don't have to. You can leave it until you write it a third time, because then it's guaranteed that you are repeating yourself.

Of course, with experience, you will immediately see places that can be reused from the start. But you will also make the mistake of overgeneralizing such places. 

So just don't. 

Write duplicates and live with them. Often, code has accidental similarities and will develop in completely different ways over time. It won't be an issue if you duplicated code at the beginning and, after a year, it's no longer similar. If you overabstracted because some book said so, now you have to squish the cube into a circular hole, knowing you carved both things to be unfitting. Bad feeling, I was there and will be again for sure.

Another acronym here 'AHA' - avoid hasty abstractions[^5].

## Die Dogmats

What you may notice already from all those acronyms and rules is that they are intentionally vague. But we like precision. Numbers, metrics, graphs, hell, I dare to say Scrum was invented to gamify work.

From this perspective, Clean Code, with its rather precise rules, looks appealing. And it is. Until it's not. As Donald Knuth famously put it, **"Premature optimization is the root of all evil."** In the same spirit, premature devotion to rules can lead to its own mess.

**Following rules without understanding why they exist, and the context and time when they were created, sounds awfully religious.** Does it mean those rules are wrong? No. Does not eating pork on Friday make you a better person? Also no.

Rules in software engineering are not a result of epiphany, some mysterious force giving us wisdom from higher realms. They were noticed, described, and tested on the battlefield by people like you and me.

But since our screens can show more than 20 lines of code, and modern IDEs, or even VIM, can let you jump between lines with a click, maybe we should shift the focus from rules to more mentally-oriented ones.

Ask yourself these questions whenever you're working on code:

- How much do I need to remember to work on a particular part?
- How far do I have to jump from one place to another?
- How often do I need to update 15 files when I was sure it would be a one-liner?
- How quickly can I add a new feature, or completely change the behavior?

Turning these thoughts into a checklist gives you a way to pause and reflect on actual maintainability rather than just abstract principles.

I believe it's better to know about SOLID, Clean Code, and related principles, but keep them as suggestions, not commandments. 

Context is everything: there are moments when these principles save you from future headaches, and there are situations where following them to the letter is overkill. You will learn the hard way which ones would help you, unfortunately, postfactum. **You need to burn yourself to learn the rules.** By burn, I mean mental breakdowns after spending countless hours on something you know would be much easier if you just followed the principles.

Not all code is written equally. Not all require the same level of attention, robustness, or ease of change. And SOLID rules are great for parts that are constantly changed. But applying them blindly because 'good principles blah blah' will be counterproductive. Guess how I know.

Can you imagine writing a bash script for a single back-office-related job, splitting it into multiple small files with a single 20-line function, no more than 3 input parameters, and then composing the actual tool with that?

**Bad abstraction is worse than no abstraction, and you need to make a lot of bad ones to learn what is good.**

This whole topic reminds me a bit of learning to play an instrument. I play guitar, it was a bundle with long hair, I guess. I can learn all the music theory, all the licks and riffs, but it means nothing without hours of practising and playing wrong notes, training your brain to connect theory with practise to actually play something meaningful. The same muscle memory is used when coding.

## AI Twist

Obviously, I had to put AI into a blog post; it's 2026.

If you are one of those perverts whipping Claude Code at 3am to vibecode one more feature to your pet project, like me, you may have noticed how often it creates a new method or class almost identical to already existing ones. It was well trained on books, blog posts, and source code written based on all those rules I mentioned above, so why is it doing so?

**Well, apparently, AI is smart enough to know how dumb it is**, and it avoids creating abstractions or fiddling with existing code when building something new. It will try to have as few touchpoints with existing code as possible to not break it. Later, during a refactor, when you point out what can be merged or reused, it will switch context to those small refactors. Instead of blowing the whole codebase with code that doesn't compile, it will copy-paste new code, make it work, then fix duplicates or figure out an abstraction layer. That is, if you tell it to.

You, starting from abstractions, are not 'smarter than AI'; your ego just won't let you admit you have no idea what you are doing. You feed it with those arbitrary rules, feeling morally superior over simple folks who first make it work in whatever way, then make it good. Or not even make it good, because it's used 3x a year by the internal team, so nobody cares.

**We've covered SOLID, CUPID, DRY, AHA, Habitable Code, Tidy First… notice a pattern? They're all trying to say the same thing: make code maintainable.**

**Pick the wisdom, skip the worship.**

## Just Be Lazy (But Smart)

**I don't write clean code for Uncle Bob's approval. I write it because Future Adam (3 months later, half-asleep, running on coffee, dealing with a bug at 3am) will either thank me or curse me.** I used to feel anxiety about other developers' negative reactions to my code, but that happens regardless of whether I follow all the rules and deliver peak performance code, so I just stopped caring. :)

I find myself with a fresh golden hammer in hand every now and then, only to realize a screw would've been better. **Following principles blindly doesn't automatically render 'better code'—there are always tradeoffs, and managing them is a sign of seniority and actual craftsmanship.**

Both extremes hurt: not knowing the principles, and religiously implementing them.

**Collect the wisdom of principles, don't follow commandments. Write code that Future You can live in comfortably.**

This is the way.

---

## References

[^1]: Kernighan, B. W., & Plauger, P. J. (1974). *The Elements of Programming Style*. McGraw-Hill. This early work discussed code clarity and style, predating the modern "clean code" movement.

[^2]: Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall. The book that popularized specific coding practices and the SOLID principles, though many concepts existed earlier. Available at: [https://www.oreilly.com/library/view/clean-code-a/9780136083238/](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

[^3]: Terhorst-North, D. (2022). *CUPID—for joyful coding*. Personal blog. Retrieved from: [https://dannorth.net/2022/02/10/cupid-for-joyful-coding/](https://dannorth.net/2022/02/10/cupid-for-joyful-coding/) - A backronym created to emphasize properties that make code "joyful to use."

[^4]: Gabriel, R. P. (1996). *Patterns of Software: Tales from the Software Community*. Oxford University Press. Contains the concept of "habitable code" emphasizing developer comfort and human understanding. PDF available at: [https://www.dreamsongs.com/Files/PatternsOfSoftware.pdf](https://www.dreamsongs.com/Files/PatternsOfSoftware.pdf)

[^5]: Dodds, K. C. *AHA Programming*. Personal blog. Retrieved from: [https://kentcdodds.com/blog/aha-programming](https://kentcdodds.com/blog/aha-programming) - Coined "Avoid Hasty Abstractions" as a counter to premature DRY.

[^6]: Henney, K., & Terhorst-North, D. (2026). *Is Clean Code a Myth or Timeless Truth?* YOW! Conference. Retrieved from: [https://www.youtube.com/watch?v=OjW_0ZRdN5E](https://www.youtube.com/watch?v=OjW_0ZRdN5E) - A discussion exploring the evolution and interpretations of clean code concepts, challenging whether rigid rules help developers write better code.

Other:

- Beck, K. (2022). *Tidy First?: A Personal Exercise in Empirical Software Design*. O'Reilly Media. Promotes continuous, small, incremental improvements rather than major refactoring.
- Martin, R. C. *The SOLID Principles*. Various publications and talks throughout the 2000s.
- Unix Philosophy: The principle that programs should "do one thing and do it well," originating from the Unix operating system design in the 1970s.
