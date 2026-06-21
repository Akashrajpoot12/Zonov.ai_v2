import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import AgentTree from "@/components/sections/AgentTree";

export const metadata: Metadata = {
  title: "AI Agents — Zonov.ai | One Operating System, Eight Agents",
  description: "One AI operating system, eight specialized agents — covering every hospital workflow from registration to finance.",
};

export default function AgentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="pt-[120px] pb-16 bg-[var(--dark-navy)]">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-white/40 mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-white/20" />
                AI Agents
              </p>
              <h1 className="type-display text-white max-w-3xl [text-wrap:balance] mb-5">
                One operating system.{" "}
                <span className="italic gradient-text-light">Eight agents.</span>
              </h1>
              <p className="type-subtitle text-white/55 max-w-xl">
                Every agent plugs into the same Zonov.ai brain — so your hospital runs as one connected system, not eight disconnected tools.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Agent Tree */}
        <section className="section-py bg-[var(--bg)] overflow-hidden">
          <div className="container-wide">
            <FadeIn>
              <div className="text-center max-w-xl mx-auto mb-14">
                <p className="type-mono text-[var(--primary)] mb-3">The System</p>
                <h2 className="type-h2 text-[var(--text)] [text-wrap:balance]">
                  How the agents{" "}
                  <span className="italic gradient-text">connect.</span>
                </h2>
                <p className="type-body text-[var(--text-muted)] mt-3">
                  Tap any agent to see what it covers. The deeper mechanics, we&apos;ll show you live.
                </p>
              </div>
            </FadeIn>

            <AgentTree />
          </div>
        </section>

        {/* CTA strip */}
        <section className="section-py bg-[var(--surface)]">
          <div className="container-wide text-center">
            <FadeIn>
              <h2 className="type-h2 text-[var(--text)] mb-5 [text-wrap:balance]">
                See the whole system{" "}
                <span className="italic gradient-text">working in your hospital.</span>
              </h2>
              <Link href="/book-demo" className="btn btn-primary-lg">
                Book a Demo
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
