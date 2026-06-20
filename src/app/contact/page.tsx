"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";

const helpCards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="6" width="24" height="16" rx="3" stroke="var(--primary)" strokeWidth="2"/>
        <path d="M2 10l12 7 12-7" stroke="var(--primary)" strokeWidth="2"/>
      </svg>
    ),
    title: "Book a Demo",
    desc: "See Zonov's AI agents in action with a live walkthrough tailored to your hospital.",
    cta: "Schedule Demo",
    href: "/book-demo",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="var(--primary)" strokeWidth="2"/>
        <path d="M14 8v6l4 4" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Sales Inquiry",
    desc: "Talk to our team about pricing, implementation timelines, and ROI projections.",
    cta: "Contact Sales",
    href: "mailto:hello@zonov.ai",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L26 8v12l-12 6L2 20V8z" stroke="var(--primary)" strokeWidth="2"/>
        <path d="M14 2v24M2 8l12 6 12-6" stroke="var(--primary)" strokeWidth="2"/>
      </svg>
    ),
    title: "Partnership",
    desc: "Explore integration, reseller, or co-development opportunities with us.",
    cta: "Explore Partnership",
    href: "mailto:partnerships@zonov.ai",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">

        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide px-edge text-center">
            <FadeIn>
              <h1 className="type-display text-white">Let&apos;s talk.</h1>
              <p className="type-body-lg text-white/70 mt-4 max-w-xl mx-auto">
                Whether you want a demo, have a question, or want to partner with us.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">
                  <div className="bg-white rounded-[var(--radius-lg)] p-8 shadow-sm">
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "var(--primary-subtle)" }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <h3 className="type-h3 text-[var(--text)]">Message sent!</h3>
                        <p className="type-body text-[var(--text-muted)] max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                        <button type="button" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organization: "", message: "" }); }} className="btn btn-ghost mt-2">Send another message</button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Name</label>
                          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
                        </div>
                        <div>
                          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Email</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@hospital.com" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
                        </div>
                        <div>
                          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Organization</label>
                          <input name="organization" value={form.organization} onChange={handleChange} placeholder="Hospital or clinic name" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors" />
                        </div>
                        <div>
                          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Message</label>
                          <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us what you're looking for..." className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" />
                        </div>
                        {error && <p className="type-caption text-red-500">{error}</p>}
                        <div>
                          <button type="submit" className="btn btn-primary-lg">Send Message</button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="1" y="4" width="18" height="12" rx="2" stroke="var(--primary)" strokeWidth="1.5"/>
                        <path d="M1 7l9 5 9-5" stroke="var(--primary)" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <div>
                      <p className="type-caption text-[var(--text-muted)]">Email</p>
                      <p className="type-body font-medium text-[var(--text)]">hello@zonov.ai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 1C7.24 1 5 3.24 5 6c0 4 5 13 5 13s5-9 5-13c0-2.76-2.24-5-5-5z" stroke="var(--primary)" strokeWidth="1.5"/>
                        <circle cx="10" cy="6" r="2" fill="var(--primary)"/>
                      </svg>
                    </div>
                    <div>
                      <p className="type-caption text-[var(--text-muted)]">Location</p>
                      <p className="type-body font-medium text-[var(--text)]">Bangalore, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="var(--primary)" strokeWidth="1.5"/>
                        <path d="M10 5v5l3 3" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="type-caption text-[var(--text-muted)]">Response time</p>
                      <p className="type-body font-medium text-[var(--text)]">Within 24 hours</p>
                    </div>
                  </div>
                  <div className="border-t border-[var(--border)] pt-5">
                    <p className="type-caption text-[var(--text-muted)]">
                      Your information is kept private and never shared with third parties. We only use it to respond to your inquiry.
                    </p>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </section>

        <section className="bg-white section-py">
          <div className="container-wide px-edge">
            <FadeIn>
              <h2 className="type-h2 text-[var(--text)] mb-10">How can we help?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {helpCards.map((card) => (
                  <div key={card.title} className="card flex flex-col gap-4">
                    {card.icon}
                    <h3 className="type-body font-semibold text-[var(--text)]">{card.title}</h3>
                    <p className="type-body text-[var(--text-muted)] flex-grow">{card.desc}</p>
                    <div>
                      <Link href={card.href} className="btn btn-ghost">
                        {card.cta}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>


      </main>
      <Footer />
    </div>
  );
}
