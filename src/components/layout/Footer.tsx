import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  Platform: [
    { label: "Platform Overview", href: "/platform" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Integrations", href: "/platform#integrations" },
    { label: "Security", href: "/platform#security" },
  ],
  "AI Agents": [
    { label: "Patient Registration", href: "/agents/patient-registration" },
    { label: "Doctor AI Agent", href: "/agents/doctor-ai" },
    { label: "Investigation Agent", href: "/agents/investigation" },
    { label: "Billing & Revenue", href: "/agents/billing" },
    { label: "Hospital Operations", href: "/agents/operations" },
    { label: "AI Analytics", href: "/agents/analytics" },
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
<h2 className="text-[29px] font-semibold whitespace-nowrap" style={{ fontFamily: "var(--font-playfair)" }}>
              Give your hospital an <span className="italic gradient-text-light">AI workforce.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/book-demo" className="btn btn-primary" style={{ height: "40px", padding: "0 20px", fontSize: "14px" }}>
              Book a Demo
            </Link>
            <Link href="/platform" className="btn btn-glass" style={{ height: "40px", padding: "0 20px", fontSize: "14px" }}>
              See Platform →
            </Link>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-wide pt-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
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
              src="/logo.png"
              alt="Zonov.ai"
              width={110}
              height={32}
              style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1) opacity(0.75)" }}
            />
          </div>
          <p className="type-caption text-white/30 text-center">
            © {new Date().getFullYear()} Zonov.ai. All rights reserved. · Building the AI Operating System for Healthcare.
          </p>
          <div className="flex items-center gap-4">
            {["LinkedIn", "Twitter", "GitHub"].map((s) => (
              <a key={s} href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
