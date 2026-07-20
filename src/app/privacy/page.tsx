import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy, Zonov.ai",
  description: "How Zonov.ai collects, uses, and protects data across our AI-powered hospital management platform.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        <div className="bg-[var(--bg)] pt-40 pb-12">
          <div className="container-wide">
            <p className="type-mono text-[var(--primary)] mb-3">LEGAL</p>
            <h1 className="type-h1" style={{ fontFamily: "var(--font-playfair)" }}>Privacy Policy</h1>
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
                  <a href="#collect" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Information We Collect</a>
                  <a href="#use" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">How We Use It</a>
                  <a href="#security" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Data Security</a>
                  <a href="#sharing" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Third-Party Sharing</a>
                  <a href="#rights" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Your Rights</a>
                  <a href="#contact" className="block py-1.5 type-caption text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors border-l-2 border-transparent hover:border-[var(--primary)] pl-3">Contact Us</a>
                </nav>
              </aside>

              <div className="flex-1 min-w-0">

                <section id="collect" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Information We Collect</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Zonov.ai collects information necessary to provide our AI-powered hospital management services. We collect three categories of data:
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    <strong>Service data</strong>, Information generated during use of the platform, including patient registration details, appointment records, clinical documentation, billing data, and diagnostic reports. This data is owned by the hospital and processed by Zonov.ai as a data processor under applicable law.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    <strong>Account data</strong>, Names, email addresses, role designations, and login credentials for hospital administrators and clinical staff accessing the platform.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    <strong>Usage data</strong>, Anonymised telemetry about how features are used, error logs, and performance metrics. This data does not contain patient-identifiable information and is used solely to improve the platform.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-2">We do not collect:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>Personal data beyond what is necessary for service delivery</li>
                    <li>Payment card information (handled by certified payment processors)</li>
                    <li>Data from minors under 18 without hospital-verified consent</li>
                  </ul>
                </section>

                <section id="use" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>How We Use It</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    We use the data we collect for the following purposes:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>Delivering and improving the Zonov.ai platform and its AI agents</li>
                    <li>Generating clinical documentation, billing codes, and operational reports on behalf of the hospital</li>
                    <li>Sending operational notifications, alerts, and scheduled digests to authorised hospital staff</li>
                    <li>Fulfilling legal obligations under applicable data protection law, including the EU GDPR, and applicable healthcare regulations</li>
                    <li>Conducting anonymised research to improve AI model accuracy, with hospital consent</li>
                  </ul>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mt-4">
                    We do not use patient data for advertising, third-party profiling, or any purpose outside the contracted service scope.
                  </p>
                </section>

                <section id="security" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Data Security</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    <strong>HIPAA and GDPR alignment:</strong> Zonov.ai is designed to meet the requirements of both the US Health Insurance Portability and Accountability Act (HIPAA) and the EU General Data Protection Regulation (GDPR). We implement administrative, technical, and physical safeguards to protect health information.
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-2">Key controls:</p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>AES-256 encryption at rest; TLS 1.3 in transit</li>
                    <li>Role-based access controls with audit trails for all data access</li>
                    <li>Flexible data residency in your chosen region (AWS / Azure)</li>
                    <li>Annual third-party penetration testing and SOC 2 Type II audit in progress</li>
                    <li>Incident response SLA: notification within 72 hours of confirmed breach</li>
                  </ul>
                </section>

                <section id="sharing" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Third-Party Sharing</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Zonov.ai does not sell patient data. We share data only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>With sub-processors (cloud infrastructure, analytics providers) under data processing agreements that enforce equivalent security standards</li>
                    <li>With the hospital&apos;s own HIS, EMR, or third-party diagnostic systems as directed by the hospital</li>
                    <li>When required by law, regulation, court order, or government authority</li>
                    <li>With your consent, for purposes clearly disclosed at the time of consent</li>
                  </ul>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mt-4">
                    A current list of sub-processors is available on request at privacy@zonov.ai.
                  </p>
                </section>

                <section id="rights" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Your Rights</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Under applicable data protection law, individuals whose data is processed through the Zonov.ai platform may have the following rights:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 type-body text-[var(--text-muted)]">
                    <li>Right to access: request a copy of personal data held about you</li>
                    <li>Right to correction: request correction of inaccurate or incomplete data</li>
                    <li>Right to erasure: request deletion of data, subject to legal retention obligations</li>
                    <li>Right to grievance redressal: file a complaint with the relevant data protection authority</li>
                  </ul>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mt-4">
                    Note: Most rights are exercised through the hospital (the data controller), not directly with Zonov.ai (the data processor). Contact your hospital&apos;s data protection officer in the first instance.
                  </p>
                </section>

                <section id="contact" className="mb-12">
                  <h3 className="type-h3 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Contact Us</h3>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    For privacy-related queries, data subject requests, or to report a concern:
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-2">
                    Email: <a href="mailto:privacy@zonov.ai" className="text-[var(--primary)] hover:underline">privacy@zonov.ai</a>
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed mb-4">
                    Address: Zonov.ai Technologies Pvt. Ltd., Jaipur, India
                  </p>
                  <p className="type-body text-[var(--text-muted)] leading-relaxed">
                    We aim to respond to all privacy requests within 30 days.
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
