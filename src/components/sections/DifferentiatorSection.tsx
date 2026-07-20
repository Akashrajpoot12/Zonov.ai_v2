import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import { Bot, Zap, Check, X, Globe } from "lucide-react";

const COMPARISON = [
  { label: "Data Storage", hims: true, zonov: true },
  { label: "Workflow Automation", hims: false, zonov: true },
  { label: "AI Voice Documentation", hims: false, zonov: true },
  { label: "Revenue Leakage Detection", hims: false, zonov: true },
  { label: "Proactive Patient Follow-up", hims: false, zonov: true },
  { label: "Real-time Operational AI", hims: false, zonov: true },
  { label: "Works Like Digital Employees", hims: false, zonov: true },
];

const WHY_DIFFERENT: { icon: React.ReactNode; title: string; desc: string }[] = [
  {
    icon: <Bot className="w-5 h-5" strokeWidth={1.5} />,
    title: "AI Employees, Not Just Software",
    desc: "Traditional HIMS stores information. Zonov.ai agents perform work, automatically, intelligently, continuously.",
  },
  {
    icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
    title: "Deploy in 1–2 Weeks",
    desc: "No 18-month IT projects. Our agents integrate with your existing systems and go live fast.",
  },
  {
    icon: <Globe className="w-5 h-5" strokeWidth={1.5} />,
    title: "Built for Modern Healthcare",
    desc: "National health ID integration, multilingual support, and insurance workflows, designed for healthcare worldwide.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="noise relative overflow-hidden section-py transition-theme bg-[var(--dark-navy)] section-dark">
      <CursorSpotlight color="rgba(0,180,174,0.16)" size={560} />
      <div className="container-wide relative z-10">
        {/* Heading, full width on top */}
        <FadeIn>
          <p className="type-mono text-white/40 mb-4">What Makes Us Different</p>
        </FadeIn>
        <FadeIn>
          <h2 className="type-h2 text-white mb-3 [text-wrap:balance]">
            Most software <em>stores</em> data.{" "}
            <span style={{ color: "var(--secondary)" }}>Zonov.ai does the work.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="type-body text-white/60 mb-12 max-w-xl">
            Instead of giving hospitals more software to manage, we give them AI employees that actually work.
          </p>
        </FadeIn>

        {/* Comparison table + differentiator cards, balanced side by side */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
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
                      <Check className="w-4 h-4 text-white/40" strokeWidth={2} />
                    ) : (
                      <X className="w-4 h-4 text-red-400/60" strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Check className="w-4 h-4 text-[var(--secondary)]" strokeWidth={2} />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeInStagger className="flex flex-col justify-center gap-4 h-full" stagger={0.08}>
            {WHY_DIFFERENT.map((item) => (
              <FadeInItem key={item.title}>
                <div className="card-dark rounded-[16px] p-5 flex gap-4 items-start hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-[10px] bg-white/8 flex items-center justify-center text-white flex-shrink-0">
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
        </div>
      </div>
    </section>
  );
}
