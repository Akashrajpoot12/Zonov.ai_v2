import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "About — Zonov.ai",
  description: "Zonov.ai is the AI Workforce for Healthcare. Our mission: eliminate healthcare inefficiency through AI-powered autonomous agents.",
};

const values = [
  { num: "01", title: "Patient First", desc: "Every decision we make starts and ends with what is best for the patient." },
  { num: "02", title: "Clinical Accuracy", desc: "We hold our AI to the same standard as the clinicians it supports." },
  { num: "03", title: "Radical Transparency", desc: "Our models explain their reasoning — no black boxes in healthcare." },
  { num: "04", title: "Relentless Simplicity", desc: "If a doctor needs a manual, we have not done our job." },
  { num: "05", title: "Build for Scale", desc: "We design for every hospital, clinic, lab, and healthcare network — not just flagship deployments." },
];

const team = [
  { name: "Aryan Mehta", title: "CEO", initials: "AM" },
  { name: "Priya Nair", title: "CTO", initials: "PN" },
  { name: "Dr. Kavya Rao", title: "CMO", initials: "KR" },
  { name: "Rohan Gupta", title: "Head of AI", initials: "RG" },
  { name: "Sneha Iyer", title: "Head of Sales", initials: "SI" },
  { name: "Vikram Das", title: "Head of Design", initials: "VD" },
];

const roadmap = [
  { year: "2026", milestone: "AI Workforce Platform Launch", desc: "Full deployment of the core AI agent suite across clinical, administrative, and revenue workflows." },
  { year: "2027", milestone: "Multi-Hospital Command Center", desc: "Network-level intelligence for hospital chains — cross-facility analytics, benchmarking, and resource optimization." },
  { year: "2028", milestone: "Predictive Hospital Intelligence", desc: "Census forecasting, deterioration prediction, and supply chain intelligence embedded across every facility." },
  { year: "2029", milestone: "Autonomous Healthcare Operations", desc: "AI agents handle routine operations end-to-end — registration to discharge, order to result, admission to billing — without human initiation." },
  { year: "2030", milestone: "Global Healthcare AI Operating System", desc: "The platform powering hospitals, clinics, labs, and healthcare networks globally." },
];

const market = [
  { label: "Global Healthcare IT Market", value: "$900B+", desc: "Total addressable market across hospital information systems, analytics, and automation." },
  { label: "AI in Healthcare by 2030", value: "$180B", desc: "Projected global AI healthcare market as autonomous workflows become standard infrastructure." },
  { label: "Target Customers", value: "6 Segments", desc: "Hospitals, multi-specialty chains, clinics, diagnostic centers, labs, insurance companies, and government health programs." },
];

