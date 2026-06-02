# Setup Guide

You only edit **`config.md`**. It takes ~15 minutes. Replace every `[BRACKETED]` placeholder, then delete the example hint comments.

## Step 1 — Install
Clone the repo into your Claude skills folder:
```bash
git clone https://github.com/<you>/linkedin-outreach-skill.git ~/.claude/skills/linkedin-outreach
```
(Windows: `C:\Users\<you>\.claude\skills\linkedin-outreach`)

## Step 2 — Fill `config.md`
Work through the 9 sections:

1. **Company Basics** — name, one-liner, website, location, credibility marker.
2. **Offerings → Outcomes** — list what you sell, but write the *outcome* the buyer gets, not the feature. (Bad: "we provide flight ticketing." Good: "teams travel without coordinating flights, hotels, and logistics.")
3. **Proof Points** — real numbers/credentials. The skill uses ONE per message, rotated.
4. **ICP** — who's a good fit, who isn't.
5. **Target Roles + Tiers** — Tier A = people who own/operate the buying decision (your fastest path). Tier B = high authority but delegate. Tier C = network only.
6. **Buying Triggers** — profile events that mean "live need now" (new job, hiring, funding, posted about your problem).
7. **Voice & Tone** — personality, opener lines for fresh vs older connections, sign-off, any extra banned phrases.
8. **Handoff** — where warm replies go to close (WhatsApp / call / email) + contact + a handoff line.
9. **Value-Add Library** — useful, no-pitch things to share in nurture follow-ups.

## Step 3 — Test it
In Claude Code, paste a real LinkedIn profile screenshot and say:
> "Draft an outreach DM for this profile."

You should get: a classification + score, then a nurture DM (and a pitch variant only if it's a hot lead with a strong trigger).

## Step 4 — Tune
- Output too formal/casual? Adjust §7 Voice.
- Wrong people scoring high? Adjust §5 Tiers and §4 ICP.
- Add banned phrases you dislike to §7 (they feed `references/tone_checker.md`).

## Tips
- **Keep it low-volume and genuine.** This is a personalization tool, not a mass-DM bot. Respect LinkedIn's terms.
- **Don't commit your filled `config.md` or `logs/sent_log.md`** to a public fork — they hold private data. `.gitignore` can exclude them (uncomment the lines).
- All recipients should be **existing 1st-degree connections**.
