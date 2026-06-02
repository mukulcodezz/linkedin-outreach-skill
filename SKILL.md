---
name: linkedin-outreach
description: LinkedIn outreach engine for any business. Reads a LinkedIn profile screenshot via vision (headline, about, banner, featured, activity), classifies and scores the prospect (including connector potential for non-buyers at ICP-fit companies), drafts nurture-first DMs, runs a follow-up cadence, generates value comments, handles replies with a handoff to your closing channel, and maintains a permanent contact history. All business specifics live in config.md. Use when the user shares a LinkedIn profile screenshot, asks for an outreach DM, a follow-up, a comment, help replying to a prospect, or wants to remove ghosted contacts from the log.
license: MIT
metadata:
  version: 2.0.0
  category: sales-outreach
  domain: linkedin-outreach
  template: true
---

# LinkedIn Outreach Engine (Template)

Think like a good networker, not a DM spammer. Works for any business — **all company specifics are read from `config.md`.** If `config.md` still has `[BRACKETED]` placeholders, tell the user to fill it first.

## North Star (optimize in this order)
**Reply Rate > Meetings > Sales > Messages Sent.** Goal is starting genuine conversations that become business. Pitching too early is the #1 reason outreach fails — so the default first touch does NOT pitch.

## Keywords
linkedin outreach, dm, follow up, comment, objection handling, lead scoring, prospect classification, reply handling, nurture, connector, referral, contact history

---

## Setup Check (run once)
Before the first use, confirm `config.md` is filled (no `[BRACKETED]` placeholders left). If not, point the user to `SETUP.md`.

## Modes — pick from the user's input

| User shares / asks... | Mode | Section |
|---|---|---|
| Profile screenshot (new outreach) | **1: New DM** | A |
| "Follow up with [name]" | **2: Follow-Up** | B |
| Screenshot of prospect's reply | **3: Reply Handling** | C |
| "Comment on this post" + post screenshot | **4: Comment** | D |
| "Remove these ghosted contacts" / weekly cleanup | **5: Ghost Cleanup** | E |

If unclear, ask once: "New DM, follow-up, reply, comment, or ghost cleanup?"

---

# SECTION A — Mode 1: New DM

### A1. Analyze the Profile (read deeply)
From the screenshot read: **Headline, About, Banner, Featured, Activity/content** (last post date, topics, quality, engagement), **Triggers** (config.md §6), plus name, role, company + size, industry, location, mutuals, milestones.

### A2. Classify the Prospect
Assign a role category and Tier (A/B/C) using `config.md` §5.

Also check **connector potential** (`references/referrals.md`): if their EMPLOYER fits the ICP (config.md §4) but THEIR role isn't the buyer, tag them a CONNECTOR — the goal becomes a referral/intro to the real buyer, not selling them.

### A3. Score & Tier
Apply `references/scoring.md` (activity 50% / role 30% / fit 20% + trigger boosts). Output:
```
Prospect: [Name] — [Role] (Tier A/B/C)
Score: X/10 — HOT | WARM | COLD
Why: [1 line — key signals + trigger]
Decision power: YES | MAYBE | NO
Connector potential: LOW | MEDIUM | HIGH  (employer ICP-fit even if they aren't the buyer)
Trigger: [name it, or "none visible"]
```
A Cold direct buyer with HIGH connector potential is still worth a warm relationship → run `references/referrals.md`.

### A4. Check Sent Log
Read `logs/sent_log.md`. **Rows are never deleted automatically — this is permanent history.** If the person is already logged → warn with their status and last-contact date (avoid awkward duplicates). Otherwise proceed.

### A5. Pick Opener (silently, never ask)
Use config.md §7 openers. Recent connection or user said "just connected" → fresh opener. Else → older-connection opener.

### A6. Draft the First DM (HYBRID — default nurture)
Follow `references/constraints.md` + config.md §7. Run `references/tone_checker.md` before output.
- **Default = Nurture DM (no pitch):** opener + one personalized relevance line (from profile) + warm natural close. **80-120 words.** No pitch, no proof stats, no CTA, no links. Default for ALL leads.
- **Pitch variant — ONLY for HOT (Tier A/B) + strong buying trigger:** adds their pain + your matching offering as an OUTCOME (config.md §2) + 1 proof point (config.md §3) + soft CTA. 100-130 words. Label "optional pitch variant — use only if the trigger is strong."
- COLD / Tier C → nurture only, never pitch.

### A7. Output
Prospect line / score / why / decision power / connector potential / trigger, then the Nurture DM, then the optional Pitch variant (only when earned).

### A8. Log Every Contact (permanent history)
Log **every person** contacted — keep the full history. On confirmation, append to `logs/sent_log.md`:
`| date | Name | Company | Role | Nurture/Pitch/Connector | Sent | [next-followup-date] | message |`
Rows persist forever; mark closure with Status (Closed-won/Closed-lost). Removal is manual and triggered by the user (Mode 5).

---

# SECTION B — Mode 2: Follow-Up (nurture cadence)
Use `references/followups.md`: Day 0 thanks → Day 5-7 useful insight (config.md §9) → Day 14 light conversation → Day 21+ mention offering ONLY if relevant → Day 30 breakup. 30-70 words. Run tone-checker. Stop when they reply.

# SECTION C — Mode 3: Reply Handling
Use `references/reply_handling.md`. Qualify + move warm replies to your handoff channel (config.md §8). Match their energy, weave 1-2 qualifying questions. Update log status.

# SECTION D — Mode 4: Comment Generator
Use `references/comments.md`. Generate 2 value comments (1-3 sentences, human, no pitch/links). Warms leads before DMing.

# SECTION E — Mode 5: Weekly Ghost Cleanup
User provides names of people who ghosted or are dead leads. **Remove only those specific rows** from `logs/sent_log.md` (match on name + company). Leave everything else intact. Confirm which names were removed.

---

## Pre-Send Gate (every mode)
Silently run `references/tone_checker.md` on every message. Fix and re-check until it passes. Never output a failing message.

## Reference Files
| File | Purpose |
|---|---|
| `config.md` | **All business specifics — fill this** |
| `references/scoring.md` | Scoring rubric + tiers + trigger boosts + connector potential |
| `references/triggers.md` | Event triggers → score boost + hook |
| `references/referrals.md` | Connector play — turn non-buyers at ICP firms into intros |
| `references/followups.md` | Nurture cadence + templates |
| `references/reply_handling.md` | Objection framework + handoff |
| `references/comments.md` | Value-comment generator |
| `references/tone_checker.md` | Hard reject list — pre-send gate |
| `references/constraints.md` | Length, format, dos/don'ts |
| `references/examples.md` | How-to + a filled fictional example |
| `logs/sent_log.md` | Permanent contact history — manual cleanup only |
