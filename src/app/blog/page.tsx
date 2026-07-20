import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import { EVENTS, categoryStyle } from "@/lib/events";
import { MapPin, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Culture",
  description:
    "Life at Zonov.ai: events, milestones, and the moments that shape our team and culture.",
};

export default function BlogPage() {
  const [featured, ...rest] = EVENTS;
  const fStyle = categoryStyle[featured.category];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[var(--bg)] pt-40 pb-16">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-3">LIFE AT ZONOV.AI</p>
              <h1 className="type-display">
                Events, milestones,
                <br />
                <em style={{ fontFamily: "var(--font-playfair)" }}>and our culture.</em>
              </h1>
              <p className="type-body-lg text-[var(--text-muted)] mt-4 max-w-xl">
                A look behind the scenes at Zonov.ai: the events we show up for, the
                milestones we celebrate, and the team building the AI workforce for
                healthcare.
              </p>
            </FadeIn>

            {/* Featured event */}
            <FadeIn delay={0.15}>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-2 rounded-[var(--radius-xl)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] mt-12 hover:shadow-xl transition-shadow"
              >
                <div className="relative min-h-[280px] lg:min-h-[440px] overflow-hidden">
                  <Image
                    src={featured.hero}
                    alt={featured.title}
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="type-mono text-[var(--text-dim)] text-xs">FEATURED</span>
                    <span
                      className="type-mono text-xs inline-block px-3 py-1 rounded-full"
                      style={{ background: fStyle.bg, color: fStyle.color }}
                    >
                      {featured.category}
                    </span>
                  </div>
                  <h2
                    className="text-[var(--text)] leading-tight mb-4"
                    style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(24px, 2.6vw, 36px)" }}
                  >
                    {featured.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 type-caption text-[var(--text-muted)] mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {featured.date}
                    </span>
                    {featured.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {featured.location}
                      </span>
                    )}
                  </div>
                  <p className="type-body text-[var(--text-muted)] [text-wrap:pretty]">
                    {featured.excerpt}
                  </p>
                  <span className="mt-6 type-caption font-semibold text-[var(--primary)] inline-flex items-center gap-1">
                    Read the story
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Remaining events */}
        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide">
            <FadeIn>
              <h2 className="type-h3 mb-2">More from Zonov.ai</h2>
              <p className="type-body text-[var(--text-muted)]">Culture, milestones, and moments.</p>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {rest.map((ev) => {
                const style = categoryStyle[ev.category];
                return (
                  <FadeInItem key={ev.slug}>
                    <Link
                      href={`/blog/${ev.slug}`}
                      className="group flex flex-col h-full rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] bg-white hover:shadow-lg transition-shadow"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={ev.hero}
                          alt={ev.title}
                          fill
                          quality={95}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <span
                          className="type-mono text-xs inline-block px-3 py-1 rounded-full self-start mb-3"
                          style={{ background: style.bg, color: style.color }}
                        >
                          {ev.category}
                        </span>
                        <h3 className="type-h4 mb-2 [text-wrap:balance]">{ev.title}</h3>
                        <p className="type-body text-[var(--text-muted)] flex-1 [text-wrap:pretty]">
                          {ev.excerpt}
                        </p>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
                          <span className="type-caption text-[var(--text-muted)] inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> {ev.date}
                          </span>
                          <span className="type-caption font-semibold text-[var(--primary)] inline-flex items-center gap-1">
                            Read
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </FadeInItem>
                );
              })}
            </FadeInStagger>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
