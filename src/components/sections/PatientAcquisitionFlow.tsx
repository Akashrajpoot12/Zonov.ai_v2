"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  Check,
  ArrowRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PATIENT ACQUISITION FLOW, an animated product demo: a patient
   list flows through the agent, out across voice / SMS / email, and
   a live SMS conversation books the appointment. Zonov brand theme.
   ═══════════════════════════════════════════════════════════════ */

const ROWS = [
  { bar: "72%", dim: false },
  { bar: "58%", dim: true },
  { bar: "66%", dim: true },
  { bar: "50%", dim: true },
  { bar: "62%", dim: true },
];

const CHANNELS = [
  { Icon: Phone, label: "Voice", active: false },
  { Icon: MessageSquare, label: "SMS · Text", active: true },
  { Icon: Mail, label: "Email", active: false },
];

const chatContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.55, delayChildren: 0.3 } },
};
const chatItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function Connector() {
  return (
    <ArrowRight
      className="hidden lg:block w-6 h-6 text-white/35 flex-shrink-0"
      strokeWidth={2}
    />
  );
}

export default function PatientAcquisitionFlow() {
  return (
    <section className="section-py bg-[var(--surface)] px-edge">
      <div className="container-wide">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="type-mono text-[var(--primary)] mb-3">New Patient Acquisition</p>
          <h2 className="type-h2 text-[var(--text)] [text-wrap:balance] google-sans-700">
            From a patient list to a{" "}
            <span className="italic gradient-text">booked appointment.</span>
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] mt-4 [text-wrap:pretty]">
            Your agent reaches out across voice, SMS, and email, then books the
            visit and syncs it back, automatically.
          </p>
        </div>

        {/* Panel */}
        <div
          className="relative rounded-[28px] overflow-hidden p-6 md:p-10 lg:p-12"
          style={{
            background:
              "linear-gradient(140deg, #1B4FD8 0%, #1A3A8F 52%, #0D1F3C 100%)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: "30rem",
              height: "30rem",
              top: "-8rem",
              left: "40%",
              background: "radial-gradient(circle, rgba(0,180,174,0.22), transparent 68%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
            {/* ── Patient List ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[300px] rounded-[18px] bg-white/10 border border-white/15 backdrop-blur-sm p-5 flex-shrink-0"
            >
              <p className="type-mono text-white/45 text-[9px] mb-1">
                New Patient Acquisition
              </p>
              <h4 className="text-white text-[18px] font-semibold mb-4 tracking-tight">
                Patient List
              </h4>
              <div className="flex flex-col gap-2.5">
                {ROWS.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.09 }}
                    className={`flex items-center gap-3 rounded-[10px] p-2.5 ${
                      r.dim ? "bg-white/[0.06]" : "bg-white/[0.14]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/25 flex-shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="h-2 rounded-full bg-white/30" style={{ width: r.bar }} />
                      <div className="h-2 rounded-full bg-white/15 w-1/2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <Connector />

            {/* ── Agent node + channels ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 flex-shrink-0"
            >
              {/* Agent node — Zonov.ai logo */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-[var(--secondary)] blur-2xl opacity-45 animate-pulse" />
                <div className="relative rounded-2xl bg-white flex items-center justify-center shadow-xl h-16 px-5">
                  <Image
                    src="/logo-nav.png"
                    alt="Zonov.ai"
                    width={1377}
                    height={406}
                    style={{ height: "24px", width: "auto" }}
                  />
                </div>
              </div>
              {/* Channels */}
              <div className="flex flex-col gap-2.5">
                {CHANNELS.map((c) => (
                  <div key={c.label} className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        c.active
                          ? "bg-white text-[var(--primary)] shadow-md"
                          : "bg-white/10 text-white/70 border border-white/15"
                      }`}
                    >
                      <c.Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <span
                      className={`type-mono text-[9px] whitespace-nowrap ${
                        c.active ? "text-white font-bold" : "text-white/50"
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Connector />

            {/* ── Chat card ── */}
            <motion.div
              variants={chatContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="w-full max-w-[420px] rounded-[20px] bg-white shadow-2xl p-5 flex-1"
            >
              <motion.p variants={chatItem} className="text-[11px] text-[var(--text-dim)] mb-4">
                1:54 PM
              </motion.p>

              {/* Bot bubble 1 */}
              <motion.div
                variants={chatItem}
                className="bg-[var(--bg)] text-[var(--text)] rounded-2xl rounded-tl-md px-4 py-2.5 text-[14px] leading-snug max-w-[88%] mb-3"
              >
                Hi Maria, Dr. Brown is now accepting new patients.
              </motion.div>

              {/* Bot bubble 2 with slot */}
              <motion.div
                variants={chatItem}
                className="bg-[var(--bg)] text-[var(--text)] rounded-2xl rounded-tl-md px-4 py-3 text-[14px] leading-snug max-w-[88%] mb-3"
              >
                I can get you in next week:
                <div className="mt-2 inline-flex items-center gap-2 bg-white border border-[var(--border)] rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[var(--text)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--primary)]" strokeWidth={2} />
                  Tue, July 14 · 9:00 AM
                </div>
              </motion.div>

              {/* User bubble */}
              <motion.div
                variants={chatItem}
                className="bg-[var(--primary)] text-white rounded-2xl rounded-br-md px-4 py-2.5 text-[14px] leading-snug max-w-[80%] ml-auto mb-4"
              >
                Tuesday works for me!
              </motion.div>

              {/* Booked */}
              <motion.div
                variants={chatItem}
                className="flex items-center gap-2 bg-[var(--success)]/12 text-[var(--success)] rounded-xl px-4 py-3 text-[13px] font-semibold"
              >
                <Check className="w-4 h-4" strokeWidth={2.5} />
                Appointment booked
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
