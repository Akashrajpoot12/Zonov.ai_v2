import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

const COMPARISON = [
  { label: "Data Storage", hims: true, zonov: true },
  { label: "Workflow Automation", hims: false, zonov: true },
  { label: "AI Voice Documentation", hims: false, zonov: true },
  { label: "Revenue Leakage Detection", hims: false, zonov: true },
  { label: "Proactive Patient Follow-up", hims: false, zonov: true },
  { label: "Real-time Operational AI", hims: false, zonov: true },
  { label: "Works Like Digital Employees", hims: false, zonov: true },
];

const WHY_DIFFERENT = [
  {
    icon: "🤖",
    title: "AI Employees, Not Just Software",
    desc: "Traditional HIMS stores information. Zonov.ai agents perform work — automatically, intelligently, continuously.",
  },
  {
    icon: "⚡",
    title: "Deploy in 1–2 Weeks",
    desc: "No 18-month IT projects. Our agents integrate with your existing systems and go live fast.",
  },
  {
    icon: "🇮🇳",
    title: "Built for Indian Healthcare",
    desc: "Aadhaar integration, multilingual support, ABHA, insurance workflows — designed from day one for India.",
  },
  {
    icon: "🔒",
    title: "HIPAA & DPDP Compliant",
    desc: "Patient data is protected with enterprise-grade security and full compliance with Indian data protection laws.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="noise relative overflow-hidden section-py transition-theme bg-[var(--dark-navy)] section-dark">
      <CursorSpotlight color="rgba(0,180,174,0.16)" size={560} />
      <div className="container-wide relative z-10">
        <FadeIn>
          <p className="type-mono text-white/40 mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-white/20" />
            What Makes Us Different
          </p>
        </FadeIn>
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left — Comparison table */}
          <div className="flex-1">
            <FadeIn>
              <h2 className="type-h2 text-white mb-3 [text-wrap:balance]">
                Most software <em>stores</em> data.
                <br />
                Zonov.ai <span style={{ color: "var(--secondary)" }}>does the work.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="type-body text-white/60 mb-10 max-w-md">
                Instead of giving hospitals more software to manage, we give them AI employees that actually work.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="rounded-[20px] overflow-hidden border border-white/10">
                {/* Header */}
                <div className="grid grid-cols-3 bg-white/5 px-5 py-3">
                  <span className="type-mono text-white/30">Feature</span>
                  <span className="type-mono text-white/30 text-center">Traditional HIMS</span>
                  <span className="type-mono text-[var(--secondary)] text-center">Zonov.ai</span>
                </div>
                {COMPARISON.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-3 px-5 py-3.5 border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                  >
                    <span className="text-[13px] text-white/70">{row.label}</span>
                    <div className="flex justify-center">
                      {row.hims ? (
                        <span className="text-white/40">✓</span>
                      ) : (
                        <span className="text-red-400/60">✗</span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <span className="text-[var(--secondary)]">✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Why different cards */}
          <div className="flex-1">
            <FadeInStagger className="flex flex-col gap-4" stagger={0.08}>
              {WHY_DIFFERENT.map((item) => (
                <FadeInItem key={item.title}>
                  <div className="card-dark rounded-[16px] p-5 flex gap-4 items-start hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-[10px] bg-white/8 flex items-center justify-center text-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-white mb-1.5 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-white/55 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>

            {/* Big quote */}
            <FadeIn delay={0.2}>
              <div className="mt-6 p-6 rounded-[20px] border border-[var(--secondary)]/30 bg-[var(--secondary)]/5">
                <p className="text-[22px] text-white leading-tight mb-3 italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  &ldquo;We are building the AI Operating System for every hospital in the world.&rdquo;
                </p>
                <p className="type-mono text-[var(--secondary)]">Zonov.ai Vision</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
