export const REPO_URL = "https://github.com/mukulcodezz/linkedin-outreach-skill";
export const INSTALL_CMD =
  "git clone https://github.com/mukulcodezz/linkedin-outreach-skill.git ~/.claude/skills/linkedin-outreach";

export interface Step {
  n: string;
  title: string;
  body: string;
}

export const PIPELINE: Step[] = [
  { n: "01", title: "Read the profile", body: "Vision parses headline, About, banner, Featured, and recent activity from a single screenshot." },
  { n: "02", title: "Classify the prospect", body: "Sorts them into a role and tier — the people who actually own the buying decision rise to the top." },
  { n: "03", title: "Score the lead", body: "Activity-first scoring, 1–10, Hot / Warm / Cold, with boosts for live buying triggers." },
  { n: "04", title: "Draft a nurture DM", body: "80–120 words, no pitch. A pitch variant appears only for hot leads with a real signal." },
  { n: "05", title: "Run follow-ups", body: "A patient cadence: thanks → insight → light chat → mention → graceful breakup." },
  { n: "06", title: "Handle the reply", body: "An objection framework that qualifies and moves warm replies to your closing channel." },
  { n: "07", title: "Generate comments", body: "Value comments that warm a lead before you ever slide into the DMs." },
  { n: "08", title: "Track everything", body: "A self-pruning log so you never send an awkward duplicate." },
];

export interface Mode {
  tag: string;
  title: string;
  trigger: string;
  body: string;
}

export const MODES: Mode[] = [
  { tag: "MODE 1", title: "New DM", trigger: "You share a profile screenshot", body: "Classify, score, and draft a personalized first touch — nurture by default." },
  { tag: "MODE 2", title: "Follow-Up", trigger: "“Follow up with Priya”", body: "Picks the right touch on the cadence and keeps it short, fresh, and no-pressure." },
  { tag: "MODE 3", title: "Reply Handling", trigger: "You share their reply", body: "Reads the objection, responds in your voice, and routes warm leads to a close." },
  { tag: "MODE 4", title: "Comment", trigger: "“Comment on this post”", body: "Two human, value-adding comments — never “Great post!”, never AI-sounding." },
];

export interface Feature {
  title: string;
  body: string;
}

export const FEATURES: Feature[] = [
  { title: "Config-driven", body: "One file holds your whole business. The methodology stays generic — works for any industry." },
  { title: "Activity-first scoring", body: "An active profile reads your message. A dead one swallows it. Reachability is weighted heaviest." },
  { title: "Tone checker", body: "A hard pre-send gate that rejects “best agency”, brochures, “Dear Sir/Madam”, links, and AI-slop." },
  { title: "Nurture cadence", body: "Day 0 → 5–7 → 14 → 21 → 30. Relationship first, offer last — only when it's earned." },
  { title: "Your closing channel", body: "Warm replies get routed to WhatsApp, a call, or email — wherever you actually close." },
  { title: "Privacy by default", body: "Your filled config and prospect log stay yours. A .gitignore keeps them out of public forks." },
];

export const QUICKSTART: Step[] = [
  { n: "01", title: "Clone the skill", body: "Drop it into your Claude skills folder with a single command." },
  { n: "02", title: "Fill config.md", body: "Replace the bracketed placeholders with your company, offer, ICP, and voice. ~15 minutes." },
  { n: "03", title: "Paste a screenshot", body: "Hand Claude a LinkedIn profile and ask for outreach. Score and draft come back instantly." },
];
