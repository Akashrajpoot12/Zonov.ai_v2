import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

/* ═══════════════════════════════════════════════════════════════
   CARE SOLUTIONS, gradient header band + a row of tall cards
   (title at top, description at bottom) + a proven-results stat row.
   Light / white theme.
   ═══════════════════════════════════════════════════════════════ */

const SOLUTIONS = [
  {
    title: "Intelligent Patient Intake",
    desc: "Free up front-desk time by capturing registration, history, and insurance details upfront.",
  },
  {
    title: "Clinical Documentation",
    desc: "Turn every consult into structured notes and prescriptions, hands-free, so doctors stay with patients.",
  },
  {
    title: "Diagnostics & Orders",
    desc: "Route lab and imaging orders, track results, and flag critical values in real time.",
  },
  {
    title: "Billing & Revenue",
    desc: "Scrub claims, catch missed charges, and stop revenue leakage before it starts.",
  },
];

export default function CareSolutions() {
  return (
    <section className="relative overflow-hidden section-py bg-[var(--surface)]">
      <div className="container-wide relative z-10">
        {/* Gradient header band + heading */}
        <div className="relative mb-8">
          <div
            aria-hidden
            className="absolute inset-x-0 -top-6 h-[220px] rounded-[24px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(27,79,216,0.09) 0%, rgba(0,180,174,0.05) 45%, transparent 100%)",
            }}
          />
          <FadeIn>
            <div className="relative text-center max-w-2xl mx-auto pt-10">
              <p className="type-mono text-[var(--primary)] mb-4">Solutions</p>
              <h2 className="type-h2 text-[var(--text)] [text-wrap:balance] google-sans-700">
                Expert AI agents for every{" "}
                <span className="italic gradient-text">clinical workflow.</span>
              </h2>
              <p className="type-body text-[var(--text-muted)] mt-4 [text-wrap:pretty]">
                Purpose-built agents that take over the repetitive work at every
                step, from the front desk to final billing.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Cards, title top, description bottom (spacious) */}
        <FadeInStagger
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          stagger={0.08}
        >
          {SOLUTIONS.map((s) => (
            <FadeInItem key={s.title}>
              <div className="h-full min-h-[220px] rounded-[16px] border border-[var(--border)] bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[var(--border-strong)] transition-all">
                <h3 className="text-[16px] font-semibold text-[var(--text)] leading-snug tracking-tight [text-wrap:balance]">
                  {s.title}
                </h3>
                <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed mt-6">
                  {s.desc}
                </p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
