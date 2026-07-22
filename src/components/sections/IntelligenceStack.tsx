"use client";
import { useState, useEffect, useRef } from "react";
import FadeIn from "@/components/ui/FadeIn";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import s from "./IntelligenceStack.module.css";

/* Bottom → top: raw data at the base, decisions at the peak. */
const LAYERS = [
  { label: "Raw Hospital Data", desc: "Records, orders, notes and signals from every system you already run." },
  { label: "Extracted Clinical Events", desc: "Structured events pulled from the noise: what actually happened, and when." },
  { label: "Operational Insights", desc: "Patterns, risks and opportunities surfaced across the whole hospital." },
  { label: "Agent Decisions", desc: "The actions your agents take, the work that moves the hospital forward." },
];

export default function IntelligenceStack() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const motionOk = !usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Only animate while the section is actually on screen */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-cycle through the layers; pauses off-screen, on hover, or under reduced motion. Any click resets the timer. */
  useEffect(() => {
    if (!motionOk || !inView || paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % LAYERS.length), 2400);
    return () => clearTimeout(t);
  }, [active, inView, paused, motionOk]);

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="noise relative overflow-hidden section-py section-dark"
      style={{ background: "linear-gradient(160deg,#0D1F3C 0%,#122050 60%,#0A1830 100%)" }}
    >
      <CursorSpotlight color="rgba(124,58,237,0.18)" size={560} />
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT, narrative + interactive layer buttons */}
          <div>
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-4 flex items-center gap-3">
                How Zonov Thinks
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="type-h1 text-white mb-5 [text-wrap:balance]">
                We don&apos;t just store data.{" "}
                <span className="italic gradient-text-light">We build intelligence on it.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="type-body-lg text-white/60 max-w-md mb-8">
                Traditional systems stop at the bottom layer. They hold your data. Zonov.ai turns that raw data into clinical signals, operational insights, and finally the decisions your agents act on.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-2 max-w-md">
                {LAYERS.map((l, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={l.label}
                      type="button"
                      onClick={() => setActive(i)}
                      className="text-left rounded-[14px] px-3 py-2.5 transition-all duration-300 flex items-center gap-3"
                      style={{
                        background: on ? "rgba(124,58,237,0.15)" : "transparent",
                        border: on ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-md flex items-center justify-center type-mono text-[10px] flex-shrink-0 transition-colors duration-300"
                        style={{ background: on ? "var(--purple)" : "rgba(255,255,255,0.08)", color: "#fff" }}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-[14px] transition-colors duration-300 ${on ? "text-white font-semibold" : "text-white/70"}`}>
                        {l.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT, 3D stack (active layer glows) */}
          <FadeIn delay={0.1}>
            <div className={s.scene}>
              <div className={s.stack}>
                {LAYERS.map((l, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={l.label}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={l.label}
                      className={`${s.layer} ${on ? s.layerActive : ""}`}
                      style={{ ["--i" as string]: i }}
                    >
                      {/* corner label (when card is in the stack) */}
                      <span className={s.label} style={{ opacity: on ? 0 : 1 }}>{l.label}</span>
                      {/* content (when card is opened) */}
                      <span className={`${s.content} ${on ? s.contentOn : ""}`}>
                        <span className={s.contentNum}>{`0${i + 1}`}</span>
                        <span className={s.contentTitle}>{l.label}</span>
                        <span className={s.contentDesc}>{l.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
