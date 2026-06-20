import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Careers — Zonov.ai",
  description: "Join the team building the AI layer that runs India's hospitals.",
};

const perks = [
  {
    title: "Remote-first",
    desc: "Work from anywhere in India. We don't believe location determines contribution — outcomes do.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Mission-driven",
    desc: "Every line of code reduces the administrative burden on doctors and gets patients through the door faster.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Competitive comp",
    desc: "Market-rate salaries with ESOP. We want you thinking about the mission, not money.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const jobs = [
  { title: "Senior Full-Stack Engineer", department: "Engineering", location: "Remote India", type: "Full-time" },
  { title: "AI/ML Engineer — Clinical NLP", department: "AI Research", location: "Bangalore", type: "Full-time" },
  { title: "Product Manager — Patient Workflows", department: "Product", location: "Remote India", type: "Full-time" },
  { title: "Clinical Consultant", department: "Healthcare", location: "Delhi / Mumbai", type: "Full-time" },
  { title: "Enterprise Sales Executive", department: "Sales", location: "Mumbai", type: "Full-time" },
  { title: "UX Designer — Healthcare", department: "Design", location: "Remote India", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">

        <section className="bg-[var(--dark-navy)] noise relative pt-44 pb-28 text-center">
          <div className="relative z-10 container-wide">
            <FadeIn>
              <p className="type-mono text-white/40 mb-5">JOIN THE TEAM</p>
              <h1 className="type-display text-white max-w-3xl mx-auto">
                Build the future of
                <br />
                <em style={{ fontFamily: "var(--font-playfair)" }}> healthcare AI.</em>
              </h1>
              <p className="type-body-lg text-white/60 max-w-xl mx-auto mt-6">
                We&apos;re building the AI layer that runs India&apos;s hospitals. Small team, large surface area, and problems nobody has solved before.
              </p>
              <p className="type-caption text-white/20 mt-10">6 open positions below ↓</p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-[var(--text-muted)] mb-8 text-center">WHY ZONOV.AI</p>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {perks.map((perk) => (
                <FadeInItem key={perk.title}>
                  <div className="card-dark h-full">
                    {perk.icon}
                    <h3 className="type-h4 text-white mt-4">{perk.title}</h3>
                    <p className="type-body text-white/50 mt-2">{perk.desc}</p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide">
            <FadeIn>
              <h2 className="type-h2 mb-2">Open positions</h2>
              <p className="type-body text-[var(--text-muted)]">We&apos;re hiring across engineering, product, and go-to-market.</p>
            </FadeIn>
            <FadeInStagger className="mt-10">
              {jobs.map((job) => (
                <FadeInItem key={job.title}>
                  <div className="py-6 flex items-center justify-between gap-4 border-b border-[var(--border)]">
                    <div>
                      <h3 className="type-h4 text-[var(--text)]">{job.title}</h3>
                      <p className="type-caption text-[var(--text-muted)] mt-1">{job.department} · {job.location}</p>
                    </div>
                    <p className="type-mono text-[var(--text-muted)] hidden md:block">{job.type}</p>
                    <a href="mailto:careers@zonov.ai" className="btn btn-ghost shrink-0">Apply Now →</a>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>

            <FadeIn delay={0.2}>
              <div
                className="mt-12 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ background: "var(--primary-subtle)", borderRadius: "var(--radius-lg)" }}
              >
                <div>
                  <h3 className="type-h4">Don&apos;t see your role?</h3>
                  <p className="type-body text-[var(--text-muted)] mt-1">We hire for exceptional people ahead of headcount.</p>
                </div>
                <a href="mailto:careers@zonov.ai" className="btn btn-primary shrink-0">Send Your Resume →</a>
              </div>
            </FadeIn>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
