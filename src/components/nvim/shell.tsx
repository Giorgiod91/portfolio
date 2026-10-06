"use client";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { CornerDownLeft, GitBranch, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Kbd } from "~/components/ui/kbd";
import { cn } from "~/lib/utils";

import { LINKS, SECTIONS, type SectionId } from "./data";
import { GithubIcon } from "./icons";

type Mode = "NORMAL" | "VISUAL" | "COMMAND";

const MODE_STYLE: Record<Mode, string> = {
  NORMAL: "bg-blue text-bg",
  VISUAL: "bg-magenta text-bg",
  COMMAND: "bg-yellow text-bg",
};

export function goTo(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ── Shell: owns mode, active buffer, keybindings ──────────────────────────────

export function Shell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<SectionId>("start");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const lastG = useRef(0);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const msgTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const mode: Mode = paletteOpen ? "COMMAND" : scrolling ? "VISUAL" : "NORMAL";

  const flash = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  // Track which buffer is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // VISUAL while scrolling
  useEffect(() => {
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setScrolling(false), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Vim keybindings
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (paletteOpen || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;

      const keys: Record<string, () => void> = {
        ":": () => setPaletteOpen(true),
        "/": () => setPaletteOpen(true),
        j: () => window.scrollBy({ top: 140, behavior: "smooth" }),
        k: () => window.scrollBy({ top: -140, behavior: "smooth" }),
        G: () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
        g: () => {
          const now = Date.now();
          if (now - lastG.current < 450) window.scrollTo({ top: 0, behavior: "smooth" });
          lastG.current = now;
        },
        p: () => goTo("praxis"),
        f: () => goTo("projekte"),
        s: () => goTo("stack"),
        c: () => goTo("kontakt"),
      };
      SECTIONS.forEach((s, i) => (keys[String(i + 1)] = () => goTo(s.id)));

      const fn = keys[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <Bufferline active={active} />
      {children}
      <Statusline
        mode={mode}
        active={active}
        message={message}
        onCommand={() => setPaletteOpen(true)}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        flash={flash}
      />
    </MotionConfig>
  );
}

// ── Bufferline (top) ─────────────────────────────────────────────────────────────

function Bufferline({ active }: { active: SectionId }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-blue via-magenta to-cyan"
      />
      <div className="flex h-11 items-stretch font-mono text-xs">
        <a
          href="#start"
          className="flex shrink-0 items-center gap-2 border-r border-line px-4 text-fg hover:text-blue"
        >
          <span className="text-green">❯</span>
          <span className="hidden sm:inline">~/giorgio</span>
        </a>
        <nav
          aria-label="Abschnitte"
          className="no-scrollbar flex flex-1 items-stretch overflow-x-auto"
        >
          {SECTIONS.map((s, i) => {
            const isActive = s.id === active;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 border-r border-line px-4 transition-colors",
                  isActive ? "bg-panel text-fg" : "text-fg-faint hover:text-fg-soft",
                )}
              >
                <span className="text-gutter">{i + 1}</span>
                <span className={cn(isActive && s.color)}>{s.file}</span>
                {isActive && (
                  <motion.span
                    layoutId="buffer-indicator"
                    className="absolute inset-x-0 top-0 h-0.5 bg-blue shadow-[0_0_12px_var(--color-blue)]"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex shrink-0 items-center border-l border-line px-4 text-fg-soft hover:text-fg"
        >
          <GithubIcon className="size-4" />
        </a>
      </div>
    </header>
  );
}

// ── Statusline (bottom, lualine-style) ─────────────────────────────────────────

function Statusline({
  mode,
  active,
  message,
  onCommand,
}: {
  mode: Mode;
  active: SectionId;
  message: string | null;
  onCommand: () => void;
}) {
  const { scrollYProgress, scrollY } = useScroll();
  const [pct, setPct] = useState(0);
  const [line, setLine] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setPct(Math.round(v * 100)));
  useMotionValueEvent(scrollY, "change", (v) => setLine(Math.floor(v / 24) + 1));

  const file = SECTIONS.find((s) => s.id === active)?.file ?? "";

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-panel font-mono text-xs">
      <div className="flex h-8 items-stretch">
        <motion.span
          key={mode}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className={cn("flex items-center px-3 font-bold tracking-wider", MODE_STYLE[mode])}
        >
          {mode}
        </motion.span>
        <span className="hidden items-center gap-1.5 bg-panel-2 px-3 text-fg-soft sm:flex">
          <GitBranch className="size-3.5" /> main
        </span>
        <span className="flex min-w-0 items-center truncate px-3 text-fg">
          <AnimatePresence mode="wait">
            <motion.span
              key={message ?? file}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className={cn("truncate", message && "text-green")}
            >
              {message ?? file}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="flex-1" />
        <button
          type="button"
          onClick={onCommand}
          className="flex items-center gap-2 px-3 text-fg-soft hover:text-fg"
        >
          <span className="hidden md:inline">Befehle</span>
          <Kbd>:</Kbd>
        </button>
        <span className="hidden items-center px-3 text-fg-faint md:flex">utf-8 · tsx</span>
        <span className="flex items-center bg-panel-2 px-3 text-fg-soft">{pct}%</span>
        <span className="hidden items-center bg-blue px-3 text-bg sm:flex">
          {line}:1
        </span>
      </div>
    </footer>
  );
}

// ── Command palette (":" / ⌘K), telescope-flavoured ───────────────────────────

type Command = { cmd: string; hint: string; run: () => void };

function fuzzy(query: string, text: string) {
  let i = 0;
  const q = query.toLowerCase();
  for (const ch of text.toLowerCase()) if (ch === q[i]) i++;
  return i === q.length;
}

function CommandPalette({
  open,
  onClose,
  flash,
}: {
  open: boolean;
  onClose: () => void;
  flash: (msg: string) => void;
}) {
  // Mounting the dialog only while open resets its state on every open
  return (
    <AnimatePresence>
      {open && <PaletteDialog onClose={onClose} flash={flash} />}
    </AnimatePresence>
  );
}

function PaletteDialog({
  onClose,
  flash,
}: {
  onClose: () => void;
  flash: (msg: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { cmd: "start", hint: "Zum Anfang", run: () => goTo("start") },
      { cmd: "praxis", hint: "Praktikum & Kunden-Projekte", run: () => goTo("praxis") },
      { cmd: "projekte", hint: "Eigene Projekte durchsuchen", run: () => goTo("projekte") },
      { cmd: "stack", hint: "Tools & Werdegang", run: () => goTo("stack") },
      { cmd: "kontakt", hint: "Schreib mir", run: () => goTo("kontakt") },
      {
        cmd: "mail",
        hint: "E-Mail-Adresse kopieren",
        run: () =>
          navigator.clipboard
            .writeText(LINKS.email)
            .then(() => flash(`"${LINKS.email}" kopiert`))
            .catch(() => (window.location.href = `mailto:${LINKS.email}`)),
      },
      { cmd: "github", hint: "GitHub öffnen", run: () => window.open(LINKS.github, "_blank") },
      { cmd: "linkedin", hint: "LinkedIn öffnen", run: () => window.open(LINKS.linkedin, "_blank") },
    ],
    [flash],
  );

  const results = commands.filter((c) => fuzzy(query.replace(/^:/, ""), c.cmd));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = (c: Command | undefined) => {
    if (!c) return;
    onClose();
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown" || (e.ctrlKey && e.key === "n")) {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp" || (e.ctrlKey && e.key === "p")) {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") run(results[index]);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 px-4 pt-[18vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Befehle"
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: -6 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-panel font-mono shadow-[0_30px_80px_-20px_rgba(0,0,0,.8),0_0_0_1px_rgba(122,162,247,.08)]"
      >
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search className="size-4 text-fg-faint" />
          <span className="text-yellow">:</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            aria-label="Befehl suchen"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].cmd}` : undefined}
            placeholder="befehl eingeben…"
            className="h-12 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-faint"
          />
          <Kbd>esc</Kbd>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-fg-faint">
              E492: Kein Befehl gefunden
            </li>
          )}
          {results.map((c, i) => (
            <li
              key={c.cmd}
              id={`cmd-${c.cmd}`}
              role="option"
              aria-selected={i === index}
              onMouseEnter={() => setIndex(i)}
              onClick={() => run(c)}
              className="relative flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm"
            >
              {i === index && (
                <motion.span
                  layoutId="palette-active"
                  className="absolute inset-0 rounded-md bg-panel-2 ring-1 ring-blue/30"
                  transition={{ type: "spring", stiffness: 600, damping: 40 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span className={i === index ? "text-blue" : "text-fg"}>:{c.cmd}</span>
                <span className="hidden text-fg-faint sm:inline">{c.hint}</span>
              </span>
              {i === index && <CornerDownLeft className="relative size-3.5 text-fg-faint" />}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-4 py-2.5 text-[11px] text-fg-faint">
          <span><Kbd>j</Kbd> <Kbd>k</Kbd> scrollen</span>
          <span><Kbd>gg</Kbd> <Kbd>G</Kbd> Anfang / Ende</span>
          <span><Kbd>1</Kbd>–<Kbd>5</Kbd> Buffer</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
