"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Variants ───────────────────────────────────────────────────────────────

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Data ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    num: "01",
    title: "CrackTheTest.ai",
    desc: "AI test generator with Stripe payments, Supabase auth & FastAPI backend. Upload notes → get a full exam.",
    tags: ["Next.js", "FastAPI", "OpenAI", "Supabase", "Stripe"],
    category: "AI",
    github: "https://github.com/Giorgiod91/CrackTheTest",
    live: "https://crack-the-test.vercel.app",
    icon: "🧠",
    screenshot: "/screenshots/crackthetest3.png",
    previewGradient:
      "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    previewAccent: "#6366f1",
    badge: "AI · Live",
  },
  {
    num: "02",
    title: "GamerConnect",
    desc: "Real-time gaming platform with AI teammate matching, Supabase live chat & tournament hub. T3 stack.",
    tags: ["Next.js", "Supabase", "TypeScript", "Framer Motion"],
    category: "Web",
    github: "https://github.com/Giorgiod91/GamerConnect",
    live: "https://gamer-connect-chi.vercel.app/",
    icon: "🎮",
    screenshot: "/screenshots/gamerconnect2.png",
    previewGradient:
      "linear-gradient(135deg, #020617 0%, #0c1445 50%, #0e2a5e 100%)",
    previewAccent: "#22d3ee",
    badge: "Web · Live",
  },
  {
    num: "03",
    title: "Go2Spot",
    desc: "Travel discovery app — finds attractions & hidden gems in any city. Personalized via Python ML backend.",
    tags: ["TypeScript", "Next.js", "Python", "ML", "Maps API"],
    category: "AI",
    github: "https://github.com/Giorgiod91/-Go2Spot",
    live: "https://go2-spot.vercel.app/",
    icon: "🗺️",
    screenshot: "/screenshots/go2spot2.png",
    previewGradient:
      "linear-gradient(135deg, #080c04 0%, #0e1a08 50%, #142810 100%)",
    previewAccent: "#86efac",
    badge: "AI · Travel",
  },
  {
    num: "04",
    title: "PicturaSearch",
    desc: "Upload a photo → CNN model finds matching products on eBay. Visual search, no text queries needed.",
    tags: ["TypeScript", "Python", "CNN", "eBay API", "ML"],
    category: "AI",
    github: "https://github.com/Giorgiod91/picturaSearch",
    live: "https://picturasearch.vercel.app",
    icon: "🖼️",
    screenshot: "/screenshots/picturasearch.png",
    previewGradient:
      "linear-gradient(135deg, #0a0010 0%, #1a0030 50%, #2d0050 100%)",
    previewAccent: "#c084fc",
    badge: "AI · CV · Live",
  },
  {
    num: "05",
    title: "Reactify",
    desc: "Describe a UI component → get production-ready TypeScript + Tailwind code instantly. GPT-4 powered.",
    tags: ["Next.js", "GPT-4", "Flask", "TypeScript", "OpenAI"],
    category: "AI",
    github:
      "https://github.com/Giorgiod91/AI-React-Component-Designer-Frontend",
    live: "https://aicomponentgenerator-nine.vercel.app/",
    icon: "⚛️",
    screenshot: "/screenshots/reactify2.png",
    previewGradient:
      "linear-gradient(135deg, #0a0f1e 0%, #0d2137 50%, #0a3d62 100%)",
    previewAccent: "#38bdf8",
    badge: "AI · Live",
  },
  {
    num: "06",
    title: "PraktikumsFinder",
    desc: "Connects career-changers with IHK-certified companies. Smart location filters & automated verification.",
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL"],
    category: "Web",
    github: "https://github.com/Giorgiod91/PraktikumFinder",
    live: "https://praktikumsfinder.vercel.app/",
    icon: "🔍",
    screenshot: "/screenshots/praktikumsfinder2.png",
    previewGradient:
      "linear-gradient(135deg, #0c0a00 0%, #1c1400 50%, #292000 100%)",
    previewAccent: "#fbbf24",
    badge: "Web · Live",
  },
  {
    num: "07",
    title: "EduProgress",
    desc: "Study tracker with visual dashboards, streaks & AI insights. Track goals and learning velocity.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    category: "Web",
    github: "https://github.com/Giorgiod91/EduProgress",
    live: "https://edu-progress.vercel.app/",
    icon: "📚",
    screenshot: "/screenshots/eduprogress.png",
    previewGradient:
      "linear-gradient(135deg, #000d0a 0%, #001a12 50%, #00301f 100%)",
    previewAccent: "#34d399",
    badge: "Web · Live",
  },
  {
    num: "08",
    title: "AntiCheat AI",
    desc: "Anti-cheat system with TypeScript frontend & Python ML backend that detects suspicious behaviour in real time.",
    tags: ["TypeScript", "Python", "AI", "Next.js", "ML"],
    category: "AI",
    github: "https://github.com/Giorgiod91/AntiCheatAIFrontend",
    live: "",
    icon: "🛡️",
    screenshot: null as string | null,
    previewGradient:
      "linear-gradient(135deg, #0c0004 0%, #1a000a 50%, #280010 100%)",
    previewAccent: "#fb7185",
    badge: "AI · Security",
  },
];

