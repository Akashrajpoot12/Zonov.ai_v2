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
        <DifferentiatorSection />
        <ValueSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
