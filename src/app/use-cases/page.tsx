import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import UseCasesFilter from "./UseCasesFilter";

export const metadata: Metadata = {
  title: "Use Cases — Zonov.ai | AI Agents for Hospital Workflows",
  description:
    "See how Zonov's AI agents transform clinical workflows across OPD, ICU, revenue, discharge, lab, and post-surgery departments.",
};

export default function UseCasesPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
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

        <UseCasesFilter />

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
                      A 450-bed multi-specialty hospital deployed four Zonov AI agents across ICU documentation, OPD registration, discharge coordination, and billing. Within six months, the hospital saw dramatic reductions in administrative overhead, faster patient throughput, and a measurable return on investment, all without replacing existing HIS infrastructure.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { stat: "40%", label: "less documentation time" },
                        { stat: "30%", label: "cost reduction" },
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
                      &ldquo;Zonov didn&apos;t just automate tasks. It fundamentally transformed how our clinical teams work. Our doctors spend more time with patients, our nurses focus on care, and our billing team recovers revenue we used to simply lose. The ROI was clear within the first quarter.&rdquo;
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

      </main>
      <Footer />
    </div>
  );
}
