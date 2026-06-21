"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

/* Teaser data only — coverage + outcome, no mechanics. */
const AGENTS = [
  { slug: "patient-registration", num: "01", name: "Registration Agent", short: "Registration", icon: "🪪", area: "Front desk & OPD", tagline: "Zero-friction intake, from first contact to first care.", outcome: "Up to 60% faster OPD", color: "#1B4FD8" },
  { slug: "doctor-prescription", num: "02", name: "Doctor Prescription Agent", short: "Prescription", icon: "🩺", area: "Clinical documentation", tagline: "Every conversation captured. Every doctor's time given back.", outcome: "~2 hrs back / doctor", color: "#00B4AE" },
  { slug: "investigation", num: "03", name: "Investigation Agent", short: "Investigation", icon: "🔬", area: "Diagnostics & labs", tagline: "From order to insight — at the speed of care.", outcome: "Up to 40% faster results", color: "#7C3AED" },
  { slug: "pharmacy", num: "04", name: "Pharmacy Agent", short: "Pharmacy", icon: "💊", area: "Pharmacy & inventory", tagline: "Near-expiry alerts. Zero wastage.", outcome: "Near-zero wastage", color: "#059669" },
  { slug: "ipd", num: "05", name: "IPD Agent", short: "IPD", icon: "🛏️", area: "In-patient care", tagline: "Nursing handovers. Quality, never lost between shifts.", outcome: "Complete handovers", color: "#D97706" },
  { slug: "ot", num: "06", name: "OT Agent", short: "OT", icon: "🏥", area: "Operation theatres", tagline: "Scheduling, monitoring, and emergencies — under control.", outcome: "Up to 30% fewer delays", color: "#0D1F3C" },
  { slug: "claim", num: "07", name: "Claim Agent", short: "Claims", icon: "📋", area: "Insurance & claims", tagline: "Fewer rejections. More of the revenue you earned.", outcome: "Up to 20% fewer rejections", color: "#7C3AED" },
  { slug: "finance", num: "08", name: "Finance Agent", short: "Finance", icon: "💰", area: "Hospital finance", tagline: "Stop the leak. See every rupee.", outcome: "Up to 20% leakage recovered", color: "#1B4FD8" },
];

export default function AgentsOverview() {
  const [active, setActive] = useState(0);
  const a = AGENTS[active];

  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            What We Provide
          </p>
        </FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <FadeIn>
            <h2 className="type-h1 text-[var(--text)] max-w-xl [text-wrap:balance]">
              AI Agents for every stage of{" "}
              <span className="italic gradient-text">hospital operations.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/agents" className="btn btn-ghost whitespace-nowrap flex-shrink-0">
              Explore all agents →
            </Link>
          </FadeIn>
        </div>

        {/* ── Agent selector tabs ── */}
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-8">
            {AGENTS.map((ag, i) => {
              const on = i === active;
              return (
                <button
                  key={ag.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all border"
                  style={
                    on
                      ? { background: ag.color, color: "#fff", borderColor: ag.color }
                      : { background: "#fff", color: "var(--text-muted)", borderColor: "var(--border)" }
                  }
                >
                  <span className="text-base leading-none">{ag.icon}</span>
                  {ag.short}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* ── Showcase ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT — text */}
          <div className="flex flex-col justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="type-mono mb-3" style={{ color: a.color }}>
                  {a.num} — {a.area}
                </p>
                <h3 className="type-h2 text-[var(--text)] mb-4 [text-wrap:balance]">{a.name}</h3>
                <p className="type-body-lg text-[var(--text-muted)] max-w-md mb-6">{a.tagline}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-block text-[13px] font-semibold px-4 py-2 rounded-full"
                    style={{ background: `${a.color}15`, color: a.color }}
                  >
                    {a.outcome}
                  </span>
                  <Link
                    href={`/agents/${a.slug}`}
                    className="text-[13px] font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                    style={{ color: a.color }}
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — animated visual panel */}
          <div
            className="noise relative rounded-[24px] overflow-hidden min-h-[340px] flex items-center justify-center"
            style={{ background: "linear-gradient(160deg,#0D1F3C 0%,#122050 60%,#0A1830 100%)" }}
          >
            {/* ambient glow (per agent) */}
            <div className="ambient-glow" style={{ width: "60%", height: "60%", top: "10%", left: "20%", background: a.color, opacity: 0.22 }} />

            {/* live header */}
            <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: a.color }} />
              <span className="type-mono text-[10px] text-white/60">{a.short} · live</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* central icon orb */}
                <div className="relative flex items-center justify-center mb-6">
                  <span className="absolute w-28 h-28 rounded-full animate-pulse-ring" style={{ border: `1px solid ${a.color}` }} />
                  <span
                    className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                    style={{ background: `${a.color}22`, border: `1px solid ${a.color}55` }}
                  >
                    {a.icon}
                  </span>
                </div>

                {/* floating chips */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="glass-card-dark px-4 py-2 rounded-full animate-float"
                    style={{ animationDelay: "0s" }}
                  >
                    <span className="text-[12px] text-white/85 font-medium">{a.outcome}</span>
                  </div>
                  <div
                    className="glass-card-dark px-4 py-2 rounded-full animate-float"
                    style={{ animationDelay: "1.2s" }}
                  >
                    <span className="text-[11px] text-white/60">{a.area}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
