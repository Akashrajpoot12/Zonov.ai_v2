import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

const PROBLEMS = [
  { icon: "📋", title: "Drowning in Paperwork", desc: "Doctors spend 40–60% of their time on documentation instead of patient care." },
  { icon: "⏳", title: "Long Waiting Times", desc: "Manual registration and processes create 45+ minute patient wait times." },
  { icon: "🔥", title: "Clinician Burnout", desc: "Administrative burden is the #1 reason healthcare staff quit their jobs." },
  { icon: "💸", title: "Revenue Leakage", desc: "Hospitals lose 15–20% revenue due to billing errors and missed charges." },
  { icon: "🔗", title: "Disconnected Systems", desc: "Lab, OPD, pharmacy, and billing don't talk to each other in real time." },
  { icon: "👩‍⚕️", title: "Staff Shortage", desc: "India needs 2.4 million more healthcare workers. AI can fill the gap." },
];

export default function ProblemSection() {
  return (
    <section className="section-py bg-[var(--surface)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            The Problem
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="type-h1 text-[var(--text)] max-w-2xl [text-wrap:balance] mb-4">
            Healthcare is broken by{" "}
            <span className="italic" style={{ fontFamily: "var(--font-playfair)" }}>
              its own paperwork.
            </span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="type-body-lg text-[var(--text-muted)] max-w-xl mb-16">
            Doctors and nurses spend a large portion of their time on paperwork instead of patient care. Zonov.ai fixes this — permanently.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((p) => (
            <FadeInItem key={p.title}>
              <div className="group p-6 rounded-[20px] border border-[var(--border)] bg-white hover:border-[var(--primary)] hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                <div className="w-11 h-11 rounded-[12px] bg-[var(--primary-subtle)] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--text)] mb-2 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* Pull quote */}
        <FadeIn delay={0.1}>
          <div className="mt-16 p-8 rounded-[24px] bg-[var(--primary-subtle)] border-l-4 border-[var(--primary)] flex flex-col md:flex-row gap-6 items-start">
            <div className="text-4xl flex-shrink-0">💬</div>
            <div>
              <p className="text-[18px] text-[var(--text)] leading-relaxed italic mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;Most AI isn&rsquo;t built to meet healthcare&rsquo;s standards. Most HIMS only stores data. Zonov.ai actually works — like a digital workforce.&rdquo;
              </p>
              <p className="type-mono text-[var(--primary)]">Zonov.ai Mission Statement</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
