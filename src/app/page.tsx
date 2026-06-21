import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ProblemSection from "@/components/sections/ProblemSection";
import AgentsOverview from "@/components/sections/AgentsOverview";
import DifferentiatorSection from "@/components/sections/DifferentiatorSection";
import ValueSection from "@/components/sections/ValueSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import CardBook from "@/components/ui/CardBook";
import FadeIn from "@/components/ui/FadeIn";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero — dark navy outer, primary blue middle, white hero inner */}
        <div className="transition-theme bg-[var(--dark-navy)]">
          <div className="hero-band">
            <HeroSection />
          </div>
          <LogoMarquee />
        </div>

        <ProblemSection />
        <AgentsOverview />

        {/* CardBook — every capability at a glance */}
        <section className="bg-[var(--bg)] section-py overflow-hidden">
          <div className="container-wide px-edge text-center mb-6">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-4">16 CAPABILITIES</p>
              <h2 className="type-h1 text-[var(--text)] max-w-2xl mx-auto [text-wrap:balance]">
                Everything your hospital needs —{" "}
                <span className="gradient-text italic">in one platform.</span>
              </h2>
              <p className="type-body-lg text-[var(--text-muted)] mt-4 max-w-xl mx-auto">
                Drag or tap to explore. Every card is a real workflow Zonov.ai handles today.
              </p>
            </FadeIn>
          </div>
          <CardBook />
        </section>

        <DifferentiatorSection />
        <ValueSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
