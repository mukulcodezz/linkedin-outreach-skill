# LinkedIn Outreach Skill

A [Claude](https://claude.com/claude-code) Agent Skill that turns LinkedIn profile screenshots into **personalized, scored, nurture-first outreach** — for any business. Fill one config file with your company info and it works for your industry.

It thinks like a good networker, not a spam bot. The north star is **Reply Rate > Meetings > Sales > Messages Sent** — so the default first message never pitches.

## What it does

You share a LinkedIn **profile screenshot**; the skill:

1. **Reads the profile** (headline, About, banner, Featured, recent activity).
2. **Classifies** the prospect into a role/tier.
3. **Scores** the lead (activity-first, 1–10, Hot/Warm/Cold) with trigger boosts (new job, hiring, funding…).
4. **Drafts a nurture DM** (80–120 words, no pitch) — plus an *optional* pitch variant only for hot leads with a strong buying signal.
5. **Runs follow-ups** on a nurture cadence (Day 0 → 5–7 → 14 → 21 → 30).
6. **Handles replies** with an objection framework and a handoff to your closing channel.
7. **Generates value comments** to warm leads before DMing.
8. **Logs every prospect** and auto-prunes old entries.

Every message passes a **tone checker** that rejects spammy, robotic, or salesy phrasing before you ever see it.

## Quick start

```bash
# 1. Clone into your Claude skills folder
git clone https://github.com/<you>/linkedin-outreach-skill.git ~/.claude/skills/linkedin-outreach

# 2. Fill in your business
#    Edit config.md — replace every [BRACKETED] placeholder. See SETUP.md.

# 3. Use it in Claude Code
#    Paste a LinkedIn profile screenshot and say: "draft an outreach DM"
#    (or invoke the skill by name: linkedin-outreach)
```

Windows path: `C:\Users\<you>\.claude\skills\linkedin-outreach`.

## The one file you edit

**`config.md`** holds 100% of your business specifics — company, offerings→outcomes, proof points, ICP, role tiers, buying triggers, voice, and handoff channel. Everything in `references/` is generic methodology that reads from it. See **[SETUP.md](SETUP.md)**.

## Structure

```
linkedin-outreach/
├── SKILL.md                 # the engine: modes + flow (don't need to edit)
├── config.md                # ← FILL THIS (your whole business)
├── SETUP.md                 # fill-in guide
├── references/
│   ├── scoring.md           # lead scoring rubric + tiers
│   ├── triggers.md          # buying triggers → score boost + hooks
│   ├── followups.md         # nurture follow-up cadence
│   ├── reply_handling.md    # objection bank + handoff
│   ├── comments.md          # value-comment generator
│   ├── tone_checker.md      # pre-send quality gate
│   ├── constraints.md       # length/format rules
│   └── examples.md          # how-to + a filled fictional example
└── logs/
    └── sent_log.md          # prospect tracker (auto-pruned)
```

## Modes

| You share / ask | Mode |
|---|---|
| A profile screenshot | New DM |
| "Follow up with [name]" | Follow-Up |
| A screenshot of their reply | Reply Handling |
| "Comment on this post" + screenshot | Comment |

## Notes

- Designed for outreach to **existing 1st-degree connections** (LinkedIn restricts DMs to non-connections).
- Use it responsibly: personalized, genuine, low-volume outreach — not mass automation. Respect LinkedIn's terms.
- `config.md` and `logs/sent_log.md` will contain your private data once filled. If you fork publicly, keep them out of commits (see `.gitignore`).

## License

MIT — see [LICENSE](LICENSE).
