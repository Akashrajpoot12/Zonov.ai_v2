import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

const STAKEHOLDERS = [
  {
    icon: "🧑‍⚕️",
    title: "For Patients",
    color: "var(--primary)",
    values: [
      "Faster registration — seconds not minutes",
      "Shorter waiting times",
      "Better follow-ups & reminders",
      "Improved care experience overall",
    ],
  },
  {
    icon: "👨‍⚕️",
    title: "For Doctors",
    color: "var(--secondary)",
    values: [
      "Less documentation burden",
      "Reduced clinician burnout",
      "More time spent with patients",
      "AI-assisted clinical decisions",
    ],
  },
  {
    icon: "🏥",
    title: "For Hospitals",
    color: "var(--purple)",
    values: [
      "Increased operational efficiency",
      "Higher revenue capture (+15–20%)",
      "Lower operational costs",
      "Better compliance & audit trails",
    ],
  },
  {
    icon: "🏛️",
    title: "For Governments",
    color: "#F59E0B",
    values: [
      "Better healthcare delivery at scale",
      "Improved public health monitoring",
      "Digital healthcare transformation",
      "Data-driven policy decisions",
    ],
  },
];

export default function ValueSection() {
  return (
    <section className="section-py bg-[var(--surface)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            The Value We Create
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="type-h1 text-[var(--text)] max-w-2xl [text-wrap:balance] mb-4">
            Better outcomes for{" "}
            <span className="italic gradient-text">everyone in healthcare.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-14">
            When AI handles the administration, every stakeholder wins — patients get faster care, doctors get back their time, hospitals get better margins.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
          {STAKEHOLDERS.map((s) => (
            <FadeInItem key={s.title}>
              <div className="group glass-card gradient-border flex flex-col h-full p-6 hover:shadow-lg transition-all duration-300"
                style={{ "--hover-color": s.color } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `${s.color}15` }}
                >
                  {s.icon}
                </div>
                <h3
                  className="text-[15px] font-semibold mb-4 tracking-tight"
                  style={{ color: s.color }}
                >
                  {s.title}
                </h3>
                <ul className="flex flex-col gap-2.5 mt-auto">
                  {s.values.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-[12px] text-[var(--text-muted)] leading-relaxed">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: s.color }}
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* Mission statement */}
        <FadeIn delay={0.1}>
          <div className="mt-14 grid lg:grid-cols-2 gap-5">
            <div className="p-8 rounded-[24px] bg-[var(--primary-subtle)] border border-[var(--primary)]/20">
              <p className="type-mono text-[var(--primary)] mb-3">Our Mission</p>
              <p className="text-[18px] text-[var(--text)] leading-relaxed italic mb-0" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;To eliminate healthcare inefficiency through AI-powered autonomous agents — giving every healthcare professional an AI workforce so they can spend more time caring for patients.&rdquo;
              </p>
            </div>
            <div className="p-8 rounded-[24px] bg-[var(--dark-navy)] text-white">
              <p className="type-mono text-white/40 mb-3">Our Vision</p>
              <p className="text-[18px] text-white leading-relaxed italic mb-0" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;To build the world&rsquo;s AI Operating System for Healthcare — powering every hospital, clinic, laboratory, and healthcare network with intelligent AI agents.&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
