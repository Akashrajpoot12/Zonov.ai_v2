import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import AgentTree from "@/components/sections/AgentTree";
import PatientAcquisitionFlow from "@/components/sections/PatientAcquisitionFlow";

export const metadata: Metadata = {
  title: "AI Agents, Zonov.ai | One Operating System, Eight Agents",
  description: "One AI operating system, eight specialized agents, covering every hospital workflow from registration to finance.",
};

const FAQS: { q: string; a: string }[] = [
  { q: "Can I deploy just one agent, or do I need all eight?", a: "Start with a single agent or roll out several at once. Each works independently, and they get more powerful together as they share the same secure brain." },
  { q: "How do the agents work together?", a: "Every agent plugs into the same Zonov.ai layer and your existing systems, so data flows between them in real time. Registration hands clean data to billing, investigation flags feed the doctor's notes, no silos." },
  { q: "Do the agents replace my existing software or staff?", a: "Neither. Zonov.ai is an AI layer on top of your current HIS/EMR, with no rip-and-replace. The agents handle repetitive admin work so your staff can focus on patients." },
  { q: "How long does it take to go live?", a: "Most hospitals deploy their first agents in 1 to 2 weeks, configured to your workflows, with no disruption to current operations." },
  { q: "Is patient data secure?", a: "Yes. End-to-end encryption, role-based access, full audit trails, and HIPAA/GDPR-aligned compliance protect every interaction." },
];

export default function AgentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        {/* Hero */}
        <section className="pt-[120px] pb-16 bg-[var(--dark-navy)]">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-white/40 mb-4 flex items-center gap-3">
                AI Agents
              </p>
              <h1 className="type-display text-white max-w-3xl [text-wrap:balance] mb-5">
                One operating system.{" "}
                <span className="italic gradient-text-light">Eight agents.</span>
              </h1>
              <p className="type-subtitle text-white/55 max-w-xl">
                Every agent plugs into the same Zonov.ai brain, so your hospital runs as one connected system, not eight disconnected tools.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Positioning statement */}
        <section className="bg-[var(--surface)] py-16 border-b border-[var(--border)]">
          <div className="container-wide max-w-3xl">
            <FadeIn>
              <p className="type-h3 text-[var(--text)] [text-wrap:balance]">
                One AI layer on top of your existing software, delivered as{" "}
                <span className="gradient-text">8 specialized agents</span>, each an expert in its own domain.
              </p>
              <p className="type-body-lg text-[var(--text-muted)] mt-4">
                No rip-and-replace. Deploy one agent or all eight, they share the same secure brain and work together across your hospital.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Agent Tree */}
        <section className="section-py bg-[var(--bg)] overflow-hidden">
          <div className="container-wide">
            <FadeIn>
              <div className="text-center max-w-xl mx-auto mb-14">
                <p className="type-mono text-[var(--primary)] mb-3">The System</p>
                <h2 className="type-h2 text-[var(--text)] [text-wrap:balance]">
                  How the agents{" "}
                  <span className="italic gradient-text">connect.</span>
                </h2>
                <p className="type-body text-[var(--text-muted)] mt-3">
                  Tap any agent to see what it covers. The deeper mechanics, we&apos;ll show you live.
                </p>
              </div>
            </FadeIn>

            <AgentTree />
          </div>
        </section>

        {/* Live demo, patient acquisition flow */}
        <PatientAcquisitionFlow />

        {/* FAQ */}
        <section className="section-py bg-[var(--bg)]">
          <div className="container-wide max-w-3xl">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-3">FAQ</p>
              <h2 className="type-h2 text-[var(--text)] mb-10 [text-wrap:balance]">Common questions.</h2>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="flex flex-col gap-3">
                {FAQS.map((f) => (
                  <details key={f.q} className="group bg-white border border-[var(--border)] rounded-[16px] px-6 open:shadow-sm transition-shadow">
                    <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none">
                      <span className="text-[15px] font-semibold text-[var(--text)]">{f.q}</span>
                      <span className="text-[var(--primary)] text-[18px] leading-none transition-transform duration-300 group-open:rotate-45 flex-shrink-0">+</span>
                    </summary>
                    <p className="type-body text-[var(--text-muted)] leading-relaxed pb-5 -mt-1">{f.a}</p>
                  </details>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA strip */}
        <section className="section-py bg-[var(--surface)]">
          <div className="container-wide text-center">
            <FadeIn>
              <h2 className="type-h2 text-[var(--text)] mb-5 [text-wrap:balance]">
                See the whole system{" "}
                <span className="italic gradient-text">working in your hospital.</span>
              </h2>
              <Link href="/book-demo" className="btn btn-primary-lg">
                Book a Demo
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
