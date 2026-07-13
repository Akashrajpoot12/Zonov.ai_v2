"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { IdCard, Stethoscope, Microscope, Pill, BedDouble, Syringe, ReceiptText, Wallet } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

/* Teaser data only — coverage + outcome, no mechanics. */
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
      <style>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          50%, 100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-shimmer {
          animation: shimmer-sweep 4s ease-in-out infinite;
        }
        @keyframes type-log {
          0%, 20% { max-width: 0; opacity: 0; }
          40%, 100% { max-width: 100%; opacity: 1; }
        }
        .animate-type-log {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: type-log 3s steps(30, end) infinite alternate;
        }
        .holographic-grid {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
          transform: perspective(500px) rotateX(60deg) translateY(-50px) translateZ(-200px);
          transform-origin: top center;
        }
      `}</style>
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
                  <ag.icon className="w-4 h-4" strokeWidth={2} />
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
            className="noise relative rounded-[24px] overflow-hidden min-h-[420px] flex items-center justify-center"
            style={{ background: "linear-gradient(160deg,#0D1F3C 0%,#122050 60%,#0A1830 100%)", perspective: "1000px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Holographic Grid Background */}
            <div className="absolute inset-0 holographic-grid pointer-events-none" />

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
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 sm:p-8"
              >
                {/* 3D Hover Wrapper (separated to prevent transform conflicts) */}
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="w-full flex justify-center"
                >
                  {/* Premium Bento Grid Container */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[340px]" style={{ transform: "translateZ(30px)" }}>
                  
                  {/* Card 1: Main Identity (Full width) */}
                  <div 
                    className="col-span-2 glass-card-dark rounded-[16px] sm:rounded-[20px] p-4 flex items-center gap-4 border-l-4 shadow-xl hover:bg-white/[0.04] transition-colors relative overflow-hidden" 
                    style={{ borderLeftColor: a.color }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-shimmer pointer-events-none" />
                    <div 
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl shadow-inner relative overflow-hidden" 
                      style={{ background: `${a.color}22`, border: `1px solid ${a.color}55` }}
                    >
                      <span className="absolute inset-0 opacity-50 bg-gradient-to-tr from-transparent to-white/20" />
                      <a.icon className="relative z-10 w-6 h-6" strokeWidth={1.5} style={{ color: a.color }} />
                    </div>
                    <div>
                      <h4 className="text-white text-[14px] sm:text-[15px] font-semibold tracking-tight">{a.short} AI</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: a.color }} />
                        <span className="text-white/50 text-[10px] sm:text-[11px] font-mono tracking-wide uppercase">System Online</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Metric/Outcome */}
                  <div className="col-span-1 glass-card-dark rounded-[16px] sm:rounded-[20px] p-4 flex flex-col justify-between relative overflow-hidden shadow-lg group">
                    <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-30 transition-opacity group-hover:opacity-50" style={{ background: a.color }} />
                    <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest font-mono mb-3">Target Outcome</span>
                    <span className="text-white text-[12px] sm:text-[13px] font-medium leading-snug">{a.outcome}</span>
                  </div>

                  {/* Card 3: Activity Chart / Progress */}
                  <div className="col-span-1 glass-card-dark rounded-[16px] sm:rounded-[20px] p-4 flex flex-col justify-between shadow-lg">
                    <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest font-mono mb-2">Efficiency</span>
                    <div className="w-full flex items-end gap-1.5 h-10 mt-2">
                      {[30, 50, 40, 70, 55, 100].map((h, idx) => (
                        <div 
                          key={idx} 
                          className="w-full rounded-t-[2px] transition-all duration-700 delay-100" 
                          style={{ 
                            height: `${h}%`, 
                            background: idx === 5 ? a.color : 'rgba(255,255,255,0.08)' 
                          }} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card 4: Action Log (Full width) */}
                  <div className="col-span-2 glass-card-dark rounded-[14px] p-3 sm:p-4 flex items-center justify-between shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-shimmer pointer-events-none" style={{ animationDelay: '1.5s' }} />
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center relative" style={{ background: `${a.color}22` }}>
                        <span className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ background: a.color }} />
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-white/70 text-[10px] sm:text-[11px] font-mono tracking-tight animate-type-log max-w-[180px] sm:max-w-[220px]">
                        Executing {a.area} tasks...
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-[var(--secondary)] animate-pulse whitespace-nowrap">Live</span>
                  </div>
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
