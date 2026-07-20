import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import type { LucideIcon } from "lucide-react";
import { Cable, Rocket, Sparkles } from "lucide-react";

const STEPS: { num: string; icon: LucideIcon; title: string; desc: string }[] = [
  {
    num: "01",
    icon: Cable,
    title: "Connect your systems",
    desc: "Zonov.ai plugs into your existing HIS, lab, and pharmacy software over secure APIs and HL7/FHIR. No rip-and-replace.",
  },
  {
    num: "02",
    icon: Rocket,
    title: "Deploy your agents",
    desc: "The agents you choose go live in 1–2 weeks, configured to your workflows and trained on your hospital's data.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Automate & save",
    desc: "Agents handle registration, documentation, billing, and more, so your team spends its time on patients.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        {/* Heading, centered */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <p className="type-mono text-[var(--primary)] mb-4">How It Works</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="type-h1 text-[var(--text)] [text-wrap:balance] mb-4 google-sans-700">
              Live in weeks, <span className="italic gradient-text">not months.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="type-body-lg text-[var(--text-muted)] [text-wrap:pretty]">
              No long IT projects. Zonov.ai works on top of what you already have, and your agents are running before the month is out.
            </p>
          </FadeIn>
        </div>

        {/* Connected stepper, centered */}
        <div className="relative">
          {/* connector line behind the centered icon nodes (desktop) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-[var(--border-strong)]"
          />
          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-6 relative">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <FadeInItem key={step.num}>
                  <div className="flex flex-col items-center text-center">
                    {/* icon node */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-[var(--primary-subtle)] flex items-center justify-center text-[var(--primary)] mb-5">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>

                    <span className="type-mono text-[var(--text-dim)] text-[12px]">STEP {step.num}</span>
                    <h3 className="type-h4 text-[var(--text)] mt-1 mb-2">{step.title}</h3>
                    <p className="type-body text-[var(--text-muted)] leading-relaxed max-w-xs">{step.desc}</p>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
