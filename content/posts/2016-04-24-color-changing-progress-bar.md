---
categories:
  - rss
comments: true
date: "2016-04-24T00:00:00Z"
description: Simple guide to color changing progress bar
tags:
  - UI
  - Kotlin
  - Android
  - custom view
title: Color changing progress bar
toc: true
url: color-changing-progress-bar
---

In my project I wanted to have progress bar that shows how much time you have until
your food is not good to eat any longer. I'm not UX specialist, but I know that
usually when you see green color you think **it's all ok** and red is **some danger**.
So I decided to have small progress bar in each product list item
showing time till it should land in trashcan.

So we need a progressbar that goes from green to red (with ugly mid-green mid-red in middle...)

**Please remember following code is in [Kotlin][kotlin]**

Standard Android ProgressBar can be set to value 0-100, by using

{{< highlight java >}}
progressBar.setProgress(69);
{{< / highlight >}}

Let's keep it, all we need is ProgressBar to set color according to this value, so we don't
have to change our other code where ProgressBar is used.

Let's create new class extending Progres Bar

<script src="https://gist.github.com/asvid/ddcb0907c5fea68639b57b38ca03dabe.js"></script>

And use it in Layout

{{< highlight xml >}}
<com.example.app.customViews.ProductProgressBar
android:id="@+id/progressBar"
android:layout_width="fill_parent"
android:layout_height="wrap_content"/>
{{< / highlight >}}

For now, it acts exactly like standard ProgressBar, so how to make it do what we want?
Let's override `setProgress` method :)

{{< highlight java >}}
override fun setProgress(progress: Int) {
super.setProgress(progress)
val progressDrawable: Drawable = getProgressDrawable()
progressDrawable.colorFilter = translateValueToColor(progress)
setProgressDrawable(progressDrawable)
}
{{< / highlight >}}

All I've done here is taking current ProgressDrawable, and set color to value I get from `translateValueToColor`

{{< highlight java >}}
fun translateValueToColor(value: Int): PorterDuffColorFilter {
val R = (255 _ value) / 100
val G = (255 _ (100 - value)) / 100
val B = 0
val color = android.graphics.Color.argb(255, R, G, B)
val colorFilter = PorterDuffColorFilter(color, PorterDuff.Mode.MULTIPLY)
return colorFilter
}
{{< / highlight >}}

I'm setting RGB values (not variables :) ) accordingly to value so `value == 0` gets all green and `value == 100` gets all red.

And result can look like that:

<img src="/assets/Screenshot_20160424-001620.png" alt="alt text" width="300px"/>

If you need more specific behaviour or different colors, all you need to do is change **translateValueToColor** method, by using **if** statement or anything you'll find suitable for your case.

Hope you enjoyed this quite short tutorial, be prepared for more :]

[kotlin]: https://kotlinlang.org/
