import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";

const TESTIMONIALS = [
  {
    quote: "Zonov.ai reduced our patient registration time from 12 minutes to under 90 seconds. Our OPD queue has never been shorter.",
    name: "Dr. Priya Sharma",
    role: "Medical Director",
    org: "Apex Multispeciality Hospital, Pune",
    avatar: "PS",
    color: "var(--primary)",
  },
  {
    quote: "The voice-to-prescription feature alone saves me 2 hours every day. I can finally focus on what I trained for — treating patients.",
    name: "Dr. Rajesh Kumar",
    role: "Senior Consultant, Internal Medicine",
    org: "City Care Hospital, Delhi",
    avatar: "RK",
    color: "var(--secondary)",
  },
  {
    quote: "Our billing team recovered significant missed charges in the first month — revenue we never even knew we were losing. The leakage detection is extraordinary.",
    name: "Mr. Anil Mehta",
    role: "CFO",
    org: "Sunshine Hospital Group, Mumbai",
    avatar: "AM",
    color: "var(--purple)",
  },
];

const METRICS = [
  { value: 40, suffix: "%", label: "Reduction in paperwork", icon: "📉", animate: true },
  { value: 90, suffix: "s", label: "Patient registration time", icon: "⚡", animate: true },
  { value: 20, suffix: "%", label: "Avg. revenue leakage recovered", icon: "💰", animate: true },
  { value: 3, suffix: "×", label: "Improvement in follow-up rates", icon: "📈", animate: true },
];

export default function TestimonialsSection() {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--primary)]" />
            Real Results
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="type-h1 text-[var(--text)] max-w-xl [text-wrap:balance] mb-14">
            Healthcare professionals{" "}
            <span className="italic gradient-text">love Zonov.ai.</span>
          </h2>
        </FadeIn>

        {/* Metrics row */}
        <FadeInStagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12" stagger={0.07}>
          {METRICS.map((m) => (
            <FadeInItem key={m.label}>
              <div className="bg-white rounded-[16px] border border-[var(--border)] p-5 text-center">
                <div className="text-2xl mb-2">{m.icon}</div>
                <p
                  className="text-[clamp(26px,3vw,38px)] leading-none tracking-tight mb-1"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--primary)" }}
                >
                  {m.animate && m.value !== null
                    ? <CountUp value={m.value} suffix={m.suffix} />
                    : m.display}
                </p>
                <p className="type-caption text-[var(--text-muted)]">{m.label}</p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>

        {/* Testimonial cards */}
        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-5" stagger={0.09}>
          {TESTIMONIALS.map((t) => (
            <FadeInItem key={t.name}>
              <div className="bg-white rounded-[20px] border border-[var(--border)] p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                {/* Quote mark */}
                <div
                  className="text-[40px] leading-none mb-4"
                  style={{ color: t.color, fontFamily: "Georgia, serif" }}
                >
                  &ldquo;
                </div>
                <p className="text-[14px] text-[var(--text)] leading-relaxed mb-6 flex-grow italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--text)]">{t.name}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{t.role} · {t.org}</p>
                  </div>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
