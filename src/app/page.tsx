import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import IntegrationArc from "@/components/sections/IntegrationArc";
import TrustStrip from "@/components/sections/TrustStrip";
import ProblemSection from "@/components/sections/ProblemSection";
import CareSolutions from "@/components/sections/CareSolutions";
// import AgentsOverview from "@/components/sections/AgentsOverview"; // temporarily hidden
import HowItWorks from "@/components/sections/HowItWorks";
import DifferentiatorSection from "@/components/sections/DifferentiatorSection";
import ValueSection from "@/components/sections/ValueSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustInfrastructure from "@/components/sections/TrustInfrastructure";
import CTASection from "@/components/sections/CTASection";
import AiCareModelSection from "@/components/sections/AiCareModelSection";
import FadeIn from "@/components/ui/FadeIn";
export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero, dark navy outer, primary blue middle, white hero inner */}
        <div className="transition-theme bg-[var(--dark-navy)]">
          <div className="hero-band">
            <HeroSection />
          </div>
          <IntegrationArc />
        </div>

        <ProblemSection />
        <CareSolutions />
        {/* Temporarily hidden, "What We Provide" agents pipeline section */}
        {/* <AgentsOverview /> */}
        <HowItWorks />

        <AiCareModelSection />

        <DifferentiatorSection />
        <ValueSection />
        <TestimonialsSection />
        <TrustInfrastructure />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
