"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import {
  Bot,
  Zap,
  Globe,
  Check,
  X,
  UserRound,
  Stethoscope,
  Building2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   WHY ZONOV, three sections (Differentiator, Results, Value) merged
   under one heading with horizontal tabs. Each tab shows its content
   full-width, its cards rising in a stagger. Ambient glows + dark.
   ═══════════════════════════════════════════════════════════════ */

const TABS = [
  {
    label: "What Makes Us Different",
    blurb:
      "Traditional software just stores data. Zonov.ai deploys AI employees that actually do the work, across every hospital workflow.",
  },
  {
    label: "Real Results",
    blurb:
      "Faster registration, less paperwork, recovered revenue. Here's the measurable impact hospitals see with Zonov.ai.",
  },
  {
    label: "The Value We Create",
    blurb:
      "When AI handles the admin, everyone wins, patients, doctors, and hospitals alike.",
  },
];

const COMPARISON = [
  { label: "Data Storage", hims: true },
  { label: "Workflow Automation", hims: false },
  { label: "AI Voice Documentation", hims: false },
  { label: "Revenue Leakage Detection", hims: false },
  { label: "Proactive Patient Follow-up", hims: false },
  { label: "Real-time Operational AI", hims: false },
  { label: "Works Like Digital Employees", hims: false },
];

const WHY_DIFFERENT = [
  {
    Icon: Bot,
    title: "AI Employees, Not Just Software",
    desc: "Traditional HIMS stores information. Zonov.ai agents perform work, automatically, intelligently, continuously.",
  },
  {
    Icon: Zap,
    title: "Deploy in 1–2 Weeks",
    desc: "No 18-month IT projects. Our agents integrate with your existing systems and go live fast.",
  },
  {
    Icon: Globe,
    title: "Built for Modern Healthcare",
    desc: "National health ID integration, multilingual support, and insurance workflows, designed for healthcare worldwide.",
  },
];

const METRICS = [
  { value: 40, suffix: "%", label: "Reduction in paperwork" },
  { value: 90, suffix: "s", label: "Patient registration time" },
  { value: 98, suffix: "%", label: "Documentation accuracy" },
  { value: 3, suffix: "×", label: "Improvement in follow-ups" },
];

const TESTIMONIALS = [
  {
    quote:
      "Zonov.ai reduced our patient registration time from 12 minutes to under 90 seconds. Our OPD queue has never been shorter.",
    name: "Dr. Priya Sharma",
    role: "Medical Director",
    avatar: "PS",
    accent: "#3B82F6",
  },
  {
    quote:
      "The voice-to-prescription feature alone saves me 2 hours every day. I can finally focus on what I trained for: treating patients.",
    name: "Dr. Rajesh Kumar",
    role: "Senior Consultant, Internal Medicine",
    avatar: "RK",
    accent: "#00B4AE",
  },
  {
    quote:
      "Our billing team recovered significant missed charges in the first month, revenue we never even knew we were losing. The leakage detection is extraordinary.",
    name: "Mr. Anil Mehta",
    role: "CFO",
    avatar: "AM",
    accent: "#A78BFA",
  },
];

const STAKEHOLDERS = [
  {
    Icon: UserRound,
    title: "For Patients",
    color: "#3B82F6",
    values: [
      "Faster registration in seconds, not minutes",
      "Shorter waiting times",
      "Better follow-ups & reminders",
      "Improved care experience overall",
    ],
  },
  {
    Icon: Stethoscope,
    title: "For Doctors",
    color: "#00B4AE",
    values: [
      "Less documentation burden",
      "Reduced clinician burnout",
      "More time spent with patients",
      "AI-assisted clinical decisions",
    ],
  },
  {
    Icon: Building2,
    title: "For Hospitals",
    color: "#A78BFA",
    values: [
      "Increased operational efficiency",
      "Higher revenue capture (+15–20%)",
      "Lower operational costs",
      "Better compliance & audit trails",
    ],
  },
];

