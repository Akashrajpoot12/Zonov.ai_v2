"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const STEPS = [
  {
    num: "01",
    name: "Define",
    tagline: "Configure your AI agents",
    desc: "We work with your team to architect each AI agent's knowledge, workflows, and boundaries. Define what the agent knows, how it behaves, and what it can do.",
    tabs: [
      { label: "Agent Persona", content: "Configure the agent's clinical knowledge base, specialty focus, and communication style tailored to your hospital's protocols." },
      { label: "Workflow Rules", content: "Set the rules for how the agent handles edge cases, escalations, and exceptions, so it always behaves predictably." },
      { label: "Integrations", content: "Connect to your existing HIS, EMR, LIS, RIS systems. Zonov.ai agents work alongside your current software, not instead of it." },
      { label: "Compliance", content: "HIPAA, DPDP, ABHA. Set compliance guardrails from day one. The agent will never process data outside defined boundaries." },
    ],
    color: "var(--primary)",
  },
  {
    num: "02",
    name: "Train",
    tagline: "Test on real scenarios",
    desc: "Every agent is stress-tested against thousands of real-world clinical scenarios before going live. We simulate edge cases, handle failures, and iterate until accuracy meets our standards.",
    tabs: [
      { label: "Scenario Testing", content: "Run the agent through 10,000+ clinical scenarios (registration edge cases, billing exceptions, prescription variations) before any patient interaction." },
      { label: "Accuracy Benchmarks", content: "Every agent must meet clinical-grade accuracy standards. We set the bar, measure continuously, and retrain when performance dips." },
      { label: "Staff Simulation", content: "Your clinical staff test the agent in sandbox mode. Their feedback shapes the final configuration before go-live." },
      { label: "Safety Checks", content: "Automatic safety validation: no agent goes live without passing all clinical safety and privacy checks." },
    ],
    color: "var(--secondary)",
  },
  {
    num: "03",
    name: "Deploy",
    tagline: "Go live in 1–2 weeks",
    desc: "Deployment is seamless. Agents integrate with your existing systems through APIs, work across web, mobile, and kiosk interfaces, and start reducing workload from day one.",
    tabs: [
      { label: "API Integration", content: "Connect through our REST API to any existing HIS, EMR, LIS, or billing software. Zero rip-and-replace." },
      { label: "Multi-channel", content: "Deploy on web, mobile app, voice interface, WhatsApp, or dedicated kiosk, wherever your staff and patients interact." },
      { label: "Training Support", content: "We train your staff with hands-on sessions and documentation. Adoption is fast because the agents are intuitive." },
      { label: "Go-live Support", content: "Our team is on-site (virtually) for the first two weeks post-launch to handle any issues in real time." },
    ],
    color: "var(--purple)",
  },
  {
    num: "04",
    name: "Monitor",
    tagline: "Always improving",
    desc: "Every agent action is logged, measured, and analyzed. Real-time dashboards show performance metrics, and our system automatically flags anomalies for human review.",
    tabs: [
      { label: "Real-time Dashboard", content: "See every agent's performance in real time: accuracy rates, tasks completed, time saved, revenue recovered. Full visibility at all times." },
      { label: "Anomaly Detection", content: "If an agent behaves unexpectedly, our system flags it immediately and routes to human review before the patient is affected." },
      { label: "Continuous Learning", content: "Agents learn from new data and improve automatically. Monthly performance reports show measurable improvements over time." },
      { label: "Audit Trails", content: "Complete, immutable audit logs for every agent action, essential for compliance, billing audits, and quality accreditation." },
    ],
    color: "#F59E0B",
  },
];

