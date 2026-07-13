"use client";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────
   TRUST STRIP — "how we work", not the full product.
   Answers the healthcare buyer's first questions:
   Is my data safe? Will it fit my hospital? How fast?
   ────────────────────────────────────────────────────────── */

type Item = { label: string; sub: string; icon: React.ReactNode };

const ITEMS: Item[] = [
  {
    label: "ABDM & ABHA Compliant",
    sub: "Built to India's digital health standards",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z" />
    ),
  },
  {
    label: "Works with Your Existing HIS",
    sub: "No rip-and-replace, integrates on top",
    icon: (
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z" />
    ),
  },
  {
    label: "HL7 / FHIR Integration",
    sub: "Standard, secure clinical data exchange",
    icon: (
      <path d="M3 12h4l2 5 4-14 2 9h6v2h-7l-1.5-6.5L9 19l-3-7H3v0Z" />
    ),
  },
  {
    label: "End-to-End Encryption",
    sub: "Role-based access & full audit trails",
    icon: (
      <path d="M6 10V8a6 6 0 1 1 12 0v2h1v12H5V10h1Zm2 0h8V8a4 4 0 1 0-8 0v2Zm4 4a1.5 1.5 0 0 0-1 2.6V18h2v-1.4A1.5 1.5 0 0 0 12 14Z" />
    ),
  },
  {
    label: "Live in 2–8 Weeks",
    sub: "From kickoff to agents in production",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.6 4 2.3-1 1.7-5-2.9V6h2v6.6Z" />
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="container-wide py-12 md:py-16">
        <motion.p
          className="type-mono text-[var(--primary)] mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-8 h-px bg-[var(--primary)]" />
          Enterprise-Grade, Built for Indian Healthcare
        </motion.p>

        <div className="relative flex flex-col lg:flex-row">
          {/* Desktop Top & Bottom Borders (Draw from center) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[1px] bg-[var(--border)] hidden lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--border)] hidden lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />

          {ITEMS.map((item, i) => (
            <div key={item.label} className="relative flex-1 group">
              {/* Desktop Vertical Divider (Draws top to bottom) */}
              {i > 0 && (
                <motion.div 
                  className="absolute top-0 left-0 w-[1px] h-full bg-[var(--border)] hidden lg:block"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.3 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "top" }}
                />
              )}
              
              {/* Mobile Horizontal Dividers (Draws left to right) */}
              <motion.div 
                className={`absolute ${i === 0 ? 'top-0' : 'top-0'} left-0 w-full h-[1px] bg-[var(--border)] lg:hidden`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
              {/* Mobile very bottom border */}
              {i === ITEMS.length - 1 && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--border)] lg:hidden"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              )}

              <motion.div
                className="flex flex-col p-6 lg:p-8 hover:bg-[var(--surface)] transition-colors duration-300 h-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.7 + (i * 0.08), ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[var(--primary)] group-hover:scale-110 transition-transform duration-500 origin-left">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      {item.icon}
                    </svg>
                  </span>
                  <span 
                    className="text-[var(--text-muted)] opacity-50 text-xl group-hover:opacity-100 group-hover:text-[var(--primary)] transition-all duration-500" 
                    style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <h3 
                  className="text-[18px] text-[var(--text)] leading-snug mb-2 font-medium"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.label}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
                  {item.sub}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
