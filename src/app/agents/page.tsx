import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "AI Agents — Zonov.ai | 8 Specialized Healthcare AI Agents",
  description: "Meet the 8 AI agents powering India's smartest hospitals — from patient registration to finance, diagnostics to OT management.",
};

const AGENTS = [
  {
    slug: "patient-registration",
    icon: "🪪",
    num: "01",
    name: "Registration Agent",
    tagline: "Voice-based registration. 60% faster OPD.",
    problem: "Manual registration takes 10–15 minutes, causes OPD queues, and loses data. Front desk staff spend 60% of their time on paperwork.",
    solves: ["Voice-based patient registration", "Auto-fills from ABHA/insurance", "Queue assignment in under 90 seconds"],
    metric: "60% faster OPD",
    color: "#1B4FD8",
    bgColor: "#EBF0FF",
  },
  {
    slug: "doctor-prescription",
    icon: "🩺",
    num: "02",
    name: "Doctor Prescription Agent",
    tagline: "Voice-powered prescription. Zero typing.",
    problem: "Doctors spend 2–3 hours daily on notes and prescriptions instead of patients. Handwritten prescriptions cause errors and delays.",
    solves: ["Voice-powered prescription drafts", "Ambient voice-to-SOAP notes", "Auto-coded diagnoses (ICD-10)"],
    metric: "2 hrs saved per doctor daily",
    color: "#00B4AE",
    bgColor: "#E6FAFA",
  },
  {
    slug: "investigation",
    icon: "🔬",
    num: "03",
    name: "Investigation Agent",
    tagline: "AI-assisted faster diagnostic reporting.",
    problem: "Lab and radiology orders get lost, delayed, or duplicated. Critical results don't reach the right doctor in time.",
    solves: ["Auto-routes orders to LIS/RIS", "AI-assisted diagnostic reporting", "Flags critical values instantly"],
    metric: "40% faster result delivery",
    color: "#7C3AED",
    bgColor: "#F3EEFF",
  },
  {
    slug: "pharmacy",
    icon: "💊",
    num: "04",
    name: "Pharmacy Agent",
    tagline: "Near-expiry alerts. Zero wastage.",
    problem: "Pharmacy teams manually track stock and expiry dates — leading to wastage, stockouts, and dispensing errors.",
    solves: ["Notifies near-expiry medicines", "Auto-reorder on low stock", "Reduces dispensing errors"],
    metric: "Zero expiry wastage",
    color: "#059669",
    bgColor: "#E6F7F1",
  },
  {
    slug: "ipd",
    icon: "🛏️",
    num: "05",
    name: "IPD Agent",
    tagline: "Nursing handovers. Mistreatment alerts.",
    problem: "Nursing handovers are verbal and error-prone. Mistreatment risks go undetected until it's too late.",
    solves: ["Structured nursing handover-takeover", "Real-time mistreatment alerts", "Automated care plan tracking"],
    metric: "Zero missed handovers",
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    slug: "ot",
    icon: "🏥",
    num: "06",
    name: "OT Agent",
    tagline: "OT scheduling, monitoring and emergency management.",
    problem: "OT scheduling is done manually on whiteboards and calls — causing delays, cancellations, and emergency conflicts.",
    solves: ["AI-powered OT scheduling", "Real-time OT monitoring", "Emergency case management"],
    metric: "30% fewer OT delays",
    color: "#0D1F3C",
    bgColor: "#EEF2F8",
  },
  {
    slug: "claim",
    icon: "📋",
    num: "07",
    name: "Claim Agent",
    tagline: "Reduce 20% claim rejection. Recover more revenue.",
    problem: "Indian hospitals lose 15–20% of revenue to missed charges, claim denials, and manual billing errors every month.",
    solves: ["Reduces claim rejections by 20%", "Auto-captures unbilled procedures", "Real-time revenue leakage alerts"],
    metric: "20% fewer claim rejections",
    color: "#7C3AED",
    bgColor: "#F3EEFF",
  },
  {
    slug: "finance",
    icon: "💰",
    num: "08",
    name: "Finance Agent",
    tagline: "20% revenue leakage reduced. Per-patient P&L.",
    problem: "Hospital finance teams operate on week-old Excel data — missing revenue leakage and unable to track per-patient profitability.",
    solves: ["Reduces revenue leakage by 20%", "Per-patient P&L tracking", "Real-time financial dashboards"],
    metric: "20% revenue leakage reduced",
    color: "#1B4FD8",
    bgColor: "#EBF0FF",
  },
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="pt-[120px] pb-16 bg-[var(--dark-navy)]">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-white/40 mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-white/20" />
                AI Agents
              </p>
              <h1 className="type-display text-white max-w-3xl [text-wrap:balance] mb-5">
                8 agents. Every hospital{" "}
                <span className="italic gradient-text-light">workflow covered.</span>
              </h1>
              <p className="type-subtitle text-white/55 max-w-xl">
                Each agent is purpose-built for one domain — trained on clinical data, integrated with your existing systems, and live in 6–8 weeks.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="section-py bg-[var(--bg)]">
          <div className="container-wide">
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.07}>
              {AGENTS.map((agent) => (
                <FadeInItem key={agent.slug}>
                  <div className="bg-white rounded-[20px] border border-[var(--border)] overflow-hidden flex flex-col h-full hover:shadow-lg hover:border-[var(--border-strong)] transition-all duration-200 group">

                    {/* Card Header */}
                    <div className="px-6 pt-6 pb-5" style={{ background: agent.bgColor }}>
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{agent.icon}</span>
                        <span className="type-mono text-[11px] px-2 py-1 rounded-full bg-white/70 text-[var(--text-dim)]">
                          {agent.num}
                        </span>
                      </div>
                      <h2 className="text-[17px] font-semibold tracking-tight text-[var(--text)] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                        {agent.name}
                      </h2>
                      <p className="text-[13px] text-[var(--text-muted)] italic">{agent.tagline}</p>
                    </div>

                    {/* Problem */}
                    <div className="px-6 py-4 border-b border-[var(--border)]">
                      <p className="type-mono text-[10px] text-[var(--text-dim)] mb-2 uppercase tracking-wider">Problem it solves</p>
                      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{agent.problem}</p>
                    </div>

                    {/* Solves list */}
                    <div className="px-6 py-4 flex-1">
                      <ul className="flex flex-col gap-2">
                        {agent.solves.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-[13px] text-[var(--text)]">
                            <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[9px]"
                              style={{ background: agent.color }}>
                              ✓
                            </span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-[var(--border)] flex items-center justify-between">
                      <span
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                        style={{ background: agent.bgColor, color: agent.color }}
                      >
                        {agent.metric}
                      </span>
                      <Link
                        href={`/agents/${agent.slug}`}
                        className="text-[13px] font-medium flex items-center gap-1 transition-all group-hover:gap-2"
                        style={{ color: agent.color }}
                      >
                        Learn More →
                      </Link>
                    </div>

                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
