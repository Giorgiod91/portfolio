"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLang } from "./i18n";


// 12×8 pixel sprite, two leg frames. O = eye, X = body.
const BODY = [
  "..XXXXXXXX..",
  ".XXXXXXXXXX.",
  "XXXOXXXXOXXX",
  "XXXOXXXXOXXX",
  "XXXXXXXXXXXX",
  ".XXXXXXXXXX.",
];
const LEGS = [
  [".X..X..X..X.", ".X..X..X..X."],
  ["X..X....X..X", "............"],
];

function Sprite({ frame }: { frame: number }) {
  const rows = [...BODY, ...LEGS[frame]];
  return (
    <svg viewBox="0 0 12 8" className="h-8 w-12" shapeRendering="crispEdges" aria-hidden>
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={ch === "O" ? "#0a0b0f" : "#d97757"} />
          ),
        ),
      )}
    </svg>
  );
}

export function Claude() {
  const { t } = useLang();
  const JOKES = t.claude.jokes;
  const [hidden, setHidden] = useState(false);
  const [x, setX] = useState(16);
  const [target, setTarget] = useState(16);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const [frame, setFrame] = useState(0);
  const [joke, setJoke] = useState<number | null>(null);
  const [hop, setHop] = useState(0);
  const order = useRef<number[]>([]);
  const talkTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const nextJoke = useCallback(() => {
    if (order.current.length === 0) order.current = [...JOKES.keys()].sort(() => Math.random() - 0.5);
    return order.current.pop()!;
  }, [JOKES]);

  const walkSomewhere = useCallback(() => {
    const max = Math.max(16, window.innerWidth - 300);
    const t = Math.round(16 + Math.random() * (max - 16));
    setTarget(t);
    setFacing(t > x ? 1 : -1);
    setWalking(true);
  }, [x]);

  const talk = useCallback(
    (ms = 7000) => {
      setJoke(nextJoke());
      setHop((h) => h + 1);
      clearTimeout(talkTimer.current);
      talkTimer.current = setTimeout(() => {
        setJoke(null);
        talkTimer.current = setTimeout(walkSomewhere, 2500);
      }, ms);
    },
    [nextJoke, walkSomewhere],
  );

  // first appearance
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (sessionStorage.getItem("claude-hidden") === "1") return setHidden(true);
      } catch {}
      walkSomewhere();
    }, 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // leg animation while walking
  useEffect(() => {
    if (!walking) return;
    const id = setInterval(() => setFrame((f) => 1 - f), 160);
    return () => clearInterval(id);
  }, [walking]);

  // ":witz" from the command palette
  useEffect(() => {
    const on = () => {
      setHidden(false);
      setWalking(false);
      talk();
    };
    addEventListener("claude:joke", on);
    return () => removeEventListener("claude:joke", on);
  }, [talk]);

  useEffect(() => () => clearTimeout(talkTimer.current), []);

  if (hidden) return null;

  const duration = Math.abs(target - x) / 70; // px per second

  return (
    <motion.div
      className="pointer-events-none fixed bottom-[74px] left-0 z-30"
      initial={{ x: 16, opacity: 0 }}
      animate={{ x: target, opacity: 1 }}
      transition={{ x: { duration, ease: "linear" }, opacity: { duration: 0.5 } }}
      onAnimationComplete={() => {
        if (!walking) return;
        setX(target);
        setWalking(false);
        setFrame(0);
        talk();
      }}
    >
      <AnimatePresence>
        {joke !== null && (
          <motion.div
            key={joke}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="pointer-events-auto absolute bottom-12 left-0 w-64 origin-bottom-left rounded-xl rounded-bl-sm border border-line2 bg-card px-3.5 py-2.5 text-[13px] leading-snug text-fg shadow-[0_20px_40px_-12px_rgba(0,0,0,.8)]"
          >
            <span className="mb-1 flex items-center justify-between font-mono text-[11px] text-claude">
              {t.claude.name}
              <button
                type="button"
                aria-label={t.claude.hide}
                onClick={() => {
                  setHidden(true);
                  try {
                    sessionStorage.setItem("claude-hidden", "1");
                  } catch {}
                }}
                className="text-fg3 hover:text-fg"
              >
                <X className="size-3.5" />
              </button>
            </span>
            {JOKES[joke]}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label={t.claude.tell}
        title={t.claude.click}
        onClick={() => {
          setWalking(false);
          setX(target);
          talk();
        }}
        className="pointer-events-auto block"
        style={{ scaleX: facing }}
        key={hop}
        initial={{ y: 0 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.div
          animate={walking ? { y: [0, -2, 0] } : { y: 0 }}
          transition={walking ? { duration: 0.32, repeat: Infinity } : {}}
        >
          <Sprite frame={walking ? frame : 0} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
