import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

const SYSTEMS = [
  { name: "HIS / EMR", examples: "Meditech, Allscripts, Cerner, Epic", icon: "🏥" },
  { name: "LIS", examples: "Sunquest, Cerner PathNet, SCC Lab", icon: "🧪" },
  { name: "RIS / PACS", examples: "GE Healthcare, Philips, Fujifilm", icon: "🩺" },
  { name: "Billing & Insurance", examples: "Kareo, NexGen, custom TPA portals", icon: "💳" },
  { name: "Pharmacy", examples: "Rx30, QS/1, Medispan", icon: "💊" },
  { name: "Patient Apps", examples: "WhatsApp, iOS, Android, web", icon: "📱" },
  { name: "Government / NHA", examples: "ABHA, Ayushman Bharat, NDHM", icon: "🏛️" },
  { name: "Custom Systems", examples: "Any REST API or HL7 FHIR endpoint", icon: "🔗" },
];

const PROTOCOLS = ["HL7 FHIR R4", "REST API", "HL7 v2.x", "DICOM", "ABDM", "OAuth 2.0", "SNOMED CT", "ICD-10"];

export default function PlatformIntegrations() {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            Integrations
          </p>
          <h2 className="type-h1 text-[var(--text)] max-w-2xl [text-wrap:balance] mb-4">
            Works with everything{" "}
            <span className="italic gradient-text">your hospital already uses.</span>
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-14">
            No rip-and-replace. Zonov.ai agents connect to your existing HIS, EMR, LIS, RIS, billing, and pharmacy systems through standard APIs.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" stagger={0.06}>
          {SYSTEMS.map((sys) => (
            <FadeInItem key={sys.name}>
              <div className="bg-white rounded-[16px] border border-[var(--border)] p-5 hover:border-[var(--primary)]/40 hover:shadow-sm transition-all">
                <div className="text-2xl mb-3">{sys.icon}</div>
                <p className="text-[14px] font-semibold text-[var(--text)] mb-1">{sys.name}</p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{sys.examples}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

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
