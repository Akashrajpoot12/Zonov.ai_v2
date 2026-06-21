"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import s from "./SimulationCascade.module.css";

const CARD_COUNT = 11;

const STATS = [
  { value: 10000, suffix: "+", label: "Scenarios tested per agent" },
  { value: 98, suffix: "%", label: "Accuracy bar before go-live" },
  { value: 100, suffix: "%", label: "Safety checks passed" },
];

/* Each conversation = a different simulated clinical case. */
type Msg = { role: "in" | "out"; text: string };
const CONVERSATIONS: Msg[][] = [
  [
    { role: "in", text: "I haven't been feeling well — I've lost some weight." },
    { role: "out", text: "Six months ago you were 68 kg. What's your weight today?" },
    { role: "in", text: "Around 61 kg now." },
  ],
  [
    { role: "in", text: "I keep forgetting if I took my BP tablet." },
    { role: "out", text: "Your last dose was logged this morning at 8:15. You're on track." },
    { role: "in", text: "Oh, good — thank you." },
  ],
  [
    { role: "in", text: "I'm here for my cardiology appointment." },
    { role: "out", text: "Found your record, Mr. Sharma. Dr. Rao, OPD-3 — you're checked in." },
    { role: "in", text: "That was quick!" },
  ],
  [
    { role: "in", text: "My fever is still there after three days." },
    { role: "out", text: "That's beyond the expected window — flagging this for Dr. Mehta now." },
    { role: "in", text: "Thank you." },
  ],
];

export default function SimulationCascade() {
  const [idx, setIdx] = useState(0);   // which conversation
  const [step, setStep] = useState(0); // how many messages revealed

  const convo = CONVERSATIONS[idx];

  /* Drive a live chat: reveal messages one by one, then move to next convo */
  useEffect(() => {
    if (step < convo.length) {
      // "typing" for a beat, then drop the next message
      const t = setTimeout(() => setStep((s) => s + 1), 1000);
      return () => clearTimeout(t);
    }
    // whole conversation shown — pause, then start the next one fresh
    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % CONVERSATIONS.length);
      setStep(0);
    }, 2400);
    return () => clearTimeout(t);
  }, [step, convo.length]);

  const typing = step < convo.length;
  const nextRole = typing ? convo[step].role : null;

  return (
    <section className="section-py bg-[var(--bg)] overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — narrative + stats */}
          <div>
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-[var(--primary)]" />
                Proven Before Deployment
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h2 className="type-h1 text-[var(--text)] mb-5 [text-wrap:balance]">
                Tested across thousands of cases —{" "}
                <span className="italic gradient-text">before any real patient.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="type-body-lg text-[var(--text-muted)] max-w-md mb-8">
                Every agent is stress-tested against a vast library of clinical scenarios — edge cases, exceptions, and rare events — until it clears our accuracy and safety bar. Your patients meet an agent that has already seen it all.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                {STATS.map((st) => (
                  <div key={st.label}>
                    <p className="text-[clamp(24px,3vw,34px)] leading-none mb-2 text-[var(--primary)]" style={{ fontFamily: "var(--font-playfair)" }}>
                      <CountUp value={st.value} suffix={st.suffix} />
                    </p>
                    <p className="type-caption text-[var(--text-muted)] leading-snug">{st.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — cascade deck */}
          <FadeIn delay={0.1}>
            <div className={s.scene}>
              <div className={s.deck}>
                {/* receding ghost cards */}
                {Array.from({ length: CARD_COUNT - 1 }).map((_, k) => {
                  const i = k + 1;
                  return (
                    <div
                      key={i}
                      className={`${s.card} ${s.cardGhost}`}
                      style={{ ["--i" as string]: i, ["--p" as string]: i, opacity: Math.max(0.25, 1 - i * 0.09) }}
                    >
                      <div className={s.ghost}>
                        <div className={`${s.ghostBar} ${s.short}`} />
                        <div className={`${s.ghostBar} ${s.mid}`} />
                        <div className={`${s.ghostBar} ${s.short}`} />
                      </div>
                    </div>
                  );
                })}

                {/* front card — live chat, messages appear one by one */}
                <div className={`${s.card} ${s.cardFront}`} style={{ ["--p" as string]: 0 }}>
                  <div className={s.convo}>
                    <AnimatePresence mode="popLayout">
                      {convo.slice(0, step).map((m, mi) =>
                        m.role === "in" ? (
                          <motion.div
                            key={`${idx}-${mi}`}
                            layout
                            className={s.row}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className={s.avatar} />
                            <span className={`${s.bubble} ${s.bubbleIn}`}>{m.text}</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            key={`${idx}-${mi}`}
                            layout
                            className={`${s.bubble} ${s.bubbleOut}`}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {m.text}
                          </motion.span>
                        )
                      )}

                      {/* typing indicator for the upcoming message */}
                      {typing && (
                        <motion.div
                          key={`${idx}-typing`}
                          layout
                          className={nextRole === "in" ? s.row : ""}
                          style={nextRole === "out" ? { alignSelf: "flex-end" } : undefined}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {nextRole === "in" && <span className={s.avatar} />}
                          <span className={s.typingBubble}>
                            <span className={s.dot} />
                            <span className={s.dot} />
                            <span className={s.dot} />
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
