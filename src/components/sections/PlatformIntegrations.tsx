import FadeIn from "@/components/ui/FadeIn";
import { Building2, TestTube, Stethoscope, CreditCard, Pill, Smartphone, Landmark, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SYSTEMS: { name: string; examples: string; icon: LucideIcon }[] = [
  { name: "HIS / EMR", examples: "Meditech, Allscripts, Cerner, Epic", icon: Building2 },
  { name: "LIS", examples: "Sunquest, Cerner PathNet, SCC Lab", icon: TestTube },
  { name: "RIS / PACS", examples: "GE Healthcare, Philips, Fujifilm", icon: Stethoscope },
  { name: "Billing & Insurance", examples: "Kareo, NexGen, custom TPA portals", icon: CreditCard },
  { name: "Pharmacy", examples: "Rx30, QS/1, Medispan", icon: Pill },
  { name: "Patient Apps", examples: "WhatsApp, iOS, Android, web", icon: Smartphone },
  { name: "Government / NHA", examples: "ABHA, Ayushman Bharat, NDHM", icon: Landmark },
  { name: "Custom Systems", examples: "Any REST API or HL7 FHIR endpoint", icon: Link2 },
];

const PROTOCOLS = ["HL7 FHIR R4", "REST API", "HL7 v2.x", "DICOM", "ABDM", "OAuth 2.0", "SNOMED CT", "ICD-10"];

type System = (typeof SYSTEMS)[number];

function IntegrationCard({ sys }: { sys: System }) {
  const Icon = sys.icon;
  return (
    <div className="w-[230px] flex-shrink-0 bg-white rounded-[16px] border border-[var(--border)] p-5 hover:border-[var(--primary)]/40 hover:shadow-md transition-all">
      <div className="mb-3 text-[var(--primary)]"><Icon className="w-6 h-6" strokeWidth={1.5} /></div>
      <p className="text-[14px] font-semibold text-[var(--text)] mb-1">{sys.name}</p>
      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{sys.examples}</p>
    </div>
  );
}

/* First half / second half for the two opposing rows */
const ROW_A = SYSTEMS.slice(0, 4);
const ROW_B = SYSTEMS.slice(4);

export default function PlatformIntegrations() {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            Integrations
          </p>
          <h2 className="type-h1 text-[var(--text)] max-w-2xl [text-wrap:balance] mb-4 google-sans-700">
            Works with everything{" "}
            <span className="italic gradient-text">your hospital already uses.</span>
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-14">
            No rip-and-replace. Zonov.ai agents connect to your existing HIS, EMR, LIS, RIS, billing, and pharmacy systems through standard APIs.
          </p>
        </FadeIn>

        {/* Auto-scrolling marquee rows */}
        <FadeIn className="mb-12">
          <div className="flex flex-col gap-4">
            {/* Row A → scrolls left */}
            <div className="marquee-mask overflow-hidden">
              <div className="marquee-track">
                {[...ROW_A, ...ROW_A, ...ROW_A, ...ROW_A].map((sys, i) => (
                  <IntegrationCard key={`a-${i}`} sys={sys} />
                ))}
              </div>
            </div>
            {/* Row B → scrolls right */}
            <div className="marquee-mask overflow-hidden">
              <div className="marquee-track reverse">
                {[...ROW_B, ...ROW_B, ...ROW_B, ...ROW_B].map((sys, i) => (
                  <IntegrationCard key={`b-${i}`} sys={sys} />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Protocols */}
        <FadeIn>
          <div className="bg-[var(--dark-navy)] rounded-[24px] p-8 md:p-10">
            <p className="type-mono text-white/40 mb-4">Supported Protocols & Standards</p>
            <div className="flex flex-wrap gap-3">
              {PROTOCOLS.map((p) => (
                <span
                  key={p}
                  className="px-4 py-1.5 rounded-full text-[12px] font-medium text-white border border-white/15 bg-white/5"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-white/40">
              Don&apos;t see yours? We build custom connectors for any system with an API. Ask us about your stack.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
