"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { Link2, IdCard, Speech, Receipt, Building2 } from "lucide-react";
import s from "./IndiaPanels.module.css";

function IndiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" width="18" height="12" className={`inline-block rounded-[1px] align-middle ${className ?? ""}`} aria-hidden="true">
      <rect width="36" height="8" y="0" fill="#FF9933" />
      <rect width="36" height="8" y="8" fill="#fff" />
      <rect width="36" height="8" y="16" fill="#138808" />
      <circle cx="18" cy="12" r="3" fill="none" stroke="#000080" strokeWidth="0.6" />
    </svg>
  );
}

type PanelIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const PANELS: { num: string; icon: PanelIcon; title: string; desc: string; color: string }[] = [
  { num: "01", icon: Link2, title: "ABHA & ABDM Ready", desc: "Connects natively to India's Ayushman Bharat Digital Mission — ABHA IDs and the national digital health stack.", color: "#1B4FD8" },
  { num: "02", icon: IdCard, title: "Aadhaar-Based Verification", desc: "Instant, reliable patient identity at registration — no duplicate records, no manual re-entry.", color: "#00B4AE" },
  { num: "03", icon: Speech, title: "Speaks Your Patients' Language", desc: "Engages patients across India's major regional languages, so care is never lost in translation.", color: "#7C3AED" },
  { num: "04", icon: Receipt, title: "Insurance & TPA Workflows", desc: "Built for cashless claims, Ayushman Bharat, and the TPA portals Indian hospitals handle every day.", color: "#059669" },
  { num: "05", icon: Building2, title: "Made for India's Scale", desc: "Designed for high-volume OPDs and multi-specialty hospitals — hundreds of patients a day, handled calmly.", color: "#D97706" },
  { num: "06", icon: IndiaFlag, title: "India-First, Not Adapted", desc: "Engineered from day one for Indian healthcare — not a Western product retrofitted for India.", color: "#1B4FD8" },
];

export default function IndiaPanels() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % PANELS.length), 3200);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="bg-[var(--surface)] section-py">
      <div className="container-wide px-edge">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-2">BUILT FOR INDIA</p>
          <h2 className="type-h2 text-[var(--text)] mb-3 [text-wrap:balance]">
            Designed for Indian healthcare, from the ground up.
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-12">
            Indian hospitals don&rsquo;t run like hospitals anywhere else. Zonov.ai is built for the systems, languages, and scale your hospital actually works with.
          </p>
        </FadeIn>

        {/* Desktop — expanding panels */}
        <FadeIn delay={0.1}>
          <div className={`${s.row} hidden md:flex`}>
            {PANELS.map((p, i) => {
              const on = i === active;
              const Icon = p.icon;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={p.title}
                  className={`${s.panel} ${on ? s.panelActive : ""}`}
                  style={{
                    ["--ac" as string]: p.color,
                    background: on ? `linear-gradient(150deg, ${p.color}1F 0%, ${p.color}08 100%)` : "#fff",
                  }}
                >
                  <span className={s.iconChip} style={{ background: `${p.color}1F`, color: p.color }}><Icon className="w-5 h-5" strokeWidth={1.5} /></span>
                  <span className={s.num}>{p.num}</span>
                  <span className={s.vTitle} style={{ opacity: on ? 0 : 1 }}>{p.title}</span>
                  <span className={`${s.content} ${on ? s.contentOn : ""}`}>
                    <span className={s.cTitle}>{p.title}</span>
                    <span className={s.cDesc}>{p.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Mobile — simple stacked cards */}
        <div className="md:hidden flex flex-col gap-3">
          {PANELS.map((p) => {
            const Icon = p.icon;
            return (
            <div
              key={p.title}
              className="rounded-[18px] border border-[var(--border)] bg-white p-5 flex items-start gap-4"
            >
              <span className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}1F`, color: p.color }}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="type-body font-semibold text-[var(--text)] mb-1">{p.title}</h3>
                <p className="type-caption text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
              </div>
            </div>
            );
          })}
        </div>

        <FadeIn delay={0.15}>
          <p className="mt-8 type-body text-[var(--text-dim)]">
            Built on India&rsquo;s digital health rails —{" "}
            <Link href="/platform" className="font-medium text-[var(--primary)] underline underline-offset-2">
              see how the platform connects
            </Link>
            .
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
