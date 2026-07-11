import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-[var(--bg)]">
        <div className="container-wide px-edge text-center py-24">
          <p className="type-mono text-[var(--primary)] mb-4">404</p>
          <h1
            className="type-display text-[var(--text)] mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Page not found.
          </h1>
          <p className="type-body-lg text-[var(--text-muted)] max-w-md mx-auto mb-10">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="btn btn-primary-lg">Go Home</Link>
            <Link href="/book-demo" className="btn btn-ghost" style={{ height: "50px", padding: "0 28px", fontSize: "16px", borderRadius: "var(--radius-md)" }}>
              Book a Demo
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { label: "Platform", href: "/platform" },
              { label: "AI Agents", href: "/agents" },
              { label: "Customers", href: "/customers" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="bg-white border border-[var(--border)] rounded-xl p-4 text-center type-body font-medium text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
