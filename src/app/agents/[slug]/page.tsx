import Footer from "@/components/layout/Footer";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { IdCard, Stethoscope, Microscope, Pill, BedDouble, Syringe, ReceiptText, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AgentData = {
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: LucideIcon;
  features: { title: string; desc: string }[];
  metrics: { num: string; label: string }[];
  useCases: string[];
};

/**
 * NOTE (positioning): these pages sell OUTCOMES, not mechanics.
 * Capability themes stay high-level; exact "how it works" (models,
 * integration protocols, precise specs) lives behind the demo wall.
 * Metrics are deliberately stated as ranges ("up to") so every claim
 * is defensible. Unreleased agents are intentionally not listed here.
 */
const AGENTS: Record<string, AgentData> = {
  "patient-registration": {
    name: "Registration Agent",
    tagline: "Zero-friction intake, from first contact to first care.",
    description:
      "Turn patient onboarding into a calm, guided experience — so your front desk spends its time on people, not paperwork.",
    color: "#1B4FD8",
    icon: IdCard,
    features: [
      {
        title: "Effortless Intake",
        desc: "Patients are guided through registration conversationally, capturing the right details the first time — without long forms or queues.",
      },
      {
        title: "Accurate, Verified Records",
        desc: "Every record is checked for completeness and consistency before it reaches your system, so your team starts from clean data.",
      },
      {
        title: "Smart Routing",
        desc: "Patients are directed to the right department and provider automatically, keeping the front desk moving and wait times short.",
      },
    ],
    metrics: [
      { num: "Up to 60%", label: "Faster OPD registration" },
      { num: "Minutes", label: "Intake time — not the usual wait" },
      { num: "Same-day", label: "Verification, every time" },
    ],
    useCases: [
      "High-volume outpatient and emergency departments",
      "Multi-site networks needing consistent registration everywhere",
      "Clinics serving diverse, multilingual communities",
    ],
  },

  "doctor-prescription": {
    name: "Doctor Prescription Agent",
    tagline: "Every conversation captured. Every doctor's time given back.",
    description:
      "An AI clinical companion that turns the consultation into structured notes and a ready-to-review prescription — so doctors spend their time healing, not typing.",
    color: "#00B4AE",
    icon: Stethoscope,
    features: [
      {
        title: "Ambient Documentation",
        desc: "The encounter becomes a structured clinical note in the background — ready for the physician to review and approve, not write from scratch.",
      },
      {
        title: "Assisted Prescriptions",
        desc: "Draft prescriptions are prepared from the consultation with safety checks in place, leaving the clinical decision firmly with the doctor.",
      },
      {
        title: "Fits Your Workflow",
        desc: "Works with the systems your team already uses, so finalized notes land where they belong with a single approval.",
      },
    ],
    metrics: [
      { num: "~2 hrs", label: "Given back to each doctor, daily" },
      { num: "Less", label: "After-hours charting" },
      { num: "More", label: "Time with patients" },
    ],
    useCases: [
      "Physicians losing hours to after-clinic documentation",
      "High-acuity units where minutes with the patient matter most",
      "Practices growing patient volume without growing admin",
    ],
  },

  investigation: {
    name: "Investigation Agent",
    tagline: "From order to insight — at the speed of care.",
    description:
      "Keep the diagnostics loop moving — orders, tracking, and results flow to the right person at the right moment, with nothing lost in between.",
    color: "#7C3AED",
    icon: Microscope,
    features: [
      {
        title: "Nothing Falls Through",
        desc: "Every investigation is tracked from order to result, so delays and duplicates are caught before they affect care.",
      },
      {
        title: "Critical Results, Fast",
        desc: "Urgent findings reach the responsible clinician quickly, with confirmation that the message was received.",
      },
      {
        title: "Clearer Insight",
        desc: "Results are presented in a way that helps clinicians act sooner, without wading through scattered reports.",
      },
    ],
    metrics: [
      { num: "Up to 40%", label: "Faster result delivery" },
      { num: "Fewer", label: "Duplicate and lost orders" },
      { num: "Reliable", label: "Critical-value alerts" },
    ],
    useCases: [
      "Emergency departments needing fast critical-result turnaround",
      "Radiology teams managing high imaging volumes",
      "ICUs where early signals prevent deterioration",
    ],
  },

  pharmacy: {
    name: "Pharmacy Agent",
    tagline: "Near-expiry alerts. Zero wastage.",
    description:
      "Keep the pharmacy running lean — stock stays visible, expiries are caught early, and shortages are headed off before they happen.",
    color: "#059669",
    icon: Pill,
    features: [
      {
        title: "Stay Ahead of Expiry",
        desc: "Medicines approaching expiry are surfaced with enough lead time to act — protecting both safety and margin.",
      },
      {
        title: "Always-Visible Stock",
        desc: "A clear, real-time view of inventory across locations means fewer surprises and smoother replenishment.",
      },
      {
        title: "Safer Dispensing",
        desc: "Checks happen behind the scenes so the right medicine reaches the right patient, every time.",
      },
    ],
    metrics: [
      { num: "Near-zero", label: "Expiry wastage" },
      { num: "Lower", label: "Pharmacy costs" },
      { num: "Faster", label: "Stock replenishment" },
    ],
    useCases: [
      "Pharmacies losing revenue to preventable wastage",
      "Multi-location chains needing centralized oversight",
      "Facilities reducing manual stock reconciliation",
    ],
  },

  ipd: {
    name: "IPD Agent",
    tagline: "Nursing handovers. Quality, never lost between shifts.",
    description:
      "Make in-patient care visible and consistent — so critical information carries cleanly across every shift and no patient goes unnoticed.",
    color: "#D97706",
    icon: BedDouble,
    features: [
      {
        title: "Structured Handovers",
        desc: "Shift changes follow a clear, complete protocol — so the next team always knows exactly where each patient stands.",
      },
      {
        title: "Early Warnings",
        desc: "Care patterns are monitored quietly in the background, surfacing risks before they become incidents.",
      },
      {
        title: "Care Plans on Track",
        desc: "Prescribed care stays on schedule, with gentle nudges when something is due or overdue.",
      },
    ],
    metrics: [
      { num: "Complete", label: "Shift handovers" },
      { num: "Fewer", label: "Care-plan deviations" },
      { num: "Safer", label: "In-patient care" },
    ],
    useCases: [
      "Wards with high patient-to-nurse ratios",
      "Hospitals with strict nursing-documentation standards",
      "Facilities focused on patient-safety outcomes",
    ],
  },

  ot: {
    name: "OT Agent",
    tagline: "Scheduling, monitoring, and emergencies — under control.",
    description:
      "Keep operation theatres running at their best — fewer delays, clearer coordination, and emergencies handled without throwing the day off course.",
    color: "#0D1F3C",
    icon: Syringe,
    features: [
      {
        title: "Smarter Scheduling",
        desc: "Theatre time is planned to make the most of every slot, reducing the gaps and clashes that cause delays.",
      },
      {
        title: "Live Coordination",
        desc: "Everyone involved sees the same up-to-date picture of each theatre, so the team stays in sync through the day.",
      },
      {
        title: "Emergencies, Absorbed",
        desc: "Urgent cases are slotted in with the least possible disruption to everything else on the list.",
      },
    ],
    metrics: [
      { num: "Up to 30%", label: "Fewer OT delays" },
      { num: "Higher", label: "Theatre utilization" },
      { num: "Smoother", label: "Emergency handling" },
    ],
    useCases: [
      "Surgical hospitals running multiple concurrent theatres",
      "Facilities with high emergency-surgery volumes",
      "Teams targeting higher, predictable OT utilization",
    ],
  },

  claim: {
    name: "Claim Agent",
    tagline: "Fewer rejections. More of the revenue you earned.",
    description:
      "Get claims right the first time and recover what slips through — so your team chases fewer denials and collects more of what's owed.",
    color: "#7C3AED",
    icon: ReceiptText,
    features: [
      {
        title: "Right the First Time",
        desc: "Claims are checked for the issues that cause rejections before they ever leave the building.",
      },
      {
        title: "Denials, Handled",
        desc: "When a claim is denied, the groundwork for a strong, evidence-backed response is prepared for your team.",
      },
      {
        title: "Always in View",
        desc: "A clear picture of claim status and payer performance keeps finance ahead, not reacting.",
      },
    ],
    metrics: [
      { num: "Up to 20%", label: "Fewer claim rejections" },
      { num: "Faster", label: "Appeal resolution" },
      { num: "Higher", label: "First-pass accuracy" },
    ],
    useCases: [
      "Hospitals with high TPA rejection rates",
      "Cashless empanelled hospitals needing faster turnaround",
      "Billing teams stretched by manual rejection management",
    ],
  },

  finance: {
    name: "Finance Agent",
    tagline: "Stop the leak. See every rupee.",
    description:
      "Bring hospital finances into real time — catch revenue leakage as it happens and understand profitability at a level that week-old spreadsheets never could.",
    color: "#1B4FD8",
    icon: Wallet,
    features: [
      {
        title: "Catch Leakage Early",
        desc: "Missed charges and billing gaps are surfaced while they can still be recovered — not discovered months later.",
      },
      {
        title: "Real Profitability",
        desc: "See revenue and cost with the clarity to understand what's actually driving — or draining — your margins.",
      },
      {
        title: "Live Financial View",
        desc: "Leadership gets an always-current picture of performance instead of waiting on month-end reports.",
      },
    ],
    metrics: [
      { num: "Up to 20%", label: "Revenue leakage recovered" },
      { num: "Faster", label: "Month-end close" },
      { num: "Clearer", label: "Per-department view" },
    ],
    useCases: [
      "CFOs needing real-time financial visibility",
      "Chains wanting per-department profitability clarity",
      "Hospitals facing unexplained revenue shortfalls",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(AGENTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agent = AGENTS[slug];
  if (!agent) return {};

  const title = `${agent.name} — Healthcare AI Agent`;
  const description = agent.description;
  const url = `/agents/${slug}`;

  return {
    title,
    description,
    keywords: [agent.name, "Healthcare AI agent", "Hospital automation", "Zonov.ai"],
    alternates: { canonical: url },
    openGraph: {
      title: `${agent.name} | Zonov.ai`,
      description: agent.tagline,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${agent.name} | Zonov.ai`,
      description: agent.tagline,
    },
  };
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = AGENTS[slug];
  if (!agent) notFound();

  const { name, tagline, description, color, icon: Icon, features, metrics, useCases } = agent;

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--dark-navy)", paddingTop: "calc(var(--nav-h) + clamp(4rem,8vw,8rem))", paddingBottom: "clamp(4rem,8vw,8rem)" }}
        >
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{ background: color }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
            style={{ background: color }}
          />

          <div className="container-wide px-edge relative z-10">
            <FadeIn>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border" style={{ borderColor: `${color}40`, background: `${color}15` }}>
                <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color }} />
                <span className="type-mono text-sm" style={{ color }}>AI Agent</span>
              </div>

              <h1
                className="text-[clamp(36px,5.5vw,72px)] leading-[1.05] tracking-tight text-white mb-6 max-w-3xl [text-wrap:balance]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {name}
              </h1>

              <p
                className="text-[clamp(18px,2.5vw,26px)] leading-snug mb-4 max-w-2xl font-medium"
                style={{ color }}
              >
                {tagline}
              </p>

              <p className="type-body-lg text-white/60 max-w-2xl mb-14 [text-wrap:balance]">
                {description}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center py-8 px-6 text-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <span
                      className="text-[clamp(24px,3.4vw,38px)] font-bold leading-none mb-2 tracking-tight"
                      style={{ color, fontFamily: "var(--font-playfair)" }}
                    >
                      {m.num}
                    </span>
                    <span className="type-caption text-white/50 leading-snug max-w-[160px]">{m.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Capability Themes ────────────────────────────────── */}
        <section className="section-py bg-[var(--surface)]">
          <div className="container-wide px-edge">
            <FadeIn>
              <div className="mb-12 max-w-xl">
                <p className="type-mono mb-3" style={{ color }}>What it does</p>
                <h2 className="type-h2 text-[var(--text)]">
                  Built for the real demands of clinical operations.
                </h2>
              </div>
            </FadeIn>

            <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <FadeInItem key={i}>
                  <div
                    className="h-full rounded-2xl p-7 border transition-shadow hover:shadow-lg"
                    style={{ borderColor: "var(--border)", background: "var(--bg)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-white font-bold text-sm"
                      style={{ background: color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-semibold text-[var(--text)] text-[17px] mb-2 leading-snug">
                      {f.title}
                    </h3>
                    <p className="type-body text-[var(--text-muted)] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>

            {/* Tease the rest behind a demo */}
            <FadeIn delay={0.1}>
              <p className="mt-10 type-body text-[var(--text-dim)] max-w-xl">
                See exactly how {name} works inside your hospital —{" "}
                <Link href="/book-demo" className="font-medium underline underline-offset-2" style={{ color }}>
                  book a private demo
                </Link>
                .
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Use Cases ────────────────────────────────────────── */}
        <section className="section-py bg-[var(--bg)]">
          <div className="container-wide px-edge">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <p className="type-mono mb-3" style={{ color }}>Who it&apos;s for</p>
                <h2 className="type-h2 text-[var(--text)] mb-6 [text-wrap:balance]">
                  Designed for organizations where precision matters.
                </h2>
                <p className="type-body-lg text-[var(--text-muted)]">
                  {name} is deployed across hospitals of every size — wherever clinical teams need to move faster without sacrificing accuracy.
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="flex flex-col gap-4">
                  {useCases.map((uc, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-start p-5 rounded-2xl border"
                      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                    >
                      <div
                        className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: `${color}20` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="type-body text-[var(--text-muted)]">{uc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Accent Banner ─────────────────────────────────────── */}
        <section className="section-py" style={{ background: "var(--dark-navy)" }}>
          <div className="container-wide px-edge text-center">
            <FadeIn>
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
                style={{ background: `${color}20`, border: `1px solid ${color}40` }}
              >
                <Icon className="w-8 h-8" strokeWidth={1.5} style={{ color }} />
              </div>
              <h2
                className="text-[clamp(28px,4vw,52px)] leading-tight tracking-tight text-white mb-5 max-w-2xl mx-auto [text-wrap:balance]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ready to deploy{" "}
                <span className="italic" style={{ color }}>
                  {name}
                </span>
                ?
              </h2>
              <p className="type-body-lg text-white/50 max-w-lg mx-auto mb-8">
                Go live in 1–2 weeks with zero disruption to existing workflows. Our implementation team handles everything.
              </p>
              <Link href="/book-demo" className="btn btn-primary-lg">
                Book a Demo
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
