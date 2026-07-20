import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function CTASection() {
  return (
    <section className="section-py bg-[var(--surface)]">
      <div className="container-wide">
        <FadeIn>
          <div className="noise relative rounded-[32px] bg-[var(--dark-navy)] overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center">
            <div className="relative z-10">
              <p className="type-mono text-white/40 mb-5">Get Started Today</p>
              <h2
                className="text-[clamp(28px,4vw,52px)] leading-tight tracking-tight mb-6 [text-wrap:balance] text-white google-sans-700"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Give your hospital an{" "}
                <span className="italic gradient-text-light">AI workforce.</span>
              </h2>
              <p className="type-body-lg text-white/60 max-w-xl mx-auto mb-10">
                Deploy AI agents across registration, documentation, diagnostics, billing, and operations. Go live in 1–2 weeks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/book-demo" className="btn btn-primary-lg">
                  Book a Demo
                </Link>
                <Link href="/platform" className="btn btn-glass" style={{ height: "50px", padding: "0 28px", fontSize: "16px", borderRadius: "var(--radius-md)" }}>
                  See Platform →
                </Link>
              </div>
              <p className="mt-8 text-[12px] text-white/30">
                No long IT projects. No disruption. Live in 1–2 weeks.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
