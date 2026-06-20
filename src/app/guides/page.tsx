import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Guides & Resources — Zonov.ai",
  description: "Practical implementation guides for hospital teams navigating AI adoption.",
};

const guides = [
  {
    category: "Implementation",
    color: "var(--primary)",
    title: "How to deploy AI agents without disrupting clinical workflows",
    description:
      "A step-by-step framework for rolling out AI in OPD, IPD, and diagnostic workflows without changing how doctors work. Includes a pre-launch readiness checklist.",
    time: "12 min read",
  },
  {
    category: "Compliance",
    color: "var(--purple)",
    title: "HIPAA compliance checklist for AI in healthcare",
    description:
      "Every control point your AI vendor must satisfy before you sign. Covers data residency, audit trails, access controls, and breach response protocols.",
    time: "8 min read",
  },
  {
    category: "ROI",
    color: "#06C270",
    title: "Calculating ROI from AI in OPD registration",
    description:
      "A financial model for quantifying time savings, revenue recovery, and patient throughput gains from automating OPD registration. Includes an editable template.",
    time: "10 min read",
  },
  {
    category: "Clinical AI",
    color: "var(--secondary)",
    title: "Implementing voice-to-prescription in your hospital",
    description:
      "How to integrate AI-generated prescriptions into your existing EMR without disrupting the doctor-patient consultation. Covers training, rollout, and audit workflows.",
    time: "14 min read",
  },
  {
    category: "Implementation",
    color: "var(--primary)",
    title: "AI in Indian healthcare: ABDM, ABHA, and what it means for you",
    description:
      "A clear explanation of the Ayushman Bharat Digital Mission and how AI systems must align with ABHA ID, PHR, and HIP requirements. Relevant for every Indian hospital.",
    time: "9 min read",
  },
  {
    category: "Implementation",
    color: "var(--primary)",
    title: "How to onboard clinical staff to AI tools",
    description:
      "Change management strategies that actually work in hospital environments. Covers training timelines, resistance patterns, and what to measure in the first 90 days.",
    time: "11 min read",
  },
  {
    category: "ROI",
    color: "#06C270",
    title: "Revenue leakage: identifying and recovering missed billing",
    description:
      "How Indian hospitals lose 15–25% of billed revenue to unbilled procedures, claim rejections, and late submissions — and how AI catches it in real time.",
    time: "7 min read",
  },
  {
    category: "Clinical AI",
    color: "var(--secondary)",
    title: "The CTO's guide to integrating AI with legacy HIS",
    description:
      "A technical integration map for connecting AI agents to HIS platforms like Insta, eHospital, and Practo. Covers API patterns, HL7, and fallback strategies.",
    time: "13 min read",
  },
];

const filters = ["All", "Implementation", "Clinical AI", "Compliance", "ROI"];

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section style={{ backgroundColor: "var(--bg)" }} className="pt-32 pb-10">
          <div className="container-wide">
            <FadeIn>
              <span
                className="type-mono"
                style={{ color: "var(--primary)" }}
              >
                LEARN
              </span>
              <h1 className="type-display mt-3">Guides &amp; Resources</h1>
              <p
                className="type-body-lg mt-4 max-w-xl"
                style={{ color: "var(--text-muted)" }}
              >
                Practical implementation guides for hospital teams navigating AI adoption.
              </p>
            </FadeIn>
          </div>
          <div
            className="container-wide mt-10"
            style={{ borderTop: "1px solid var(--border)" }}
          />
        </section>

        <section style={{ backgroundColor: "var(--bg)" }} className="pb-24">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row gap-10">
              <aside className="hidden lg:flex flex-col gap-2 flex-shrink-0" style={{ width: "240px", position: "sticky", top: "100px", alignSelf: "flex-start" }}>
                {filters.map((filter, i) => (
                  <button
                    key={filter}
                    className="type-body rounded-full py-2.5 px-4 text-left w-full transition-colors"
                    style={
                      i === 0
                        ? { backgroundColor: "var(--primary)", color: "#fff", border: "none" }
                        : {
                            backgroundColor: "var(--surface)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border)",
                          }
                    }
                  >
                    {filter}
                  </button>
                ))}
                <div
                  className="mt-6 rounded-lg p-4"
                  style={{
                    backgroundColor: "var(--primary-subtle)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p className="type-caption" style={{ color: "var(--text-muted)" }}>
                    Can&apos;t find what you need? Email us at{" "}
                    <a
                      href="mailto:guides@zonov.ai"
                      style={{ color: "var(--primary)" }}
                    >
                      guides@zonov.ai
                    </a>
                  </p>
                </div>
              </aside>

              <div
                className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4"
                style={{ scrollbarWidth: "none" }}
              >
                {filters.map((filter, i) => (
                  <button
                    key={filter}
                    className="type-body rounded-full py-2 px-4 flex-shrink-0 transition-colors"
                    style={
                      i === 0
                        ? { backgroundColor: "var(--primary)", color: "#fff", border: "none" }
                        : {
                            backgroundColor: "var(--surface)",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border)",
                          }
                    }
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <FadeInStagger>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {guides.map((guide) => (
                      <FadeInItem key={guide.title}>
                        <div
                          className="card flex flex-col h-full hover:shadow-md transition-shadow"
                          style={{ gap: 0 }}
                        >
                          <div className="flex flex-col flex-1 p-6">
                            <span
                              className="type-mono"
                              style={{ color: guide.color }}
                            >
                              {guide.category.toUpperCase()}
                            </span>
                            <h3
                              className="type-h4 font-semibold mt-2"
                              style={{ color: "var(--text)" }}
                            >
                              {guide.title}
                            </h3>
                            <p
                              className="type-body mt-3 flex-1"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {guide.description}
                            </p>
                          </div>
                          <div
                            className="flex items-center justify-between px-6 pb-6 pt-4"
                            style={{ borderTop: "1px solid var(--border)" }}
                          >
                            <span
                              className="type-caption"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {guide.time}
                            </span>
                            <a
                              href="#"
                              className="type-caption font-medium"
                              style={{ color: "var(--primary)" }}
                            >
                              Read Guide →
                            </a>
                          </div>
                        </div>
                      </FadeInItem>
                    ))}
                  </div>
                </FadeInStagger>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-py"
          style={{ backgroundColor: "var(--surface)" }}
        >
          <div className="container-wide flex flex-col items-center text-center">
            <FadeIn>
              <h2 className="type-h3">Stay current on healthcare AI</h2>
              <p
                className="type-body mt-3 max-w-lg"
                style={{ color: "var(--text-muted)" }}
              >
                One digest per month. Implementation tips, regulatory updates, and case studies from Indian hospitals.
              </p>
              <NewsletterForm />
              <p
                className="type-caption mt-3"
                style={{ color: "var(--text-muted)" }}
              >
                No spam. Unsubscribe anytime.
              </p>
            </FadeIn>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
