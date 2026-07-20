import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import IndiaPanels from "@/components/sections/IndiaPanels";

export const metadata: Metadata = {
  title: "About, Zonov.ai",
  description: "Zonov.ai is the AI Workforce for Healthcare. Our mission: eliminate healthcare inefficiency through AI-powered autonomous agents.",
};

const values = [
  { num: "01", title: "Patient First", desc: "Every decision we make starts and ends with what is best for the patient.", color: "#1B4FD8" },
  { num: "02", title: "Clinical Accuracy", desc: "We hold our AI to the same standard as the clinicians it supports.", color: "#00B4AE" },
  { num: "03", title: "Radical Transparency", desc: "Our models explain their reasoning: no black boxes in healthcare.", color: "#7C3AED" },
  { num: "04", title: "Relentless Simplicity", desc: "If a doctor needs a manual, we have not done our job.", color: "#059669" },
  { num: "05", title: "Build for Scale", desc: "We design for every hospital, clinic, lab, and healthcare network, not just flagship deployments.", color: "#D97706" },
];

const standards = [
  { name: "HIPAA", desc: "Aligned with US healthcare data privacy and security rules.", color: "#1B4FD8" },
  { name: "GDPR", desc: "Compliant with global data protection regulations.", color: "#00B4AE" },
  { name: "Health ID Standards", desc: "Integrates with national digital health ID ecosystems.", color: "#7C3AED" },
  { name: "ISO 27001", desc: "Information security managed to ISO 27001 control standards.", color: "#059669" },
];

const commitments = [
  { title: "End-to-end encryption", desc: "Data encrypted in transit and at rest." },
  { title: "Role-based access", desc: "Granular permissions for every user and action." },
  { title: "Full audit trails", desc: "Every agent action logged and reviewable." },
  { title: "Flexible data residency", desc: "Patient data stays in your chosen region." },
];

const faqs = [
  {
    q: "Are you replacing doctors?",
    a: "No. Zonov.ai augments healthcare professionals. Our AI agents handle administrative, documentation, and workflow tasks so that clinicians can spend their time on diagnosis, treatment, and patient relationships, the work only they can do.",
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
    a: "Typically 1–2 weeks depending on facility size, the number of workflows being deployed, and the complexity of existing system integrations, with no disruption to your current operations.",
  },
  {
    q: "What is the ROI?",
    a: "Most hospitals begin seeing measurable efficiency gains within the first few months of deployment. Common early results include reduced documentation time per physician, improved charge capture rates, and lower 30-day readmission rates. Full ROI analysis is available during the demo process.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow">

        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-4">ABOUT ZONOV.AI</p>
              <h1 className="type-display text-white max-w-3xl">
                The AI Workforce for Healthcare.
              </h1>
              <p className="type-body-lg text-white/70 mt-6 max-w-xl">
                Zonov.ai builds specialized AI agents that eliminate healthcare inefficiency, handling administrative, documentation, and workflow tasks so that clinicians and staff can focus on what matters most.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py relative overflow-hidden">
          {/* ambient glow */}
          <div className="ambient-glow" style={{ width: "420px", height: "420px", top: "8%", left: "2%", background: "var(--primary)", opacity: 0.08 }} />

          <div className="container-wide px-edge relative z-10">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-12 flex items-center gap-3">
                Our Origin
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">
              {/* Stat */}
              <FadeIn>
                <div className="relative flex-shrink-0">
                  <span
                    className="gradient-text block leading-none"
                    style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(96px, 14vw, 180px)" }}
                  >
                    <CountUp value={4} suffix="h" />
                  </span>
                  <p className="type-body text-[var(--text-muted)] mt-3 max-w-[220px]">
                    every single day, lost to paperwork, not patients.
                  </p>
                </div>
              </FadeIn>

              {/* Story */}
              <FadeIn delay={0.15}>
                <div className="relative">
                  <span
                    className="absolute -top-10 -left-3 select-none pointer-events-none"
                    style={{ fontFamily: "Georgia, serif", fontSize: "130px", lineHeight: 1, color: "var(--primary)", opacity: 0.1 }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <p
                    className="text-[clamp(21px,2.5vw,32px)] leading-snug text-[var(--text)] relative [text-wrap:balance]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Our founder watched his closest friend, a cardiologist, lose{" "}
                    <span className="gradient-text">four hours every day</span> to documentation. Not saving lives. Typing notes.
                  </p>
                  <p className="type-body-lg text-[var(--text-muted)] mt-6 max-w-xl">
                    That was the moment Zonov.ai began: to give that time back, to every clinician, in every hospital.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeInItem>
                <div className="card h-full hover-lift card-glow">
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
                <div className="card h-full hover-lift card-glow">
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

        <IndiaPanels />

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <h2 className="type-h2 text-[var(--text)] mb-10">What we believe</h2>
            </FadeIn>
            <div className="marquee-mask overflow-hidden py-2">
              <div className="marquee-track reverse">
                {[...values, ...values].map((v, i) => (
                  <div
                    key={i}
                    className="relative w-[320px] flex-shrink-0 card hover-lift card-accent overflow-hidden"
                    style={{ ["--ac" as string]: v.color, background: `linear-gradient(160deg, ${v.color}1F 0%, ${v.color}0A 100%)` }}
                  >
                    {/* watermark number */}
                    <span
                      className="absolute -top-3 right-2 leading-none select-none pointer-events-none"
                      style={{ fontFamily: "var(--font-playfair)", fontSize: "96px", color: v.color, opacity: 0.09 }}
                      aria-hidden
                    >
                      {v.num}
                    </span>
                    {/* accent dot */}
                    <span className="block w-2.5 h-2.5 rounded-full mb-6 relative" style={{ background: v.color }} />
                    <h3 className="type-h4 text-[var(--text)] mb-2 relative">{v.title}</h3>
                    <p className="type-body text-[var(--text-muted)] relative">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-2">TRUST &amp; COMPLIANCE</p>
              <h2 className="type-h2 text-[var(--text)] mb-3">Built for the trust healthcare demands.</h2>
              <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-10">
                Patient data is sacred. Zonov.ai is engineered to meet the security and compliance standards hospitals, regulators, and patients expect, from day one.
              </p>
            </FadeIn>

            {/* Compliance standards */}
            <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {standards.map((st) => (
                <FadeInItem key={st.name}>
                  <div className="card h-full flex flex-col gap-3 gradient-border hover-lift">
                    <div
                      className="w-11 h-11 rounded-[12px] flex items-center justify-center"
                      style={{ background: `${st.color}15` }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={st.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <p className="type-body font-semibold text-[var(--text)]">{st.name}</p>
                    <p className="type-caption text-[var(--text-muted)] leading-relaxed">{st.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>

            {/* Security commitments */}
            <FadeIn delay={0.15}>
              <div className="card">
                <p className="type-mono text-[var(--text-muted)] mb-5 text-xs">OUR SECURITY COMMITMENTS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {commitments.map((c) => (
                    <div key={c.title} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                          <circle cx="12" cy="12" r="10" />
                          <path d="m8 12 3 3 5-6" />
                        </svg>
                        <p className="font-semibold text-[var(--text)] text-[14px]">{c.title}</p>
                      </div>
                      <p className="type-caption text-[var(--text-muted)]">{c.desc}</p>
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


      </main>
      <Footer />
    </div>
  );
}
