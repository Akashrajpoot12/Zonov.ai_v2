import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Platform: [
    { label: "Platform Overview", href: "/platform" },
    { label: "All Products", href: "/agents" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Integrations", href: "/platform#integrations" },
    { label: "Security", href: "/platform#security" },
  ],
  Resources: [
    { label: "Customers", href: "/customers" },
    { label: "Guides", href: "/guides" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/book-demo" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--dark-navy)] text-white">
      {/* Top CTA band */}
      <div className="border-b border-white/10">
        <div className="container-wide py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
<h2 className="text-[29px] font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
              Give your hospital an <span className="italic gradient-text-light">AI workforce.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/book-demo" className="btn btn-primary" style={{ height: "40px", padding: "0 20px", fontSize: "14px", borderRadius: "9999px" }}>
              Book a Demo
            </Link>
            <Link href="/platform" className="btn btn-glass" style={{ height: "40px", padding: "0 20px", fontSize: "14px", borderRadius: "9999px" }}>
              See Platform →
            </Link>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-wide pt-14 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="type-mono text-white/30 mb-5">{category}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Image
              src="/logo1.png"
              alt="Zonov.ai"
              width={110}
              height={32}
              style={{ height: "56px", width: "auto" }}
            />
          </div>
          <p className="type-caption text-white/30 text-center">
            © {new Date().getFullYear()} Zonov.ai. All rights reserved. · Building the AI Operating System for Healthcare.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="text-white/30 hover:text-white/70 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X" className="text-white/30 hover:text-white/70 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="GitHub" className="text-white/30 hover:text-white/70 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
