import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import type { LucideIcon } from "lucide-react";
import { ClipboardList, Hourglass, Flame, TrendingDown, Link2, UserRound, MessageSquare } from "lucide-react";

const PROBLEMS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ClipboardList, title: "Drowning in Paperwork", desc: "Care staff lose hours every day to documentation and data entry, instead of time with patients." },
  { icon: Hourglass, title: "Long Waiting Times", desc: "Manual registration and slow processes leave patients waiting far longer than they should." },
  { icon: Flame, title: "Clinician Burnout", desc: "Too much paperwork leaves doctors and nurses exhausted, and many end up quitting." },
  { icon: TrendingDown, title: "Revenue Leakage", desc: "Hospitals lose 15–20% revenue due to billing errors and missed charges." },
  { icon: Link2, title: "Disconnected Systems", desc: "Lab, OPD, pharmacy, and billing don't talk to each other in real time." },
  { icon: UserRound, title: "Staff Shortage", desc: "The world faces a shortage of millions of healthcare workers. AI helps close the gap." },
];

export default function ProblemSection() {
  return (
    <section className="section-py bg-[var(--surface)]">
      <div className="container-wide">
        <FadeIn>
          <h2 className="type-h1 text-[var(--text)] max-w-2xl [text-wrap:balance] mb-16 google-sans-700">
            Healthcare is broken by{" "}
            <span className="italic" style={{ fontFamily: "var(--font-playfair)" }}>
              its own paperwork.
            </span>
          </h2>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((p) => {
            const Icon = p.icon;
            return (
            <FadeInItem key={p.title}>
              <div className="group p-6 rounded-[20px] border border-[var(--border)] bg-white hover:border-[var(--primary)] hover:shadow-lg hover:shadow-blue-50 transition-all duration-300">
                <div className="w-11 h-11 rounded-[12px] bg-[var(--primary-subtle)] flex items-center justify-center text-[var(--primary)] mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--text)] mb-2 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
              </div>
            </FadeInItem>
            );
          })}
        </FadeInStagger>

        {/* Pull quote */}
        <FadeIn delay={0.1}>
          <div className="mt-16 p-8 rounded-[24px] bg-[var(--primary-subtle)] border-l-4 border-[var(--primary)] flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 text-[var(--primary)]"><MessageSquare className="w-9 h-9" strokeWidth={1.5} /></div>
            <div>
              <p className="text-[18px] text-[var(--text)] leading-relaxed italic mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;Most AI isn&rsquo;t built to meet healthcare&rsquo;s standards. Most HIMS only stores data. Zonov.ai actually works, like a digital workforce.&rdquo;
              </p>
              <p className="type-mono text-[var(--primary)]">Arvind Chawla, Founder &amp; CEO</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
