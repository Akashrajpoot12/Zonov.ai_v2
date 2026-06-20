import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Use Cases — Zonov.ai | AI Agents for Hospital Workflows",
  description:
    "See how Zonov's AI agents transform clinical workflows across OPD, ICU, revenue, discharge, lab, and post-surgery departments.",
};

const useCases = [
  {
    department: "OPD",
    title: "OPD Registration",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l2 2-2 2M21 11h-6" />
      </svg>
    ),
    problem:
      "Patients wait 30+ minutes for registration. Staff manually re-enter data from ID cards and insurance forms.",
    solution:
      "AI agent extracts patient info, checks insurance eligibility, and pre-fills records in seconds.",
    result: "70% faster registration · 0 manual data entry errors",
  },
  {
    department: "ICU",
    title: "ICU Documentation",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    problem:
      "ICU nurses spend 2–3 hours per shift on documentation, pulling them away from critical patient care.",
    solution:
      "Voice-activated AI scribe captures vitals, medications, and observations in real time.",
    result: "2.5h saved per nurse per shift · 98% documentation accuracy",
  },
  {
    department: "Revenue",
    title: "Revenue Recovery",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <polyline strokeLinecap="round" strokeLinejoin="round" points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="17 6 23 6 23 12" />
      </svg>
    ),
    problem:
      "15–20% of claims are denied due to coding errors, missing documentation, or wrong billing codes.",
    solution:
      "AI audits every discharge summary, flags gaps, suggests correct ICD codes before claim submission.",
    result: "18% reduction in claim denials · ₹2.4Cr recovered per year",
  },
  {
    department: "Discharge",
    title: "Discharge Planning",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect strokeLinecap="round" strokeLinejoin="round" x="9" y="3" width="6" height="4" rx="1" ry="1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
    problem:
      "Discharge takes 4–6 hours due to fragmented communication between departments.",
    solution:
      "AI coordinates discharge checklists, medication reconciliation, and follow-up scheduling automatically.",
    result: "Discharge time cut by 60% · Patient satisfaction +34%",
  },
  {
    department: "Lab",
    title: "Lab Result Interpretation",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v10.5a4.5 4.5 0 009 0V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 21h11M9 3h6" />
      </svg>
    ),
    problem:
      "Doctors spend hours manually reviewing lab panels and cross-referencing with patient history.",
    solution:
      "AI contextualizes lab results against patient history, flags critical values, and drafts clinical summaries.",
    result: "40 minutes saved per doctor per day · Critical alerts in <2 min",
  },
  {
    department: "Post-surgery",
    title: "Post-surgery Follow-up",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4M10 10h4" />
      </svg>
    ),
    problem:
      "60% of post-surgery complications are caught late due to poor follow-up protocols.",
    solution:
      "AI calls patients daily post-discharge, monitors symptoms, and escalates to care team if needed.",
    result: "Readmission rates down 28% · 95% follow-up compliance",
  },
];

const filterPills = ["All", "OPD", "ICU", "Revenue", "Discharge", "Lab", "Post-surgery"];

export default function UseCasesPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide px-edge text-center">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-4">Clinical AI in Practice</p>
              <h1 className="type-display text-white mb-5">
                Real hospitals. Real results.
              </h1>
              <p className="type-body-lg text-white/70 max-w-2xl mx-auto">
                See how Zonov&apos;s AI agents transform clinical workflows across every department.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-white py-6">
          <div className="container-wide px-edge">
            <div className="flex flex-wrap items-center gap-2">
              <span className="type-caption text-[var(--text-muted)] mr-2">Filter by agent:</span>
              {filterPills.map((pill) => (
                <span
                  key={pill}
                  className={`rounded-full px-4 py-1.5 text-sm border cursor-pointer transition-colors ${
                    pill === "All"
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-white text-[var(--text-muted)] border-[var(--border)]"
                  }`}
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeInStagger stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc) => (
                <FadeInItem key={uc.title}>
                  <div className="card h-full flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-200">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center shrink-0">
                        {uc.icon}
                      </div>
                      <div>
                        <p className="type-mono text-[var(--primary)] mb-1">{uc.department}</p>
                        <h3 className="text-base font-semibold text-[var(--text)] leading-snug">{uc.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="type-caption text-[var(--text-muted)] uppercase tracking-wider mb-1">Problem</p>
                        <p className="type-body text-[var(--text)]">{uc.problem}</p>
                      </div>
                      <div>
                        <p className="type-caption text-[var(--text-muted)] uppercase tracking-wider mb-1">Solution</p>
                        <p className="type-body text-[var(--text)]">{uc.solution}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[var(--border)]">
                      <p className="type-caption text-[var(--secondary)] font-semibold">{uc.result}</p>
                    </div>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <section className="bg-white section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <div className="rounded-2xl border-2 border-[var(--primary)] bg-gradient-to-br from-[var(--primary-subtle)] to-white overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-10 lg:p-12">
                    <p className="type-mono text-[var(--secondary)] mb-4">Featured Case Study</p>
                    <h2 className="type-h2 text-[var(--text)] mb-5">
                      Apollo-style hospital reduces paperwork by 40%
                    </h2>
                    <p className="type-body text-[var(--text-muted)] mb-8">
                      A 450-bed multi-specialty hospital deployed four Zonov AI agents across ICU documentation, OPD registration, discharge coordination, and billing. Within six months, the hospital saw dramatic reductions in administrative overhead, faster patient throughput, and a measurable return on investment — all without replacing existing HIS infrastructure.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { stat: "40%", label: "less documentation time" },
                        { stat: "₹3.2Cr", label: "annual savings" },
                        { stat: "92%", label: "staff satisfaction" },
                      ].map(({ stat, label }) => (
                        <div key={stat} className="text-center">
                          <p className="text-2xl font-bold text-[var(--primary)] leading-none mb-1">{stat}</p>
                          <p className="type-caption text-[var(--text-muted)]">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[var(--dark-navy)] p-10 lg:p-12 flex flex-col justify-center">
                    <svg className="w-8 h-8 text-[var(--secondary)] mb-6" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <blockquote className="type-body-lg text-white/90 leading-relaxed mb-8">
                      &ldquo;Zonov didn&apos;t just automate tasks — it fundamentally transformed how our clinical teams work. Our doctors spend more time with patients, our nurses focus on care, and our billing team recovers revenue we used to simply lose. The ROI was clear within the first quarter.&rdquo;
                    </blockquote>
                    <div>
                      <p className="type-body font-semibold text-white">Dr. Anita Sharma</p>
                      <p className="type-caption text-white/60">Medical Director, Multi-specialty Hospital</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
