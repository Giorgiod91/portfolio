"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";
import { useRef } from "react";

import { LINKS } from "./data";
import { GithubIcon } from "./icons";
import { ease, Magnetic, WordReveal } from "./motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const winY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <header ref={ref} id="start" className="relative overflow-hidden">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-320px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(122,162,247,.18),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <nav className="flex items-center justify-between py-6">
          <a href="#start" className="flex items-center gap-1.5 font-mono font-bold">
            giorgio<span className="caret h-[18px] w-[9px] bg-blue" />
          </a>
          <div className="hidden gap-7 text-sm text-fg2 md:flex">
            <a href="#erfahrung" className="hover:text-fg">Erfahrung</a>
            <a href="#atlas" className="hover:text-fg">Session Atlas</a>
            <a href="#projekte" className="hover:text-fg">Projekte</a>
            <a href="#kontakt" className="hover:text-fg">Kontakt</a>
          </div>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-line2 px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-card"
          >
            <GithubIcon className="size-4" /> GitHub
          </a>
        </nav>

        <div className="grid items-center gap-14 pt-10 pb-24 lg:grid-cols-[1.05fr_.95fr] lg:pt-16 lg:pb-32">
          <motion.div style={{ y: textY }} className="min-w-0">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-line2 bg-white/[0.03] py-1.5 pr-4 pl-2.5 text-[13px] text-fg2"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-green/60" />
                <span className="size-2 rounded-full bg-green" />
              </span>
              Praktikum bei Digital Cuisine · läuft
            </motion.span>

            <h1 className="mt-6 mb-4 text-[clamp(2.6rem,5.2vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.045em]">
              <WordReveal text="Giorgio Dettmar" delay={0.1} />
              <br />
              <WordReveal text="Software Engineer" delay={0.35} className="text-gradient text-[0.78em]" />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-5 font-mono text-[15px] text-fg2"
            >
              <span className="text-green">❯</span> Next.js · TypeScript · Python · Hannover
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mb-8 max-w-xl text-lg leading-relaxed text-fg2"
            >
              Web-Apps mit Next.js, TypeScript und Python, Frontend und Backend. Gerade im Praktikum bei{" "}
              <strong className="font-semibold text-fg">Digital Cuisine</strong>, Abschluss als Fachinformatiker (IHK)
              2027, parallel <strong className="font-semibold text-fg">B.Sc. Computer Science</strong>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease }}
              className="flex flex-wrap gap-3"
            >
              <Magnetic>
                <a
                  href="#kontakt"
                  className="group inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 font-semibold text-bg shadow-[0_10px_30px_-10px_rgba(238,240,246,.45)]"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#projekte"
                  className="inline-flex items-center rounded-xl border border-line2 px-5 py-3 font-semibold transition-colors hover:bg-card"
                >
                  Projekte ansehen
                </a>
              </Magnetic>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-8 hidden font-mono text-xs text-fg3 sm:block"
            >
              Tipp: <Kbd>:</Kbd> öffnet Befehle · <Kbd>j</Kbd> <Kbd>k</Kbd> scrollt
            </motion.p>
          </motion.div>

          <motion.div
            style={{ y: winY }}
            className="min-w-0"
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <CodeWindow />
          </motion.div>
        </div>
      </div>
    </header>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-line2 bg-bg2 px-1.5 py-px text-fg2">{children}</kbd>;
}

// ── Floating Neovim window ────────────────────────────────────────────────

const k = (s: string) => <span className="text-magenta">{s}</span>;
const s = (v: string) => <span className="text-green">&quot;{v}&quot;</span>;
const c = (v: string) => <span className="text-fg3 italic">{v}</span>;

const CODE: React.ReactNode[] = [
  <>{k("const")} <span className="text-blue">giorgio</span> = {"{"}</>,
  <>  rolle: {s("Software Engineer")},</>,
  <>  ort: {s("Hannover")},</>,
  <>  praktikum: {s("Digital Cuisine")},</>,
  <>  stack: [{s("Next.js")}, {s("TypeScript")}, {s("Python")}],</>,
  <>  gebaut: [</>,
  <>    {s("Kunden-Plattform")}, {c("// Frontend + Backend")}</>,
  <>    {s("Interne Bestell-App")}, {c("// Next.js + SQLite")}</>,
  <>    {s("Session Atlas")}, {c("// Electron")}</>,
  <>  ],</>,
  <>  ausbildung: {s("Fachinformatiker AE")}, {c("// IHK 2027")}</>,
  <>  studium: {s("B.Sc. Computer Science")}, {c("// 2028")}</>,
  <>{"};"}</>,
];

function CodeWindow() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="overflow-hidden rounded-2xl border border-line2 bg-gradient-to-b from-[#151821] to-[#10121a] font-mono text-[13px] leading-[1.85] shadow-[0_50px_100px_-30px_rgba(0,0,0,.8),0_0_0_1px_rgba(122,162,247,.06)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-fg3">~/giorgio/profil.ts — nvim</span>
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.7 } } }}
        className="overflow-x-auto py-4"
      >
        {CODE.map((line, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
            className={`flex gap-4 px-4 whitespace-pre ${i === CODE.length - 1 ? "bg-blue/[0.08]" : ""}`}
          >
            <span className={`w-5 shrink-0 text-right select-none ${i === CODE.length - 1 ? "text-yellow" : "text-gutter"}`}>
              {i + 1}
            </span>
            <span>
              {line}
              {i === CODE.length - 1 && <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.55em] bg-fg align-text-bottom" />}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex items-stretch border-t border-line text-[11.5px]">
        <span className="bg-blue px-2.5 py-1 font-bold text-bg">NORMAL</span>
        <span className="flex items-center gap-1 px-2.5 text-fg2">
          <GitBranch className="size-3" aria-hidden /> main
        </span>
        <span className="flex-1" />
        <span className="flex items-center px-2.5 text-fg3">typescript</span>
        <span className="flex items-center px-2.5 text-fg2">{CODE.length}:1</span>
      </div>
    </motion.div>
  );
}
