"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

const STATS = [
  { value: 8, suffix: "", label: "AI Agents", animate: true },
  { value: null, display: "1–2", suffix: " wks", label: "Weeks to Deploy", animate: false },
  { value: 40, suffix: "%", label: "Less Paperwork", animate: true },
  { value: 100, suffix: "%", label: "HIPAA Compliant", animate: true },
];

export default function HeroSection() {
  return (
    <section className="relative z-10 bg-white rounded-b-[28px] pb-[80px] -mb-[28px] px-edge overflow-hidden">
      {/* Decorative vertical lines */}
      <motion.div
        className="absolute left-[var(--space-edge)] top-0 h-full w-px bg-[var(--border)] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
      <motion.div
        className="absolute right-[var(--space-edge)] top-0 h-full w-px bg-[var(--border)] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      />

      {/* Top padding for navbar */}
      <div className="h-[88px] md:h-[100px] lg:h-[112px]" />

      <div className="container-wide">
        {/* Eyebrow */}
        <motion.p
          className="type-mono text-[var(--primary)] mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-8 h-px bg-[var(--primary)]" />
          AI Operating System for Healthcare
        </motion.p>

        {/* Desktop layout: 2-col */}
        <div className="hidden lg:grid gap-12 items-center" style={{ gridTemplateColumns: "1.8fr 2.2fr" }}>
          <div className="flex flex-col gap-10">
            <motion.h1
              className="type-display text-[var(--text)] [text-wrap:balance]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              The AI Workforce for{" "}
              <span className="gradient-text-shimmer italic">Healthcare.</span>
            </motion.h1>

            <motion.div
              className="relative pl-6 flex flex-col gap-8 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              {/* Left accent line */}
              <motion.div
                className="absolute left-0 top-0 h-full w-px bg-[var(--border-strong)] origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              />
              <motion.div
                className="absolute left-0 top-0 w-[5px] h-6 bg-[var(--primary)] rounded-sm -translate-x-1/2"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              />
              <p className="type-subtitle text-[var(--text-muted)] max-w-[440px] [text-wrap:pretty]">
                Zonov.ai automates every hospital workflow — from patient registration to final billing — using specialized AI agents, so healthcare professionals can focus on saving lives.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/book-demo" className="btn btn-primary-lg">
                  Book a Demo
                </Link>
                <Link href="/platform" className="btn btn-ghost" style={{ height: "50px", padding: "0 24px", fontSize: "16px", borderRadius: "var(--radius-md)" }}>
                  See Platform →
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — Product screenshot */}
          <motion.div
            className="w-full relative"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {/* Ambient glows behind screenshot for depth */}
            <div className="ambient-glow" style={{ width: "55%", height: "55%", top: "-12%", right: "-8%", background: "var(--primary)", opacity: 0.18 }} />
            <div className="ambient-glow" style={{ width: "45%", height: "45%", bottom: "-10%", left: "-6%", background: "var(--secondary)", opacity: 0.16, animationDelay: "3s" }} />

            {/* Browser chrome frame */}
            <div className="relative z-10 rounded-[20px] overflow-hidden border border-[var(--border)] shadow-2xl shadow-[var(--primary)]/10">
              {/* Browser top bar */}
              <div className="bg-[#F8F9FA] border-b border-[var(--border)] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1.5 flex items-center gap-2 border border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
                  <span className="text-[11px] text-[var(--text-dim)] font-mono">app.zonov.ai/dashboard</span>
                </div>
              </div>
              <Image
                src="/hero.png"
                alt="Zonov.ai Hospital Dashboard"
                width={1200}
                height={800}
                priority
                className="w-full h-auto block"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-6 bg-white rounded-[14px] border border-[var(--border)] shadow-lg px-4 py-3 flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="w-8 h-8 rounded-full bg-[var(--success)]/15 flex items-center justify-center text-[var(--success)] text-sm">✓</span>
              <div>
                <p className="text-[12px] font-semibold text-[var(--text)]">20% Revenue Recovered</p>
                <p className="text-[10px] text-[var(--text-muted)]">Sunrise Hospital, Jaipur</p>
              </div>
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-[14px] border border-[var(--border)] shadow-lg px-4 py-3 flex items-center gap-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-[12px] font-semibold text-[var(--text)]">90s Registration</p>
                <p className="text-[10px] text-[var(--text-muted)]">Was 25 minutes</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden flex flex-col gap-8">
          <motion.h1
            className="text-[clamp(34px,8vw,52px)] leading-[1.06] tracking-[-0.025em] text-[var(--text)] [text-wrap:balance]"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            The AI Workforce for{" "}
            <span className="gradient-text italic">Healthcare.</span>
          </motion.h1>
          <motion.p
            className="type-subtitle text-[var(--text-muted)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Automate every hospital workflow with specialized AI agents.
          </motion.p>
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link href="/book-demo" className="btn btn-primary-lg flex-1 justify-center">Book a Demo</Link>
            <Link href="/platform" className="btn btn-ghost flex-1 justify-center" style={{ height: "50px", borderRadius: "var(--radius-md)" }}>Platform →</Link>
          </motion.div>
          <motion.div
            className="w-full rounded-[20px] overflow-hidden border border-[var(--border)] shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image src="/hero.png" alt="Zonov.ai Dashboard" width={800} height={500} className="w-full h-auto block" />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-16 pt-8 border-t border-[var(--border)] grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-[clamp(28px,3vw,40px)] leading-none tracking-tight text-[var(--text)]" style={{ fontFamily: "var(--font-playfair)" }}>
                {s.animate && s.value !== null
                  ? <CountUp value={s.value} suffix={s.suffix} />
                  : <>{s.display}<span className="text-[var(--primary)]">{s.suffix}</span></>}
              </p>
              <p className="type-mono text-[var(--text-dim)] mt-2">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

