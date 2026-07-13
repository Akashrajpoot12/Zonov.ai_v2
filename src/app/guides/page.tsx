import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import NewsletterForm from "@/components/ui/NewsletterForm";
import GuidesFilter from "./GuidesFilter";

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
      "How Indian hospitals lose 15–25% of billed revenue to unbilled procedures, claim rejections, and late submissions, and how AI catches it in real time.",
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

export default function GuidesPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
            <GuidesFilter guides={guides} />
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

      </main>
      <Footer />
    </div>
  );
}
