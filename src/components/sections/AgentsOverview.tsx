import Link from "next/link";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

const AGENTS = [
  {
    num: "01",
    name: "Registration Agent",
    href: "/agents/patient-registration",
    color: "var(--primary)",
    icon: "🪪",
    features: ["Voice-based registration", "ABHA/insurance auto-fill", "Queue assignment in 90s"],
    metric: "60% faster OPD",
  },
  {
    num: "02",
    name: "Doctor Prescription Agent",
    href: "/agents/doctor-prescription",
    color: "var(--secondary)",
    icon: "🩺",
    features: ["Voice-to-prescription", "Voice-to-EMR notes", "ICD-10 auto-coding"],
    metric: "2 hrs saved/doctor/day",
  },
  {
    num: "03",
    name: "Investigation Agent",
    href: "/agents/investigation",
    color: "var(--purple)",
    icon: "🔬",
    features: ["AI diagnostic reporting", "Critical value alerts", "LIS/RIS auto-routing"],
    metric: "40% faster results",
  },
  {
    num: "04",
    name: "Pharmacy Agent",
    href: "/agents/pharmacy",
    color: "#059669",
    icon: "💊",
    features: ["Near-expiry alerts", "Auto stock reorder", "Dispensing error prevention"],
    metric: "Zero expiry wastage",
  },
  {
    num: "05",
    name: "IPD Agent",
    href: "/agents/ipd",
    color: "#D97706",
    icon: "🛏️",
    features: ["Structured nursing handover", "Mistreatment alerts", "Care plan tracking"],
    metric: "100% handover completion",
  },
  {
    num: "06",
    name: "OT Agent",
    href: "/agents/ot",
    color: "#0D1F3C",
    icon: "🏥",
    features: ["AI OT scheduling", "Real-time OT monitoring", "Emergency case management"],
    metric: "30% fewer OT delays",
  },
  {
    num: "07",
    name: "Claim Agent",
    href: "/agents/claim",
    color: "var(--purple)",
    icon: "📋",
    features: ["Pre-submission scrubbing", "Auto appeal generation", "Payer rule engine"],
    metric: "20% fewer rejections",
  },
  {
    num: "08",
    name: "Finance Agent",
    href: "/agents/finance",
    color: "var(--primary)",
    icon: "💰",
    features: ["Revenue leakage detection", "Per-patient P&L", "Real-time dashboards", "Budget vs actuals", "Cost optimization"],
    metric: "20% leakage recovered",
  },
];

export default function AgentsOverview() {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            What We Provide
          </p>
        </FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <FadeIn>
            <h2 className="type-h1 text-[var(--text)] max-w-xl [text-wrap:balance]">
              AI Agents for every stage of{" "}
              <span className="italic gradient-text">hospital operations.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/platform" className="btn btn-ghost whitespace-nowrap flex-shrink-0">
              Explore Platform →
            </Link>
          </FadeIn>
        </div>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" stagger={0.07}>
          {AGENTS.slice(0, 6).map((agent) => (
            <FadeInItem key={agent.num}>
              <Link href={agent.href} className="group block card h-full hover:no-underline">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${agent.color}18` }}
                  >
                    {agent.icon}
                  </div>
                  <span className="type-mono text-[var(--text-dim)]">{agent.num}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--text)] mb-3 tracking-tight group-hover:text-[var(--primary)] transition-colors">
                  {agent.name}
                </h3>
                <ul className="flex flex-col gap-1.5 mb-5">
                  {agent.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: agent.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${agent.color}15`, color: agent.color }}
                >
                  {agent.metric}
                </div>
              </Link>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* Last 2 agents — full width */}
        <div className="flex flex-col gap-4 mt-5">
          {AGENTS.slice(6).map((agent) => (
            <FadeIn key={agent.num} delay={0.1}>
              <Link href={agent.href} className="group block card hover:no-underline">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${agent.color}18` }}>
                      {agent.icon}
                    </div>
                    <div>
                      <p className="type-mono text-[var(--text-dim)] mb-1">{agent.num}</p>
                      <h3 className="text-[17px] font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                        {agent.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.features.map((f) => (
                      <span key={f} className="text-[11px] text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="flex-shrink-0 btn btn-ghost btn-sm">Learn more →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
