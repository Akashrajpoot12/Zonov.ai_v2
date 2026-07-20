import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/ui/FadeIn";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply, Careers",
  description: "Apply to join the team building the AI layer that runs hospitals worldwide.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const position = (role || "").trim() || "General Application";

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-[var(--dark-navy)] noise relative pt-40 pb-24 text-center">
          <div className="relative z-10 container-wide px-edge">
            <FadeIn>
              <div className="text-left mb-8">
                <Link
                  href="/careers"
                  className="type-mono text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1.5"
                >
                  ← Back to all roles
                </Link>
              </div>
              <p className="type-mono text-white/40 mb-4">APPLY NOW</p>
              <h1 className="type-h1 text-white max-w-3xl mx-auto">
                {position === "General Application" ? (
                  <>Apply to join <em style={{ fontFamily: "var(--font-playfair)" }}>Zonov.ai</em></>
                ) : (
                  <>{position}</>
                )}
              </h1>
              <p className="type-body-lg text-white/60 max-w-xl mx-auto mt-5">
                Tell us a bit about yourself and share your resume. We review every application and reply within a week.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--bg)] section-py">
          <div className="container-wide px-edge max-w-2xl">
            <FadeIn>
              <ApplyForm position={position} />
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
