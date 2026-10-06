"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Container,
  GitBranch,
  LayoutPanelLeft,
  LoaderCircle,
  Mail,
  ScanText,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Kbd } from "~/components/ui/kbd";
import { cn } from "~/lib/utils";

import { HISTORY, LINKS, PROJECTS, SECTIONS, STACK, type Project, type SectionId } from "./data";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ease, LetterReveal, Magnetic, rise, SpotlightCard, stagger } from "./motion";

// ── Buffer: a section framed like a Neovim window ────────────────────────────────

function Buffer({
  id,
  title,
  sub,
  children,
}: {
  id: SectionId;
  title: string;
  sub?: React.ReactNode;
  children: React.ReactNode;
}) {
  const index = SECTIONS.findIndex((s) => s.id === id);
  const section = SECTIONS[index];
  return (
    <section id={id} className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-12 flex flex-col gap-4"
        >
          <motion.div variants={rise} className="flex items-center gap-3 font-mono text-xs">
            <span className="text-gutter">{String(index + 1).padStart(2, "0")}</span>
            <span className={section.color}>{section.file}</span>
            <motion.span
              className="h-px flex-1 origin-left bg-gradient-to-r from-line-strong to-transparent"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease } } }}
            />
          </motion.div>
          <h2 className="text-5xl font-semibold tracking-[-0.04em] text-fg [perspective:600px] sm:text-7xl">
            <motion.span variants={rise} className="mr-4 inline-block font-mono text-blue/70">
              #
            </motion.span>
            <LetterReveal text={title} delay={0.1} />
          </h2>
          {sub && (
            <motion.div variants={rise} className="max-w-2xl text-lg text-fg-soft">
              {sub}
            </motion.div>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// ── Praxis ────────────────────────────────────────────────────────────────────────

const DIFF: { sign: "-" | "+"; text: string }[] = [
  { sign: "-", text: "alte Anwendung, schwer zu überblicken" },
  { sign: "+", text: "Next.js-Plattform für Mitarbeitende & Admins" },
  { sign: "+", text: "Verträge ansehen und neu anlegen" },
  { sign: "+", text: "Laufzeiten im Blick: was läuft wann aus" },
  { sign: "+", text: "SMS automatisch versenden" },
  { sign: "+", text: "PDF-Import direkt in die Datenbank" },
];

function MigrationCard() {
  return (
    <Card className="group md:col-span-2">
      <CardHeader>
        <Badge variant="blue" className="w-fit">migration</Badge>
        <CardTitle className="flex flex-wrap items-center gap-3 text-2xl sm:text-3xl">
          <span className="text-fg-faint line-through decoration-red/60">Legacy</span>
          <motion.span
            aria-hidden
            className="text-blue"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
          <span>Next.js</span>
        </CardTitle>
        <CardDescription className="max-w-xl text-base">
          Eine Kunden-Plattform neu aufgebaut: Mitarbeitende und Admins sehen
          ihre Verträge, legen neue an und erkennen, wann sie auslaufen. SMS
          gehen automatisch raus.
        </CardDescription>
      </CardHeader>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="mx-6 mb-6 overflow-hidden rounded-lg border border-line bg-bg/70 font-mono text-[13px]"
      >
        <div className="border-b border-line px-4 py-2 text-xs text-fg-faint">
          git diff --stat kunden-app
        </div>
        {DIFF.map((d, i) => (
          <motion.div
            key={d.text}
            variants={{
              hidden: { opacity: 0, x: -10 },
              show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
            }}
            className={cn(
              "flex gap-4 px-4 py-1.5",
              d.sign === "-" ? "bg-red/10 text-red" : "bg-green/[0.07] text-green",
            )}
          >
            <span className="w-4 text-right text-gutter">{i + 1}</span>
            <span>{d.sign}</span>
            <span>{d.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
}

function PdfCard() {
  const steps = ["PDF", "Python", "DB"];
  return (
    <Card>
      <CardHeader>
        <Badge variant="orange" className="w-fit">
          <ScanText className="size-3" aria-hidden /> pdf-import
        </Badge>
        <CardTitle>Daten aus PDFs</CardTitle>
        <CardDescription>
          Ein Python-Service liest die Daten aus PDFs und schreibt sie direkt in
          die Datenbank. Faxe laufen vorher durch Tesseract (OCR).
        </CardDescription>
      </CardHeader>
      <div className="relative mx-6 mb-6 flex items-center justify-between font-mono text-xs">
        <div className="absolute inset-x-6 top-1/2 h-px bg-line-strong" aria-hidden />
        <motion.span
          aria-hidden
          className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_12px_var(--color-orange)]"
          animate={{ left: ["8%", "88%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {steps.map((s) => (
          <span
            key={s}
            className="relative rounded-md border border-line-strong bg-panel-2 px-3 py-1.5 text-fg"
          >
            {s}
          </span>
        ))}
      </div>
    </Card>
  );
}

function DevOpsCard() {
  return (
    <Card>
      <CardHeader>
        <Badge variant="green" className="w-fit">
          <GitBranch className="size-3" aria-hidden /> azure devops
        </Badge>
        <CardTitle>Git-Workflow im Team</CardTitle>
        <CardDescription>
          Entwicklung im Team über Azure DevOps: Repos, Branches, Pull Requests mit Reviews und Pipelines.
        </CardDescription>
      </CardHeader>
      <svg viewBox="0 0 300 70" className="mx-6 mb-6 w-[calc(100%-3rem)]" aria-hidden>
        <motion.path
          d="M10 50 H290"
          stroke="var(--color-blue)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />
        <motion.path
          d="M70 50 C100 50 100 18 130 18 H190 C220 18 220 50 250 50"
          stroke="var(--color-green)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease }}
        />
        {[
          [10, 50, "var(--color-blue)"],
          [70, 50, "var(--color-blue)"],
          [145, 18, "var(--color-green)"],
          [180, 18, "var(--color-green)"],
          [250, 50, "var(--color-magenta)"],
          [290, 50, "var(--color-blue)"],
        ].map(([cx, cy, c], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-panel)"
            stroke={c as string}
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 400 }}
          />
        ))}
      </svg>
    </Card>
  );
}

function DockerCard() {
  const lines = [
    { t: "$ docker build -t app .", c: "text-fg" },
    { t: "✓ image gebaut", c: "text-green" },
    { t: "$ docker run app", c: "text-fg" },
    { t: "✓ container läuft", c: "text-green" },
  ];
  return (
    <Card>
      <CardHeader>
        <Badge variant="blue" className="w-fit">
          <Container className="size-3" aria-hidden /> docker
        </Badge>
        <CardTitle>Images &amp; Container</CardTitle>
        <CardDescription>Images bauen, Container starten und pflegen.</CardDescription>
      </CardHeader>
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.35 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="mx-6 mb-6 rounded-lg border border-line bg-bg/70 p-4 font-mono text-[13px] leading-6"
      >
        {lines.map((l) => (
          <motion.div
            key={l.t}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className={l.c}
          >
            {l.t}
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
}

function RedesignCard() {
  const [alt, setAlt] = useState(false);
  return (
    <Card onMouseEnter={() => setAlt(true)} onMouseLeave={() => setAlt(false)}>
      <CardHeader>
        <Badge variant="magenta" className="w-fit">
          <LayoutPanelLeft className="size-3" aria-hidden /> ui / layout
        </Badge>
        <CardTitle>Redesign einer Kunden-App</CardTitle>
        <CardDescription>Design und Layout einer weiteren App überarbeitet.</CardDescription>
      </CardHeader>
      <div
        aria-hidden
        className={cn(
          "mx-6 mb-6 grid h-24 gap-2 rounded-lg border border-line bg-bg/70 p-2",
          alt ? "grid-cols-[1fr_3fr]" : "grid-cols-[3fr_1fr]",
        )}
      >
        <motion.div layout className="rounded bg-magenta/20" />
        <motion.div layout className="grid gap-2">
          <motion.div layout className="rounded bg-panel-2" />
          <motion.div layout className="rounded bg-blue/20" />
        </motion.div>
      </div>
    </Card>
  );
}

export function Praxis() {
  return (
    <Buffer
      id="praxis"
      title="Praxis"
      sub={
        <>
          Praktikum bei <span className="font-medium text-fg">Digital Cuisine</span> in Hannover · <span className="font-mono text-base text-cyan">07.09.2026 – 19.03.2027</span>
          <span className="mt-1 block text-sm text-fg-faint">
            Jeden Tag im Team dazulernen. Echte Kunden-Projekte, deshalb ohne Kundennamen.
          </span>
        </>
      }
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {(
          [
            [MigrationCard, "122,162,247"],
            [PdfCard, "255,158,100"],
            [DevOpsCard, "158,206,106"],
            [DockerCard, "125,207,255"],
            [RedesignCard, "187,154,247"],
          ] as const
        ).map(([C, color], i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, x: i % 2 === 0 ? -80 : 80 },
              show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
            }}
            className={cn(i === 0 && "md:col-span-2")}
          >
            <SpotlightCard color={color} className="h-full [&>.relative]:h-full">
              <C />
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Buffer>
  );
}

// ── Projekte: Telescope picker ─────────────────────────────────────────────────

function ProjectMedia({ project }: { project: Project }) {
  const [shot, setShot] = useState(0);
  const shots = project.screenshots ?? [];

  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-bg">
        {shots.length > 0 ? (
          <AnimatePresence initial={false}>
            <motion.div
              key={shots[shot]}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-0"
            >
              <Image
                src={shots[shot]}
                alt={`Screenshot ${shot + 1} von ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>
        ) : project.preview ? (
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="show"
            className="flex h-full flex-col justify-center gap-1.5 p-6 text-sm"
          >
            <span className="text-fg-faint">$ {project.preview.cmd}</span>
            {project.preview.lines.map((line) => (
              <motion.span
                key={line}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className="text-green"
              >
                {line}
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </div>
      {shots.length > 1 && (
        <div className="flex gap-1.5" role="group" aria-label="Screenshots">
          {shots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setShot(i)}
              aria-pressed={i === shot}
              className={cn(
                "rounded border px-2 py-0.5 text-[11px] transition-colors",
                i === shot
                  ? "border-blue/50 bg-blue/10 text-blue"
                  : "border-line text-fg-faint hover:text-fg",
              )}
            >
              {i + 1}/{shots.length}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Projekte() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const q = query.toLowerCase();
  const results = PROJECTS.filter(
    (p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)),
  );
  const current = results[Math.min(selected, results.length - 1)];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && current?.live) {
      window.open(current.live, "_blank");
    }
  };

  return (
    <Buffer
      id="projekte"
      title="Projekte"
      sub="Eigene Next.js-Apps, alle live. Suchen, auswählen, ansehen."
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative rounded-xl border border-line-strong bg-panel font-mono shadow-[0_40px_120px_-40px_rgba(122,162,247,.25)]"
      >
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-bg px-2 text-xs text-blue">
          Telescope · projekte
        </span>
        <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Results */}
          <div className="flex flex-col border-b border-line md:border-r md:border-b-0">
            <label className="flex items-center gap-2 border-b border-line px-4">
              <span className="text-magenta">❯</span>
              <span className="sr-only">Projekte filtern</span>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="filtern, z.B. supabase"
                className="h-12 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-faint"
              />
              <span className="text-xs text-fg-faint">
                {results.length}/{PROJECTS.length}
              </span>
            </label>
            <ul className="max-h-[440px] overflow-y-auto p-1.5" aria-label="Projekte">
              {results.map((p, i) => {
                const isSel = p.title === current?.title;
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      onMouseEnter={() => setSelected(i)}
                      aria-pressed={isSel}
                      className="relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue"
                    >
                      {isSel && (
                        <motion.span
                          layoutId="telescope-sel"
                          className="absolute inset-0 rounded-md bg-panel-2 ring-1 ring-blue/25"
                          transition={{ type: "spring", stiffness: 550, damping: 40 }}
                        />
                      )}
                      <span className={cn("relative", isSel ? "text-blue" : "text-gutter")}>
                        {isSel ? "▶" : " "}
                      </span>
                      <span className={cn("relative flex-1 truncate", isSel ? "text-fg" : "text-fg-soft")}>
                        {p.title}
                      </span>
                      <span
                        className={cn(
                          "relative text-[11px]",
                          p.status === "repo" ? "text-fg-faint" : "text-green",
                        )}
                      >
                        {p.status === "repo" ? "● code" : "● live"}
                      </span>
                    </button>
                  </li>
                );
              })}
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-fg-faint">
                  Keine Treffer für &quot;{query}&quot;
                </li>
              )}
            </ul>
          </div>

          {/* Preview */}
          <div className="min-h-[440px] p-4 sm:p-5">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease }}
                  className="flex h-full flex-col gap-4"
                >
                  <ProjectMedia project={current} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-sans text-xl font-semibold tracking-tight text-fg">
                      {current.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-fg-soft">{current.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {current.live && (
                      <a
                        href={current.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ size: "sm" })}
                      >
                        Live ansehen <ArrowUpRight />
                      </a>
                    )}
                    {current.github && (
                      <a
                        href={current.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <GithubIcon /> Code
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <p className="mt-4 text-center font-mono text-xs text-fg-faint">
        <Kbd>↑</Kbd> <Kbd>↓</Kbd> auswählen · <Kbd>enter</Kbd> öffnen ·{" "}
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-fg hover:underline">
          mehr auf GitHub
        </a>
      </p>
    </Buffer>
  );
}

// ── Stack: lazy.nvim plugin list + :history ──────────────────────────────────────────

function StackItem({ name, group, index }: { name: string; group: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [timerDone, setTimerDone] = useState(false);
  const loaded = timerDone || (inView && !!reduce);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = setTimeout(() => setTimerDone(true), 250 + index * 70);
    return () => clearTimeout(t);
  }, [inView, index, reduce]);

  return (
    <li ref={ref} className="flex items-center gap-3 py-1.5">
      <span className="grid size-4 place-items-center" aria-hidden>
        {loaded ? (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green">
            <Check className="size-3.5" />
          </motion.span>
        ) : (
          <LoaderCircle className="size-3.5 animate-spin text-fg-faint" />
        )}
      </span>
      <span className={cn("flex-1 transition-colors", loaded ? "text-fg" : "text-fg-faint")}>
        {name}
      </span>
      <span className="text-xs text-fg-faint">{group}</span>
    </li>
  );
}

export function Stack() {
  return (
    <Buffer id="stack" title="Stack" sub="Womit gearbeitet wird. Next.js im Mittelpunkt, dazu jeden Tag Claude Code, privat und in Kunden-Projekten.">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="rounded-xl border border-line-strong bg-panel/80 p-5 font-mono text-sm"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
            <span className="font-bold text-magenta">lazy.nvim</span>
            <span className="text-xs text-fg-faint">
              Geladen: <span className="text-green">{STACK.length}</span>
            </span>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {STACK.map((s, i) => (
              <StackItem key={s.name} {...s} index={i} />
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="rounded-xl border border-line-strong bg-panel/80 p-5 font-mono text-sm"
        >
          <div className="mb-4 border-b border-line pb-4 text-yellow">:history</div>
          <ol className="relative flex flex-col gap-5 border-l border-line pl-5">
            {HISTORY.map((h, i) => (
              <motion.li
                key={h.what}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease }}
                className="relative flex flex-col gap-1"
              >
                <span
                  className={cn(
                    "absolute top-1.5 -left-[25px] size-2 rounded-full",
                    i === 0 ? "bg-yellow shadow-[0_0_10px_var(--color-yellow)]" : "bg-gutter",
                  )}
                  aria-hidden
                />
                <span className="flex items-center gap-2 text-xs">
                  <span className={i === 0 ? "text-yellow" : "text-fg-faint"}>{h.when}</span>
                  {h.running && (
                    <span className="rounded border border-green/30 bg-green/10 px-1.5 text-[10px] text-green">läuft</span>
                  )}
                </span>
                <span className="font-sans text-base font-medium text-fg">{h.what}</span>
                <span className="text-xs text-fg-soft">{h.note}</span>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </Buffer>
  );
}

// ── Kontakt ─────────────────────────────────────────────────────────────────────

export function Kontakt() {
  const script = [
    { t: "#!/usr/bin/env bash", c: "text-fg-faint" },
    { t: `EMAIL="${LINKS.email}"`, c: "text-fg" },
    { t: 'ORT="Hannover"', c: "text-fg" },
  ];

  return (
    <Buffer id="kontakt" title="Kontakt" sub="Für Fragen, Feedback oder einfach Austausch übers Programmieren.">
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="rounded-xl border border-line-strong bg-panel/80 p-5 font-mono text-sm leading-7"
        >
          <div className="text-fg-faint">
            <span className="text-green">❯</span> cat kontakt.sh
          </div>
          {script.map((l) => (
            <motion.div
              key={l.t}
              variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
              className={cn("break-all", l.c)}
            >
              {l.t}
            </motion.div>
          ))}
          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-2">
            <span className="text-green">❯</span> ./kontakt.sh <span className="cursor-block" aria-hidden />
          </motion.div>
        </motion.div>

        <div className="flex flex-col justify-center gap-3">
          <Magnetic strength={0.12}>
            <a href={`mailto:${LINKS.email}`} className={cn(buttonVariants(), "h-14 w-full justify-between text-base")}>
              <span className="flex min-w-0 items-center gap-2 truncate"><Mail /> {LINKS.email}</span>
              <ArrowUpRight />
            </a>
          </Magnetic>
          <div className="grid grid-cols-2 gap-3">
            <Magnetic>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-14 w-full")}
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "h-14 w-full")}
              >
                <GithubIcon /> GitHub
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* End of buffer */}
      <div aria-hidden className="mt-20 font-mono text-sm leading-6 text-gutter">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>~</div>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs text-fg-faint">
        © {new Date().getFullYear()} Giorgio Dettmar · Hannover
      </p>
    </Buffer>
  );
}
