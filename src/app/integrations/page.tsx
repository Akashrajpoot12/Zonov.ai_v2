import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Integrations — Zonov.ai",
  description: "Zonov.ai integrates with every major Hospital Information System in India: Practo, eHospital, Meddbase, HIS Pro, and more. No rip-and-replace.",
};

const HIS_SYSTEMS = [
  { name: "Practo", category: "HIS / EMR", status: "Live", desc: "Full bidirectional sync: patient records, prescriptions, and billing data." },
  { name: "eHospital", category: "HIS / EMR", status: "Live", desc: "Deep integration with appointment scheduling, IPD management, and discharge workflows." },
  { name: "Meddbase", category: "HIS / EMR", status: "Live", desc: "Real-time data flow for clinical documentation and revenue cycle management." },
  { name: "HIS Pro", category: "HIS / EMR", status: "Live", desc: "Connects with OPD, IPD, OT, pharmacy, and lab modules." },
  { name: "Insta HMS", category: "HIS / EMR", status: "Live", desc: "Full workflow integration across registration, billing, and clinical notes." },
  { name: "Meditab", category: "HIS / EMR", status: "Beta", desc: "Clinical documentation and prescription management integration." },
  { name: "Healthplix", category: "EMR", status: "Live", desc: "Voice-to-prescription and clinical note synchronisation." },
  { name: "Nuvectra", category: "HIS", status: "Coming Soon", desc: "Integration in development. Notify us to prioritise." },
];

const DIAGNOSTIC_LABS = [
  { name: "Dr. Lal PathLabs", category: "Diagnostics", status: "Live", desc: "Automatic lab order creation and result import into patient records." },
  { name: "Thyrocare", category: "Diagnostics", status: "Live", desc: "Panel ordering and result delivery with critical value alerts." },
  { name: "SRL Diagnostics", category: "Diagnostics", status: "Live", desc: "Radiology and pathology report ingestion with AI interpretation support." },
  { name: "Metropolis", category: "Diagnostics", status: "Beta", desc: "Lab result integration and clinical summary generation." },
];

const INSURANCE = [
  { name: "ABDM / ABHA", category: "Government", status: "Live", desc: "Full ABDM Health ID integration: auto-fetch patient records and consent management." },
  { name: "Ayushman Bharat", category: "Government", status: "Live", desc: "PM-JAY claim submission, eligibility verification, and pre-auth workflow." },
  { name: "Star Health", category: "Insurance", status: "Live", desc: "Cashless claim pre-auth and TPA communication automation." },
  { name: "Niva Bupa", category: "Insurance", status: "Live", desc: "Pre-authorisation, claim scrubbing, and denial management." },
  { name: "ICICI Lombard", category: "Insurance", status: "Beta", desc: "Claim submission and status tracking integration." },
  { name: "New India Assurance", category: "Government", status: "Live", desc: "Government insurance scheme claim processing and reconciliation." },
];

const INFRA = [
  { name: "AWS India (ap-south-1)", category: "Cloud", status: "Primary", desc: "All patient data hosted in India region. HIPAA-eligible services." },
  { name: "Azure India Central", category: "Cloud", status: "Available", desc: "Alternative cloud hosting option for enterprise deployments." },
  { name: "HL7 FHIR R4", category: "Standard", status: "Supported", desc: "Industry-standard healthcare data exchange format supported natively." },
  { name: "DICOM", category: "Standard", status: "Supported", desc: "Radiology image integration with PACS systems." },
];

type Integration = { name: string; category: string; status: string; desc: string };

const statusColor: Record<string, string> = {
  Live: "var(--success)",
  Beta: "var(--secondary)",
  "Coming Soon": "var(--text-dim)",
  Primary: "var(--primary)",
  Available: "var(--secondary)",
  Supported: "var(--success)",
};

