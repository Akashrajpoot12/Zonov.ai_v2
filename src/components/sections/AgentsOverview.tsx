import Link from "next/link";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

const AGENTS = [
  {
    num: "01",
    name: "Patient Registration Agent",
    href: "/agents/patient-registration",
    color: "var(--primary)",
    icon: "👤",
    features: ["Aadhaar scan", "Face recognition", "Voice-based registration", "Auto form filling", "Returning patient ID"],
    metric: "Seconds not minutes",
  },
  {
    num: "02",
    name: "Doctor AI Agent",
    href: "/agents/doctor-ai",
    color: "var(--secondary)",
    icon: "🩺",
    features: ["Voice-to-prescription", "Voice-to-EMR", "Clinical documentation", "Investigation recommendations", "Digital patient records"],
    metric: "Zero manual entry",
  },
  {
    num: "03",
    name: "Investigation Agent",
    href: "/agents/investigation",
    color: "var(--purple)",
    icon: "🔬",
    features: ["Lab report interpretation", "Radiology report generation", "AI-assisted findings", "Risk prediction", "Automated alerts"],
    metric: "AI-powered insights",
  },
  {
    num: "04",
    name: "Patient Follow-up Agent",
    href: "/agents/follow-up",
    color: "#F59E0B",
    icon: "📱",
    features: ["WhatsApp reminders", "Medication reminders", "Follow-up scheduling", "Personalized instructions", "Missed appointment alerts"],
    metric: "3× better adherence",
  },
  {
    num: "05",
    name: "Billing & Revenue Agent",
    href: "/agents/billing",
    color: "var(--success)",
    icon: "💳",
    features: ["Billing automation", "Revenue leakage detection", "Coding assistance", "Claims support", "Audit trail"],
    metric: "15–20% more revenue",
  },
  {
    num: "06",
    name: "Hospital Operations Agent",
    href: "/agents/operations",
    color: "#EF4444",
    icon: "🏥",
    features: ["Bed management", "Queue management", "Staff monitoring", "Operational dashboards", "Performance analytics"],
    metric: "30% efficiency gain",
  },
  {
    num: "07",
    name: "AI Analytics Agent",
    href: "/agents/analytics",
    color: "var(--dark-navy)",
    icon: "📊",
    features: ["Real-time hospital insights", "Revenue analytics", "Patient flow analysis", "Operational intelligence", "Predictive dashboards"],
    metric: "Real-time intelligence",
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

        {/* 7th agent — full width */}
        <FadeIn delay={0.1}>
          <Link href={AGENTS[6].href} className="group block mt-5 card hover:no-underline">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0 bg-[var(--dark-navy)]/10">
                  {AGENTS[6].icon}
                </div>
                <div>
                  <p className="type-mono text-[var(--text-dim)] mb-1">{AGENTS[6].num}</p>
                  <h3 className="text-[17px] font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    {AGENTS[6].name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {AGENTS[6].features.map((f) => (
                  <span key={f} className="text-[11px] text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                    {f}
                  </span>
                ))}
              </div>
              <span className="flex-shrink-0 btn btn-ghost btn-sm">
                Learn more →
              </span>
            </div>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
