"use client";

import { AnimatePresence, motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "~/lib/utils";

import { LINKS, NAV, type SectionId } from "./data";

export function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<SectionId | null>(null);
  const [palette, setPalette] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const lastG = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    const top = document.getElementById("start");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { threshold: 0.5 });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setScrolling(false), 200);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((o) => !o);
        return;
      }
      if (palette || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
      const keys: Record<string, () => void> = {
        ":": () => setPalette(true),
        "/": () => setPalette(true),
        j: () => scrollBy({ top: 140, behavior: "smooth" }),
        k: () => scrollBy({ top: -140, behavior: "smooth" }),
        G: () => scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
        g: () => {
          if (Date.now() - lastG.current < 450) scrollTo({ top: 0, behavior: "smooth" });
          lastG.current = Date.now();
        },
      };
      const fn = keys[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [palette]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-blue via-magenta to-cyan"
      />
      {children}
      <Statusline active={active} visual={scrolling} onCommand={() => setPalette(true)} />
      <AnimatePresence>{palette && <Palette onClose={() => setPalette(false)} />}</AnimatePresence>
    </MotionConfig>
  );
}

// ── Floating statusline = navigation ─────────────────────────────────────────

function Statusline({
  active,
  visual,
  onCommand,
}: {
  active: SectionId | null;
  visual: boolean;
  onCommand: () => void;
}) {
  return (
    <motion.nav
      aria-label="Abschnitte"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 26 }}
      className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-stretch overflow-hidden rounded-xl border border-line2 bg-card/85 font-mono text-[13px] shadow-[0_20px_50px_-15px_rgba(0,0,0,.8)] backdrop-blur-md"
    >
      <motion.span
        animate={{ backgroundColor: visual ? "#bb9af7" : "#7aa2f7" }}
        className="flex items-center px-3 font-bold text-bg"
      >
        {visual ? "VISUAL" : "NORMAL"}
      </motion.span>
      <div className="no-scrollbar flex overflow-x-auto">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-current={active === n.id ? "location" : undefined}
            className={cn(
              "relative shrink-0 px-3 py-2.5 transition-colors",
              active === n.id ? "text-fg" : "text-fg2 hover:text-fg",
              active !== n.id && "max-sm:hidden",
            )}
          >
            {active === n.id && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-0 bg-white/[0.06]"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative">{n.label}</span>
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={onCommand}
        className="flex items-center gap-2 border-l border-line2 px-3 text-fg2 hover:text-fg"
        aria-label="Befehle öffnen"
      >
        :
        <kbd className="rounded border border-line2 bg-bg2 px-1.5 text-[11px]">⌘K</kbd>
      </button>
    </motion.nav>
  );
}

// ── Command palette ────────────────────────────────────────────────────────

type Cmd = { cmd: string; hint: string; run: () => void };

function Palette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(LINKS.email).then(() => setCopied(true));
  }, []);

  const cmds: Cmd[] = useMemo(
    () => [
      ...NAV.map((n) => ({ cmd: n.label, hint: `Zu ${n.label}`, run: () => goTo(n.id) })),
      { cmd: "mail", hint: "E-Mail schreiben", run: () => (location.href = `mailto:${LINKS.email}`) },
      { cmd: "copy", hint: "E-Mail-Adresse kopieren", run: copy },
      { cmd: "github", hint: "GitHub öffnen", run: () => open(LINKS.github, "_blank") },
      { cmd: "linkedin", hint: "LinkedIn öffnen", run: () => open(LINKS.linkedin, "_blank") },
      { cmd: "witz", hint: "Claude erzählt einen Witz", run: () => dispatchEvent(new Event("claude:joke")) },
    ],
    [copy],
  );
  const list = cmds.filter((c) => (c.cmd + c.hint).toLowerCase().includes(q.toLowerCase().replace(/^:/, "")));

  useEffect(() => input.current?.focus(), []);

  const run = (c?: Cmd) => {
    if (!c) return;
    c.run();
    if (c.cmd !== "copy") onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[18vh] backdrop-blur-sm"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Befehle"
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line2 bg-card font-mono shadow-[0_40px_80px_rgba(0,0,0,.6)]"
      >
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search className="size-4 text-fg3" aria-hidden />
          <span className="text-yellow">:</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(list.length - 1, s + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === "Enter") run(list[sel]);
            }}
            placeholder="befehl …"
            aria-label="Befehl"
            className="h-12 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg3"
          />
          <kbd className="rounded border border-line2 px-1.5 text-[11px] text-fg2">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-1.5" role="listbox">
          {list.length === 0 && <li className="px-3 py-6 text-center text-sm text-fg3">E492: Kein Befehl gefunden</li>}
          {list.map((c, i) => (
            <li
              key={c.cmd}
              role="option"
              aria-selected={i === sel}
              onMouseEnter={() => setSel(i)}
              onClick={() => run(c)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm",
                i === sel && "bg-bg2",
              )}
            >
              <span className="flex gap-3">
                <span className="text-blue">:{c.cmd}</span>
                <span className="text-fg3">{c.cmd === "copy" && copied ? "kopiert ✓" : c.hint}</span>
              </span>
              {i === sel && <CornerDownLeft className="size-3.5 text-fg3" aria-hidden />}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
