import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function PlatformHero() {
  return (
    <section className="pt-[120px] pb-20 bg-[var(--dark-navy)] text-white">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-white/40 mb-5 flex items-center gap-3">
            The Platform
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="type-display text-white max-w-3xl [text-wrap:balance] mb-6">
            The all-in-one platform for every{" "}
            <span style={{ color: "var(--secondary)" }} className="italic">
              clinical workflow.
            </span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="type-subtitle text-white/60 max-w-xl mb-10">
            One unified AI infrastructure behind every care decision, from patient arrival to final billing. Deploy in 1–2 weeks, not 18 months.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="flex gap-4 flex-wrap">
            <Link href="/book-demo" className="btn btn-primary-lg">Book a Demo</Link>
            <Link href="#steps" className="btn btn-glass-lg gap-2">
              See How It Works <ChevronDown className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </FadeIn>

        {/* Quick stats */}
        <FadeIn delay={0.2}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "1–2 wks", l: "Time to deploy" },
              { n: "8", l: "Specialized AI agents" },
              { n: "100%", l: "HIPAA compliant" },
              { n: "24/7", l: "Autonomous operation" },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 rounded-[16px] p-5 border border-white/8">
                <p className="text-[28px] tracking-tight text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  {s.n}
                </p>
                <p className="type-mono text-white/35">{s.l}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
