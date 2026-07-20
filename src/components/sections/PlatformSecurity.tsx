import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import type { LucideIcon } from "lucide-react";
import { Lock, KeyRound, ScrollText, BadgeCheck, Server, EyeOff } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Lock, title: "End-to-end encryption", desc: "AES-256 at rest, TLS 1.3 in transit. Patient data is encrypted everywhere it lives and moves." },
  { icon: KeyRound, title: "Role-based access control", desc: "Every user sees only what their role permits, with granular permissions across departments and agents." },
  { icon: ScrollText, title: "Full audit trails", desc: "Every action an agent takes is logged and traceable, so nothing ever happens without a record." },
  { icon: BadgeCheck, title: "HIPAA, GDPR & SOC 2", desc: "Built to meet global healthcare and data-protection standards, with SOC 2 Type II controls." },
  { icon: Server, title: "Flexible data residency", desc: "Host patient data in the region you choose, on AWS or Azure, to meet local requirements." },
  { icon: EyeOff, title: "Your data stays yours", desc: "We never train shared models on your patients' data. Your information is never sold or exposed." },
];

export default function PlatformSecurity() {
  return (
    <section id="security" className="section-py bg-[var(--dark-navy)] noise relative overflow-hidden scroll-mt-24">
      <div className="container-wide relative z-10">
        <FadeIn>
          <p className="type-mono text-[var(--secondary)] mb-4">Security &amp; Compliance</p>
          <h2 className="type-h1 text-white max-w-2xl [text-wrap:balance] mb-4 google-sans-700">
            Patient data, protected at <span className="italic gradient-text-light">every layer.</span>
          </h2>
          <p className="type-body-lg text-white/60 max-w-xl mb-14">
            Healthcare data demands the highest bar. Zonov.ai is engineered with enterprise-grade security and compliance built in from day one, not bolted on later.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <FadeInItem key={f.title}>
                <div className="card-dark h-full rounded-[20px] p-6 hover:bg-white/[0.08] transition-colors">
                  <div className="w-11 h-11 rounded-[12px] bg-white/8 flex items-center justify-center text-[var(--secondary)] mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-[13px] text-white/55 leading-relaxed">{f.desc}</p>
                </div>
              </FadeInItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
