"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { Link2, IdCard, Speech, Receipt, Building2, Globe } from "lucide-react";
import s from "./IndiaPanels.module.css";

type PanelIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

const PANELS: { num: string; icon: PanelIcon; title: string; desc: string; color: string }[] = [
  { num: "01", icon: Link2, title: "National Health ID Ready", desc: "Connects natively to national digital health ID systems and the wider health-data stack.", color: "#1B4FD8" },
  { num: "02", icon: IdCard, title: "Instant Identity Verification", desc: "Instant, reliable patient identity at registration: no duplicate records, no manual re-entry.", color: "#00B4AE" },
  { num: "03", icon: Speech, title: "Speaks Your Patients' Language", desc: "Engages patients across dozens of languages, so care is never lost in translation.", color: "#7C3AED" },
  { num: "04", icon: Receipt, title: "Insurance & TPA Workflows", desc: "Built for cashless claims and the insurance and TPA portals hospitals handle every day.", color: "#059669" },
  { num: "05", icon: Building2, title: "Built for High-Volume Care", desc: "Designed for high-volume OPDs and multi-specialty hospitals: hundreds of patients a day, handled calmly.", color: "#D97706" },
  { num: "06", icon: Globe, title: "Built for Modern Healthcare", desc: "Engineered from day one for real hospital workflows, not generic software retrofitted for healthcare.", color: "#1B4FD8" },
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
          <p className="type-mono text-[var(--primary)] mb-2">BUILT FOR MODERN HEALTHCARE</p>
          <h2 className="type-h2 text-[var(--text)] mb-3 [text-wrap:balance]">
            Designed for real healthcare, from the ground up.
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-12">
            Hospitals don&rsquo;t run like ordinary businesses. Zonov.ai is built for the systems, languages, and scale your hospital actually works with.
          </p>
        </FadeIn>

        {/* Desktop, expanding panels */}
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

        {/* Mobile, simple stacked cards */}
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
            Built on open digital health standards:{" "}
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
