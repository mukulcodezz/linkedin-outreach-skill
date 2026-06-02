export const REPO_URL = "https://github.com/mukulcodezz/linkedin-outreach-skill";
export const INSTALL_CMD = "git clone https://github.com/mukulcodezz/linkedin-outreach-skill.git ~/.claude/skills/linkedin-outreach";

export const VERSION = "v2.0.0";

export interface Step { n: string; title: string; body: string; }
export interface Mode { tag: string; title: string; trigger: string; body: string; }
export interface Feature { icon: string; title: string; body: string; }

export const PIPELINE: Step[] = [
  { n: "01", title: "Read the profile", body: "Vision parses headline, About, banner, Featured, and recent activity from a screenshot." },
  { n: "02", title: "Classify", body: "Role, tier, and a connector flag — the people who own the decision rise to the top." },
  { n: "03", title: "Score", body: "Activity-first, 1–10, Hot/Warm/Cold, with boosts for live buying triggers." },
  { n: "04", title: "Draft", body: "80–120 word nurture DM, no pitch. Pitch variant appears only for hot leads with a real signal." },
  { n: "05", title: "Follow up", body: "Patient cadence — thanks → insight → chat → offer → graceful exit." },
  { n: "06", title: "Handle reply", body: "Objection framework that qualifies and routes warm leads to your closing channel." },
  { n: "07", title: "Comment", body: "Value comments that warm a lead before you ever slide into the DMs." },
  { n: "08", title: "Track", body: "Permanent history log. Weekly you name the ghosters — only those rows go." },
];

export const MODES: Mode[] = [
  { tag: "01", title: "New DM", trigger: "Profile screenshot", body: "Classify, score, connector-check, and draft a personalized first touch — nurture by default." },
  { tag: "02", title: "Follow-Up", trigger: '"Follow up with Priya"', body: "Picks the right cadence touch and keeps it short, fresh, no-pressure." },
  { tag: "03", title: "Reply", trigger: "Their reply screenshot", body: "Reads the objection, responds in your voice, and routes warm leads to a close." },
  { tag: "04", title: "Comment", trigger: '"Comment on this post"', body: 'Two value-adding comments — never "Great post!", never AI-sounding.' },
  { tag: "05", title: "Ghost Cleanup", trigger: '"Remove these ghosters"', body: "Deletes only the named rows. Full history stays intact for everyone else." },
];

export const FEATURES: Feature[] = [
  { icon: "→", title: "Config-driven", body: "One file, your whole business. The methodology is industry-agnostic." },
  { icon: "→", title: "Activity-first scoring", body: "An active profile reads your message. A dead one swallows it. Reachability is weighted heaviest." },
  { icon: "→", title: "Connector play", body: "Non-buyers at ICP-fit companies become doors to the real buyer. Referral sequence included." },
  { icon: "→", title: "Tone gate", body: 'Hard pre-send check rejects "best agency", brochures, links, AI-slop, and hollow flattery.' },
  { icon: "→", title: "Nurture cadence", body: "Day 0 → 5–7 → 14 → 21 → 30. Relationship first, offer last — only when earned." },
  { icon: "→", title: "Permanent history", body: "Full contact log. You name the ghosters weekly; only those rows are removed." },
];

export const STATS = [
  { n: "5", label: "modes" },
  { n: "16", label: "reference files" },
  { n: "1", label: "file to fill" },
  { n: "∞", label: "industries" },
];

export const QUICKSTART: Step[] = [
  { n: "01", title: "Clone into your skills folder", body: "One git clone into ~/.claude/skills/linkedin-outreach and it registers automatically." },
  { n: "02", title: "Fill config.md", body: "9 sections, ~15 minutes. Your company, offer, ICP, tiers, voice, handoff channel." },
  { n: "03", title: "Paste a screenshot", body: "Hand Claude a LinkedIn profile. Score + two DM drafts come back in seconds." },
];
