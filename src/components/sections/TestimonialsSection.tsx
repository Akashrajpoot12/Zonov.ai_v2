"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "@/components/ui/CountUp";
import s from "./TestimonialsSection.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Zonov.ai reduced our patient registration time from 12 minutes to under 90 seconds. Our OPD queue has never been shorter.",
    name: "Dr. Priya Sharma",
    role: "Medical Director",
    org: "Apex Multispeciality Hospital, Pune",
    avatar: "PS",
    accent: "#1B4FD8",
  },
  {
    quote:
      "The voice-to-prescription feature alone saves me 2 hours every day. I can finally focus on what I trained for: treating patients.",
    name: "Dr. Rajesh Kumar",
    role: "Senior Consultant, Internal Medicine",
    org: "City Care Hospital, Delhi",
    avatar: "RK",
    accent: "#00B4AE",
  },
  {
    quote:
      "Our billing team recovered significant missed charges in the first month, revenue we never even knew we were losing. The leakage detection is extraordinary.",
    name: "Mr. Anil Mehta",
    role: "CFO",
    org: "Sunshine Hospital Group, Mumbai",
    avatar: "AM",
    accent: "#7C3AED",
  },
];

const METRICS = [
  { value: 40, suffix: "%", label: "Reduction in paperwork" },
  { value: 90, suffix: "s", label: "Patient registration time" },
  { value: 98, suffix: "%", label: "Documentation accuracy" },
  { value: 3, suffix: "×", label: "Improvement in follow-ups" },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -90]);

  return (
    <section ref={sectionRef} className={s.section}>

      {/* ── Parallax blob layers ── */}
      <motion.div className={s.blobLayer} style={{ y: y1 }}>
        <div className={`${s.blob} ${s.blobBlue1}`} />
        <div className={`${s.blob} ${s.blobPurple}`} />
      </motion.div>
      <motion.div className={s.blobLayer} style={{ y: y2 }}>
        <div className={`${s.blob} ${s.blobTeal}`} />
      </motion.div>
      <motion.div className={s.blobLayer} style={{ y: y3 }}>
        <div className={`${s.blob} ${s.blobBlue2}`} />
      </motion.div>

      <div className={`container-wide ${s.inner}`}>

        {/* Label */}
        <motion.p
          className={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={s.labelLine} />
          Real Results
        </motion.p>

        {/* Headline */}
        <motion.h2
          className={`type-h1 ${s.headline} google-sans-700`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Healthcare professionals{" "}
          <span className="italic gradient-text">love Zonov.ai.</span>
        </motion.h2>

        {/* Metrics */}
        <div className={s.metricsGrid}>
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className={s.metricCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <p className={s.metricValue}>
                <CountUp value={m.value} suffix={m.suffix} />
              </p>
              <p className={s.metricLabel}>{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className={s.cardsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className={s.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className={s.quoteGlyph} style={{ color: t.accent }}>&ldquo;</div>
              <p className={s.quoteText}>{t.quote}</p>
              <div className={s.divider} />
              <div className={s.author}>
                <div className={s.avatar} style={{ background: t.accent }}>
                  {t.avatar}
                </div>
                <div>
                  <p className={s.authorName}>{t.name}</p>
                  <p className={s.authorRole}>{t.role} · {t.org}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
