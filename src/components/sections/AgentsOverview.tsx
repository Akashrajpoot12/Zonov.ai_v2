"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { IdCard, Stethoscope, Microscope, Pill, BedDouble, Syringe, ReceiptText, Wallet } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import AgentPreview from "./AgentPreview";

/* Teaser data only — coverage + outcome, no mechanics.
   The right-hand live panel is a per-agent product mockup (see AgentPreview). */
const AGENTS = [
  { slug: "patient-registration", num: "01", name: "Registration Agent", short: "Registration", icon: IdCard, area: "Front desk & OPD", tagline: "Zero-friction intake, from first contact to first care.", outcome: "Up to 60% faster OPD", color: "#1B4FD8" },
  { slug: "doctor-prescription", num: "02", name: "Doctor Prescription Agent", short: "Prescription", icon: Stethoscope, area: "Clinical documentation", tagline: "Every conversation captured. Every doctor's time given back.", outcome: "~2 hrs back / doctor", color: "#00B4AE" },
  { slug: "investigation", num: "03", name: "Investigation Agent", short: "Investigation", icon: Microscope, area: "Diagnostics & labs", tagline: "From order to insight, at the speed of care.", outcome: "Up to 40% faster results", color: "#7C3AED" },
  { slug: "pharmacy", num: "04", name: "Pharmacy Agent", short: "Pharmacy", icon: Pill, area: "Pharmacy & inventory", tagline: "Near-expiry alerts. Zero wastage.", outcome: "Near-zero wastage", color: "#059669" },
  { slug: "ipd", num: "05", name: "IPD Agent", short: "IPD", icon: BedDouble, area: "In-patient care", tagline: "Nursing handovers. Quality, never lost between shifts.", outcome: "Complete handovers", color: "#D97706" },
  { slug: "ot", num: "06", name: "OT Agent", short: "OT", icon: Syringe, area: "Operation theatres", tagline: "Scheduling, monitoring, and emergencies. Under control.", outcome: "Up to 30% fewer delays", color: "#0D1F3C" },
  { slug: "claim", num: "07", name: "Claim Agent", short: "Claims", icon: ReceiptText, area: "Insurance & claims", tagline: "Fewer rejections. More of the revenue you earned.", outcome: "Up to 20% fewer rejections", color: "#7C3AED" },
  { slug: "finance", num: "08", name: "Finance Agent", short: "Finance", icon: Wallet, area: "Hospital finance", tagline: "Stop the leak. See every rupee.", outcome: "Up to 20% leakage recovered", color: "#1B4FD8" },
];

export default function AgentsOverview() {
  const [active, setActive] = useState(0);
  const a = AGENTS[active];

  // 3D Hover Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
            <h2 className="type-h1 text-[var(--text)] max-w-xl [text-wrap:balance] google-sans-700">
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

        {/* ── Patient-journey pipeline selector ── */}
        <FadeIn delay={0.05}>
          <p className="type-mono text-[var(--text-dim)] mb-4 text-[10px]">The patient journey — one platform, every stage</p>
          <div className="overflow-x-auto pb-3 mb-10 -mx-[var(--space-edge)] px-[var(--space-edge)]">
            <div className="relative flex min-w-[720px] lg:min-w-0">
              {/* connecting line (track + colored progress up to active step) */}
              <div className="absolute top-[23px] h-[2px] bg-[var(--border)]" style={{ left: "6.25%", right: "6.25%" }} />
              <div
                className="absolute top-[23px] h-[2px] transition-all duration-500"
                style={{ left: "6.25%", width: `${(active / (AGENTS.length - 1)) * 87.5}%`, background: a.color, opacity: 0.55 }}
              />
              {AGENTS.map((ag, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <button
                    key={ag.slug}
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative z-10 flex-1 flex flex-col items-center gap-2 px-1 group"
                    aria-label={ag.name}
                  >
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-105"
                      style={
                        on
                          ? { background: ag.color, borderColor: ag.color, color: "#fff", boxShadow: `0 6px 18px -4px ${ag.color}` }
                          : { background: "var(--surface)", borderColor: done ? `${ag.color}80` : "var(--border-strong)", color: done ? ag.color : "var(--text-dim)" }
                      }
                    >
                      <ag.icon className="w-5 h-5" strokeWidth={2} />
                    </span>
                    <span className="type-mono text-[9px]" style={{ color: on ? ag.color : "var(--text-dim)" }}>{ag.num}</span>
                    <span
                      className="text-[11px] font-medium text-center leading-tight max-w-[88px]"
                      style={{ color: on ? "var(--text)" : "var(--text-muted)" }}
                    >
                      {ag.short}
                    </span>
                  </button>
                );
              })}
            </div>
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

          {/* RIGHT — per-agent live product mockup (light) */}
          <div
            className="relative rounded-[24px] overflow-hidden min-h-[420px] flex items-center justify-center border shadow-sm"
            style={{
              perspective: "1000px",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: `${a.color}2A`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* per-agent color wash + glows */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: a.color, opacity: 0.04 }} />
            <div className="ambient-glow" style={{ width: "60%", height: "60%", top: "-6%", right: "-8%", background: a.color, opacity: 0.14 }} />
            <div className="ambient-glow" style={{ width: "45%", height: "45%", bottom: "-8%", left: "-4%", background: a.color, opacity: 0.10, animationDelay: "3s" }} />

            {/* live header */}
            <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: a.color }} />
              <span className="type-mono text-[10px] text-[var(--text-muted)]">{a.short} · live</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-8 pt-14 pb-6"
              >
                {/* 3D Hover Wrapper */}
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="w-full flex justify-center"
                >
                  <div className="w-full max-w-[360px]" style={{ transform: "translateZ(30px)" }}>
                    <AgentPreview a={a} />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
