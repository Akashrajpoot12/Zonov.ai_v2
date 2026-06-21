import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

interface CaseStudy {
  slug: string;
  name: string;
  location: string;
  beds: string;
  type: string;
  tagline: string;
  challenges: string[];
  agents: { name: string; color: string }[];
  metrics: { value: string; label: string; sub?: string }[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
}

const caseStudies: CaseStudy[] = [
  {
    slug: "sunrise-multispeciality",
    name: "Sunrise Multispeciality Hospital",
    location: "Jaipur, Rajasthan",
    beds: "200 Beds",
    type: "Multispeciality Hospital",
    tagline: "From administrative bottlenecks to a streamlined operation — in under 8 weeks.",
    challenges: [
      "Patient registration took 25 minutes on average, causing long OPD queues and patient dissatisfaction",
      "Manual billing processes with no real-time visibility led to significant procedure-level revenue leakage",
      "Low follow-up compliance — less than 40% of discharged patients returned for follow-up consultations",
      "Staff spent disproportionate time on data entry, leaving little bandwidth for patient-facing work",
      "No centralised reporting made it difficult to identify operational inefficiencies",
    ],
    agents: [
      { name: "Registration Agent", color: "var(--primary)" },
      { name: "Follow-Up Agent", color: "var(--secondary)" },
      { name: "Revenue Agent", color: "var(--purple)" },
    ],
    metrics: [
      { value: "8 min", label: "Registration Time", sub: "Down from 25 minutes" },
      { value: "72%", label: "Less Manual Work", sub: "Across registration & billing" },
      { value: "20%", label: "Revenue Leakage Found", sub: "In first 90-day audit" },
      { value: "31%", label: "Follow-Up Improvement", sub: "More patients returning" },
      { value: "22%", label: "Patient Satisfaction", sub: "Increase in CSAT score" },
    ],
    quote: "Zonov.ai transformed our operational efficiency without increasing manpower.",
    quoteAuthor: "Dr. Rahul Mehta",
    quoteRole: "Medical Superintendent, Sunrise Multispeciality Hospital",
  },
  {
    slug: "metro-heart-institute",
    name: "Metro Heart Institute",
    location: "Delhi, NCR",
    beds: "350 Beds",
    type: "Cardiac Care Hospital",
    tagline: "Giving clinicians their time back — without changing how they work.",
    challenges: [
      "Cardiologists were spending 35–40% of their shift on documentation rather than patient care",
      "Discharge summaries took hours to compile, delaying bed turnover and increasing patient wait times",
      "Critical clinical notes were often incomplete or delayed, creating compliance and handoff risks",
      "Administrative overhead consumed 40% of support staff bandwidth, limiting capacity for growth",
      "No automated system for capturing voice dictations meant documentation errors were common",
    ],
    agents: [
      { name: "Voice Documentation Agent", color: "var(--primary)" },
      { name: "Clinical Workflow Agent", color: "var(--secondary)" },
    ],
    metrics: [
      { value: "60%", label: "Less Documentation Time", sub: "Per clinician per shift" },
      { value: "45%", label: "Faster Discharge", sub: "Reduction in discharge time" },
      { value: "+28%", label: "Doctor Productivity", sub: "More patients seen per day" },
      { value: "40%", label: "Less Admin Work", sub: "For support staff" },
    ],
    quote: "Our clinicians now spend more time with patients instead of screens.",
    quoteAuthor: "Dr. Neha Kapoor",
    quoteRole: "Chief Medical Officer, Metro Heart Institute",
  },
  {
    slug: "carefirst-medical",
    name: "CareFirst Medical Center",
    location: "Bangalore, Karnataka",
    beds: "500 Beds",
    type: "Multispeciality Hospital",
    tagline: "A single AI layer that unified operations across all departments.",
    challenges: [
      "At 500 beds, manual reporting across departments created data silos with no unified view for leadership",
      "Revenue leakage was systemic — unbilled procedures and delayed charge captures cost crores annually",
      "Reporting cycles took 3–4 days, making it impossible to respond to operational issues in real time",
      "Manual data aggregation for board-level dashboards required a full analyst team each quarter",
      "Department heads had no live visibility into bed occupancy, OT utilisation, or billing status",
    ],
    agents: [
      { name: "Revenue Intelligence Agent", color: "var(--primary)" },
      { name: "Analytics Agent", color: "var(--secondary)" },
      { name: "Executive Dashboard", color: "var(--purple)" },
    ],
    metrics: [
      { value: "20%", label: "Revenue Recovered", sub: "Unbilled procedures captured" },
      { value: "55%", label: "Less Manual Reporting", sub: "Across all departments" },
      { value: "35%", label: "Faster Decisions", sub: "With live dashboards" },
      { value: "25%", label: "Operational Efficiency", sub: "Hospital-wide improvement" },
    ],
    quote: "Zonov.ai became our operational command center.",
    quoteAuthor: "Amit Verma",
    quoteRole: "CEO, CareFirst Medical Center",
  },
];

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study — Zonov.ai" };
  return {
    title: `${cs.name} — Zonov.ai Customer Story`,
    description: cs.tagline,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section
          className="noise relative pt-40 pb-24"
          style={{ backgroundColor: "var(--dark-navy)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(27,79,216,0.18) 0%, transparent 70%)",
            }}
          />
          <div className="container-wide relative z-10">
            <FadeIn>
              <Link
                href="/customers"
                className="type-mono inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ← All case studies
              </Link>
              <div className="flex flex-wrap gap-3 mb-6">
                <span
                  className="type-mono text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                >
                  {cs.type}
                </span>
                <span
                  className="type-mono text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                >
                  {cs.beds}
                </span>
                <span
                  className="type-mono text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                >
                  {cs.location}
                </span>
              </div>
              <h1 className="type-display text-white mt-2 max-w-3xl">{cs.name}</h1>
              <p
                className="type-body-lg mt-5 max-w-2xl"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {cs.tagline}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Metrics Bar */}
        <section style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <div className="container-wide">
            <FadeInStagger>
              <div
                className="grid gap-px"
                style={{
                  gridTemplateColumns: `repeat(${cs.metrics.length}, 1fr)`,
                  backgroundColor: "var(--border)",
                }}
              >
                {cs.metrics.map((m) => (
                  <FadeInItem key={m.label}>
                    <div
                      className="flex flex-col items-center justify-center text-center py-10 px-6"
                      style={{ backgroundColor: "var(--surface)" }}
                    >
                      <p
                        className="font-bold tracking-tight"
                        style={{
                          fontFamily: "var(--font-playfair)",
                          fontSize: "clamp(28px, 3.5vw, 44px)",
                          color: "var(--primary)",
                          lineHeight: 1.1,
                        }}
                      >
                        {m.value}
                      </p>
                      <p className="type-body font-semibold mt-2" style={{ color: "var(--text)" }}>{m.label}</p>
                      {m.sub && (
                        <p className="type-caption mt-1" style={{ color: "var(--text-muted)" }}>{m.sub}</p>
                      )}
                    </div>
                  </FadeInItem>
                ))}
              </div>
            </FadeInStagger>
          </div>
        </section>