const faqs = [
  {
    q: "Are you replacing doctors?",
    a: "No. Zonov.ai augments healthcare professionals. Our AI agents handle administrative, documentation, and workflow tasks so that clinicians can spend their time on diagnosis, treatment, and patient relationships — the work only they can do.",
  },
  {
    q: "Is patient data secure?",
    a: "Yes. Zonov.ai is built on enterprise-grade security infrastructure: end-to-end encryption, role-based access controls, comprehensive audit trails, and compliance controls designed for healthcare data regulations. All data is processed and stored in compliance with applicable frameworks.",
  },
  {
    q: "Does Zonov.ai integrate with existing HIMS?",
    a: "Yes. Zonov.ai is designed as an intelligence layer that connects to your existing hospital information management system via APIs and integration protocols. You do not need to replace your current infrastructure.",
  },
  {
    q: "How long does implementation take?",
    a: "Typically 2 to 8 weeks depending on facility size, the number of workflows being deployed, and the complexity of existing system integrations. Most hospitals are live with core agents within the first month.",
  },
  {
    q: "What is the ROI?",
    a: "Most hospitals begin seeing measurable efficiency gains within the first few months of deployment. Common early results include reduced documentation time per physician, improved charge capture rates, and lower 30-day readmission rates. Full ROI analysis is available during the demo process.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">

        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-4">ABOUT ZONOV.AI</p>
              <h1 className="type-display text-white max-w-3xl">
                The AI Workforce for Healthcare.
              </h1>
              <p className="type-body-lg text-white/70 mt-6 max-w-xl">
                Zonov.ai builds specialized AI agents that eliminate healthcare inefficiency — handling administrative, documentation, and workflow tasks so that clinicians and staff can focus on what matters most.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="type-display gradient-text">4h</span>
                </div>
                <div>
                  <p className="type-body-lg text-[var(--text)]">
                    Our founder watched his closest friend — a cardiologist — spend four hours every day on documentation. Not saving lives. Typing notes. That is when Zonov.ai was born: to give that time back, at scale, across every hospital.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeInItem>
                <div className="card h-full">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-4">
                    <circle cx="16" cy="16" r="13" stroke="var(--primary)" strokeWidth="2"/>
                    <circle cx="16" cy="16" r="5" fill="var(--primary)"/>
                    <line x1="16" y1="3" x2="16" y2="8" stroke="var(--primary)" strokeWidth="2"/>
                    <line x1="16" y1="24" x2="16" y2="29" stroke="var(--primary)" strokeWidth="2"/>
                    <line x1="3" y1="16" x2="8" y2="16" stroke="var(--primary)" strokeWidth="2"/>
                    <line x1="24" y1="16" x2="29" y2="16" stroke="var(--primary)" strokeWidth="2"/>
                  </svg>
                  <p className="type-mono text-[var(--text-muted)] mb-2">Our Mission</p>
                  <p className="type-h3 text-[var(--text)] mb-3">To eliminate healthcare inefficiency through AI-powered autonomous agents.</p>
                  <p className="type-body text-[var(--text-muted)]">Every hour a doctor spends on paperwork is an hour not spent with patients. Every billing error is lost revenue that could fund better care. We are here to end both.</p>
                </div>
              </FadeInItem>
              <FadeInItem>
                <div className="card h-full">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-4">
                    <ellipse cx="16" cy="16" rx="13" ry="9" stroke="var(--secondary)" strokeWidth="2"/>
                    <circle cx="16" cy="16" r="4" fill="var(--secondary)"/>
                    <circle cx="16" cy="16" r="2" fill="white"/>
                  </svg>
                  <p className="type-mono text-[var(--text-muted)] mb-2">Our Vision</p>
                  <p className="type-h3 text-[var(--text)] mb-3">To become the AI Operating System powering every hospital, clinic, laboratory, and healthcare network globally.</p>
                  <p className="type-body text-[var(--text-muted)]">Not a point solution. Not a module in a HIMS. The intelligence layer that every healthcare organization runs on.</p>
                </div>
              </FadeInItem>
            </FadeInStagger>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-2">MARKET OPPORTUNITY</p>
              <h2 className="type-h2 text-[var(--text)] mb-10">A market being redefined by AI.</h2>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {market.map((item) => (
                <FadeInItem key={item.label}>
                  <div className="card h-full">
                    <p className="type-display gradient-text mb-2">{item.value}</p>
                    <p className="type-body font-semibold text-[var(--text)] mb-2">{item.label}</p>
                    <p className="type-body text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
            <FadeIn delay={0.2}>
              <div className="mt-8 card">
                <p className="type-mono text-[var(--text-muted)] mb-4 text-xs">TARGET CUSTOMER SEGMENTS</p>
                <div className="flex flex-wrap gap-3">
                  {["Hospitals", "Multi-specialty Chains", "Clinics", "Diagnostic Centers", "Laboratories", "Insurance Companies", "Government Healthcare Programs"].map((seg) => (
                    <span
                      key={seg}
                      className="type-mono text-xs px-3 py-1.5 rounded-full"
                      style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }}
                    >
                      {seg}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <h2 className="type-h2 text-[var(--text)] mb-10">What we believe</h2>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => (
                <FadeInItem key={v.num}>
                  <div className="card h-full">
                    <p className="type-mono text-[var(--primary)] mb-3">{v.num}</p>
                    <h3 className="type-body font-semibold text-[var(--text)] mb-2">{v.title}</h3>
                    <p className="type-body text-[var(--text-muted)]">{v.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <h2 className="type-h2 text-[var(--text)] mb-10">Meet the team</h2>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <FadeInItem key={member.name}>
                  <div className="card flex flex-col items-center text-center gap-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(27,79,216,0.1)" }}
                    >
                      <span className="type-mono text-[var(--primary)] font-semibold">{member.initials}</span>
                    </div>
                    <div>
                      <p className="type-body font-semibold text-[var(--text)]">{member.name}</p>
                      <p className="type-caption text-[var(--text-muted)] mt-0.5">{member.title}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <section className="section-py bg-[var(--dark-navy)]">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-2">ROADMAP</p>
              <h2 className="type-h2 text-white mb-12">Building toward the autonomous hospital.</h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-white/10" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  {roadmap.map((item) => (
                    <div key={item.year} className="relative flex flex-col gap-3">
                      <div className="hidden md:flex w-3 h-3 rounded-full bg-[var(--secondary)] ring-4 ring-[var(--secondary)]/20 mb-1 z-10" />
                      <p className="type-mono text-[var(--secondary)]">{item.year}</p>
                      <p className="text-[14px] font-semibold text-white leading-snug">{item.milestone}</p>
                      <p className="text-[13px] text-white/55 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-2">FAQ</p>
              <h2 className="type-h2 text-[var(--text)] mb-10">Common questions.</h2>
            </FadeIn>
            <FadeInStagger className="flex flex-col gap-4 max-w-3xl">
              {faqs.map((faq) => (
                <FadeInItem key={faq.q}>
                  <div className="card">
                    <h3 className="type-body font-semibold text-[var(--text)] mb-2">{faq.q}</h3>
                    <p className="type-body text-[var(--text-muted)]">{faq.a}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <CTASection />

      </main>
      <Footer />
    </div>
  );
}