const SKILLS = [
  {
    cat: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    cat: "Backend",
    items: ["Python", "FastAPI", "Flask", "Node.js", "Laravel"],
  },
  {
    cat: "AI",
    items: ["OpenAI API", "LangChain", "TensorFlow", "CNN", "Claude"],
  },
  { cat: "Database", items: ["Supabase", "PostgreSQL", "MongoDB", "Prisma"] },
  { cat: "Tools", items: ["Git", "Vercel", "Docker", "Cursor", "v0"] },
];

const MARQUEE_ITEMS = [
  "Next.js",
  "•",
  "TypeScript",
  "•",
  "Python",
  "•",
  "FastAPI",
  "•",
  "OpenAI",
  "•",
  "Supabase",
  "•",
  "React",
  "•",
  "TailwindCSS",
  "•",
  "Framer Motion",
  "•",
  "PostgreSQL",
  "•",
  "•",
  "Vercel",
  "•",
  "LangChain",
  "•",
  "CNN",
  "•",
  "Claude API",
  "•",
  "Node.js",
  "•",
];

// ── Project Preview (browser mockup) ──────────────────────────────────────

function ProjectPreview({ project }: { project: (typeof PROJECTS)[0] }) {
  const urlLabel = project.live
    ? project.live.replace("https://", "").replace(/\/$/, "")
    : `${project.title.toLowerCase().replace(/[^a-z]/g, "")}.app`;

  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-white/8">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/6 bg-white/4 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <div className="mx-2 flex-1 rounded bg-white/6 px-2 py-0.5 text-center font-mono text-[9px] text-slate-600">
          {urlLabel}
        </div>
      </div>

      {/* Preview area — real screenshot OR styled gradient */}
      {project.screenshot ? (
        <div className="relative h-28 overflow-hidden">
          <Image
            src={project.screenshot}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span
            className="absolute right-2 top-2 rounded-md px-2 py-0.5 text-[9px] font-bold tracking-wider"
            style={{
              background: `${project.previewAccent}33`,
              color: project.previewAccent,
              border: `1px solid ${project.previewAccent}55`,
            }}
          >
            {project.badge}
          </span>
        </div>
      ) : (
        <div
          className="relative flex h-28 items-center justify-center overflow-hidden"
          style={{ background: project.previewGradient }}
        >
          <div
            className="absolute h-24 w-24 rounded-full blur-3xl opacity-40"
            style={{ background: project.previewAccent }}
          />
          <div className="relative z-10 text-center">
            <div className="mb-1.5 text-2xl">{project.icon}</div>
            <p className="font-display text-[10px] tracking-widest text-white/80 uppercase">
              {project.title}
            </p>
          </div>
          <span
            className="absolute right-2 top-2 rounded-md px-2 py-0.5 text-[9px] font-bold tracking-wider"
            style={{
              background: `${project.previewAccent}33`,
              color: project.previewAccent,
              border: `1px solid ${project.previewAccent}55`,
            }}
          >
            {project.badge}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/6 bg-[#08080c]/90 backdrop-blur-xl"
          : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#"
          className="font-mono text-sm font-bold text-orange-400 transition-colors hover:text-orange-300"
        >
          gd
          <span className="cursor-blink" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {["Work", "Stack", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
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

const CODE_LINES = [
  { indent: 0, text: "const developer = {", color: "#f1f5f9" },
  { indent: 1, text: 'name:     "Giorgio Dettmar",', color: "#94a3b8" },
  { indent: 1, text: 'location: "Germany 🇩🇪",', color: "#94a3b8" },
  {
    indent: 1,
    text: 'focus:    ["AI", "Next.js", "Python"],',
    color: "#94a3b8",
  },
  { indent: 1, text: 'status:   "available",', color: "#4ade80" },
  { indent: 1, text: 'building: "20+ projects",', color: "#94a3b8" },
  { indent: 0, text: "};", color: "#f1f5f9" },
];

function CodeCard() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= CODE_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 160);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="terminal-card w-full max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500/70" />
        <span className="terminal-dot bg-yellow-500/70" />
        <span className="terminal-dot bg-green-500/70" />
        <span className="ml-3 font-mono text-[11px] text-slate-600">
          developer.ts
        </span>
      </div>

      {/* Code body */}
      <div className="p-5 font-mono text-[13px] leading-relaxed">
        {/* Line numbers + code */}
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            className={`flex gap-4 transition-opacity duration-200 ${i < visible ? "opacity-100" : "opacity-0"}`}
          >
            <span className="w-4 shrink-0 text-right text-slate-700 select-none">
              {i + 1}
            </span>
            <span style={{ color: line.color, paddingLeft: line.indent * 16 }}>
              {/* Highlight keywords */}
              {line.text
                .split(/(["'][^"']*["']|true|false|\[.*?\])/g)
                .map((part, j) => {
                  if (part.startsWith('"') || part.startsWith("'"))
                    return (
                      <span key={j} style={{ color: "#fb923c" }}>
                        {part}
                      </span>
                    );
                  if (part === "true" || part === "false")
                    return (
                      <span key={j} style={{ color: "#4ade80" }}>
                        {part}
                      </span>
                    );
                  if (part.startsWith("["))
                    return (
                      <span key={j} style={{ color: "#fbbf24" }}>
                        {part}
                      </span>
                    );
                  return <span key={j}>{part}</span>;
                })}
            </span>
          </div>
        ))}

        {/* Blinking cursor */}
        {visible >= CODE_LINES.length && (
          <div className="flex gap-4 mt-1">
            <span className="w-4 text-right text-slate-700 select-none">
              {CODE_LINES.length + 1}
            </span>
            <span className="cursor-blink" />
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="border-t border-white/6 grid grid-cols-3 divide-x divide-white/6">
        {[
          ["TypeScript", "✓"],
          ["Node 24", "✓"],
          ["Ready", "🟢"],
        ].map(([label, val]) => (
          <div key={label} className="px-4 py-2.5">
            <p className="font-mono text-[9px] text-slate-600">{label}</p>
            <p className="font-mono text-xs text-slate-300">{val}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Warm orange glow — bottom right */}
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-orange-600/15 blur-[120px]" />
        {/* Subtle amber — top left */}
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
        {/* Extra center glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[140px]" />
        {/* Horizontal rule lines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, transparent 1px, transparent 64px)",
            backgroundSize: "100% 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-orange-400/20 bg-orange-400/6 px-4 py-2 text-xs tracking-[0.2em] text-orange-300 uppercase"
            >
              <span className="dot-live" />
              Open to work · Germany
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[1.02] tracking-tight"
            >
              Giorgio
              <br />
              <span className="text-gradient">Dettmar.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-5 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              Full-Stack Developer building AI-powered apps that solve real
              problems. Next.js · Python · FastAPI · OpenAI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a href="#work" className="btn-primary">
                See my Work →
              </a>
              <a href="mailto:giorgio.dettmar@gmx.de" className="btn-secondary">
                Get in Touch
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mt-12 flex flex-wrap gap-8"
            >
              {[
                ["20+", "Projects"],
                ["AI", "Powered"],
                ["IHK + B.Sc.", "Education"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl text-white">{val}</p>
                  <p className="mt-0.5 text-xs text-slate-600">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — code card */}
          <CodeCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <p className="font-mono text-[9px] tracking-[0.3em] text-slate-700 uppercase">
          scroll
        </p>
        <div className="h-8 w-px bg-gradient-to-b from-slate-700 to-transparent" />
      </motion.div>
    </section>
  );
}

// ── Marquee ────────────────────────────────────────────────────────────────

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="border-y border-white/8 bg-white/[0.03] py-4 overflow-hidden">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            className={`px-4 font-mono text-xs whitespace-nowrap ${
              item === "•" ? "text-orange-400/70" : "text-slate-500"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────

function Projects() {
  const [filter, setFilter] = useState<"All" | "AI" | "Web">("All");
  const tabs = ["All", "AI", "Web"] as const;
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="relative">
            <span className="section-num">01</span>
            <motion.p
              variants={fadeUp}
              className="mb-2 font-mono text-[11px] tracking-[0.2em] text-orange-400 uppercase"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl text-white sm:text-4xl"
            >
              Projects that <span className="text-gradient">ship.</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="flex gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-lg px-4 py-1.5 font-mono text-xs tracking-wider uppercase transition-all ${
                  filter === t
                    ? "bg-orange-500/15 text-orange-300 border border-orange-500/30"
                    : "border border-white/8 text-slate-600 hover:text-slate-400 hover:border-white/15"
                }`}
              >
                {t}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="project-card group flex flex-col"
              >
                {/* Preview image */}
                <ProjectPreview project={project} />

                {/* Number */}
                <p className="mb-2 font-mono text-[10px] text-slate-700">
                  {project.num}
                </p>

                <h3 className="font-display mb-2 text-sm tracking-wider text-white">
                  {project.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-400">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/8 bg-white/4 px-2 py-0.5 font-mono text-[10px] text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs text-slate-600 transition-colors hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                    </svg>
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs text-slate-600 transition-colors hover:text-orange-400"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-3.5 w-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                      Live
                    </a>
                  )}
                  <span className="ml-auto font-mono text-[10px] text-orange-500/0 transition-all group-hover:text-orange-500/70">
                    view →
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ── Stack ──────────────────────────────────────────────────────────────────

function Stack() {
  return (
    <section id="stack" className="border-t border-white/5 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14"
        >
          <div className="relative">
            <span className="section-num">02</span>
            <motion.p
              variants={fadeUp}
              className="mb-2 font-mono text-[11px] tracking-[0.2em] text-orange-400 uppercase"
            >
              Tech Stack
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl text-white sm:text-4xl"
            >
              Tools I build with.
            </motion.h2>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {SKILLS.map(({ cat, items }) => (
            <motion.div key={cat} variants={fadeUp} className="space-y-3">
              <p className="font-mono text-[10px] tracking-[0.15em] text-orange-500/70 uppercase">
                {cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="skill-badge">
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

// ── About ──────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="border-t border-white/5 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative">
              <span className="section-num">03</span>
              <motion.p
                variants={fadeUp}
                className="mb-2 font-mono text-[11px] tracking-[0.2em] text-orange-400 uppercase"
              >
                About
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display mb-6 text-3xl text-white sm:text-4xl"
              >
                Building things that{" "}
                <span className="text-gradient">matter.</span>
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="space-y-4 text-sm leading-relaxed text-slate-400"
            >
              <p>
                I&apos;m a Full-Stack Developer from Germany, simultaneously
                pursuing an IHK certification in application development (until
                2027) and a B.Sc. in Computer Science.
              </p>
              <p>
                I&apos;m obsessed with AI-powered applications — combining
                Next.js frontends with Python/FastAPI backends and LLM APIs to
                build tools that genuinely solve problems.
              </p>
              <p>
                I work with Claude, Cursor, and v0 daily. I believe in shipping
                fast, iterating relentlessly, and learning from every
                deployment.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/Giorgiod91"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                GitHub →
              </a>
              <a href="#contact" className="btn-secondary text-sm">
                Contact
              </a>
            </motion.div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {[
              {
                year: "2025 → 2027",
                title: "IHK — Application Developer",
                desc: "Fachinformatiker Anwendungsentwicklung",
                dot: "#f97316",
              },
              {
                year: "2025 → 2028",
                title: "B.Sc. Computer Science",
                desc: "Online university, parallel to training",
                dot: "#fbbf24",
              },
              {
                year: "2022 → now",
                title: "Self-taught · Open Source",
                desc: "20+ projects shipped, always learning",
                dot: "#818cf8",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4 rounded-xl border border-white/6 bg-white/2 p-4 transition-colors hover:border-orange-500/20 hover:bg-orange-500/3"
              >
                <div
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: item.dot }}
                />
                <div>
                  <p className="mb-0.5 font-mono text-[10px] text-slate-600">
                    {item.year}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-600">{item.desc}</p>
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
    <section id="contact" className="border-t border-white/5 py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-orange-500/15 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 p-12 text-center"
        >
          {/* Corner glow */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-orange-600/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-amber-500/8 blur-3xl" />

          <div className="relative">
            <p className="mb-3 font-mono text-[11px] tracking-[0.2em] text-orange-400 uppercase">
              04 · Let&apos;s Build Together
            </p>
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Got a project <span className="text-gradient">in mind?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              Open to interesting projects, internships, collaborations, or just
              a good conversation about building things.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:giorgio.dettmar@gmx.de"
                className="btn-primary px-8 py-4 text-base"
              >
                Send Email →
              </a>
              <a
                href="https://github.com/Giorgiod91"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4 text-base"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8">
        <span className="font-mono text-xs text-slate-700">
          giorgio.dettmar@gmx.de
        </span>
        <p className="font-mono text-xs text-slate-700">
          © 2025 Giorgio Dettmar
        </p>
        <div className="flex items-center gap-1.5">
          <span className="dot-live" style={{ width: 5, height: 5 }} />
          <span className="font-mono text-xs text-slate-700">
            all systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="noise-bg relative min-h-screen overflow-x-hidden bg-[#0d1117] text-white">
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Stack />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
