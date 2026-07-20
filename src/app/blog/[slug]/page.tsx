import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import FadeIn, { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";
import ArticleContent from "./ArticleContent";
import { EVENTS, getEvent, categoryStyle } from "@/lib/events";
import { MapPin, Calendar, Check } from "lucide-react";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = getEvent(slug);
  if (!ev) return { title: "Not Found" };
  return {
    title: { absolute: ev.seoTitle },
    description: ev.metaDescription,
    openGraph: {
      title: ev.seoTitle,
      description: ev.metaDescription,
      images: [ev.hero],
      type: "article",
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = getEvent(slug);

  if (!ev) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="type-h1 mb-4">Event Not Found</h1>
            <Link href="/blog" className="btn btn-primary-lg">Back to Events</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const style = categoryStyle[ev.category];
  const others = EVENTS.filter((e) => e.slug !== slug);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-[var(--dark-navy)] pt-40 pb-28">
          <div className="container-wide max-w-4xl">
            <FadeIn>
              <Link
                href="/blog"
                className="flex w-fit items-center gap-2 type-mono text-white/40 hover:text-white/70 transition-colors mb-8"
              >
                ← Back to Events
              </Link>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-5 type-mono"
                style={{ background: style.bg, color: style.color }}
              >
                {ev.category}
              </span>
              <h1
                className="text-white leading-tight mb-6 [text-wrap:balance]"
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(26px, 4vw, 48px)" }}
              >
                {ev.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 type-mono text-white/45 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {ev.date}
                </span>
                {ev.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {ev.location}
                  </span>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Hero image, pulled up over the header */}
        <div className="container-wide max-w-4xl relative z-10 -mt-20">
          <FadeIn>
            <div className="relative aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={ev.hero}
                alt={ev.title}
                fill
                priority
                quality={95}
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* Content + highlights */}
        <section className="bg-[var(--bg)] pt-16 pb-16">
          <div className="container-wide max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FadeIn>
                  <ArticleContent content={ev.content} />
                </FadeIn>
              </div>

              <div className="lg:col-span-1">
                <FadeIn delay={0.2}>
                  <div
                    className="rounded-2xl p-6 sticky top-28"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <p className="type-mono text-[var(--primary)] mb-4 text-xs">EVENT HIGHLIGHTS</p>
                    <ul className="space-y-3.5">
                      {ev.highlights.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white mt-0.5"
                            style={{ background: "var(--secondary)" }}
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <p className="type-body text-[var(--text-muted)] text-sm leading-relaxed">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* Photo gallery */}
        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide max-w-5xl">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-2">📸 EVENT GALLERY</p>
              <h2 className="type-h3 mb-8">Moments from the event.</h2>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {ev.gallery.map((src, i) => (
                <FadeInItem key={src}>
                  <div
                    className={`relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] ${
                      i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${ev.title} - photo ${i + 1}`}
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 55vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </section>

        {/* More events */}
        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide max-w-5xl">
            <FadeIn>
              <h2 className="type-h3 mb-8">More from Zonov.ai</h2>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((o) => {
                const oStyle = categoryStyle[o.category];
                return (
                  <FadeInItem key={o.slug}>
                    <Link
                      href={`/blog/${o.slug}`}
                      className="group flex gap-4 items-center rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] bg-white p-3 hover:shadow-md transition-shadow"
                    >
                      <div className="relative w-28 h-24 flex-shrink-0 rounded-[var(--radius-md)] overflow-hidden">
                        <Image src={o.hero} alt={o.title} fill quality={90} sizes="120px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span
                          className="type-mono text-[10px] inline-block px-2 py-0.5 rounded-full mb-1.5"
                          style={{ background: oStyle.bg, color: oStyle.color }}
                        >
                          {o.category}
                        </span>
                        <h3 className="type-body font-semibold text-[var(--text)] leading-snug [text-wrap:balance]">
                          {o.title}
                        </h3>
                      </div>
                    </Link>
                  </FadeInItem>
                );
              })}
            </FadeInStagger>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--dark-navy)] section-py">
          <div className="container-wide max-w-3xl text-center">
            <FadeIn>
              <p className="type-mono text-[var(--secondary)] mb-4">JOIN THE JOURNEY</p>
              <h2 className="type-h2 text-white mb-4">Building the future of healthcare AI, together.</h2>
              <p className="type-body-lg text-white/60 mb-8">
                We&apos;re a team that celebrates milestones, learns constantly, and builds
                with purpose. If that sounds like you, we&apos;d love to meet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/careers" className="btn btn-primary-lg">View Careers</Link>
                <Link href="/book-demo" className="btn btn-glass" style={{ height: "50px", padding: "0 28px", fontSize: "16px", borderRadius: "var(--radius-md)" }}>
                  Book a Demo →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
