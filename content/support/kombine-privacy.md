# Privacy Policy

**App:** Kombine
**Developer:** Adam Swiderski
**Last updated:** 2026-03-05

---

## Overview

Kombine is a productivity app that helps you manage tasks and track focus time using the Pomodoro technique. This policy explains what data is collected, how it is used, and your rights as a user.

---

## Data We Collect

### Data Stored Locally on Your Device

All productivity data is stored exclusively on your device in a local database. We do not collect, upload, or have access to this data. It includes:

- **Tasks** — titles, descriptions, priorities, deadlines, tags, and status
- **Work sessions** — start/end times, durations, activity types, focus levels, and optional notes you add
- **Timer state** — current timer mode and progress
- **App settings** — your preferences for timer durations, sounds, and notifications

This data never leaves your device unless you explicitly export or back it up yourself.

### Data Sent to Third-Party Services

#### Crash Reporting — Sentry

We use [Sentry](https://sentry.io) to automatically collect crash reports and monitor app stability. When the app crashes or an error occurs, Sentry receives:

- Device model, OS version, and app version
- Stack traces and error details
- Anonymized usage events (e.g., "timer started", "task completed") with metadata such as timer mode, duration, and priority level — **never** task content like titles or descriptions
- Session and performance metrics

**What Sentry does NOT receive:**

- Task titles, descriptions, tags, or notes
- Personal identifying information (name, email, location)
- Screenshots or screen recordings (explicitly disabled)

Sentry's privacy policy: [https://sentry.io/privacy/](https://sentry.io/privacy/)

#### Watch Synchronization — Google Play Services

If you use the Wear OS companion app, timer state and work session data are synced between your phone and watch using Google's Wearable Data Layer API. This communication happens locally over Bluetooth/Wi-Fi Direct between your own devices and does not pass through our servers.

Google's privacy policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)

---

## Permissions

| Permission | Why It Is Needed |
|---|---|
| `POST_NOTIFICATIONS` | Show timer progress and session completion notifications |
| `WAKE_LOCK` | Keep the timer running accurately when the screen is off |
| `VIBRATE` | Haptic feedback when a timer phase ends |
| `INTERNET` | Send crash reports to Sentry |
| `ACCESS_NETWORK_STATE` | Check connectivity before sending crash reports |
| `ACCESS_NOTIFICATION_POLICY` | Suppress distracting notifications during focus sessions (Do Not Disturb integration) |

---

## Data Sharing

We do not sell, trade, or share your personal data with any third party. The only external data transmission is anonymized crash and event data sent to Sentry as described above.

---

## Data Retention & Deletion

All your productivity data (tasks, sessions, settings) lives on your device. You can delete it at any time by clearing the app's data or uninstalling the app.

Crash reports sent to Sentry are retained according to Sentry's own data retention policies.

---

## Cloud Backup

Cloud backup is disabled. Your data is not backed up to Google Drive or any other cloud service. If you uninstall the app or factory-reset your device, your data will be permanently lost unless you export it manually.

---

## Children's Privacy

Kombine is not directed at children under 13. We do not knowingly collect data from children.

---

## Changes to This Policy

We may update this policy when we add new features or change how the app operates. The updated date at the top of this document reflects the most recent revision.

---

## Contact

For questions or concerns about this privacy policy, contact:

**Adam Swiderski**
Email: [aswiderski@pm.me](mailto:aswiderski@pm.me)
