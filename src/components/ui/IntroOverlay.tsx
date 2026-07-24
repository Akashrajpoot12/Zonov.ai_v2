"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// useLayoutEffect warns during SSR; fall back to useEffect on the server so we
// can still hide the overlay before first paint on the client (no flash).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Once the intro has played, we don't want to replay it on every client-side
// navigation or reload within the same tab session.
const SEEN_KEY = "zonov:intro-seen";

/* ═══════════════════════════════════════════════════════════════
   INTRO OVERLAY, "letters assemble" → dock into the header logo
   ───────────────────────────────────────────────────────────────
   Phase 1 "assemble" → each letter flies in from a different
                        direction and snaps into place to form
                        "zonov.ai"; the tagline fades in below.
   Phase 2 "hold"     → brief pause on the finished wordmark.
   Phase 3 "dock"     → tagline fades; the wordmark shrinks + glides
                        up to the exact spot of the navbar logo.
   Phase 4 "reveal"   → the white overlay fades away, the docked
                        wordmark crossfades into the real header
                        logo, revealing the page already in place.

   Plays on every full page load. Light/white theme.
   ═══════════════════════════════════════════════════════════════ */

const WORD = "zonov.ai"; // lowercase, matches the logo wordmark

// Logo text colors (sampled straight from the brand logo):
const BLUE = "#1863DE"; //  "zonov"
const TEAL = "#03C3B6"; //  ".ai"
const INK = "#2A2C31"; //   tagline charcoal

const TAGLINE = "The Future of Healthcare..Now!";

// Deterministic per-letter entry vectors (no random → no hydration drift).
const OFFSETS = [
  { x: -180, y: -130, r: -42 }, // z  ← top-left
  { x: 10, y: -200, r: 32 }, //   o  ← top
  { x: 170, y: -140, r: 44 }, //   n  ← top-right
  { x: -220, y: 30, r: -26 }, //   o  ← left
  { x: 210, y: 20, r: 28 }, //     v  ← right
  { x: -150, y: 150, r: -38 }, //  .  ← bottom-left
  { x: 20, y: 200, r: 22 }, //     a  ← bottom
  { x: 160, y: 140, r: 38 }, //    i  ← bottom-right
];

const ASSEMBLE_MS = 1400; // letters fly in + settle
const HOLD_MS = 1050; // pause on the finished wordmark + tagline
const DOCK_MS = 850; // wordmark glides into the header
const FADE_MS = 500; // overlay fade-out (the crossfade)
const TAGLINE_DELAY = 1.0; // seconds, tagline fades in after letters land
const DOCK_Y_FACTOR = 0.4; // aim toward the wordmark portion of the logo image

type Phase = "assemble" | "hold" | "dock" | "reveal";
type Dock = { x: number; y: number; scale: number };

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } },
};

