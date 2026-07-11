"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";

interface FormData {
  name: string;
  email: string;
  phone: string;
  hospitalName: string;
  hospitalSize: string;
  currentHIS: string;
  agents: string[];
  preferredTime: string;
  useCase: string;
}

const AGENTS = [
  "OPD Assistant",
  "ICU Scribe",
  "Discharge Planner",
  "Revenue Recovery",
  "Lab Interpreter",
  "Referral Manager",
  "Post-surgery Follow-up",
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors";
const labelClass = "block type-caption text-[var(--text-muted)] mb-2";

export default function BookDemoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    hospitalName: "",
    hospitalSize: "",
    currentHIS: "",
    agents: [],
    preferredTime: "",
    useCase: "",
  });

  function update(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleAgent(agent: string) {
    setFormData((prev) => ({
      ...prev,
      agents: prev.agents.includes(agent)
        ? prev.agents.filter((a) => a !== agent)
        : [...prev.agents, agent],
    }));
  }

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit() {
    if (!formData.name || !formData.email || !formData.phone || !formData.hospitalName) {
      setSubmitError("Please fill in your name, email, phone, and hospital name.");
      return;
    }
    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "book-demo" }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please email us at hello@zonov.ai");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide px-edge text-center">
            <FadeIn>
              <h1 className="type-display text-white mb-4">Book a Demo</h1>
              <p className="type-body-lg text-white/70 max-w-xl mx-auto">
                See Zonov&apos;s AI agents in action. Tell us about your hospital and we&apos;ll tailor the demo to your workflows.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <div className="max-w-2xl mx-auto">
              {submitted ? (
                <FadeIn>
                  <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="type-h1 text-[var(--text)] mb-3">
                      Demo Request Received!
                    </h2>
                    <p className="type-body text-[var(--text-muted)] mb-8">
                      We&apos;ll reach out within 24 hours to confirm your demo.
                    </p>
                    <Link href="/" className="btn btn-primary-lg">
                      Back to Home
                    </Link>
                  </div>
                </FadeIn>
              ) : (
                <div className="bg-white rounded-2xl p-10 shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    {[1, 2, 3].map((step, i) => (
                      <div key={step} className="flex items-center flex-1">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                            step < currentStep
                              ? "bg-[var(--secondary)] text-white"
                              : step === currentStep
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--border)] text-[var(--text-muted)]"
                          }`}
                        >
                          {step < currentStep ? (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            step
                          )}
                        </div>
                        {i < 2 && (
                          <div
                            className={`h-px flex-1 mx-2 transition-colors ${
                              step < currentStep
                                ? "bg-[var(--secondary)]"
                                : "bg-[var(--border)]"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={formData.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="Dr. Ramesh Kumar"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Work Email</label>
                        <input
                          type="email"
                          className={inputClass}
                          value={formData.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@hospital.com"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                          type="tel"
                          className={inputClass}
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Hospital Name</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={formData.hospitalName}
                          onChange={(e) => update("hospitalName", e.target.value)}
                          placeholder="Apollo Hospitals, Delhi"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>Hospital Size</label>
                        <select
                          className={inputClass}
                          value={formData.hospitalSize}
                          onChange={(e) => update("hospitalSize", e.target.value)}
                        >
                          <option value="">Select bed count</option>
                          <option value="<50">&lt;50 beds</option>
                          <option value="50-200">50–200 beds</option>
                          <option value="200-500">200–500 beds</option>
                          <option value="500+">500+ beds</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Current HIS System</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={formData.currentHIS}
                          onChange={(e) => update("currentHIS", e.target.value)}
                          placeholder="e.g. Practo, Medi-EHR, custom"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          AI Agents You&apos;re Interested In
                        </label>
                        <div className="grid grid-cols-2 gap-3 mt-1">
                          {AGENTS.map((agent) => (
                            <label
                              key={agent}
                              className="flex items-center gap-2.5 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-[var(--border)] accent-[var(--primary)]"
                                checked={formData.agents.includes(agent)}
                                onChange={() => toggleAgent(agent)}
                              />
                              <span className="type-body text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                                {agent}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Preferred Demo Date / Time</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={formData.preferredTime}
                          onChange={(e) => update("preferredTime", e.target.value)}
                          placeholder="e.g. Tuesday 3pm IST, any weekday morning"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Specific Use Case to Focus On</label>
                        <textarea
                          className={`${inputClass} resize-none`}
                          rows={5}
                          value={formData.useCase}
                          onChange={(e) => update("useCase", e.target.value)}
                          placeholder="Tell us what matters most to your hospital..."
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-8">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setCurrentStep((s) => s - 1)}
                      >
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    {currentStep < 3 ? (
                      <button
                        type="button"
                        className="btn btn-primary-lg"
                        onClick={() => setCurrentStep((s) => s + 1)}
                      >
                        Next
                      </button>
                    ) : (
                      <>
                        {submitError && <p className="type-caption text-red-500 mr-4">{submitError}</p>}
                        <button
                          type="button"
                          className="btn btn-primary-lg"
                          onClick={handleSubmit}
                          disabled={loading}
                          style={{ opacity: loading ? 0.7 : 1 }}
                        >
                          {loading ? "Submitting..." : "Submit Request"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
