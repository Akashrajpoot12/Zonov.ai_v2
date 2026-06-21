import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PlatformHero from "@/components/sections/PlatformHero";
import PlatformSteps from "@/components/sections/PlatformSteps";
import IntelligenceStack from "@/components/sections/IntelligenceStack";
import SimulationCascade from "@/components/sections/SimulationCascade";
import PlatformIntegrations from "@/components/sections/PlatformIntegrations";

export const metadata: Metadata = {
  title: "Platform — Zonov.ai | AI Operating System for Healthcare",
  description: "The all-in-one platform to deploy, train, and monitor AI agents across every hospital workflow. Define → Train → Deploy → Monitor.",
};

export default function PlatformPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PlatformHero />
        <PlatformSteps />
        <IntelligenceStack />
        <SimulationCascade />
        <PlatformIntegrations />
      </main>
      <Footer />
    </div>
  );
}
