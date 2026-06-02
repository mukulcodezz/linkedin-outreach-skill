import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  REPO_URL, INSTALL_CMD, VERSION,
  PIPELINE, MODES, FEATURES, STATS, QUICKSTART,
} from "./data";

/* ── icons ── */
function GH({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  );
}

/* ── animation helpers ── */
function Fade({ children, delay = 0, className = "", y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── copy button ── */
function Copy({ cmd, label }: { cmd: string; label?: string }) {
  const [ok, setOk] = useState(false);
  async function go() {
    try { await navigator.clipboard.writeText(cmd); setOk(true); setTimeout(() => setOk(false), 1800); } catch { /* silent */ }
  }
  return (
    <div className="flex overflow-hidden border border-rule-bright" style={{ borderRadius: 0 }}>
      <div className="flex flex-1 items-center gap-3 overflow-hidden bg-void-2 px-4 py-3.5">
        <span className="font-mono text-spark select-none">$</span>
        <code className="font-mono text-[13px] text-bone/80 truncate">{label ?? cmd}</code>
      </div>
      <button
        onClick={go}
        className="shrink-0 border-l border-rule-bright bg-void-2 px-5 font-mono text-[11px] uppercase tracking-widest text-bone-dim transition-colors hover:bg-spark hover:text-white"
      >
        {ok ? "✓" : "copy"}
      </button>
    </div>
  );
}

/* ── nav ── */
function Nav() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => setPast(window.scrollY > 32);
    fn(); window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${past ? "bg-void/90 backdrop-blur-md border-b border-rule" : "border-b border-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-spark">LOS</span>
          <span className="h-4 w-px bg-rule-bright" />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-bone-dim">{VERSION}</span>
        </div>
        <nav className="flex items-center gap-1">
          {["how", "features", "install"].map(h => (
            <a key={h} href={`#${h}`} className="hidden px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-bone-dim transition-colors hover:text-bone sm:block">{h}</a>
          ))}
          <a href={REPO_URL} target="_blank" rel="noreferrer noopener"
            className="ml-3 flex items-center gap-2 border border-bone/20 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-bone transition-colors hover:border-spark hover:text-spark">
            <GH className="h-3.5 w-3.5" /> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ── stat counter ── */
function StatNum({ n }: { n: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className={`font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-none text-bone transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
      {n}
    </span>
  );
}

/* ── hero ── */
function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative min-h-screen border-b border-rule">
      {/* large background label */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span className="font-display text-[clamp(6rem,20vw,18rem)] font-bold leading-none text-white/[0.025] tracking-tighter">LOS</span>
      </div>

      <div className="relative mx-auto grid max-w-7xl px-6 pt-36 pb-20 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20 lg:pt-48 lg:pb-28">
        {/* left */}
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8 inline-flex items-center gap-3 border border-rule-bright px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spark opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-spark" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">Claude Agent Skill · Open Source</span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.8rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
          >
            LinkedIn<br />
            Outreach<br />
            <span className="text-spark">Skill.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg text-[1.05rem] leading-relaxed text-bone-dim"
          >
            A config-driven Claude Agent Skill that turns a LinkedIn profile screenshot
            into scored, personalized, nurture-first outreach.
            Fill one file. Works for any business, any industry.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-widest"
          >
            <span className="text-spark font-bold">Reply Rate</span>
            <span className="text-bone-dim">›</span>
            <span className="text-bone/60">Meetings</span>
            <span className="text-bone-dim">›</span>
            <span className="text-bone/60">Sales</span>
            <span className="text-bone-dim">›</span>
            <span className="text-bone/40 line-through">Messages Sent</span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href={REPO_URL} target="_blank" rel="noreferrer noopener"
              className="group flex items-center gap-2.5 bg-spark px-6 py-3.5 font-mono text-[12px] uppercase tracking-widest text-white transition-all hover:bg-spark-dim">
              <GH className="h-4 w-4" />
              Get it free
            </a>
            <a href="#how"
              className="flex items-center px-6 py-3.5 border border-rule-bright font-mono text-[12px] uppercase tracking-widest text-bone-dim transition-colors hover:border-bone/40 hover:text-bone">
              How it works ↓
            </a>
          </motion.div>
        </div>

        {/* right — stat grid */}
        <div className="mt-16 grid grid-cols-2 gap-px border border-rule lg:mt-0">
          {STATS.map((s) => (
            <div key={s.label} className="bg-void-2 p-8">
              <StatNum n={s.n} />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ticker ── */
function Ticker() {
  const words = ["Score", "Classify", "Nurture", "Follow Up", "Reply", "Comment", "Connect", "Close", "Track", "Refer"];
  return (
    <div className="overflow-hidden border-b border-rule bg-void-2 py-3.5">
      <div className="ticker-track">
        {[0, 1].map(d => (
          <div key={d} className="flex items-center" aria-hidden={d === 1}>
            {words.map(w => (
              <span key={w + d} className="flex items-center font-mono text-[11px] uppercase tracking-[0.25em]">
                <span className="px-7 text-bone-dim">{w}</span>
                <span className="text-spark">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── pipeline ── */
function Pipeline() {
  return (
    <section className="border-b border-rule" id="how">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Fade className="mb-16 flex items-end justify-between gap-8 border-b border-rule pb-8">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-spark">What it does</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-[-0.02em]">
              Eight moves.<br />One screenshot.
            </h2>
          </div>
        </Fade>
        <div className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
          {PIPELINE.map((s, i) => (
            <Fade key={s.n} delay={(i % 4) * 0.05} className="bg-void-2">
              <div className="group h-full p-7 transition-colors hover:bg-void-3">
                <p className="mb-6 font-mono text-[11px] text-spark">{s.n}</p>
                <h3 className="font-display text-xl font-bold leading-snug text-bone">{s.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-bone-dim">{s.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── modes ── */
function Modes() {
  return (
    <section className="border-b border-rule bg-void-2">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Fade className="mb-16 border-b border-rule pb-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-spark">Five modes</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-[-0.02em]">
            It reads the room.<br />Picks the right move.
          </h2>
        </Fade>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-5">
          {MODES.map((m, i) => (
            <Fade key={m.tag} delay={i * 0.06} className="bg-void-2">
              <div className="group h-full p-7 transition-colors hover:bg-void-3">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-spark">{m.tag}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-bone-dim opacity-0 transition-opacity group-hover:opacity-100">active</span>
                </div>
                <h3 className="font-display text-lg font-bold text-bone">{m.title}</h3>
                <p className="my-3 border-l-2 border-spark pl-3 font-mono text-[11px] text-bone-dim">{m.trigger}</p>
                <p className="text-[13px] leading-relaxed text-bone-dim">{m.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── before / after ── */
function BeforeAfter() {
  const reduce = useReducedMotion();
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Fade className="mb-16 border-b border-rule pb-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-spark">The difference</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-[-0.02em]">
            Not a spam cannon.<br />A conversation starter.
          </h2>
        </Fade>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-px lg:border lg:border-rule lg:bg-rule">
          {/* bad */}
          <Fade className="lg:bg-void-2" delay={0}>
            <div className="h-full p-8 lg:p-10">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40 line-through">The usual</p>
              <div className="space-y-3">
                {[
                  "Hi, we are the BEST travel agency in India.",
                  "We offer corporate travel, MICE, and holiday packages.",
                  "Please find the brochure attached. Can we schedule a call?",
                  "Dear Sir/Madam, looking forward to your kind revert.",
                ].map((l, i) => (
                  <motion.p
                    key={i}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="font-body text-[14px] leading-relaxed text-bone/30 line-through decoration-spark/40"
                  >
                    {l}
                  </motion.p>
                ))}
              </div>
            </div>
          </Fade>
          {/* good */}
          <Fade className="border border-spark/20 bg-void-2 lg:border-none lg:bg-void-2" delay={0.15}>
            <div className="h-full p-8 lg:p-10">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-spark">What the skill writes</p>
              <div className="space-y-4">
                {[
                  { bold: "Hi Priya,", rest: " hope you're keeping well." },
                  { bold: "", rest: "Managing a team that's scaling this fast, coordinating travel, offsites, and events must be a significant lift." },
                  { bold: "", rest: "Always good to connect with HR leaders navigating that. Looking forward to staying in touch." },
                ].map((l, i) => (
                  <motion.p
                    key={i}
                    initial={reduce ? false : { opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
                    className="text-[14.5px] leading-relaxed text-bone/80"
                  >
                    {l.bold && <strong className="text-bone">{l.bold}</strong>}
                    {l.rest}
                  </motion.p>
                ))}
                <motion.p
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-mono text-[11px] uppercase tracking-widest text-spark"
                >
                  ✓ 95 words · no pitch · no links · no "best agency"
                </motion.p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ── features ── */
function Features() {
  return (
    <section className="border-b border-rule bg-void-2" id="features">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Fade className="mb-16 border-b border-rule pb-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-spark">Why it's different</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-[-0.02em]">
            Built to start<br />conversations.
          </h2>
        </Fade>
        <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Fade key={f.title} delay={(i % 3) * 0.06} className="bg-void-2">
              <div className="group h-full p-7 transition-colors hover:bg-void-3">
                <span className="mb-5 block font-mono text-[18px] text-spark">{f.icon}</span>
                <h3 className="font-display text-lg font-bold text-bone">{f.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-bone-dim">{f.body}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── install ── */
function Install() {
  return (
    <section className="border-b border-rule" id="install">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Fade className="mb-16 border-b border-rule pb-8">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-spark">Quick start</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-[-0.02em]">
            Three steps.<br />Then you're live.
          </h2>
        </Fade>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-10">
            {QUICKSTART.map((s, i) => (
              <Fade key={s.n} delay={i * 0.08}>
                <div className="flex gap-6">
                  <span className="shrink-0 font-mono text-[13px] text-spark">{s.n}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-bone">{s.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-bone-dim">{s.body}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.12}>
            <div className="space-y-6">
              <div>
                <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">Clone</p>
                <Copy
                  cmd={INSTALL_CMD}
                  label="git clone …/linkedin-outreach-skill ~/.claude/skills/linkedin-outreach"
                />
              </div>
              <div>
                <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">Fill config.md</p>
                <div className="border border-rule-bright bg-void-2 p-5 font-mono text-[13px] leading-loose text-bone/70">
                  <span className="text-spark"># company</span><br />
                  name: <span className="text-bone">Your Co.</span><br />
                  offer: <span className="text-bone">outcome, not a feature</span><br />
                  <span className="text-spark"># icp</span><br />
                  tiers: <span className="text-bone">who owns the decision</span><br />
                  voice: <span className="text-bone">how you sound</span><br />
                  handoff: <span className="text-bone">WhatsApp / call / email</span>
                </div>
              </div>
              <div className="flex items-center gap-3 border border-rule-bright px-4 py-3.5">
                <span className="font-mono text-spark">✓</span>
                <p className="font-mono text-[12px] text-bone-dim">Paste a profile screenshot → score + DM drafts appear.</p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ── footer ── */
function Footer() {
  return (
    <footer className="bg-void-2">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-spark">LinkedIn Outreach Skill</p>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-bone-dim">
            Not affiliated with LinkedIn. Use for genuine, low-volume, personalized outreach.
            Respect the platform's terms.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-bone/30">MIT · {VERSION} · built with Claude</p>
        </div>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="self-start flex items-center gap-2.5 border border-rule-bright px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-bone-dim transition-colors hover:border-spark hover:text-spark sm:self-auto"
        >
          <GH className="h-4 w-4" />
          Star on GitHub
        </a>
      </div>
    </footer>
  );
}

/* ── root ── */
export default function App() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Pipeline />
        <Modes />
        <BeforeAfter />
        <Features />
        <Install />
      </main>
      <Footer />
    </div>
  );
}
