"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// ── Motion ───────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Data ─────────────────────────────────────────────────────────────────

const WHAT_I_DO = [
  {
    num: "01",
    title: "AI products, end-to-end",
    desc: "From idea to shipped product — Next.js frontends, Python/FastAPI backends and LLM APIs (Claude, OpenAI) wired into things people actually use.",
  },
  {
    num: "02",
    title: "AI features & integrations",
    desc: "LLM APIs (Claude, OpenAI) wired into real apps — generation, chat and tool use. The part of AI I find most exciting to build and keep learning about.",
  },
  {
    num: "03",
    title: "Full-stack web apps",
    desc: "Auth, payments, realtime, databases — Stripe subscriptions, Supabase + RLS, PostgreSQL. I try to wire these up properly, not just for a demo.",
  },
];

const SKILLS = [
  {
    cat: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  { cat: "Backend", items: ["Python", "FastAPI", "Node.js"] },
  { cat: "AI", items: ["Claude API", "OpenAI API"] },
  { cat: "Database", items: ["PostgreSQL", "Supabase"] },
  { cat: "Tools", items: ["Vercel", "Docker", "Git"] },
];

const PROJECTS = [
  {
    title: "CrackTheTest.ai",
    desc: "Full SaaS, built from scratch — upload lecture notes, get an AI-generated exam in seconds. Stripe subscriptions, Supabase Auth + RLS, FastAPI, Claude API.",
    tags: ["Next.js", "FastAPI", "Claude API", "Supabase", "Stripe"],
    category: "AI",
    github: "https://github.com/Giorgiod91/CrackTheTest",
    live: "https://crack-the-test.vercel.app",
    screenshot: "/screenshots/crackthetest3.png",
  },
  {
    title: "ClaudeShip",
    desc: "A commercial Next.js + Supabase + Stripe + Claude boilerplate I built and sell — live payments, magic-link auth, automated GitHub repo delivery after purchase.",
    tags: ["Next.js", "Claude API", "Supabase", "Stripe"],
    category: "AI",
    github: "",
    live: "https://claudeship.vercel.app",
    screenshot: null as string | null,
  },
  {
    title: "GamerConnect",
    desc: "Real-time gaming platform — Supabase live chat, AI teammate matching and tournament management. Zero latency on every live feature.",
    tags: ["Next.js", "Supabase", "TypeScript", "Framer Motion"],
    category: "Web",
    github: "https://github.com/Giorgiod91/GamerConnect",
    live: "https://gamer-connect-chi.vercel.app/",
    screenshot: "/screenshots/GamersCONN.png",
  },
  {
    title: "Go2Spot",
    desc: "Travel discovery app that finds hidden gems in any city. Python ML backend personalizes results, Next.js frontend, Maps API.",
    tags: ["TypeScript", "Next.js", "Python", "ML"],
    category: "AI",
    github: "https://github.com/Giorgiod91/-Go2Spot",
    live: "https://go2-spot.vercel.app/",
    screenshot: "/screenshots/go2spot2.png",
  },
  {
    title: "PicturaSearch",
    desc: "Upload any photo — a CNN (TensorFlow) classifies it and finds matching products on eBay. Full-stack: TypeScript + Python ML. No text queries needed.",
    tags: ["TypeScript", "Python", "CNN", "eBay API"],
    category: "AI",
    github: "https://github.com/Giorgiod91/picturaSearch",
    live: "https://picturasearch.vercel.app",
    screenshot: "/screenshots/picturasearch.png",
  },
  {
    title: "Reactify",
    desc: "Describe a UI component in plain text → get production-ready TypeScript + Tailwind instantly. Next.js, Flask, GPT-4. Cuts boilerplate to zero.",
    tags: ["Next.js", "GPT-4", "Flask", "OpenAI"],
    category: "AI",
    github: "https://github.com/Giorgiod91/AI-React-Component-Designer-Frontend",
    live: "https://ai-react-component-designer-fronten.vercel.app/",
    screenshot: "/screenshots/reactify2.png",
  },
  {
    title: "PraktikumsFinder",
    desc: "Matches aspiring developers with IHK-certified training companies. FastAPI backend, smart location filtering, PostgreSQL, automated verification.",
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL"],
    category: "Web",
    github: "https://github.com/Giorgiod91/PraktikumFinder",
    live: "https://praktikumsfinder.vercel.app/",
    screenshot: "/screenshots/praktikumsfinder2.png",
  },
  {
    title: "EduProgress",
    desc: "Study progress tracker with visual dashboards, streaks and AI learning insights. Supabase + Row Level Security, realtime sync, TypeScript throughout.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    category: "Web",
    github: "https://github.com/Giorgiod91/EduProgress",
    live: "https://edu-progress.vercel.app/",
    screenshot: "/screenshots/eduprogr.png",
  },
  {
    title: "AntiCheat AI",
    desc: "Real-time anti-cheat — a Python ML model detects suspicious gameplay behaviour, the TypeScript frontend visualizes flags live. Behavioral-AI proof of concept.",
    tags: ["TypeScript", "Python", "ML", "Next.js"],
    category: "AI",
    github: "https://github.com/Giorgiod91/AntiCheatAIFrontend",
    live: "",
    screenshot: null as string | null,
  },
];

const MARQUEE = [
  "Next.js", "TypeScript", "Python", "FastAPI", "Claude API", "Supabase",
  "React", "Tailwind", "PostgreSQL", "OpenAI", "LangChain", "Stripe",
  "Framer Motion", "Vercel", "Docker", "Prisma",
];

const STATS: [string, string][] = [
  ["20+", "Projects shipped"],
  ["2 live products", "CrackTheTest · ClaudeShip"],
  ["IHK + B.Sc.", "In progress"],
];

// ── Pulsing rings motif ────────────────────────────────────────────────────

function PulseRings({ size = 320 }: { size?: number }) {
  return (
    <div className="ring-stage" style={{ width: size, height: size }} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="ring"
          style={{ animationDelay: `${i * 1.05}s` }}
        />
      ))}
      <span className="core" style={{ width: size * 0.07, height: size * 0.07 }} />
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-sand/80 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="#" className="font-mono text-sm font-medium tracking-tight">
          giorgio<span className="text-accent">.dev</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Work", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </nav>
        <a href="mailto:giorgio.dettmar@gmx.de" className="btn-secondary text-sm">
          Get in touch
        </a>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-20 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-5xl">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <span className="pill">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to work · Germany
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-7 font-mono text-sm tracking-tight text-ink-faint"
          >
            <span className="text-accent">giorgio@dev</span>
            <span className="text-ink-faint">:~$</span> whoami
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display mt-3 text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.98] tracking-[-0.035em]"
          >
            I build web &amp; AI
            <br />
            products, <span className="chip">end-to-end.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Full-stack developer from Germany. Next.js · TypeScript · Python ·
            FastAPI — I ship real projects and keep learning.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              See my work
            </a>
            <a href="#contact" className="btn-secondary">
              Let&apos;s talk
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 grid gap-3 sm:grid-cols-3"
          >
            {STATS.map(([val, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <p className="font-display text-2xl font-bold tracking-tight">
                  {val}
                </p>
                <p className="eyebrow mt-1.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Marquee ────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden border-y border-line py-4">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-sm text-ink-faint">{item}</span>
            <span className="mx-6 h-1 w-1 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Section heading ──────────────────────────────────────────────────────────

function SectionHead({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mb-14"
    >
      <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="eyebrow">{label}</span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="font-display max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

// ── What I do ───────────────────────────────────────────────────────────────

function WhatIDo() {
  return (
    <section className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="01"
          label="What I do"
          title="I build the whole thing — frontend, backend, and the AI in between."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          {WHAT_I_DO.map((item) => (
            <motion.div
              key={item.num}
              variants={fadeUp}
              className="card p-8"
            >
              <p className="font-mono text-sm text-accent">{item.num}</p>
              <h3 className="font-display mt-6 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Skills ──────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="02"
          label="What I can"
          title="The tools I reach for."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="divide-y divide-line border-y border-line"
        >
          {SKILLS.map(({ cat, items }) => (
            <motion.div
              key={cat}
              variants={fadeUp}
              className="grid gap-4 py-6 sm:grid-cols-[160px_1fr] sm:items-center"
            >
              <p className="eyebrow">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Work ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const urlLabel = project.live
    ? project.live.replace("https://", "").replace(/\/$/, "")
    : `${project.title.toLowerCase().replace(/[^a-z]/g, "")}.app`;

  return (
    <motion.div variants={fadeUp} className="card group flex flex-col overflow-hidden">
      {/* Preview */}
      <div className="overflow-hidden rounded-t-[1.5rem] border-b border-line">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3 py-2">
          <span className="h-2 w-2 rounded-full border border-line-strong" />
          <span className="h-2 w-2 rounded-full border border-line-strong" />
          <span className="h-2 w-2 rounded-full border border-line-strong" />
          <span className="mx-auto truncate font-mono text-[10px] text-ink-faint">
            {urlLabel}
          </span>
        </div>
        {project.screenshot ? (
          <div className="relative h-40 overflow-hidden bg-surface-2">
            <Image
              src={project.screenshot}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center bg-surface-2">
            <PulseRings size={120} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold tracking-tight">
            {project.title}
          </h3>
          <span className="eyebrow">{project.category}</span>
        </div>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-ink-soft">
          {project.desc}
        </p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-5 border-t border-line pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ink-soft transition-colors hover:text-accent"
            >
              Code →
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-ink-soft transition-colors hover:text-accent"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Work() {
  const [filter, setFilter] = useState<"All" | "AI" | "Web">("All");
  const tabs = ["All", "AI", "Web"] as const;
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead
            index="03"
            label="Selected work"
            title="Things I've shipped."
          />
          <div className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-all ${
                  filter === t
                    ? "bg-ink text-white"
                    : "border border-line-strong bg-surface text-ink-soft hover:border-accent hover:text-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={filter}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="px-6 py-28 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHead index="04" label="About" title="Where I'm coming from." />
          <motion.div
            variants={fadeUp}
            className="space-y-4 text-base leading-relaxed text-ink-soft"
          >
            <p>
              I&apos;m a developer from Hannover, Germany — studying Computer
              Science (B.Sc.) while completing vocational training in software
              development. I&apos;ve been building my own projects since 2022 and
              learn best by making real things.
            </p>
            <p>
              I build web and AI projects end-to-end with Next.js, TypeScript and
              Python (FastAPI), and I&apos;m currently going deeper into backend
              and database design through{" "}
              <span className="font-medium text-accent">FlowDesk</span>, an app for
              managing teams, projects and tasks.
            </p>
            <p>
              I&apos;m genuinely curious about how good software is built — and
              looking to join a team where I can learn from experienced developers
              and contribute as a junior.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="lg:pt-2"
        >
          {[
            { year: "2025 → 2027", title: "IHK — Application Developer", desc: "Fachinformatiker Anwendungsentwicklung" },
            { year: "2025 → 2028", title: "B.Sc. Computer Science", desc: "Online, parallel to the apprenticeship" },
            { year: "2022 → now", title: "Self-taught · Open source", desc: "20+ projects shipped, always shipping" },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="flex gap-5 border-t border-line py-6"
            >
              <p className="w-28 shrink-0 font-mono text-xs text-accent">
                {item.year}
              </p>
              <div>
                <p className="font-display font-semibold tracking-tight">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="px-6 py-32 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-3xl overflow-hidden text-center"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
          <PulseRings size={480} />
        </div>
        <p className="eyebrow mb-5">05 · Let&apos;s build</p>
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Got something in mind?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft">
          Open to freelance work, internships, collaborations — or just a good
          conversation about building things.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:giorgio.dettmar@gmx.de" className="btn-primary">
            Send an email
          </a>
          <a
            href="https://www.linkedin.com/in/giorgio-dettmar-4838b7250"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Giorgiod91"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-mono text-xs text-ink-soft">
          giorgio.dettmar@gmx.de
        </span>
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} Giorgio Dettmar
        </p>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <WhatIDo />
      <Skills />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
