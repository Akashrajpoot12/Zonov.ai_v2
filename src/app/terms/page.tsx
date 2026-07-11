import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Zonov.ai",
  description: "Terms governing access to and use of the Zonov.ai AI-powered hospital management platform.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        <div className="bg-[var(--bg)] pt-40 pb-12">
          <div className="container-wide">
            <p className="type-mono text-[var(--primary)] mb-3">LEGAL</p>
            <h1 className="type-h1" style={{ fontFamily: "var(--font-playfair)" }}>Terms of Service</h1>
            <p className="type-body text-[var(--text-muted)] mt-2">Last updated: June 2025</p>
            <div className="border-b border-[var(--border)] mt-8" />
          </div>
        </div>

        <div className="bg-[var(--surface)] py-16">
          <div className="container-wide">
            <div className="flex gap-16 items-start">

              <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-28">
                <p className="type-mono text-[var(--text-muted)] mb-4">CONTENTS</p>
                <nav className="flex flex-col">
                  <a href="#acceptance" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Acceptance of Terms</a>
                  <a href="#services" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Services</a>
                  <a href="#obligations" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">User Obligations</a>
                  <a href="#ip" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Intellectual Property</a>
                  <a href="#liability" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Limitation of Liability</a>
                  <a href="#governing" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Governing Law</a>
                  <a href="#contact" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Contact</a>
                </nav>
              </aside>

              <div className="flex-1 min-w-0">

                <section id="acceptance" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Acceptance of Terms</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    By accessing or using the Zonov.ai platform (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you are accessing the Service on behalf of a hospital or healthcare organisation, you represent that you have authority to bind that organisation to these Terms.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    These Terms apply to all users of the Service, including hospital administrators, clinical staff, and technical personnel. If you do not agree to these Terms, you must not use the Service.
                  </p>
                </section>

                <section id="services" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Services</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Zonov.ai provides an AI-powered hospital management platform that includes automated patient registration, clinical documentation, diagnostic workflow support, billing automation, and hospital operations management (&ldquo;AI Agents&rdquo;).
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>The Service is provided on a subscription basis under a separately executed Master Service Agreement (MSA) or Order Form</li>
                    <li>AI Agent outputs — including clinical documentation, billing codes, and diagnostic summaries — are decision-support tools and do not constitute medical advice</li>
                    <li>Hospitals remain responsible for clinical decisions and for review of all AI-generated content before use in patient care</li>
                    <li>Zonov.ai will use commercially reasonable efforts to maintain 99.5% uptime, excluding scheduled maintenance windows</li>
                  </ul>
                </section>

                <section id="obligations" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>User Obligations</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    By using the Service, you agree to:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>Use the Service only for lawful purposes in accordance with applicable Indian law and applicable healthcare regulations</li>
                    <li>Maintain the confidentiality of your login credentials and notify Zonov.ai immediately of any unauthorised access</li>
                    <li>Not reverse-engineer, decompile, or attempt to extract the source code or model weights of any AI component of the Service</li>
                    <li>Not use the Service to process data of individuals without appropriate consent or legal basis under the DPDPA 2023</li>
                    <li>Ensure that all hospital staff who access the Service have completed required onboarding and understand that AI outputs require human review</li>
                  </ul>
                </section>

                <section id="ip" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Intellectual Property</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Zonov.ai and its licensors own all intellectual property rights in the platform, including AI models, software, documentation, and trademarks.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Hospitals retain ownership of all data they input into the platform, including patient records, clinical notes, and billing data. Zonov.ai claims no ownership over hospital data.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Anonymised, aggregated, and de-identified data derived from platform usage may be used by Zonov.ai to improve AI model performance, subject to the restrictions in our Privacy Policy.
                  </p>
                </section>

                <section id="liability" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Limitation of Liability</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    To the maximum extent permitted by applicable law:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>Zonov.ai&apos;s total liability to any hospital or user shall not exceed the fees paid in the 12 months preceding the claim</li>
                    <li>Zonov.ai is not liable for indirect, incidental, consequential, or punitive damages arising from use of the Service</li>
                    <li>Zonov.ai is not liable for clinical outcomes resulting from reliance on AI-generated content without appropriate human review</li>
                    <li>Hospitals are responsible for maintaining appropriate professional indemnity insurance for clinical decisions made using AI-supported workflows</li>
                  </ul>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mt-4">
                    Nothing in these Terms limits liability for death, personal injury, fraud, or any liability that cannot be excluded by law.
                  </p>
                </section>

                <section id="governing" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Governing Law</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    These Terms are governed by the laws of India. Any dispute arising from these Terms or the use of the Service shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Disputes shall first be subject to good-faith negotiation for 30 days before either party initiates formal proceedings.
                  </p>
                </section>

                <section id="contact" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Contact</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    For questions about these Terms:
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-2">
                    Email: <a href="mailto:legal@zonov.ai" className="text-[var(--primary)] hover:underline">legal@zonov.ai</a>
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed">
                    Address: Zonov.ai Technologies Pvt. Ltd., Bangalore, Karnataka, India
                  </p>
                </section>

              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
