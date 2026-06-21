import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { notFound } from "next/navigation";

type AgentData = {
  name: string;
  tagline: string;
  description: string;
  color: string;
  icon: string;
  features: { title: string; desc: string }[];
  metrics: { num: string; label: string }[];
  useCases: string[];
};

const AGENTS: Record<string, AgentData> = {
  "patient-registration": {
    name: "Patient Registration AI",
    tagline: "Zero-friction intake from first contact to first care.",
    description:
      "Automate every step of patient onboarding — from insurance verification and demographic capture to consent forms and queue assignment — so your front desk focuses on people, not paperwork.",
    color: "#1B4FD8",
    icon: "🪪",
    features: [
      {
        title: "Smart Insurance Verification",
        desc: "Real-time eligibility checks across all major payers in under 3 seconds, flagging coverage gaps before the patient walks in.",
      },
      {
        title: "Conversational Intake Forms",
        desc: "AI-guided digital forms that adapt to the patient's answers, reducing form abandonment and capturing richer clinical context.",
      },
      {
        title: "Duplicate MRN Detection",
        desc: "Cross-references name, DOB, and contact details to prevent duplicate records before they enter your EHR.",
      },
      {
        title: "Automated Consent Management",
        desc: "Delivers the right consent bundles via SMS or portal, collects e-signatures, and archives them instantly to the patient record.",
      },
      {
        title: "Queue Intelligence",
        desc: "Routes patients to the correct department, provider, or triage lane based on their chief complaint and appointment type.",
      },
      {
        title: "Multi-language Support",
        desc: "Engages patients in 40+ languages without requiring bilingual staff, ensuring equal access for every community you serve.",
      },
    ],
    metrics: [
      { num: "92%", label: "Reduction in registration errors" },
      { num: "4 min", label: "Average intake time (down from 18)" },
      { num: "99%", label: "Same-day eligibility verification" },
      { num: "3×", label: "Front-desk capacity freed" },
    ],
    useCases: [
      "High-volume emergency and outpatient departments overwhelmed by manual intake",
      "Multi-site networks needing consistent registration across every location",
      "Specialty clinics reducing no-shows through proactive pre-registration workflows",
      "Federally Qualified Health Centers serving diverse, multilingual populations",
    ],
  },

  "doctor-prescription": {
    name: "Doctor Prescription Agent",
    tagline: "Every word captured. Every prescription precise.",
    description:
      "An ambient AI scribe that listens to physician-patient conversations, generates structured SOAP notes in real time, and drafts prescriptions — so doctors spend their time healing, not typing.",
    color: "#00B4AE",
    icon: "🩺",
    features: [
      {
        title: "Ambient Clinical Transcription",
        desc: "Passively listens to the encounter through any device, producing a timestamped transcript with speaker diarization and medical terminology accuracy above 98%.",
      },
      {
        title: "Real-time SOAP Note Generation",
        desc: "Structures the conversation into Subjective, Objective, Assessment, and Plan sections mapped to your EHR template — ready for physician review in under 60 seconds.",
      },
      {
        title: "Intelligent Prescription Drafting",
        desc: "Suggests medication, dosage, and duration based on diagnosis and patient history, with drug-interaction and allergy checks before the physician signs.",
      },
      {
        title: "ICD-10 & CPT Auto-coding",
        desc: "Tags diagnoses and procedures with the correct codes during documentation, removing the coding bottleneck from the clinical workflow.",
      },
      {
        title: "EHR Push Integration",
        desc: "Pushes finalized notes directly into Epic, Oracle Health, or any HL7-compliant system with a single physician approval tap.",
      },
      {
        title: "Physician Feedback Loop",
        desc: "Learns from individual physician corrections over time, personalizing note style and vocabulary to each provider's preferences.",
      },
    ],
    metrics: [
      { num: "73%", label: "Less time on documentation" },
      { num: "98.2%", label: "Transcription accuracy" },
      { num: "2 hrs", label: "Extra patient time per physician/day" },
      { num: "40%", label: "Reduction in after-hours charting" },
    ],
    useCases: [
      "Physicians spending more than 2 hours per day on documentation after clinic hours",
      "High-acuity inpatient units where every minute with the patient matters",
      "Outpatient practices looking to increase daily patient volume without adding staff",
      "Residency programs wanting to reduce trainee administrative burden",
    ],
  },

  investigation: {
    name: "Investigation AI",
    tagline: "From order to insight — at the speed of care.",
    description:
      "Streamline the entire diagnostics loop: intelligent order entry, real-time lab and radiology tracking, AI-assisted result interpretation, and instant delivery to the care team.",
    color: "#8280FF",
    icon: "🔬",
    features: [
      {
        title: "Smart Order Entry",
        desc: "Suggests evidence-based lab and imaging panels based on the clinical presentation, reducing unnecessary orders and missed investigations.",
      },
      {
        title: "Real-time Result Tracking",
        desc: "Live dashboard showing every pending, in-progress, and completed investigation across the patient journey, with automated escalation for critical values.",
      },
      {
        title: "AI-Assisted Radiology Triage",
        desc: "Flags abnormal imaging findings for urgent radiologist review, reducing time-to-read for stroke, PE, and fracture cases.",
      },
      {
        title: "Critical Value Alerts",
        desc: "Automatically notifies the responsible physician via in-app, SMS, or pager when a result crosses a critical threshold — with acknowledgment tracking.",
      },
      {
        title: "Result Interpretation Summaries",
        desc: "Provides plain-language summaries of complex panels and trend analysis, helping clinicians act on data faster.",
      },
      {
        title: "Integrated PACS & LIS Connectivity",
        desc: "Connects to any PACS or LIS via HL7/FHIR, unifying radiology reports and lab results in a single clinical view.",
      },
    ],
    metrics: [
      { num: "55%", label: "Faster critical result notification" },
      { num: "30%", label: "Reduction in duplicate orders" },
      { num: "18 min", label: "Average time saved per investigation cycle" },
      { num: "99.7%", label: "Critical value alert delivery rate" },
    ],
    useCases: [
      "Emergency departments needing sub-30-minute turnaround on critical lab results",
      "Radiology departments managing high imaging volumes with limited radiologist bandwidth",
      "ICUs where real-time trend monitoring can prevent clinical deterioration",
      "Multi-specialty outpatient clinics coordinating complex diagnostic workups",
    ],
  },

  "follow-up": {
    name: "Follow-up AI",
    tagline: "Care that continues long after discharge.",
    description:
      "Proactively engage every patient post-visit with personalized check-ins, medication reminders, and recovery guidance — driving adherence, reducing readmissions, and building lasting loyalty.",
    color: "#06C270",
    icon: "💬",
    features: [
      {
        title: "Automated Post-Discharge Check-ins",
        desc: "Sends personalized SMS, WhatsApp, or voice messages 24, 48, and 72 hours after discharge to monitor recovery and flag deterioration early.",
      },
      {
        title: "Medication Adherence Reminders",
        desc: "Schedules smart reminders tied to the patient's actual prescription regimen, with escalation to the care team if doses are repeatedly missed.",
      },
      {
        title: "Readmission Risk Scoring",
        desc: "Continuously models each patient's readmission probability using vitals, responses, and EHR data, prompting proactive interventions for high-risk patients.",
      },
      {
        title: "Appointment Recall & Rescheduling",
        desc: "Automatically reminds patients of upcoming follow-up appointments and handles rescheduling requests via conversational AI — no call center needed.",
      },
      {
        title: "Patient-Reported Outcomes Collection",
        desc: "Gathers structured PRO data at pre-defined intervals for chronic disease management, clinical trials, and value-based care reporting.",
      },
      {
        title: "Care Gap Identification",
        desc: "Cross-references patient history against clinical guidelines to surface overdue screenings, vaccinations, and preventive care opportunities.",
      },
    ],
    metrics: [
      { num: "34%", label: "Reduction in 30-day readmissions" },
      { num: "87%", label: "Patient engagement rate" },
      { num: "4.8★", label: "Average post-care satisfaction score" },
      { num: "60%", label: "Improvement in medication adherence" },
    ],
    useCases: [
      "Cardiac and surgical units targeting 30-day readmission rate reductions",
      "Chronic disease programs managing diabetes, hypertension, and COPD populations",
      "Value-based care organizations with quality metrics tied to patient outcomes",
      "Primary care practices automating preventive care recall at scale",
    ],
  },

  billing: {
    name: "Billing AI",
    tagline: "Maximize revenue. Minimize denials.",
    description:
      "Automate the full revenue cycle from charge capture to payment posting — with AI that catches coding errors before submission, predicts denial risk, and accelerates appeals.",
    color: "#F59E0B",
    icon: "💰",
    features: [
      {
        title: "Automated Charge Capture",
        desc: "Pulls chargeable events directly from clinical documentation and orders, eliminating missed charges that silently erode revenue.",
      },
      {
        title: "Pre-submission Claim Scrubbing",
        desc: "Validates every claim against payer-specific rules and CMS edits before submission, cutting first-pass denial rates dramatically.",
      },
      {
        title: "Denial Prediction & Prevention",
        desc: "ML models trained on your denial history flag high-risk claims for human review before they leave the building.",
      },
      {
        title: "Intelligent Appeals Drafting",
        desc: "Auto-generates appeal letters with supporting clinical evidence pulled from the patient record, reducing appeals turnaround from weeks to hours.",
      },
      {
        title: "Payment Variance Detection",
        desc: "Compares every EOB against contracted rates and flags underpayments automatically, recovering revenue you didn't know you were losing.",
      },
      {
        title: "Real-time Revenue Dashboard",
        desc: "Live visibility into AR aging, denial trends, payer performance, and collection forecasts — all in a single executive view.",
      },
    ],
    metrics: [
      { num: "28%", label: "Increase in net collections" },
      { num: "67%", label: "Reduction in denial rate" },
      { num: "< 2 days", label: "Average claims submission time" },
      { num: "$1.4M", label: "Average annual revenue recovered per facility" },
    ],
    useCases: [
      "Health systems losing significant revenue to preventable claim denials",
      "Mid-size practices without dedicated revenue cycle management staff",
      "Multi-specialty groups seeking consistent coding quality across all providers",
      "Hospital CFOs needing real-time visibility into revenue cycle performance",
    ],
  },

  operations: {
    name: "Operations AI",
    tagline: "Run your hospital like a precision machine.",
    description:
      "Optimize scheduling, bed management, and staff allocation in real time — so every resource is in the right place at the right time, and your hospital runs at peak efficiency every day.",
    color: "#EC4899",
    icon: "⚙️",
    features: [
      {
        title: "Intelligent Bed Management",
        desc: "Predicts admissions and discharges up to 12 hours ahead, enabling proactive bed assignments and eliminating ED boarding.",
      },
      {
        title: "Smart Staff Scheduling",
        desc: "Generates optimized rosters that match staffing levels to predicted patient volumes, reducing overtime costs and agency spend.",
      },
      {
        title: "OR Utilization Optimization",
        desc: "Analyzes historical case times and surgeon patterns to fill schedule gaps, increase block utilization, and add profitable cases.",
      },
      {
        title: "Predictive Demand Forecasting",
        desc: "Models patient volume 7–30 days out using seasonal trends, local events, and historical data to inform resource planning.",
      },
      {
        title: "Patient Flow Command Center",
        desc: "Real-time visibility into every patient, bed, and staff member across the facility — in a single operational dashboard.",
      },
      {
        title: "Automated Escalation Protocols",
        desc: "Triggers capacity alerts and escalation workflows automatically when census thresholds are crossed, keeping leadership ahead of surges.",
      },
    ],
    metrics: [
      { num: "22%", label: "Increase in OR utilization" },
      { num: "3.1 hrs", label: "Reduction in average ED boarding time" },
      { num: "18%", label: "Decrease in agency staffing spend" },
      { num: "95%", label: "Bed assignment accuracy" },
    ],
    useCases: [
      "Health systems struggling with chronic ED overcrowding and boarding",
      "Surgical services trying to maximize OR throughput and block utilization",
      "CNOs looking to replace manual scheduling with demand-driven staffing",
      "Multi-hospital networks needing coordinated capacity management",
    ],
  },

  pharmacy: {
    name: "Pharmacy Agent",
    tagline: "Near-expiry alerts. Zero wastage.",
    description: "Keep your pharmacy running at zero waste — with AI that tracks stock, alerts on near-expiry medicines, and auto-reorders before shortages hit.",
    color: "#059669",
    icon: "💊",
    features: [
      { title: "Near-expiry Medicine Alerts", desc: "Automatically flags medicines approaching expiry with enough lead time to redistribute or return stock." },
      { title: "Smart Inventory Management", desc: "Real-time stock visibility across all pharmacy locations with automated reorder triggers." },
      { title: "Dispensing Error Prevention", desc: "Cross-checks prescriptions against available stock and patient allergies before dispensing." },
      { title: "Controlled Substance Tracking", desc: "Audit trail for every controlled substance movement — from receipt to dispensing." },
      { title: "Supplier Integration", desc: "Auto-raises purchase orders with preferred suppliers when stock falls below threshold." },
      { title: "Cost Optimization", desc: "Identifies generic substitution opportunities and highlights high-cost prescribing patterns." },
    ],
    metrics: [
      { num: "0%", label: "Expiry wastage after deployment" },
      { num: "30%", label: "Reduction in pharmacy costs" },
      { num: "99%", label: "Dispensing accuracy rate" },
      { num: "2×", label: "Faster stock replenishment" },
    ],
    useCases: [
      "Hospital pharmacies losing revenue to preventable medicine wastage",
      "Multi-location hospital chains needing centralized pharmacy oversight",
      "Facilities managing high volumes of controlled substances",
      "Pharmacies wanting to reduce manual stock reconciliation effort",
    ],
  },

  ipd: {
    name: "IPD Agent",
    tagline: "Nursing handovers. Mistreatment alerts.",
    description: "Digitize every nursing handover and monitor in-patient care quality in real time — so no critical information is lost between shifts and no patient goes unnoticed.",
    color: "#D97706",
    icon: "🛏️",
    features: [
      { title: "Structured Nursing Handover", desc: "Replaces verbal shift handovers with a structured digital protocol — capturing vitals, pending tasks, and care notes for every patient." },
      { title: "Mistreatment & Neglect Alerts", desc: "AI monitors care delivery patterns and flags anomalies that indicate potential patient neglect or mistreatment in real time." },
      { title: "Automated Care Plan Tracking", desc: "Tracks adherence to prescribed care plans and alerts nursing staff to missed interventions or overdue assessments." },
      { title: "Patient Fall Risk Monitoring", desc: "Continuously scores fall risk based on medications, mobility, and vitals — triggering preventive protocols for high-risk patients." },
      { title: "Ward Round Support", desc: "Prepares structured patient summaries for ward rounds, reducing preparation time and ensuring no case is overlooked." },
      { title: "Nursing Staff Workload Balancing", desc: "Distributes patient assignments based on acuity and nurse capacity to prevent overload and ensure consistent care quality." },
    ],
    metrics: [
      { num: "100%", label: "Handover completion rate" },
      { num: "60%", label: "Reduction in care plan deviations" },
      { num: "40%", label: "Fewer patient falls" },
      { num: "15 min", label: "Saved per nurse per shift on handovers" },
    ],
    useCases: [
      "IPD wards with high patient-to-nurse ratios and frequent handover errors",
      "Hospitals with accreditation requirements around nursing documentation",
      "Facilities looking to reduce patient safety incidents and adverse events",
      "Multi-ward hospitals needing real-time visibility into in-patient care quality",
    ],
  },

  ot: {
    name: "OT Agent",
    tagline: "OT scheduling, monitoring and emergency management.",
    description: "Eliminate OT delays and conflicts with AI-powered scheduling, real-time monitoring, and intelligent emergency case insertion — so your operation theatres run at maximum utilization.",
    color: "#0D1F3C",
    icon: "🏥",
    features: [
      { title: "AI-powered OT Scheduling", desc: "Optimizes surgery schedules across all OTs based on surgeon availability, equipment, and case complexity — filling gaps automatically." },
      { title: "Real-time OT Monitoring", desc: "Live dashboard showing every OT's current status, case progress, and expected completion time — visible to surgeons, anaesthetists, and coordinators." },
      { title: "Emergency Case Management", desc: "Intelligently inserts emergency cases into the schedule with minimal disruption to elective cases." },
      { title: "Pre-op Checklist Automation", desc: "Ensures all pre-operative requirements are completed before the patient enters OT, reducing last-minute cancellations." },
      { title: "Anaesthesia Coordination", desc: "Syncs OT schedule with anaesthesia team availability and pre-assessment completion status." },
      { title: "OT Utilization Analytics", desc: "Tracks block utilization, case cancellations, turnover times, and surgeon performance to drive continuous improvement." },
    ],
    metrics: [
      { num: "30%", label: "Fewer OT delays" },
      { num: "25%", label: "Increase in OT utilization" },
      { num: "50%", label: "Reduction in emergency case conflicts" },
      { num: "20 min", label: "Average turnover time reduction" },
    ],
    useCases: [
      "Surgical hospitals with multiple OTs running concurrent speciality cases",
      "Facilities with high emergency surgery volumes needing dynamic scheduling",
      "Hospital administrators targeting OT utilization above 85%",
      "Multi-speciality chains standardizing OT protocols across all facilities",
    ],
  },

  claim: {
    name: "Claim Agent",
    tagline: "Reduce 20% claim rejection. Recover more revenue.",
    description: "Cut claim rejections by 20% with AI that validates, scrubs, and submits insurance claims with zero manual errors — and automatically manages appeals for denied claims.",
    color: "#7C3AED",
    icon: "📋",
    features: [
      { title: "Pre-submission Claim Scrubbing", desc: "Validates every claim against payer-specific rules before submission, eliminating the most common rejection reasons." },
      { title: "Auto-coding from Clinical Notes", desc: "Extracts ICD-10 and procedure codes directly from clinical documentation, reducing manual coding errors." },
      { title: "Rejection Analysis & Prevention", desc: "Learns from your rejection history to flag high-risk claims for review before they are submitted." },
      { title: "Automated Appeal Generation", desc: "Drafts appeal letters with supporting clinical evidence for denied claims — reducing appeals turnaround from weeks to hours." },
      { title: "Payer-specific Rule Engine", desc: "Maintains an up-to-date library of payer rules across all major insurers and TPAs to ensure compliant submissions." },
      { title: "Real-time Claims Dashboard", desc: "Live visibility into submission status, rejection rates, pending appeals, and collections by payer." },
    ],
    metrics: [
      { num: "20%", label: "Reduction in claim rejections" },
      { num: "70%", label: "Faster appeal resolution" },
      { num: "99%", label: "First-pass claim accuracy" },
      { num: "3×", label: "Faster claims processing" },
    ],
    useCases: [
      "Hospitals with high TPA rejection rates eating into collections",
      "Cashless empanelled hospitals needing faster claim turnaround",
      "Billing teams overwhelmed by manual coding and rejection management",
      "CFOs needing real-time visibility into claims performance by payer",
    ],
  },

  finance: {
    name: "Finance Agent",
    tagline: "20% revenue leakage reduced. Per-patient P&L.",
    description: "Stop revenue leakage and start managing every patient as a profit centre — with real-time financial dashboards, per-patient P&L tracking, and AI-driven cost optimization.",
    color: "#1B4FD8",
    icon: "💰",
    features: [
      { title: "Revenue Leakage Detection", desc: "Identifies unbilled procedures, missed charges, and billing gaps in real time — recovering revenue before it is lost." },
      { title: "Per-patient P&L Tracking", desc: "Calculates the full cost and revenue for every patient encounter, enabling true per-patient profitability analysis." },
      { title: "Real-time Financial Dashboards", desc: "Live visibility into revenue, costs, EBITDA, and cash flow — broken down by department, doctor, and payer." },
      { title: "Budget vs Actuals Monitoring", desc: "Tracks departmental spending against budget in real time and alerts finance teams to variances early." },
      { title: "Predictive Revenue Forecasting", desc: "Models next 30/60/90-day revenue based on current census, payer mix, and seasonal trends." },
      { title: "Cost Reduction Intelligence", desc: "Identifies high-cost outliers in supplies, staffing, and procedures and benchmarks them against best-in-class peers." },
    ],
    metrics: [
      { num: "20%", label: "Revenue leakage recovered" },
      { num: "100%", label: "Per-patient P&L visibility" },
      { num: "40%", label: "Faster month-end close" },
      { num: "15%", label: "Average cost reduction" },
    ],
    useCases: [
      "Hospital CFOs needing real-time financial performance visibility",
      "Multi-speciality chains wanting per-department and per-doctor P&L analysis",
      "Hospitals struggling with unexplained revenue shortfalls",
      "Finance teams spending weeks on manual month-end reporting",
    ],
  },

  analytics: {
    name: "Analytics AI",
    tagline: "Intelligence that drives every decision.",
    description:
      "Transform your clinical and operational data into actionable intelligence — with automated reporting, predictive models, and natural-language queries that put insights in every leader's hands.",
    color: "#1B4FD8",
    icon: "📊",
    features: [
      {
        title: "Natural Language Data Queries",
        desc: "Ask any question about your hospital in plain English and get an accurate, chart-backed answer in seconds — no SQL, no waiting for the analytics team.",
      },
      {
        title: "Automated Quality Reporting",
        desc: "Generates CMS, Joint Commission, and payer quality reports automatically, eliminating hundreds of hours of manual abstraction per year.",
      },
      {
        title: "Population Health Dashboards",
        desc: "Surfaces chronic disease prevalence, care gap rates, and risk stratification across your patient population for proactive intervention.",
      },
      {
        title: "Predictive Clinical Models",
        desc: "Deploys pre-built and custom ML models for sepsis prediction, length-of-stay forecasting, and readmission risk — directly in the clinical workflow.",
      },
      {
        title: "Financial Intelligence",
        desc: "Connects clinical outcomes to financial performance, enabling service line profitability analysis and cost-per-case benchmarking.",
      },
      {
        title: "Anomaly Detection & Alerting",
        desc: "Continuously monitors KPIs and flags statistically significant deviations before they become patient safety or financial problems.",
      },
    ],
    metrics: [
      { num: "80%", label: "Faster time to insight" },
      { num: "500+ hrs", label: "Annual reporting time saved per facility" },
      { num: "94%", label: "Sepsis prediction model AUC" },
      { num: "1 query", label: "To answer any operational question" },
    ],
    useCases: [
      "CMOs and CNOs needing real-time quality and safety performance visibility",
      "Value-based care leaders managing population health at scale",
      "CFOs requiring service line and payer-mix financial intelligence",
      "Clinical informatics teams replacing manual reporting with automated pipelines",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(AGENTS).map((slug) => ({ slug }));
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  const agent = AGENTS[params.slug];
  if (!agent) notFound();

  const { name, tagline, description, color, icon, features, metrics, useCases } = agent;

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
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
                <span className="text-xl">{icon}</span>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center py-8 px-6 text-center"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <span
                      className="text-[clamp(28px,4vw,44px)] font-bold leading-none mb-2 tracking-tight"
                      style={{ color, fontFamily: "var(--font-playfair)" }}
                    >
                      {m.num}
                    </span>
                    <span className="type-caption text-white/50 leading-snug max-w-[120px]">{m.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Feature Grid ─────────────────────────────────────── */}
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
          </div>
        </section>

        {/* ── Use Cases ────────────────────────────────────────── */}
        <section className="section-py bg-[var(--bg)]">
          <div className="container-wide px-edge">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <p className="type-mono mb-3" style={{ color }}>Who it's for</p>
                <h2 className="type-h2 text-[var(--text)] mb-6 [text-wrap:balance]">
                  Designed for organizations where precision matters.
                </h2>
                <p className="type-body-lg text-[var(--text-muted)]">
                  {name} is deployed across health systems of every size — from community hospitals to academic medical centers — wherever clinical teams need to move faster without sacrificing accuracy.
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
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl mb-8"
                style={{ background: `${color}20`, border: `1px solid ${color}40` }}
              >
                {icon}
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
              <p className="type-body-lg text-white/50 max-w-lg mx-auto">
                Go live in 6–8 weeks with zero disruption to existing workflows. Our implementation team handles everything.
              </p>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
