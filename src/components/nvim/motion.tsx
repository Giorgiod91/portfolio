"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";

import { cn } from "~/lib/utils";

// ── Presets ──────────────────────────────────────────────────────────────────────

export const ease = [0.22, 1, 0.36, 1] as const;

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// ── LetterReveal: letters flip up out of a mask, one after another ─────────────────

export function LetterReveal({
  text,
  className,
  delay = 0,
  step = 0.035,
  animateOnMount = false,
  letterColor,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  animateOnMount?: boolean;
  /** Per-letter color, e.g. for a gradient across the word */
  letterColor?: (index: number, total: number) => string;
}) {
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span
      aria-label={text}
      className={cn("inline-block", className)}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
      {...trigger}
    >
      {text.split(" ").map((word, w, words) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((ch, i, letters) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                style={letterColor ? { color: letterColor(i, letters.length) } : undefined}
                variants={{
                  hidden: { y: "110%", rotateX: -70, opacity: 0 },
                  show: {
                    y: "0%",
                    rotateX: 0,
                    opacity: 1,
                    transition: { duration: 0.8, ease },
                  },
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

// ── SpotlightCard: cursor-following glow + soft 3D tilt ────────────────────────────

export function SpotlightCard({
  children,
  className,
  color = "122,162,247",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(${color},0.16), transparent 65%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(${color},0.7), transparent 70%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    x.set(-400);
    y.set(-400);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("group relative rounded-xl", className)}
    >
      {/* Glowing border that follows the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: border,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ background: glow }}
      />
    </motion.div>
  );
}

// ── Magnetic: element leans toward the cursor ───────────────────────────────────────

export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
