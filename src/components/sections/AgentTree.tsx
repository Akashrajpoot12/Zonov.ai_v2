"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IdCard,
  Stethoscope,
  Microscope,
  ReceiptText,
  Wallet,
  Syringe,
  BedDouble,
  Pill,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Coordinate space (matches SVG viewBox) ── */
const VW = 1200;
const VH = 860;
const CX = 600;
const CY = 430;
const RX = 430; // orbit radius X
const RY = 300; // orbit radius Y

type Agent = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  outcome: string;
  color: string;
};

/* Ordered clockwise from top */
const AGENTS: Agent[] = [
  { slug: "patient-registration", name: "Registration Agent", short: "Registration", icon: IdCard, outcome: "Up to 60% faster OPD", color: "#1B4FD8" },
  { slug: "doctor-prescription", name: "Doctor Prescription Agent", short: "Prescription", icon: Stethoscope, outcome: "~2 hrs back / doctor", color: "#00B4AE" },
  { slug: "investigation", name: "Investigation Agent", short: "Investigation", icon: Microscope, outcome: "Up to 40% faster results", color: "#7C3AED" },
  { slug: "claim", name: "Claim Agent", short: "Claims", icon: ReceiptText, outcome: "Up to 20% fewer rejections", color: "#7C3AED" },
  { slug: "finance", name: "Finance Agent", short: "Finance", icon: Wallet, outcome: "Up to 20% leakage recovered", color: "#1B4FD8" },
  { slug: "ot", name: "OT Agent", short: "OT", icon: Syringe, outcome: "Up to 30% fewer delays", color: "#0D1F3C" },
  { slug: "ipd", name: "IPD Agent", short: "IPD", icon: BedDouble, outcome: "Complete handovers", color: "#D97706" },
  { slug: "pharmacy", name: "Pharmacy Agent", short: "Pharmacy", icon: Pill, outcome: "Near-zero wastage", color: "#059669" },
];

const N = AGENTS.length;
const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/* Position of each agent on the ellipse (start at top, go clockwise) */
function posOf(i: number) {
  const angle = -Math.PI / 2 + (i / N) * Math.PI * 2;
  return { x: CX + RX * Math.cos(angle), y: CY + RY * Math.sin(angle) };
}

const POS = AGENTS.map((_, i) => posOf(i));

export default function AgentTree() {
  return (
    <>
      {/* ════════ DESKTOP — REACTOR CORE (lg+) ════════ */}
      <div
        className="hidden lg:block relative w-full max-w-[1080px] mx-auto"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        {/* ─── SVG layer: orbits + wires + pulses ─── */}
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B4FD8" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00B4AE" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wireGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1B4FD8" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#00B4AE" />
            </linearGradient>
            <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Core ambient glow */}
          <ellipse cx={CX} cy={CY} rx={360} ry={300} fill="url(#coreGlow)" />

          {/* Rotating orbit guides */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="80s" repeatCount="indefinite" />
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 10" opacity="0.6" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from={`360 ${CX} ${CY}`} to={`0 ${CX} ${CY}`} dur="120s" repeatCount="indefinite" />
            <ellipse cx={CX} cy={CY} rx={RX - 70} ry={RY - 50} fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="2 14" opacity="0.4" />
          </g>

          {/* Wires from each agent into the core + traveling pulse */}
          {POS.map((p, i) => {
            const d = `M ${p.x} ${p.y} Q ${(p.x + CX) / 2} ${(p.y + CY) / 2 + (p.y < CY ? -30 : 30)} ${CX} ${CY}`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" opacity="0.45" />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#wireGrad2)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="agent-wire-flow"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                {/* energy pulse traveling toward the core */}
                <circle r="4" fill={AGENTS[i].color}>
                  <animateMotion dur="2.8s" repeatCount="indefinite" path={d} begin={`${i * 0.35}s`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* ─── Pulsing core node ─── */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: pct(CX, VW), top: pct(CY, VH) }}>
          <div className="relative flex items-center justify-center">
            {/* pulse rings */}
            <span className="absolute w-[150px] h-[150px] rounded-full border border-[var(--primary)]/40 animate-pulse-ring" />
            <span className="absolute w-[150px] h-[150px] rounded-full border border-[var(--secondary)]/40 animate-pulse-ring" style={{ animationDelay: "1s" }} />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-primary relative w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-center shadow-2xl shadow-[#1B4FD8]/40"
            >
              <Brain className="w-7 h-7 text-white mb-1" strokeWidth={1.5} />
              <span className="text-white text-[15px] font-semibold tracking-tight leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
                Zonov.ai
              </span>
              <span className="type-mono text-[8px] text-white/70 mt-1">AI OPERATING SYSTEM</span>
            </motion.div>
          </div>
        </div>

        {/* ─── Agent nodes around the core ─── */}
        {AGENTS.map((a, i) => {
          const p = POS[i];
          return (
            <div key={a.slug} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: pct(p.x, VW), top: pct(p.y, VH) }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/agents/${a.slug}`}
                  className="group flex flex-col items-center gap-2 w-[124px]"
                  style={{ ["--ac" as string]: a.color }}
                >
                  {/* glass orb with icon */}
                  <span className="relative flex items-center justify-center">
                    <span
                      className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ background: a.color }}
                    />
                    <span
                      className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300 group-hover:scale-110"
                      style={{ borderColor: `${a.color}40`, boxShadow: `0 6px 20px ${a.color}22` }}
                    >
                      <a.icon className="w-7 h-7" strokeWidth={1.5} style={{ color: a.color }} />
                    </span>
                  </span>
                  {/* label */}
                  <span className="flex flex-col items-center text-center">
                    <span className="text-[13px] font-semibold text-[var(--text)] leading-tight group-hover:text-[var(--ac)] transition-colors">
                      {a.short}
                    </span>
                    <span className="text-[10px] text-[var(--text-dim)] leading-tight">{a.outcome}</span>
                  </span>
                </Link>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ════════ MOBILE / TABLET (stacked spine) ════════ */}
      <div className="lg:hidden relative max-w-md mx-auto pl-6">
        <div
          className="absolute left-[10px] top-2 bottom-2 w-px"
          style={{ background: "linear-gradient(180deg,#1B4FD8,#7C3AED,#00B4AE)" }}
          aria-hidden
        />
        <div className="flex flex-col gap-3">
          {AGENTS.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative"
            >
              <span
                className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ring-2 ring-white"
                style={{ background: a.color }}
                aria-hidden
              />
              <Link
                href={`/agents/${a.slug}`}
                className="group flex items-center gap-3 bg-white border border-[var(--border)] rounded-[16px] p-3 hover:shadow-md transition-all"
              >
                <span className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: `${a.color}18` }}>
                  <a.icon className="w-5 h-5" strokeWidth={1.5} style={{ color: a.color }} />
                </span>
                <span className="flex flex-col flex-1">
                  <span className="text-[14px] font-semibold text-[var(--text)] leading-tight">{a.name}</span>
                  <span className="text-[11px] text-[var(--text-dim)]">{a.outcome}</span>
                </span>
                <span className="text-[var(--text-dim)] group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
