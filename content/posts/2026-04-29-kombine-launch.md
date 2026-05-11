---
categories:
  -
comments: true
date: "2026-05-11T00:00:00Z"
description: " "
tags:
  -
title: "Devlog #1"
toc: true
url: 2026-05-11-kombine-devlog-1
series: "Kombine"
draft: false
---

# Devlog — 11 May 2026

**TL;DR** — Biggest UX week in a while. Onboarding got rebuilt from scratch with animations that actually show off the app. Task archiving is live end-to-end. Forgot password finally works — and users complete it on pages served directly from the API, no separate frontend required.

---

## User-facing features

- **Onboarding rebuilt.** New 5-page carousel with a Bauhaus-inspired visual language and animated illustrations — live countdown timer, pulsing watch-sync ripples, a heatmap that randomises itself. First impressions now look like the rest of the app instead of a placeholder from six months ago.

- **Forgot password flow, end to end.** Request a reset link, click it, land on a page the API serves itself, set a new password. Done. The new-password field was also being sent under the wrong key — so anyone who tried this before today got a silent failure. That's patched.

- **Task archiving.** Completed tasks from prior days auto-archive overnight. Manual archive/unarchive via swipe or the overflow menu. Archived tasks are browsable from the side drawer, grouped by date, with full descriptions on tap. Syncs across devices via the backend.

- **Swipe gestures redesigned.** Right = done. Left = archive. Delete is overflow-menu only now — accidental deletes were a real thing. First-time users get a one-time animated swipe hint so they don't just stare at the list.

- **Undo instead of "are you sure?"** Archive and delete now show a timed snackbar with undo — four seconds for archive, five for delete. Confirmation dialogs gone.

- **Task editing quality of life.** Attributes row animates out of the way when you're typing. Overflow menu on each card for quick actions without entering edit mode.

- **Rectangular watch complication.** Session type and time remaining on any watch face that supports the rectangular slot.

- **Animations throughout.** Task removal, stat counter ticks, FAB entrance, loading transitions, shimmer skeleton on first load. Less jarring.

- **Haptic feedback.** Distinct patterns for timer start, pause, and completion.

- **Context-aware empty states.** Task list, statistics, and archive now have actual messaging instead of blank screens.

- **Accessibility pass.** Dynamic content descriptions, properly-sized touch targets, TalkBack navigation across all major screens.

---

## Technical improvements

- **Play Integrity attestation.** API requests are now verified against Google's Play Integrity API. Backend middleware rejects calls that fail — android + backend shipped together. Raises the cost of running a spoofed client meaningfully.

- **Email delivery fixed, twice.** Switched to OVH SMTP with per-handshake logging so "why didn't the email arrive" stops being a black box. Then immediately found that outgoing messages were missing `Date` and `Message-ID` headers — some providers were silently dropping them. Both fixed within a day.

- **Sync reliability.** Sync events scoped correctly so loading indicators don't get stuck. Exponential backoff on the sync worker for transient failures. EventBus buffer increased — the old limit was quietly causing main thread stalls under load.

- **Duplicate timer session guard.** Starting a timer while one is already running now silently no-ops. Embarrassingly easy bug to reproduce, embarrassingly late to fix.

- **Statistics are reactive.** Stats screen updates via events instead of polling. Less main-thread work, more accurate numbers post-sync.

- **Auth interceptor unblocked.** Token refresh no longer uses blocking calls on OkHttp's dispatcher threads — replaced with a thread-safe in-memory cache. Under concurrent requests the old approach was a slow-motion deadlock.

- **Security: user enumeration hardened.** Forgot-password response time is now constant regardless of whether the email exists. One-liner fix.
