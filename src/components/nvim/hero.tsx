"use client";

import { motion } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Kbd } from "~/components/ui/kbd";

import { ease, LetterReveal } from "./motion";
import { goTo } from "./shell";

export function Hero() {
  return (
    <section
      id="start"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-20 pb-16 sm:px-8"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ── Left ─────────────────────────────── */}
        <div className="flex flex-col items-start gap-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="rounded-full px-3 py-1">
              Hannover · Fachinformatiker AE (IHK) · Abschluss 2027
            </Badge>
          </motion.div>

          <h1 className="text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.05em] [perspective:800px]">
            <LetterReveal text="Giorgio" animateOnMount delay={0.15} className="text-fg" />
            <br />
            <LetterReveal text="Dettmar" animateOnMount delay={0.4} className="text-blue" />
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="cursor-block ml-[0.06em] h-[0.78em] w-[0.42em] bg-blue align-baseline"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-base text-fg"
          >
            <span className="text-green">❯</span> Software Engineer · Next.js
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="max-w-xl text-lg leading-relaxed text-fg-soft"
          >
            Web-Apps mit Next.js und TypeScript, von der Datenbank bis zum
            Deployment. Gerade im Praktikum bei{" "}
            <strong className="font-semibold text-fg">Digital Cuisine</strong>,
            Abschluss als Fachinformatiker (IHK) 2027 und parallel ein
            Informatik-Studium.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="flex flex-wrap gap-3"
          >
            <Button onClick={() => goTo("projekte")} className="group">
              Projekte ansehen
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" onClick={() => goTo("kontakt")}>
              Kontakt
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="hidden font-mono text-xs text-fg-faint sm:block"
          >
            Tipp: <Kbd>:</Kbd> Befehle · <Kbd>j</Kbd> <Kbd>k</Kbd> scrollen
          </motion.p>
        </div>

        {/* ── Right ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="flex justify-center lg:justify-end"
        >
          <ReadmeWindow />
        </motion.div>
      </div>
    </section>
  );
}

// ── Floating Neovim window with a readable README ─────────────────────────────────

type Line = { text?: React.ReactNode; tone?: "h1" | "h2" | "item" | "plain" };

const README: Line[] = [
  { text: "# Giorgio Dettmar", tone: "h1" },
  {},
  { text: "Software Engineer aus Hannover.", tone: "plain" },
  {},
  { text: "## Gerade", tone: "h2" },
  { text: "Praktikum bei Digital Cuisine", tone: "item" },
  { text: "Fachinformatiker AE (IHK) · bis 2027", tone: "item" },
  { text: "B.Sc. Informatik · bis 2028", tone: "item" },
  {},
  { text: "## Gebaut", tone: "h2" },
  {
    text: (
      <>
        <span className="text-cyan">[AP1 Ready]</span>, <span className="text-cyan">[GamerConnect]</span>, …
      </>
    ),
    tone: "item",
  },
  { text: "20+ Projekte seit 2022", tone: "item" },
];

const TONE: Record<NonNullable<Line["tone"]>, string> = {
  h1: "font-bold text-blue",
  h2: "font-bold text-magenta",
  item: "text-fg",
  plain: "text-fg",
};

function ReadmeWindow() {
  const last = README.length - 1;
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[500px]"
    >
      <div className="overflow-hidden rounded-xl border border-line bg-panel font-mono text-[13px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]">
        <div className="flex items-stretch border-b border-line bg-bg text-xs">
          <span className="flex items-center gap-1.5 px-3 py-2.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red" />
            <span className="size-2.5 rounded-full bg-yellow" />
            <span className="size-2.5 rounded-full bg-green" />
          </span>
          <span className="relative flex items-center bg-panel px-3 text-fg">
            <span className="absolute inset-x-0 top-0 h-0.5 bg-blue" />
            README.md
          </span>
        </div>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
          initial="hidden"
          animate="show"
          className="py-4 leading-7"
        >
          {README.map((line, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
              className={`flex gap-4 px-4 ${i === last ? "bg-blue/[0.07]" : ""}`}
            >
              <span className={`w-5 shrink-0 text-right select-none ${i === last ? "text-fg" : "text-gutter"}`}>
                {i + 1}
              </span>
              <span className={`min-w-0 truncate ${line.tone ? TONE[line.tone] : ""}`}>
                {line.tone === "item" && <span className="text-orange">- </span>}
                {line.text}
                {i === last && <span className="cursor-block ml-0.5 h-[1.1em] w-[0.55em] bg-fg" aria-hidden />}
              </span>
            </motion.div>
          ))}
          <div className="px-4 text-gutter" aria-hidden>~</div>
        </motion.div>

        <div className="flex items-stretch border-t border-line text-[11px]">
          <span className="bg-blue px-2.5 py-1 font-bold text-bg">NORMAL</span>
          <span className="flex items-center gap-1 bg-panel-2 px-2.5 text-fg-soft">
            <GitBranch className="size-3" aria-hidden /> main
          </span>
          <span className="flex flex-1 items-center px-2.5 text-fg">README.md</span>
          <span className="flex items-center px-2.5 text-fg-faint">markdown</span>
          <span className="flex items-center bg-blue px-2.5 text-bg">{README.length}:24</span>
        </div>
      </div>
    </motion.div>
  );
}
