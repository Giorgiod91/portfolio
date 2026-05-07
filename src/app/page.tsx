"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ── Animation variants ─────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ── Rotating text ──────────────────────────────────────────────────────────

function RotatingText({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -28, filter: "blur(10px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="block text-gradient"
      >
        {words[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

// ── Animated counter ───────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const dur = 1600;
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          setVal(Math.round((1 - (1 - p) ** 3) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Data ───────────────────────────────────────────────────────────────────

const HERO_WORDS = ["Full-Stack Dev.", "AI Builder.", "Problem Solver.", "Open Source."];

const PROJECTS = [
  {
    title: "CrackTheTest.ai",
    desc: "AI-powered test generator that creates personalized tests from any topic. Upload notes, get a full exam in seconds — powered by FastAPI & OpenAI.",
    tags: ["Next.js", "FastAPI", "OpenAI", "TypeScript", "Python"],
    category: "AI",
    accent: "cyan",
    github: "https://github.com/Giorgiod91/CrackTheTest",
    live: "https://crack-the-test.vercel.app",
    badge: "AI",
    icon: "🧠",
  },
  {
    title: "GamerConnect",
    desc: "Real-time platform for gamers to connect, match teammates and organize IRL meetups. Features Supabase live chat, neural matching & tournament hub.",
    tags: ["Next.js", "Supabase", "TypeScript", "Tailwind", "Framer Motion"],
    category: "Web",
    accent: "violet",
    github: "https://github.com/Giorgiod91/GamerConnect",
    live: "",
    badge: "Live",
    icon: "🎮",
  },
  {
    title: "Reactify",
    desc: "GPT-4 powered React component designer. Describe what you need, get production-ready components with TypeScript and Tailwind CSS instantly.",
    tags: ["Next.js", "GPT-4", "TypeScript", "Tailwind", "AI"],
    category: "AI",
    accent: "emerald",
    github: "https://github.com/Giorgiod91/AI-React-Component-Designer-Frontend",
    live: "",
    badge: "AI",
    icon: "⚛️",
  },
  {
    title: "PraktikumsFinder",
    desc: "Platform connecting career changers with IHK-certified companies. Python/FastAPI backend with smart filtering and automated company verification.",
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL"],
    category: "Web",
    accent: "orange",
    github: "https://github.com/Giorgiod91/PraktikumFinder",
    live: "",
    badge: "New",
    icon: "🔍",
  },
  {
    title: "PicturaSearch",
    desc: "AI image search that finds matching products on eBay using CNN models. Upload a photo, get real listings — no text queries needed.",
    tags: ["Python", "CNN", "eBay API", "TensorFlow", "FastAPI"],
    category: "AI",
    accent: "pink",
    github: "https://github.com/Giorgiod91",
    live: "",
    badge: "AI",
    icon: "🖼️",
  },
  {
    title: "EduProgress",
    desc: "Educational progress tracker with AI-powered insights. Students track goals, streaks, and learning velocity across subjects and courses.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    category: "Web",
    accent: "blue",
    github: "https://github.com/Giorgiod91/EduProgress",
    live: "",
    badge: "Beta",
    icon: "📚",
  },
];

const ACCENT_MAP: Record<string, { tag: string; badge: string; glow: string }> = {
  cyan:    { tag: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20",    badge: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20",    glow: "group-hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]" },
  violet:  { tag: "bg-violet-400/10 text-violet-300 border border-violet-400/20",  badge: "bg-violet-400/10 text-violet-300 border border-violet-400/20",  glow: "group-hover:shadow-[0_0_60px_rgba(167,139,250,0.12)]" },
  emerald: { tag: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20", badge: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20", glow: "group-hover:shadow-[0_0_60px_rgba(74,222,128,0.12)]" },
  orange:  { tag: "bg-orange-400/10 text-orange-300 border border-orange-400/20",  badge: "bg-orange-400/10 text-orange-300 border border-orange-400/20",  glow: "" },
  pink:    { tag: "bg-pink-400/10 text-pink-300 border border-pink-400/20",    badge: "bg-pink-400/10 text-pink-300 border border-pink-400/20",    glow: "" },
  blue:    { tag: "bg-blue-400/10 text-blue-300 border border-blue-400/20",    badge: "bg-blue-400/10 text-blue-300 border border-blue-400/20",    glow: "" },
};

const SKILLS = [
  { cat: "Frontend",  items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion"] },
  { cat: "Backend",   items: ["Python", "FastAPI", "Flask", "Node.js", "PHP", "Laravel", "Java"] },
  { cat: "AI & Data", items: ["OpenAI API", "LangChain", "TensorFlow", "CNN", "Claude API"] },
  { cat: "Database",  items: ["Supabase", "PostgreSQL", "MongoDB", "Firebase", "Prisma"] },
  { cat: "Tools",     items: ["Git", "GitHub", "Vercel", "Docker", "Cursor", "v0"] },
];

const STATS = [
  { to: 20, suffix: "+", label: "Projects Built" },
  { to: 8,  suffix: "+", label: "Tech Stacks" },
  { to: 2,  suffix: "",  label: "Degrees (ongoing)" },
  { to: 3,  suffix: "y", label: "Experience" },
];

// ── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-white/8 bg-slate-950/80 backdrop-blur-xl" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#" className="font-display text-sm tracking-[0.22em] text-cyan-100 uppercase transition-colors hover:text-white">
          GD
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Projects", "Skills", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link uppercase">
              {item}
            </a>
          ))}
        </nav>
        <a
          href="https://github.com/Giorgiod91"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-2.5 text-xs"
        >
          GitHub →
        </a>
      </div>
    </motion.header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-grid absolute inset-0" />
        <motion.div
          className="absolute -left-72 -top-40 h-[700px] w-[700px] rounded-full bg-cyan-500/14 blur-[140px]"
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 70, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-56 top-1/3 h-[550px] w-[650px] rounded-full bg-violet-500/10 blur-[130px]"
          animate={{ x: [0, -60, 40, 0], y: [0, 50, -40, 0] }}
          transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 h-[400px] w-[900px] rounded-full bg-emerald-500/8 blur-[120px]"
          animate={{ scaleX: [1, 1.4, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 pb-16 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs tracking-[0.26em] text-slate-300 uppercase backdrop-blur-xl"
            >
              <span className="dot-live" />
              Open to opportunities · Germany
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-display text-5xl leading-[1.06] sm:text-6xl lg:text-7xl"
            >
              Giorgio
              <br />
              Dettmar
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-display text-3xl sm:text-4xl"
            >
              <RotatingText words={HERO_WORDS} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              I build AI-powered web apps that solve real problems — from smart test generators to gaming platforms. Pursuing IHK certification + B.Sc. Computer Science.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.44 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                View Projects →
              </a>
              <a
                href="https://github.com/Giorgiod91"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
                GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              {[["Next.js", "🔷"], ["Python", "🐍"], ["AI/ML", "🤖"], ["TypeScript", "📘"]].map(([tech, icon]) => (
                <div key={tech} className="flex items-center gap-1.5 text-sm text-slate-500">
                  <span>{icon}</span>
                  <span>{tech}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="gradient-border relative overflow-hidden rounded-[2rem]">
              <div className="overflow-hidden rounded-[calc(2rem-1px)] border border-white/8 bg-slate-900/90 p-7 backdrop-blur-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-display text-xs tracking-widest text-cyan-300 uppercase">Profile</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] text-emerald-300">
                    <span className="dot-live" />
                    Available
                  </span>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/30 to-violet-500/30 text-2xl">
                    👨‍💻
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-slate-900 bg-emerald-400" />
                  </div>
                  <div>
                    <p className="font-display text-sm text-white">Giorgio Dettmar</p>
                    <p className="mt-0.5 text-xs text-slate-500">Full-Stack · AI · Germany</p>
                    <p className="mt-1 text-[10px] text-slate-600">IHK Azubi + B.Sc. CS</p>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3">
                  {STATS.map(({ to, suffix, label }) => (
                    <div key={label} className="rounded-xl border border-white/8 bg-white/4 p-3">
                      <p className="font-display text-2xl text-white">
                        <Counter to={to} suffix={suffix} />
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["AI Apps", "Next.js", "FastAPI", "Supabase"].map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[9px] tracking-[0.3em] text-slate-600 uppercase">Scroll</p>
          <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────

function Projects() {
  const [filter, setFilter] = useState<"All" | "AI" | "Web">("All");
  const tabs = ["All", "AI", "Web"] as const;
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="border-t border-white/6 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="mb-3 text-xs tracking-[0.24em] text-cyan-400 uppercase">
            Portfolio
          </motion.p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <motion.h2 variants={fadeUp} className="font-display text-3xl text-white sm:text-4xl">
              Projects that{" "}
              <span className="text-gradient">ship & scale.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="flex gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                    filter === t
                      ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30"
                      : "border border-white/8 text-slate-500 hover:text-slate-300 hover:border-white/15"
                  }`}
                >
                  {t}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const c = ACCENT_MAP[project.accent]!;
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`glass-card group flex flex-col transition-shadow ${c.glow}`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
                      {project.icon}
                    </div>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase ${c.badge}`}>
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="font-display mb-2 text-sm tracking-wider text-white">{project.title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">{project.desc}</p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${c.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/6 pt-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-white">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                      </svg>
                      Code
                    </a>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-cyan-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    <span className="ml-auto text-[10px] text-slate-600 opacity-0 transition-opacity group-hover:opacity-100">
                      View →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="border-t border-white/6 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14"
        >
          <motion.p variants={fadeUp} className="mb-3 text-xs tracking-[0.24em] text-cyan-400 uppercase">
            Tech Stack
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-3xl text-white sm:text-4xl">
            Tools I build with.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {SKILLS.map(({ cat, items }) => (
            <motion.div key={cat} variants={fadeUp} className="space-y-3">
              <p className="text-xs tracking-[0.2em] text-slate-500 uppercase font-semibold">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="skill-badge">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="border-t border-white/6 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p variants={fadeUp} className="mb-3 text-xs tracking-[0.24em] text-cyan-400 uppercase">
              About
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display mb-6 text-3xl text-white sm:text-4xl">
              Building things that{" "}
              <span className="text-gradient">actually matter.</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-sm leading-relaxed text-slate-400">
              <p>
                I&apos;m a Full-Stack Developer from Germany, currently pursuing my IHK certification in application development (until 2027) and a B.Sc. in Computer Science simultaneously.
              </p>
              <p>
                My focus is on AI-powered applications — combining modern web tech like Next.js with Python backends and LLM APIs to build tools that genuinely solve problems.
              </p>
              <p>
                I work with AI coding tools (Claude, Cursor, v0) daily and believe in shipping fast, iterating faster, and learning from every deploy.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a href="https://github.com/Giorgiod91" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                GitHub Profile →
              </a>
              <a href="#contact" className="btn-secondary text-sm">Get in Touch</a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {[
              { year: "2024–2027", title: "IHK — Application Developer",  desc: "Fachinformatiker Anwendungsentwicklung",           color: "cyan" },
              { year: "2024–now",  title: "B.Sc. Computer Science",        desc: "Online university — parallel to training",         color: "violet" },
              { year: "2023–now",  title: "Freelance Development",         desc: "Full-stack projects, AI integrations, SaaS apps",  color: "emerald" },
              { year: "2022–now",  title: "Self-taught & Open Source",     desc: "20+ projects shipped, constantly learning",        color: "orange" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 rounded-xl border border-white/8 bg-white/3 p-4 backdrop-blur-sm"
              >
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  item.color === "cyan" ? "bg-cyan-400" :
                  item.color === "violet" ? "bg-violet-400" :
                  item.color === "emerald" ? "bg-emerald-400" : "bg-orange-400"
                }`} />
                <div>
                  <p className="mb-0.5 text-[10px] text-slate-500">{item.year}</p>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-border relative overflow-hidden rounded-3xl p-12 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.07) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)" }}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="relative mb-3 text-xs tracking-[0.26em] text-cyan-400 uppercase"
          >
            Let&apos;s Work Together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative font-display text-4xl text-white sm:text-5xl"
          >
            Got a project <span className="text-gradient">in mind?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-400"
          >
            I&apos;m always open to interesting projects, collaborations, or just a good conversation about building things.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="mailto:giorgio.dettmar@gmx.de" className="btn-primary px-8 py-4 text-base">
              Send Email →
            </a>
            <a href="https://github.com/Giorgiod91" target="_blank" rel="noopener noreferrer" className="btn-secondary px-8 py-4 text-base">
              GitHub Profile
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-xs text-slate-600 sm:flex-row sm:px-8">
        <span className="font-display tracking-[0.2em] text-slate-600 uppercase">Giorgio Dettmar</span>
        <p>© 2025 · Built with Next.js & Framer Motion</p>
        <div className="flex items-center gap-1.5">
          <span className="dot-live" style={{ width: 5, height: 5 }} />
          <span>All systems go</span>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