const containerV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyZonov() {
  const [active, setActive] = useState(0);

  return (
    <section className="noise relative overflow-hidden section-py bg-[var(--dark-navy)] section-dark">
      {/* Ambient brand glows for depth */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: "48rem",
          height: "28rem",
          background: "radial-gradient(ellipse at center, rgba(0,180,174,0.16), transparent 65%)",
          filter: "blur(35px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 rounded-full"
        style={{
          width: "42rem",
          height: "32rem",
          background: "radial-gradient(ellipse at center, rgba(27,79,216,0.20), transparent 65%)",
          filter: "blur(45px)",
        }}
      />

      <div className="container-wide relative z-10">
        {/* Vertical tabs (left) + panel (right) */}
        <div className="grid lg:grid-cols-[250px_1fr] gap-8 lg:gap-14 items-start">
          {/* Tabs, stacked top to bottom, with a contextual blurb */}
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-col gap-2">
              {TABS.map((tab, idx) => (
                <button
                  key={tab.label}
                  onClick={() => setActive(idx)}
                  className={`text-left rounded-[14px] px-4 py-3.5 transition-all duration-200 ${
                    active === idx
                      ? "bg-[var(--secondary)] text-[var(--dark-navy)] font-semibold shadow-[0_6px_24px_rgba(0,180,174,0.30)]"
                      : "text-white/55 hover:text-white hover:bg-white/[0.05] font-medium"
                  }`}
                >
                  <span
                    className={`type-mono mr-2.5 ${
                      active === idx ? "text-[var(--dark-navy)]/60" : "text-[var(--secondary)]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-[14px] tracking-tight">{tab.label}</span>
                </button>
              ))}
            </div>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[13px] text-white/50 leading-relaxed mt-8 pl-1 max-w-[240px]"
            >
              {TABS[active].blurb}
            </motion.p>
          </div>

          {/* Panel, all three stacked in one grid cell so the container is
              always as tall as the tallest panel (no size jump on switch) */}
          <div className="grid">
            {[PanelDifferent, PanelResults, PanelValue].map((Panel, i) => (
              <motion.div
                key={i}
                style={{
                  gridArea: "1 / 1",
                  pointerEvents: active === i ? "auto" : "none",
                }}
                animate={{ opacity: active === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={active !== i}
              >
                <Panel />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Panel 1: Different ─────────────────────────── */
function PanelDifferent() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Comparison table */}
      <motion.div variants={containerV} initial="hidden" animate="show">
        <motion.h3 variants={itemV} className="type-h3 text-white mb-6 [text-wrap:balance]">
          Most software <em>stores</em> data.{" "}
          <span style={{ color: "var(--secondary)" }}>Zonov.ai does the work.</span>
        </motion.h3>
        <motion.div variants={itemV} className="rounded-[18px] overflow-hidden border border-white/10">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 bg-white/5 px-5 py-3">
            <span className="type-mono text-white/30">Feature</span>
            <span className="type-mono text-white/30 text-center w-16">Trad. HIMS</span>
            <span className="type-mono text-[var(--secondary)] text-center w-16">Zonov.ai</span>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-5 py-3.5 border-t border-white/5 ${
                i % 2 === 0 ? "bg-white/[0.02]" : ""
              }`}
            >
              <span className="text-[13px] text-white/70">{row.label}</span>
              <div className="flex justify-center w-16">
                {row.hims ? (
                  <Check className="w-4 h-4 text-white/40" strokeWidth={2} />
                ) : (
                  <X className="w-4 h-4 text-red-400/60" strokeWidth={2} />
                )}
              </div>
              <div className="flex justify-center w-16">
                <Check className="w-4 h-4 text-[var(--secondary)]" strokeWidth={2} />
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Differentiator cards */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4 lg:pt-16"
      >
        {WHY_DIFFERENT.map((item) => (
          <motion.div
            key={item.title}
            variants={itemV}
            className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5 flex gap-4 items-start hover:bg-white/[0.07] transition-colors"
          >
            <div className="w-11 h-11 rounded-[12px] bg-white/8 flex items-center justify-center text-[var(--secondary)] flex-shrink-0">
              <item.Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-white mb-1.5 tracking-tight">
                {item.title}
              </h4>
              <p className="text-[13px] text-white/55 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── Panel 2: Results ─────────────────────────── */
function PanelResults() {
  return (
    <div>
      {/* Metrics */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
      >
        {METRICS.map((m) => (
          <motion.div
            key={m.label}
            variants={itemV}
            className="rounded-[18px] border border-white/10 bg-white/[0.04] p-6 text-center"
          >
            <p
              className="text-[clamp(30px,3.5vw,44px)] leading-none font-bold"
              style={{
                fontFamily: "var(--font-playfair)",
                background: "linear-gradient(120deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              <CountUp value={m.value} suffix={m.suffix} />
            </p>
            <p className="text-[12px] text-white/50 mt-3 leading-snug">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-5"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.name}
            variants={itemV}
            className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6 flex flex-col hover:bg-white/[0.06] transition-colors"
          >
            <div className="text-4xl leading-none mb-3" style={{ color: t.accent }}>
              &ldquo;
            </div>
            <p className="text-[13.5px] text-white/80 italic leading-relaxed mb-5">
              {t.quote}
            </p>
            <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0"
                style={{ background: t.accent }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white leading-tight">{t.name}</p>
                <p className="text-[11px] text-white/45 leading-tight">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── Panel 3: Value ─────────────────────────── */
function PanelValue() {
  return (
    <div>
      {/* Stakeholders */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-5 mb-8"
      >
        {STAKEHOLDERS.map((s) => (
          <motion.div
            key={s.title}
            variants={itemV}
            className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6 flex flex-col"
          >
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5"
              style={{ background: `${s.color}22`, color: s.color }}
            >
              <s.Icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h4 className="text-[15px] font-semibold mb-4 tracking-tight" style={{ color: s.color }}>
              {s.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {s.values.map((v) => (
                <li
                  key={v}
                  className="flex items-start gap-2.5 text-[13px] text-white/60 leading-relaxed"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: s.color }}
                  />
                  {v}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission / Vision */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-5"
      >
        <motion.div
          variants={itemV}
          className="rounded-[20px] p-8 bg-[var(--primary)]/12 border border-[var(--primary)]/25"
        >
          <p className="type-mono text-[#60A5FA] mb-3">Our Mission</p>
          <p
            className="text-[17px] text-white/90 leading-relaxed italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;To eliminate healthcare inefficiency through AI-powered
            autonomous agents, giving every healthcare professional an AI
            workforce so they can spend more time caring for patients.&rdquo;
          </p>
        </motion.div>
        <motion.div
          variants={itemV}
          className="rounded-[20px] p-8 bg-white/[0.04] border border-white/10"
        >
          <p className="type-mono text-[var(--secondary)] mb-3">Our Vision</p>
          <p
            className="text-[17px] text-white/90 leading-relaxed italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;To build the world&rsquo;s AI Operating System for Healthcare,
            powering every hospital, clinic, laboratory, and healthcare network
            with intelligent AI agents.&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
