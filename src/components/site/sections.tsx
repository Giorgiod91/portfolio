"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

import { LINKS } from "./data";
import { useLang } from "./i18n";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ease, Magnetic, Reveal, SpotlightCard } from "./motion";

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12">
      <div className="mb-3 font-mono text-[13px] text-blue">
        <span className="text-fg3">## </span>
        {eyebrow}
      </div>
      <h2 className="text-[clamp(2rem,4vw,2.9rem)] leading-[1.08] font-bold tracking-[-0.035em]">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-fg2">{sub}</p>}
    </Reveal>
  );
}

// ── Erfahrung ─────────────────────────────────────────────────────────────

export function Erfahrung() {
  const { t, c } = useLang();
  return (
    <section id="erfahrung" className="mx-auto max-w-6xl px-5 py-24">
      <Head
        eyebrow={t.exp.eyebrow}
        title={t.exp.title}
        sub={t.exp.sub}
      />
      <Reveal>
        <div className="grid gap-8 rounded-3xl border border-line bg-card p-6 sm:p-8 lg:grid-cols-[230px_1fr]">
          <div>
            <div className="text-xl font-semibold tracking-tight">Digital Cuisine</div>
            <div className="text-sm text-fg3">{t.exp.company}</div>
            <div className="mt-1 font-mono text-sm text-fg3">{t.exp.period}</div>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-green/30 px-2.5 py-0.5 text-xs text-green">
              {t.exp.running}
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {c.work.map((w, i) => (
              <Reveal
                key={w.title}
                from={i % 2 ? "right" : "left"}
                delay={i * 0.08}
                className={cn(w.featured && "md:col-span-2")}
              >
                <SpotlightCard tilt={w.featured ? 2 : 4} className="h-full rounded-2xl">
                  <div
                    className={cn(
                      "h-full rounded-2xl border border-line bg-bg2 p-5 transition-colors group-hover:border-line2",
                      w.featured && "bg-[radial-gradient(ellipse_at_top_left,rgba(122,162,247,.1),transparent_60%)]",
                    )}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{w.title}</h3>
                      {w.tags.map((t) => (
                        <span key={t} className="rounded-md border border-line2 px-1.5 font-mono text-[11px] text-cyan">
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-fg2">{w.text}</p>
                    <ul className={cn("grid gap-1 font-mono text-[13px] text-fg3", w.featured && "sm:grid-cols-2")}>
                      {w.points.map((p) => (
                        <li key={p}>
                          <span className="text-green">+ </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {c.education.map((e, i) => (
          <Reveal key={e.what} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-card p-5">
              <div className="font-mono text-xs text-fg3">{e.when}</div>
              <div className="mt-1 font-semibold">{e.what}</div>
              <div className="text-sm text-fg3">{e.note}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Session Atlas (featured) ────────────────────────────────────────────────

export function Atlas() {
  const { t, c } = useLang();
  const ATLAS = c.atlas;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((x) => (x + 1) % ATLAS.shots.length), 4500);
    return () => clearInterval(id);
  }, [paused, ATLAS.shots.length]);

  return (
    <section id="atlas" className="mx-auto max-w-6xl px-5 py-24">
      <Head
        eyebrow={t.atlas.eyebrow}
        title="Session Atlas"
        sub={t.atlas.sub}
      />
      <div className="grid items-start gap-10 lg:grid-cols-[1.45fr_1fr]">
        <Reveal from="left">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="overflow-hidden rounded-2xl border border-line2 bg-[#1d2021] shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)]"
          >
            <div className="relative aspect-[1480/940]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={ATLAS.shots[i].src}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={ATLAS.shots[i].src}
                    alt={`Session Atlas: ${ATLAS.shots[i].label}`}
                    fill
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="object-cover object-top"
                    priority={i === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="no-scrollbar flex overflow-x-auto border-t border-line font-mono text-xs" role="tablist">
              {ATLAS.shots.map((s, j) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === j}
                  onClick={() => setI(j)}
                  className={cn(
                    "relative shrink-0 px-4 py-2.5 transition-colors",
                    i === j ? "text-fg" : "text-fg3 hover:text-fg2",
                  )}
                >
                  {i === j && (
                    <motion.span layoutId="atlas-tab" className="absolute inset-x-0 top-0 h-0.5 bg-claude" />
                  )}
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal from="right">
          <p className="mb-6 leading-relaxed text-fg2">{ATLAS.desc}</p>
          <ul className="mb-6 space-y-2.5">
            {ATLAS.features.map((f, j) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + j * 0.06, duration: 0.5, ease }}
                className="flex gap-3 text-[15px]"
              >
                <Check className="mt-1 size-4 shrink-0 text-green" aria-hidden />
                {f}
              </motion.li>
            ))}
          </ul>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {ATLAS.tags.map((t) => (
              <span key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-fg3">
                {t}
              </span>
            ))}
          </div>
          <Magnetic>
            <a
              href={ATLAS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-claude px-5 py-3 font-semibold text-bg"
            >
              <GithubIcon className="size-4" /> {t.atlas.github}
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

// ── Projekte ───────────────────────────────────────────────────────────────

export function Projekte() {
  const { t, c } = useLang();
  return (
    <section id="projekte" className="mx-auto max-w-6xl px-5 py-24">
      <Head eyebrow={t.projects.eyebrow} title={t.projects.title} sub={t.projects.sub} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <SpotlightCard className="h-full rounded-2xl">
              <a
                href={p.live ?? p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors group-hover:border-line2"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg2">
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(45deg,#11131a_0_10px,#13151d_10px_20px)] font-mono text-sm text-fg3">
                      {p.title.toLowerCase()}.tsx
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <ArrowUpRight
                      className="size-4 text-fg3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                      aria-hidden
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-fg2">{p.desc}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md border border-line px-1.5 font-mono text-[11px] text-fg3">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Stack ────────────────────────────────────────────────────────────────

export function Stack() {
  const { t, c } = useLang();
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24">
      <Head
        eyebrow={t.stack.eyebrow}
        title={t.stack.title}
        sub={t.stack.sub}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.stack.map(([group, items], i) => (
          <Reveal key={group} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-line bg-card p-5">
              <h3 className="mb-3 font-mono text-[13px] text-magenta">{group}</h3>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 + i * 0.08 } } }}
                className="flex flex-wrap gap-1.5"
              >
                {items.map((t) => (
                  <motion.span
                    key={t}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                    whileHover={{ y: -2 }}
                    className="rounded-lg border border-line2 px-2.5 py-1 text-sm"
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Kontakt ──────────────────────────────────────────────────────────────

export function Kontakt() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  return (
    <section id="kontakt" className="mx-auto max-w-6xl px-5 pt-24 pb-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line2 bg-card px-6 py-16 text-center sm:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(122,162,247,.16),transparent_60%)]"
          />
          <div className="relative">
            <div className="mb-3 font-mono text-[13px] text-blue">
              <span className="text-fg3">## </span>{t.contact.eyebrow}
            </div>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold tracking-[-0.04em]">{t.contact.title}</h2>
            <p className="mx-auto mt-3 max-w-md text-fg2">{t.contact.sub}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/[0.06] px-3.5 py-1.5 text-sm text-green">
              <span className="size-1.5 rounded-full bg-green" aria-hidden />
              {t.contact.freelance}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 font-semibold text-bg"
                >
                  {t.contact.mail} <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(LINKS.email).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1800);
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-line2 px-5 py-3 font-semibold transition-colors hover:bg-bg2"
              >
                {copied ? <Check className="size-4 text-green" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                {copied ? t.contact.copied : t.contact.copy}
              </button>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center rounded-xl border border-line2 px-4 transition-colors hover:bg-bg2"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center rounded-xl border border-line2 px-4 transition-colors hover:bg-bg2"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
      <p className="mt-10 pb-20 text-center text-sm text-fg3">
        © 2026 Giorgio Dettmar · <kbd className="rounded border border-line2 px-1 font-mono text-xs">:</kbd> {t.contact.footer}
      </p>
    </section>
  );
}
