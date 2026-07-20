import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { getJobs } from "@/lib/jobs";
import CareerRoles from "@/components/sections/CareerRoles";

// Jobs come from a Google Sheet (see src/lib/jobs.ts). Refresh hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the team building the AI layer that runs hospitals worldwide.",
};

const VALUES = [
  {
    title: "Low ego",
    desc: "Politics and territory don't interest you. The best ideas win, regardless of who has them.",
  },
  {
    title: "Direct",
    desc: "You say the hard thing, challenge ideas openly, and commit fully once a decision is made.",
  },
  {
    title: "High agency",
    desc: "You thrive on trust rather than instruction. When you see something broken, you fix it, you don't file a ticket and wait for someone else.",
  },
  {
    title: "Bar of excellence",
    desc: "You hold yourself to a bar most people wouldn't, and you want teammates who do the same.",
  },
  {
    title: "Question everything",
    desc: "You push back on rules that don't make sense and question assumptions that haven't earned their place.",
  },
];

const BENEFITS = [
  "Comprehensive health, dental, and vision insurance",
  "Mental health support and wellness coaching",
  "Flexible wellness stipend for fitness, therapy, or personal growth",
  "Remote-friendly, outcomes over location",
  "Meaningful equity (ESOP) in an early-stage company",
  "Learning budget for courses, books, and conferences",
];

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[var(--surface)] pt-40 pb-16 px-edge">
          <div className="container-wide">
            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-end">
                <h1 className="type-display text-[var(--text)] [text-wrap:balance]">
                  Join us in building the future of{" "}
                  <em style={{ fontFamily: "var(--font-playfair)" }}>healthcare AI.</em>
                </h1>
                <div className="lg:pb-2">
                  <p className="type-body-lg text-[var(--text-muted)] border-l-2 border-[var(--primary)] pl-4">
                    We&apos;re hiring across engineering, AI research, product, and
                    go-to-market. Small team, large surface area, real problems.
                  </p>
                  <a href="#open-roles" className="btn btn-primary mt-6">
                    View Roles
                  </a>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* Culture + Benefits */}
        <section className="bg-[var(--dark-navy)] section-py noise relative overflow-hidden">
          <div className="container-wide relative z-10">
            {/* Values */}
            <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-16">
              <FadeIn>
                <h2
                  className="text-white/70 [text-wrap:balance]"
                  style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
                >
                  Who builds this with us
                </h2>
              </FadeIn>
              <div className="flex flex-col">
                {VALUES.map((v) => (
                  <div key={v.title} className="py-5 border-t border-white/10">
                    <h3
                      className="text-white mb-1.5"
                      style={{ fontFamily: "var(--font-playfair)", fontSize: "20px" }}
                    >
                      {v.title}
                    </h3>
                    <p className="type-body text-white/50 max-w-2xl leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-16 mt-20 md:mt-28">
              <FadeIn>
                <h2
                  className="text-white"
                  style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
                >
                  Benefits
                </h2>
              </FadeIn>
              <ul className="flex flex-col">
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="py-4 border-t border-white/10 flex items-center gap-3 type-body text-white/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Student researchers */}
            <div className="mt-20 md:mt-28 max-w-md">
              <h3
                className="text-white/70 mb-2"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "22px" }}
              >
                Internships & student researchers
              </h3>
              <p className="type-body text-white/50 leading-relaxed">
                We offer placements for students passionate about AI in healthcare.
                Keep an eye on this page for upcoming opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section id="open-roles" className="bg-[var(--surface)] section-py scroll-mt-24 px-edge">
          <div className="container-wide max-w-5xl">
            <FadeIn>
              <h2
                className="text-center text-[var(--text-muted)] [text-wrap:balance] mb-3"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.15 }}
              >
                Human outcomes. Intelligent systems.
                <br className="hidden md:block" /> Built for healthcare.
              </h2>
              <p className="type-mono text-[var(--text-dim)] text-center mb-12">Open Roles</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <CareerRoles jobs={jobs} />
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--bg)] section-py px-edge">
          <div className="container-wide max-w-3xl">
            <FadeIn>
              <h2 className="type-h2 [text-wrap:balance]">Don&apos;t see a perfect fit?</h2>
              <p className="type-body-lg text-[var(--text-muted)] mt-4 max-w-xl">
                We&apos;re always looking for exceptional people who bring unique
                perspectives to hard problems in healthcare. Tell us what you&apos;d
                want to build.
              </p>
              <Link
                href="/careers/apply?role=General%20Application"
                className="btn btn-primary-lg mt-8"
              >
                Get in Touch
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
