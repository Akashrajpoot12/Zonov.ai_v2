import Link from "next/link";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { BadgeCheck, Globe, ShieldCheck } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   TRUST INFRASTRUCTURE, centered heading + subtitle + CTA, a 3×2
   feature grid split by a vertical divider, and compliance badges.
   Clean, white, lots of breathing room.
   ═══════════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    title: "Role-based access control",
    desc: "Every user sees only what their role permits, granular permissions across departments and agents.",
  },
  {
    title: "End-to-end encryption",
    desc: "AES-256 at rest, TLS 1.3 in transit. Patient data is encrypted everywhere it lives and moves.",
  },
  {
    title: "Full audit trails",
    desc: "Every action an agent takes is logged and traceable, so nothing ever happens without a record.",
  },
  {
    title: "HIPAA, GDPR & SOC 2",
    desc: "Built to meet global healthcare and data-protection standards, with SOC 2 Type II controls.",
  },
  {
    title: "Flexible data residency",
    desc: "Host patient data in the region you choose, on AWS or Azure, to meet local requirements.",
  },
  {
    title: "Your data stays yours",
    desc: "We never train shared models on your patients' data. Your information is never sold or exposed.",
  },
];

const BADGES = [
  { Icon: BadgeCheck, label: "SOC 2 Type II" },
  { Icon: Globe, label: "GDPR" },
  { Icon: ShieldCheck, label: "HIPAA" },
];

export default function TrustInfrastructure() {
  return (
    <section className="section-py bg-[var(--surface)] px-edge">
      <div className="container-wide">
        {/* Heading + subtitle + CTA */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="type-display text-[var(--text)] leading-[1.08] [text-wrap:balance]">
              AI Trust Infrastructure
              <br />
              <span className="text-[var(--text-muted)]">Full control.</span>{" "}
              <span className="text-[var(--text-dim)] italic">No exceptions.</span>
            </h2>
            <p className="type-body text-[var(--text-muted)] mt-6 max-w-xl mx-auto [text-wrap:pretty]">
              Healthcare data demands the highest bar. Zonov.ai is engineered
              with enterprise-grade security and compliance built in from day
              one, not bolted on later.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/platform"
                className="inline-flex items-center justify-center rounded-full bg-[var(--bg)] hover:bg-[var(--border)] text-[var(--text)] text-[13px] font-medium px-6 h-[42px] border border-[var(--border)] transition-colors"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Feature grid with centre divider */}
        <div className="relative mt-20 max-w-4xl mx-auto">
          {/* Vertical divider (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border)]"
          />
          <FadeInStagger
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
            stagger={0.08}
          >
            {FEATURES.map((f, i) => (
              <FadeInItem key={f.title}>
                <div className={i % 2 === 0 ? "md:pr-6" : "md:pl-10"}>
                  <h3 className="text-[15px] font-semibold text-[var(--text)] mb-1.5 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-muted)] leading-relaxed max-w-[300px]">
                    {f.desc}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>

        {/* Compliance badges, with the connector line below them */}
        <FadeIn delay={0.1}>
          <div className="mt-16 flex flex-col items-center">
            <div className="flex items-center justify-center gap-6">
              {BADGES.map((b) => (
                <div
                  key={b.label}
                  className="w-[76px] h-[76px] rounded-full border border-[var(--border)] bg-white flex flex-col items-center justify-center gap-1.5 shadow-sm"
                  title={b.label}
                >
                  <b.Icon className="w-4 h-4 text-[var(--text-muted)]" strokeWidth={1.75} />
                  <span className="text-[8px] font-semibold tracking-wider text-[var(--text-dim)] uppercase text-center leading-tight px-1">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
            <div aria-hidden className="w-px h-12 bg-[var(--border)] mt-8" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
