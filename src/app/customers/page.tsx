import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Customer Stories — Zonov.ai",
  description: "How Indian hospitals recover revenue and deliver better care with Zonov.ai.",
};

const stats = [
  { number: "20+", label: "Hospitals" },
  { number: "4", label: "Cities" },
  { number: "20%+", label: "Revenue Leakage Recovered" },
  { number: "6–8 wks", label: "Avg. Implementation Time" },
];

const customers = [
  {
    initials: "SM",
    name: "Sunrise Multispeciality Hospital",
    city: "Jaipur",
    beds: "200 beds",
    type: "Multispeciality",
    slug: "sunrise-multispeciality",
    quote: "Zonov.ai transformed our operational efficiency without increasing manpower.",
    author: "Dr. Rahul Mehta, Medical Superintendent",
    metric: "72%",
    metricLabel: "Reduction in manual work",
    accent: "var(--primary)",
  },
  {
    initials: "MH",
    name: "Metro Heart Institute",
    city: "Delhi",
    beds: "350 beds",
    type: "Cardiac Care",
    slug: "metro-heart-institute",
    quote: "Our clinicians now spend more time with patients instead of screens.",
    author: "Dr. Neha Kapoor, Chief Medical Officer",
    metric: "60%",
    metricLabel: "Reduction in documentation time",
    accent: "var(--secondary)",
  },
  {
    initials: "CF",
    name: "CareFirst Medical Center",
    city: "Bangalore",
    beds: "500 beds",
    type: "Multispeciality",
    slug: "carefirst-medical",
    quote: "Zonov.ai became our operational command center.",
    author: "Amit Verma, CEO",
    metric: "20%",
    metricLabel: "Revenue leakage recovered",
    accent: "var(--purple)",
  },
];

export default function CustomersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="noise relative pt-40 pb-24" style={{ backgroundColor: "var(--dark-navy)" }}>
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono" style={{ color: "rgba(255,255,255,0.4)" }}>CUSTOMER STORIES</p>
              <h1 className="type-display text-white mt-3">
                Hospitals{" "}
                <span className="gradient-text-light italic">transforming care</span>{" "}
                with Zonov.ai
              </h1>
              <p className="type-body-lg mt-5 max-w-2xl" style={{ color: "rgba(255,255,255,0.6)" }}>
                Real results from Indian hospitals recovering revenue, reducing admin burden, and delivering better patient experiences.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl">
              {stats.map((stat) => (
                <div key={stat.label} className="card-dark rounded-xl p-5 text-center flex flex-col items-center justify-center" style={{ minHeight: "96px" }}>
                  <p className="font-semibold gradient-text-light leading-tight whitespace-nowrap" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", fontFamily: "var(--font-playfair)" }}>{stat.number}</p>
                  <p className="type-caption mt-1.5 text-center" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-py" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container-wide">
            <FadeInStagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                  <FadeInItem key={customer.slug}>
                    <div
                      className="flex flex-col overflow-hidden h-full"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${customer.accent}, var(--secondary))` }} />
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "var(--primary-subtle)" }}
                          >
                            <span className="type-mono font-bold" style={{ color: customer.accent }}>{customer.initials}</span>
                          </div>
                          <div>
                            <h3 className="type-h4 leading-tight" style={{ color: "var(--text)" }}>{customer.name}</h3>
                            <p className="type-caption mt-0.5" style={{ color: "var(--text-muted)" }}>
                              {customer.city} · {customer.beds} · {customer.type}
                            </p>
                          </div>
                        </div>

                        <blockquote
                          className="mt-5 flex-1"
                          style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(15px, 1.4vw, 18px)",
                            fontStyle: "italic",
                            lineHeight: "1.5",
                            color: "var(--text)",
                          }}
                        >
                          <span style={{ color: customer.accent, fontSize: "2.5rem", lineHeight: 1, display: "block", marginBottom: "-0.5rem" }}>
                            &ldquo;
                          </span>
                          {customer.quote}
                        </blockquote>
                        <p className="type-caption mt-3" style={{ color: "var(--text-muted)" }}>— {customer.author}</p>

                        <div
                          className="mt-6 pt-5 flex items-center justify-between"
                          style={{ borderTop: "1px solid var(--border)" }}
                        >
                          <div>
                            <p className="type-h3 font-bold" style={{ color: customer.accent }}>{customer.metric}</p>
                            <p className="type-caption mt-0.5" style={{ color: "var(--text-muted)" }}>{customer.metricLabel}</p>
                          </div>
                          <Link
                            href={`/customers/${customer.slug}`}
                            className="type-caption font-medium hover:underline"
                            style={{ color: customer.accent }}
                          >
                            Read Case Study →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeInItem>
                ))}
              </div>
            </FadeInStagger>
          </div>
        </section>

        <section className="section-py text-center" style={{ backgroundColor: "var(--primary-subtle)" }}>
          <div className="container-wide flex flex-col items-center">
            <FadeIn>
              <h2 className="type-h2">Join these hospitals</h2>
              <p className="type-body-lg mt-4 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
                See how Zonov.ai can recover revenue and reduce administrative load at your hospital.
              </p>
              <Link href="/book-demo" className="btn btn-primary-lg mt-8 inline-block">Book a Demo</Link>
              <p className="type-caption mt-4" style={{ color: "var(--text-muted)" }}>Free assessment included. No commitment required.</p>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