function IntegrationCard({ item }: { item: Integration }) {
  return (
    <FadeInItem>
      <div className="bg-white rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-3 h-full hover:-translate-y-0.5 transition-transform duration-200">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="type-body font-semibold text-[var(--text)]">{item.name}</p>
            <p className="type-caption text-[var(--text-muted)] mt-0.5">{item.category}</p>
          </div>
          <span
            className="type-mono text-[10px] px-2.5 py-1 rounded-full flex-shrink-0"
            style={{
              color: statusColor[item.status] ?? "var(--text-muted)",
              backgroundColor: `color-mix(in srgb, ${statusColor[item.status] ?? "var(--text-muted)"} 12%, transparent)`,
            }}
          >
            {item.status}
          </span>
        </div>
        <p className="type-caption text-[var(--text-muted)] flex-1">{item.desc}</p>
      </div>
    </FadeInItem>
  );
}

function IntegrationGroup({ title, subtitle, items }: { title: string; subtitle: string; items: Integration[] }) {
  return (
    <div className="mb-14">
      <FadeIn>
        <h2 className="type-h2 text-[var(--text)]">{title}</h2>
        <p className="type-body text-[var(--text-muted)] mt-2 mb-8">{subtitle}</p>
      </FadeIn>
      <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.06}>
        {items.map((item) => (
          <IntegrationCard key={item.name} item={item} />
        ))}
      </FadeInStagger>
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        {/* Hero */}
        <section className="bg-[var(--dark-navy)] pt-36 pb-20 px-edge">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-4">INTEGRATIONS</p>
              <h1 className="type-display text-white max-w-3xl">
                Works with every system{" "}
                <span className="gradient-text-light italic">your hospital already uses.</span>
              </h1>
              <p className="type-body-lg text-white/60 mt-5 max-w-2xl">
                Zonov.ai integrates with India&apos;s leading HIS platforms, diagnostic labs, insurance networks, and government health schemes. No rip-and-replace. Live in 1–2 weeks.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap">
                <Link href="/book-demo" className="btn btn-primary-lg">Book a Demo</Link>
                <a href="mailto:hello@zonov.ai" className="btn" style={{ height: "50px", padding: "0 24px", fontSize: "16px", borderRadius: "var(--radius-md)", background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center" }}>
                  Request an Integration
                </a>
              </div>
            </FadeIn>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
              {[
                { n: "20+", l: "HIS Systems" },
                { n: "100%", l: "ABDM Compliant" },
                { n: "HL7 FHIR", l: "Native Support" },
                { n: "1–2 wks", l: "Go Live Time" },
              ].map((s) => (
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <p className="font-bold text-white leading-none" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(22px, 2.5vw, 32px)" }}>{s.n}</p>
                  <p className="type-caption text-white/50 mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration groups */}
        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <IntegrationGroup
              title="Hospital Information Systems"
              subtitle="Bidirectional integration with India's leading HIS and EMR platforms."
              items={HIS_SYSTEMS}
            />
            <IntegrationGroup
              title="Diagnostic Labs"
              subtitle="Automatic lab order routing and result import with AI-assisted interpretation."
              items={DIAGNOSTIC_LABS}
            />
            <IntegrationGroup
              title="Insurance & Government Schemes"
              subtitle="Cashless claim automation, pre-auth workflows, and Ayushman Bharat integration."
              items={INSURANCE}
            />
            <IntegrationGroup
              title="Infrastructure & Standards"
              subtitle="Built on open standards with India-region cloud hosting."
              items={INFRA}
            />
          </div>
        </section>

        {/* Custom integration CTA */}
        <section className="bg-white section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <div className="bg-[var(--dark-navy)] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
                <div>
                  <p className="type-mono text-[var(--secondary)] mb-3">DON&apos;T SEE YOUR SYSTEM?</p>
                  <h2 className="type-h2 text-white max-w-lg">We build custom integrations for enterprise deployments.</h2>
                  <p className="type-body text-white/60 mt-3 max-w-md">
                    If your HIS isn&apos;t listed, our engineering team can build a certified integration typically within 4–6 weeks.
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <Link href="/book-demo" className="btn btn-primary-lg whitespace-nowrap">Request Integration</Link>
                  <a href="mailto:hello@zonov.ai" className="type-caption text-white/50 hover:text-white text-center transition-colors">hello@zonov.ai</a>
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