export default function PlatformSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Scroll-driven step activation */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i);
            setActiveTab(0);
          }
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const step = STEPS[activeStep];

  return (
    <section id="steps" className="bg-[var(--surface)]">
      <div className="container-wide">
        {/* Header */}
        <div className="section-py pb-0">
          <FadeIn>
            <p className="type-mono text-[var(--primary)] mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-[var(--primary)]" />
              How It Works
            </p>
            <h2 className="type-h1 text-[var(--text)] mb-14 [text-wrap:balance] max-w-xl">
              Four steps from idea to{" "}
              <span className="italic gradient-text">live AI agents.</span>
            </h2>
          </FadeIn>
        </div>

        {/* Desktop: sticky sidebar + scrollable steps */}
        <div className="hidden lg:flex gap-10 pb-24">

          {/* LEFT — sticky step navigator */}
          <div className="w-64 flex-shrink-0 self-start sticky top-[100px]">
            <div>
              {/* Progress track */}
              <div className="relative pl-6">
                <div className="absolute left-[2px] top-0 bottom-0 w-[5px] rounded-full bg-[var(--border-strong)]" />
                <div
                  className="absolute left-[2px] top-0 w-[5px] rounded-full bg-[var(--primary)] transition-all duration-500 ease-out"
                  style={{ height: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                />
                <div className="flex flex-col gap-1">
                  {STEPS.map((s, i) => (
                    <button
                      key={s.num}
                      onClick={() => {
                        setActiveStep(i);
                        setActiveTab(0);
                        stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className="relative flex items-center gap-3 px-3 py-3 rounded-[12px] text-left transition-all group"
                    >
                      {/* Dot */}
                      <div
                        className="absolute -left-6 w-[9px] h-[9px] rounded-full border-2 transition-all duration-300 z-10"
                        style={{
                          borderColor: activeStep >= i ? s.color : "var(--border-strong)",
                          background: activeStep === i ? s.color : activeStep > i ? s.color : "white",
                          transform: activeStep === i ? "scale(1.3)" : "scale(1)",
                        }}
                      />
                      <div className={`transition-all duration-200 ${activeStep === i ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`}>
                        <span className="type-mono text-[var(--text-dim)] block mb-0.5 text-[10px]">{s.num}</span>
                        <span className={`text-[14px] font-semibold tracking-tight ${activeStep === i ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}>
                          {s.name}
                        </span>
                      </div>
                      {activeStep === i && (
                        <motion.div
                          layoutId="step-active-bg"
                          className="absolute inset-0 rounded-[12px] -z-10"
                          style={{ background: "var(--primary-subtle)" }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — scrollable step panels */}
          <div className="flex-1 min-w-0 flex flex-col gap-32" ref={sectionRef}>
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="flex flex-col gap-6 min-h-[60vh] justify-center"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="type-mono px-3 py-1 rounded-full text-white text-[11px]"
                      style={{ background: s.color }}
                    >
                      {s.num} — {s.name}
                    </span>
                  </div>
                  <h3 className="type-h2 text-[var(--text)] mb-3">{s.tagline}</h3>
                  <p className="type-body-lg text-[var(--text-muted)] max-w-xl">{s.desc}</p>
                </div>

                {/* Tabs — only shown for active step */}
                <div className="border border-[var(--border)] rounded-[20px] overflow-hidden">
                  <div className="flex border-b border-[var(--border)] overflow-x-auto">
                    {s.tabs.map((tab, ti) => {
                      const isActive = activeStep === i && activeTab === ti;
                      return (
                        <button
                          key={tab.label}
                          onClick={() => { setActiveStep(i); setActiveTab(ti); }}
                          className={`px-5 py-3 text-[13px] font-medium whitespace-nowrap transition-colors flex-shrink-0 relative ${
                            isActive ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text)]"
                          }`}
                        >
                          {tab.label}
                          {isActive && (
                            <motion.div
                              layoutId={`tab-underline-${i}`}
                              className="absolute bottom-0 left-0 right-0 h-[2px]"
                              style={{ background: s.color }}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-6 min-h-[140px] bg-white">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${i}-${activeStep === i ? activeTab : 0}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="type-body text-[var(--text-muted)] leading-relaxed"
                      >
                        {s.tabs[activeStep === i ? activeTab : 0].content}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: click-based (no scroll pinning) */}
        <div className="lg:hidden section-py">
          <div className="flex flex-row gap-2 overflow-x-auto pb-3 mb-8">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                onClick={() => { setActiveStep(i); setActiveTab(0); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-left transition-all whitespace-nowrap flex-shrink-0 border ${
                  activeStep === i
                    ? "bg-[var(--primary-subtle)] border-[var(--primary)]/30"
                    : "bg-white border-[var(--border)] hover:bg-[var(--bg)]"
                }`}
              >
                <span className="type-mono text-[10px] text-[var(--text-dim)]">{s.num}</span>
                <span className={`text-[13px] font-semibold ${activeStep === i ? "text-[var(--text)]" : "text-[var(--text-muted)]"}`}>{s.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <span className="type-mono px-3 py-1 rounded-full text-white text-[11px] self-start" style={{ background: step.color }}>
              {step.num} — {step.name}
            </span>
            <h3 className="type-h2 text-[var(--text)]">{step.tagline}</h3>
            <p className="type-body-lg text-[var(--text-muted)]">{step.desc}</p>
            <div className="border border-[var(--border)] rounded-[20px] overflow-hidden">
              <div className="flex border-b border-[var(--border)] overflow-x-auto">
                {step.tabs.map((tab, ti) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(ti)}
                    className={`px-5 py-3 text-[13px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                      activeTab === ti ? "text-[var(--text)] border-b-2 -mb-px" : "text-[var(--text-muted)]"
                    }`}
                    style={activeTab === ti ? { borderColor: step.color } : {}}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6 min-h-[120px] bg-white">
                <p className="type-body text-[var(--text-muted)] leading-relaxed">{step.tabs[activeTab].content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
