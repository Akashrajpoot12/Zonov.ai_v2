import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import AgentsPipeline from "./AgentsPipeline";

/* Home "What We Provide" section, interactive patient-journey pipeline with
   per-agent live previews (auto-play tour). */
export default function AgentsOverview() {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="container-wide">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
            What We Provide
          </p>
        </FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <FadeIn>
            <h2 className="type-h1 text-[var(--text)] max-w-xl [text-wrap:balance] google-sans-700">
              AI Agents for every stage of{" "}
              <span className="italic gradient-text">hospital operations.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/agents" className="btn btn-ghost whitespace-nowrap flex-shrink-0">
              Explore all agents →
            </Link>
          </FadeIn>
        </div>

        <AgentsPipeline />
      </div>
    </section>
  );
}
