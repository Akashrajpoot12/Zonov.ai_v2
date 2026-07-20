import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import PlatformHero from "@/components/sections/PlatformHero";
import PlatformSteps from "@/components/sections/PlatformSteps";
import IntelligenceStack from "@/components/sections/IntelligenceStack";
import SimulationCascade from "@/components/sections/SimulationCascade";
import PlatformSecurity from "@/components/sections/PlatformSecurity";
import PlatformIntegrations from "@/components/sections/PlatformIntegrations";

export const metadata: Metadata = {
  title: "Platform, Zonov.ai | AI Operating System for Healthcare",
  description: "The all-in-one platform to deploy, train, and monitor AI agents across every hospital workflow. Define → Train → Deploy → Monitor.",
};

export default function PlatformPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <PlatformHero />
        <PlatformSteps />
        <IntelligenceStack />
        <SimulationCascade />
        <PlatformSecurity />
        <PlatformIntegrations />
      </main>
      <Footer />
    </div>
  );
}