        {/* Challenge + Implementation */}
        <section className="section-py" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              {/* Challenges */}
              <FadeIn>
                <div>
                  <p className="type-mono mb-4" style={{ color: "var(--primary)" }}>THE CHALLENGE</p>
                  <h2 className="type-h2" style={{ color: "var(--text)" }}>What the hospital was facing</h2>
                  <ul className="mt-8 flex flex-col gap-4">
                    {cs.challenges.map((c, i) => (
                      <li key={i} className="flex gap-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: "var(--primary-subtle)" }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "var(--primary)" }}
                          />
                        </div>
                        <p className="type-body" style={{ color: "var(--text-muted)" }}>{c}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Implementation */}
              <FadeIn delay={0.1}>
                <div>
                  <p className="type-mono mb-4" style={{ color: "var(--secondary)" }}>THE SOLUTION</p>
                  <h2 className="type-h2" style={{ color: "var(--text)" }}>Agents deployed</h2>
                  <div className="mt-8 flex flex-col gap-4">
                    {cs.agents.map((agent) => (
                      <div
                        key={agent.name}
                        className="flex items-center gap-4 p-5 rounded-2xl"
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: agent.color }}
                        />
                        <p className="type-body font-semibold" style={{ color: "var(--text)" }}>{agent.name}</p>
                        <span
                          className="ml-auto type-mono text-xs px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${agent.color} 12%, transparent)`,
                            color: agent.color,
                          }}
                        >
                          Active
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-8 p-6 rounded-2xl"
                    style={{ backgroundColor: "var(--primary-subtle)", border: "1px solid rgba(27,79,216,0.15)" }}
                  >
                    <p className="type-mono text-xs mb-2" style={{ color: "var(--primary)" }}>IMPLEMENTATION</p>
                    <p className="type-body font-semibold" style={{ color: "var(--text)" }}>Live in 6–8 weeks</p>
                    <p className="type-caption mt-1" style={{ color: "var(--text-muted)" }}>
                      Zero downtime to clinical operations. Integrated with existing HIS.
                    </p>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="section-py" style={{ backgroundColor: "var(--dark-navy)" }}>
          <div className="container-wide">
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center">
                <div
                  className="text-8xl leading-none mb-6"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--secondary)", opacity: 0.4 }}
                >
                  &ldquo;
                </div>
                <blockquote
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(22px, 2.8vw, 36px)",
                    fontStyle: "italic",
                    lineHeight: 1.45,
                    color: "rgba(255,255,255,0.92)",
                  }}
                >
                  {cs.quote}
                </blockquote>
                <div className="mt-8 flex flex-col items-center gap-1">
                  <p className="type-body font-semibold text-white">{cs.quoteAuthor}</p>
                  <p className="type-caption" style={{ color: "rgba(255,255,255,0.45)" }}>{cs.quoteRole}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Back link */}
        <section className="py-12" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container-wide">
            <FadeIn>
              <Link
                href="/customers"
                className="type-body font-medium inline-flex items-center gap-2 hover:underline"
                style={{ color: "var(--primary)" }}
              >
                ← Back to all case studies
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
