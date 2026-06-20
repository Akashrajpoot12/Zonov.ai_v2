import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "AI Agents — Zonov.ai | 7 Specialized Healthcare AI Agents",
  description: "Meet the 7 AI agents powering India's smartest hospitals — from patient registration to billing, diagnostics to operations.",
};

const AGENTS = [
  {
    slug: "patient-registration",
    icon: "🪪",
    num: "01",
    name: "Patient Registration AI",
    tagline: "Zero-friction intake from first contact to first care.",
    problem: "Manual registration takes 10–15 minutes, causes OPD queues, and loses data. Front desk staff spend 60% of their time on paperwork.",
    solves: ["Auto-fills forms from ABHA/insurance", "Real-time eligibility verification", "Queue assignment in under 90 seconds"],
    metric: "90s avg. registration time",
    color: "#1B4FD8",
    bgColor: "#EBF0FF",
  },
  {
    slug: "doctor-ai",
    icon: "🩺",
    num: "02",
    name: "Doctor AI Agent",
    tagline: "Every word captured. Every prescription precise.",
    problem: "Doctors spend 2–3 hours daily on notes and prescriptions instead of patients. Handwritten prescriptions cause errors and delays.",
    solves: ["Ambient voice-to-SOAP notes", "AI prescription drafts", "Auto-coded diagnoses (ICD-10)"],
    metric: "2 hrs saved per doctor daily",
    color: "#00B4AE",
    bgColor: "#E6FAFA",
  },
  {
    slug: "investigation",
    icon: "🔬",
    num: "03",
    name: "Investigation Agent",
    tagline: "From order to result — automated end to end.",
    problem: "Lab and radiology orders get lost, delayed, or duplicated. Critical results don't reach the right doctor in time.",
    solves: ["Auto-routes orders to LIS/RIS", "Flags critical values instantly", "Tracks TAT and sends alerts"],
    metric: "40% faster result delivery",
    color: "#7C3AED",
    bgColor: "#F3EEFF",
  },
  {
    slug: "follow-up",
    icon: "📲",
    num: "04",
    name: "Follow-up Agent",
    tagline: "No patient falls through the cracks.",
    problem: "80% of patients never return for follow-up care. Missed follow-ups mean worse outcomes and lost revenue for hospitals.",
    solves: ["Automated WhatsApp/SMS reminders", "Post-discharge care instructions", "Re-booking with one tap"],
    metric: "3× improvement in follow-up rates",
    color: "#059669",
    bgColor: "#E6F7F1",
  },
  {
    slug: "billing",
    icon: "💳",
    num: "05",
    name: "Billing & Revenue AI",
    tagline: "Every rupee earned. Every claim filed.",
    problem: "Indian hospitals lose 15–20% of revenue to missed charges, claim denials, and manual billing errors every month.",
    solves: ["Auto-captures unbilled procedures", "Reduces claim rejections by 70%", "Real-time revenue leakage alerts"],
    metric: "₹18L avg. monthly recovery",
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    slug: "operations",
    icon: "⚙️",
    num: "06",
    name: "Hospital Operations AI",
    tagline: "Every bed, every room, every resource — optimized.",
    problem: "Bed allocation, staff scheduling, and supply management are still done on Excel and WhatsApp — causing waste and delays.",
    solves: ["Real-time bed & OT management", "Predictive staff scheduling", "Supply chain auto-reordering"],
    metric: "30% reduction in resource waste",
    color: "#0D1F3C",
    bgColor: "#EEF2F8",
  },
  {
    slug: "analytics",
    icon: "📊",
    num: "07",
    name: "Analytics AI",
    tagline: "Intelligence that drives every decision.",
    problem: "Hospital leaders make million-rupee decisions based on weekly Excel reports. By the time data arrives, the opportunity is gone.",
    solves: ["Live dashboards for every department", "Natural language data queries", "Predictive revenue and capacity models"],
    metric: "Real-time, not week-old data",
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
                7 agents. Every hospital{" "}
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

        {/* Bottom strip */}
        <section className="py-12 bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[15px] font-semibold text-[var(--text)] mb-1">All 7 agents. One unified platform.</p>
              <p className="text-[13px] text-[var(--text-muted)]">Deploy one agent or all seven — they share a single data layer and work together.</p>
            </div>
            <Link href="/book-demo" className="btn btn-primary-lg flex-shrink-0">
              Book a Demo
            </Link>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
