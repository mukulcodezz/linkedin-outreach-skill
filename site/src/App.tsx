import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  REPO_URL,
  INSTALL_CMD,
  PIPELINE,
  MODES,
  FEATURES,
  QUICKSTART,
} from "./data";

/* ----------------------------- icons ----------------------------- */
function GitHubMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.8 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  );
}
function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ----------------------------- reveal ----------------------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------- copy ----------------------------- */
function CopyLine({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="group flex items-stretch overflow-hidden rounded-lg border border-ink/15 bg-ink text-paper">
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5">
        <span className="select-none font-mono text-flame">$</span>
        <code className="min-w-0 truncate font-mono text-[13px] leading-none text-paper/90">
          {label ?? command}
        </code>
      </div>
      <button
        onClick={copy}
        aria-label="Copy command"
        className="flex shrink-0 items-center gap-1.5 border-l border-paper/15 px-4 font-mono text-[11px] uppercase tracking-widest text-paper/70 transition-colors hover:bg-flame hover:text-paper"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : null}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/* ----------------------------- nav ----------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-flame" />
          </span>
          <span className="font-mono text-[13px] font-medium tracking-tight text-ink">
            linkedin-outreach<span className="text-muted">-skill</span>
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a href="#how" className="hidden rounded-md px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-flame sm:block">
            How it works
          </a>
          <a href="#features" className="hidden rounded-md px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-flame sm:block">
            Features
          </a>
          <a href="#install" className="hidden rounded-md px-3 py-1.5 text-sm text-ink-soft transition-colors hover:text-flame sm:block">
            Install
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 rounded-md bg-ink px-3.5 py-1.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
          >
            <GitHubMark className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ----------------------------- DM cards ----------------------------- */
function MessageCard({
  kind,
  lines,
}: {
  kind: "spam" | "nurture";
  lines: string[];
}) {
  const spam = kind === "spam";
  return (
    <div
      className={`relative rounded-xl border bg-paper p-5 shadow-[0_18px_40px_-24px_rgba(23,18,14,0.5)] ${
        spam ? "border-flame/30 -rotate-2" : "border-pine/30 rotate-1"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
            spam ? "text-flame" : "text-pine"
          }`}
        >
          {spam ? "✕ the usual pitch" : "✓ what the skill writes"}
        </span>
        <span className="h-6 w-6 rounded-full bg-paper-deep" />
      </div>
      <div className="space-y-1.5">
        {lines.map((l, i) => (
          <p
            key={i}
            className={`text-[13.5px] leading-relaxed ${
              spam ? "text-muted line-through decoration-flame/50" : "text-ink-soft"
            }`}
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- sections ----------------------------- */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Hero() {
  const reduce = useReducedMotion();
  const floatRef = useRef<HTMLDivElement>(null);
  return (
    <section id="top" className="relative px-5 pt-32 pb-16 sm:px-8 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={stagger} initial={reduce ? undefined : "hidden"} animate="show">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-rule bg-paper px-3.5 py-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Claude Agent Skill
            </span>
            <span className="h-1 w-1 rounded-full bg-flame" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">MIT</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-balance"
          >
            Outreach that thinks like a{" "}
            <span className="relative whitespace-nowrap text-flame">
              networker
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                <path d="M2 8c40-6 120-6 196 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            , not a spam bot.
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-[1.06rem] leading-relaxed text-ink-soft">
            A config-driven skill that turns a LinkedIn profile screenshot into a
            personalized, scored, <em className="not-italic text-ink">nurture-first</em> message.
            Fill one file with your business — it works for any industry.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] sm:text-[13px]">
            <span className="font-semibold text-ink">Reply Rate</span>
            <span className="text-flame">›</span>
            <span className="text-ink-soft">Meetings</span>
            <span className="text-flame">›</span>
            <span className="text-ink-soft">Sales</span>
            <span className="text-flame">›</span>
            <span className="text-muted line-through">Messages Sent</span>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-lg bg-flame px-5 py-3 text-sm font-semibold text-paper shadow-[0_14px_30px_-12px_rgba(223,67,34,0.7)] transition-transform hover:-translate-y-0.5"
            >
              <GitHubMark className="h-4 w-4" />
              Get it on GitHub
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-paper-deep"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* before / after */}
        <motion.div
          ref={floatRef}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md space-y-5 lg:mx-0"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <MessageCard
              kind="spam"
              lines={[
                "Hi, I'm with [Company] — the BEST agency around.",
                "We offer X, Y and Z. Can we schedule a call?",
                "Please find our brochure attached. Dear Sir/Madam.",
              ]}
            />
          </motion.div>
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <MessageCard
              kind="nurture"
              lines={[
                "Hi Priya, thanks for connecting.",
                "Running people ops for a team scaling this fast is no small job.",
                "Always good to know HR leaders navigating it — let's stay in touch.",
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Read", "Classify", "Score", "Nurture", "Follow up", "Reply", "Comment", "Track"];
  return (
    <div className="border-y border-ink bg-ink py-3 text-paper">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {words.map((w) => (
              <span key={w + dup} className="flex items-center font-mono text-[12px] uppercase tracking-[0.2em]">
                <span className="px-6 text-paper/80">{w}</span>
                <span className="text-flame">✶</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Pipeline() {
  return (
    <section className="px-5 py-24 sm:px-8" id="what">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-flame">What it does</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.01em]">
            Eight moves, one screenshot.
          </h2>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map((s, i) => (
            <Reveal key={s.n} delay={(i % 4) * 0.06} className="bg-paper">
              <div className="group h-full p-6 transition-colors hover:bg-paper-deep">
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="font-mono text-[12px] text-muted">{s.n}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-rule transition-colors group-hover:bg-flame" />
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modes() {
  return (
    <section className="bg-ink px-5 py-24 text-paper sm:px-8" id="how">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-flame">How it works</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.01em] text-paper">
            Four modes. It reads the room and picks one.
          </h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {MODES.map((m, i) => (
            <Reveal key={m.tag} delay={(i % 2) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-paper/15 bg-paper/[0.03] p-7 transition-colors hover:border-flame/40">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-flame/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-flame">{m.tag}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold text-paper">{m.title}</h3>
                <p className="mt-4 inline-flex rounded-md bg-paper/10 px-2.5 py-1 font-mono text-[12px] text-paper/75">
                  {m.trigger}
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-paper/65">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-5 py-24 sm:px-8" id="features">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-flame">Why it's different</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.01em]">
              Built to start conversations, not blast messages.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl border border-rule bg-paper p-6 transition-all hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_50px_-30px_rgba(23,18,14,0.5)]">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-paper transition-colors group-hover:bg-flame">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section className="px-5 py-24 sm:px-8" id="install">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-rule bg-paper-deep">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="border-b border-rule p-9 sm:p-11 lg:border-b-0 lg:border-r">
              <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-flame">Quick start</p>
              <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-tight tracking-[-0.01em]">
                Running in three steps.
              </h2>
              <ol className="mt-9 space-y-7">
                {QUICKSTART.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="font-mono text-[13px] text-flame">{s.n}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug">{s.title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1} className="p-9 sm:p-11">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">1 — clone</p>
              <CopyLine
                command={INSTALL_CMD}
                label="git clone …/linkedin-outreach-skill ~/.claude/skills/linkedin-outreach"
              />
              <p className="mb-3 mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">2 — fill</p>
              <div className="rounded-lg border border-ink/15 bg-ink p-4 font-mono text-[12.5px] leading-relaxed text-paper/85">
                <span className="text-flame"># config.md</span>
                <br />
                company: <span className="text-paper">Your Co.</span>
                <br />
                offer: <span className="text-paper">outcome, not feature</span>
                <br />
                tiers: <span className="text-paper">who owns the decision</span>
                <br />
                voice: <span className="text-paper">how you sound</span>
              </div>
              <p className="mb-3 mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">3 — run</p>
              <div className="flex items-center gap-3 rounded-lg border border-pine/30 bg-pine/10 px-4 py-3.5">
                <Check className="h-4 w-4 shrink-0 text-pine" />
                <p className="text-[13.5px] text-ink-soft">
                  Paste a profile screenshot → score + drafts come back.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-rule px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-flame" />
            <span className="font-mono text-[13px] font-medium">linkedin-outreach-skill</span>
          </div>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
            Not affiliated with LinkedIn. Use it for genuine, low-volume, personalized
            outreach — respect the platform's terms.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 rounded-lg border border-ink/20 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40 hover:bg-paper-deep"
          >
            <GitHubMark className="h-4 w-4" />
            Star on GitHub
            <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="font-mono text-[11px] text-muted">
            MIT © 2026 · built with Claude
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Pipeline />
        <Modes />
        <Features />
        <Install />
      </main>
      <Footer />
    </div>
  );
}