const letterVariants: Variants = {
  hidden: (o: { x: number; y: number; r: number }) => ({
    opacity: 0,
    x: o.x,
    y: o.y,
    rotate: o.r,
    scale: 0.4,
    filter: "blur(10px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 20, mass: 0.85 },
  },
};

// Measure the wordmark's current box and the real navbar logo, then work out
// the translate + scale that lands the wordmark exactly on the header logo.
function computeDock(el: HTMLElement | null): Dock {
  if (!el) return { x: 0, y: 0, scale: 0.26 };
  const src = el.getBoundingClientRect();
  const logo = document.getElementById("site-logo");

  if (!logo) {
    // Fallback: dock to a sensible top-left position if the logo isn't found.
    const scale = 0.26;
    const targetCx = 24 + (src.width * scale) / 2;
    const targetCy = 42;
    return {
      x: targetCx - (src.left + src.width / 2),
      y: targetCy - (src.top + src.height / 2),
      scale,
    };
  }

  const dst = logo.getBoundingClientRect();
  const scale = dst.width / src.width;
  const srcCx = src.left + src.width / 2;
  const srcCy = src.top + src.height / 2;
  const dstCx = dst.left + dst.width / 2;
  const dstCy = dst.top + dst.height * DOCK_Y_FACTOR;
  return { x: dstCx - srcCx, y: dstCy - srcCy, scale };
}

export default function IntroOverlay() {
  // Rendered on the server too, so the page never flashes before the overlay.
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("assemble");
  const [dock, setDock] = useState<Dock | null>(null);
  // When we skip the intro (already seen this session), remove it with no fade
  // so repeat views feel instant instead of flashing a white screen.
  const [instant, setInstant] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // Mobile gets a shorter, snappier intro. Timing is picked once so the timers
  // and the framer transitions below always agree. SSR falls back to desktop
  // values, which only feed JS timers/transition props (never SSR'd markup),
  // so there's no hydration mismatch.
  const [T] = useState(() => {
    const mobile =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    return mobile
      ? { assemble: 1050, hold: 500, dock: 620, fade: 400 }
      : { assemble: ASSEMBLE_MS, hold: HOLD_MS, dock: DOCK_MS, fade: FADE_MS };
  });

  // Lock body scroll while the overlay is up.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  // Phase timeline. Runs before first paint (layout effect) so that on a repeat
  // visit — intro already seen this tab session — the overlay is removed with
  // no flash instead of replaying the full ~3.8s animation every load.
  useIsoLayoutEffect(() => {
    // Tell the page the intro is done, so hero animations that should be seen
    // (e.g. the stat underlines) start now, not behind the overlay.
    const markDone = () => {
      const w = window as unknown as { __zonovIntroDone?: boolean };
      w.__zonovIntroDone = true;
      window.dispatchEvent(new Event("zonov:intro-done"));
    };

    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    if (seen) {
      setInstant(true);
      setVisible(false);
      markDone();
      return;
    }
    try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("hold"), T.assemble));
    timers.push(
      setTimeout(() => {
        setDock(computeDock(wordmarkRef.current));
        setPhase("dock");
      }, T.assemble + T.hold)
    );
    timers.push(
      setTimeout(() => setPhase("reveal"), T.assemble + T.hold + T.dock)
    );
    timers.push(
      setTimeout(() => {
        setVisible(false);
        markDone();
      }, T.assemble + T.hold + T.dock + T.fade + 60)
    );
    return () => timers.forEach(clearTimeout);
  }, [T]);

  const letters = WORD.split("");
  const dotIndex = WORD.indexOf("."); // ".ai" gets the accent color
  const docked = dock && (phase === "dock" || phase === "reveal");
  const wordmarkVisible = phase === "assemble" || phase === "hold";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#FFFFFF" }}
          initial={{ opacity: 1 }}
          animate={phase === "reveal" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: instant ? 0 : T.fade / 1000, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Whisper-soft brand tints for depth (still reads as white) */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: "40rem",
              height: "40rem",
              top: "-16rem",
              right: "-12rem",
              background:
                "radial-gradient(circle, rgba(27,79,216,0.06), transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: "34rem",
              height: "34rem",
              bottom: "-14rem",
              left: "-12rem",
              background:
                "radial-gradient(circle, rgba(0,180,174,0.05), transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Wordmark + tagline, stacked and centered */}
          <div className="relative flex flex-col items-center gap-4 md:gap-6">
            {/* Fly wrapper, glides the whole wordmark into the header spot */}
            <motion.div
              ref={wordmarkRef}
              animate={
                docked
                  ? { x: dock!.x, y: dock!.y, scale: dock!.scale }
                  : { x: 0, y: 0, scale: 1 }
              }
              transition={{ duration: T.dock / 1000, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "50% 50%" }}
            >
              {/* Letters, fly in from their offsets, then rest */}
              <motion.div
                className="flex items-baseline"
                style={{
                  fontFamily: "var(--font-nunito), system-ui, sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(44px, 9vw, 128px)",
                  lineHeight: 1,
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {letters.map((char, i) => {
                  const isSuffix = i >= dotIndex; // ".ai"
                  return (
                    <motion.span
                      key={i}
                      className="inline-block"
                      custom={OFFSETS[i]}
                      variants={letterVariants}
                      style={{ color: isSuffix ? TEAL : BLUE }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Tagline, fades in once assembled, fades out as docking starts */}
            <motion.p
              style={{
                fontFamily: "var(--font-nunito), system-ui, sans-serif",
                fontWeight: 600,
                color: INK,
                letterSpacing: "0.005em",
                fontSize: "clamp(12px, 2vw, 24px)",
                lineHeight: 1.2,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={
                wordmarkVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }
              }
              transition={
                wordmarkVisible
                  ? { duration: 0.55, delay: TAGLINE_DELAY, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }
            >
              {TAGLINE}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
