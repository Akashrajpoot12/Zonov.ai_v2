import Link from "next/link";
import Image from "next/image";

type FooterLink = { label: string; href: string; external?: boolean; icon?: "mail" | "linkedin" };
type FooterGroup = { title: string; links: FooterLink[] };

// Three columns, each stacking two groups — amigo-style.
const FOOTER_COLUMNS: FooterGroup[][] = [
  [
    {
      title: "Platform",
      links: [
        { label: "Platform Overview", href: "/platform" },
        { label: "AI Agents", href: "/agents" },
        { label: "Integrations", href: "/integrations" },
        { label: "Security", href: "/platform#security" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Use Cases", href: "/use-cases" },
        { label: "Customer Stories", href: "/customers" },
      ],
    },
  ],
  [
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "/guides" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  [
    {
      title: "Connect",
      links: [
        { label: "Contact Us", href: "mailto:hello@zonov.ai", icon: "mail", external: true },
        { label: "LinkedIn", href: "https://linkedin.com/company/zonovai", icon: "linkedin", external: true },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],
];

function LinkIcon({ icon }: { icon?: "mail" | "linkedin" }) {
  if (icon === "mail")
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  if (icon === "linkedin")
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    );
  return null;
}

function FooterGroupBlock({ group }: { group: FooterGroup }) {
  return (
    <div>
      <p className="type-mono text-white/35 mb-4">{group.title}</p>
      <ul className="flex flex-col gap-3">
        {group.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="type-mono text-white/55 hover:text-white transition-colors flex items-center gap-2"
            >
              <LinkIcon icon={link.icon} />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function Footer() {
  return (
    <footer className="noise relative overflow-hidden bg-[var(--dark-navy)] text-white">
      {/* Background graphics */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full blur-[120px] opacity-[0.13] bg-[var(--primary)]" />
        <div className="absolute -bottom-40 right-10 w-[420px] h-[420px] rounded-full blur-[130px] opacity-[0.1] bg-[var(--purple)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-[0.06] bg-[var(--secondary)]" />
      </div>

      {/* Top CTA band */}
      <div className="border-b border-white/10 relative overflow-hidden z-10">
        {/* Floating 3D panels — decorative background */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          {/* Panel 1 — large, far right */}
          <div style={{
            position: "absolute",
            right: "-40px",
            top: "-30px",
            width: "340px",
            height: "220px",
            background: "linear-gradient(135deg, rgba(96,165,250,0.13) 0%, rgba(124,58,237,0.10) 100%)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            transform: "perspective(800px) rotateY(-18deg) rotateX(8deg)",
            backdropFilter: "blur(2px)",
          }} />
          {/* Panel 2 — medium, overlapping */}
          <div style={{
            position: "absolute",
            right: "160px",
            top: "20px",
            width: "220px",
            height: "150px",
            background: "linear-gradient(135deg, rgba(52,211,153,0.09) 0%, rgba(96,165,250,0.12) 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.07)",
            transform: "perspective(800px) rotateY(-14deg) rotateX(6deg)",
          }} />
          {/* Panel 3 — small accent, bottom right */}
          <div style={{
            position: "absolute",
            right: "60px",
            bottom: "-20px",
            width: "160px",
            height: "100px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(96,165,250,0.08) 100%)",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.06)",
            transform: "perspective(800px) rotateY(-10deg) rotateX(4deg)",
          }} />
          {/* Subtle glow behind panels */}
          <div style={{
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "400px",
            height: "200px",
            background: "radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </div>

        <div className="container-wide py-28 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
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

{/* Links grid + brand column — amigo style */}
      <div className="container-wide pt-28 md:pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 lg:gap-0">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 lg:pr-12">
            <Image
              src="/logo1.png"
              alt="Zonov.ai"
              width={110}
              height={32}
              style={{ height: "85px", width: "auto" }}
            />
            <p
              className="mt-6 text-white/80 max-w-[300px] leading-snug"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "22px" }}
            >
              The AI Operating System for India&rsquo;s hospitals.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-3">
              <a href="https://linkedin.com/company/zonovai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://x.com/zonovai" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com/zonovai" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Three link columns, each with two stacked groups + divider */}
          {FOOTER_COLUMNS.map((groups, i) => (
            <div
              key={i}
              className="flex flex-col gap-10 lg:border-l lg:border-white/10 lg:pl-8"
            >
              {groups.map((group) => (
                <FooterGroupBlock key={group.title} group={group} />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="type-caption text-white/30 text-center sm:text-left">
            © {new Date().getFullYear()} Zonov.ai. All rights reserved. · Made in India 🇮🇳
          </p>
          <p className="type-caption text-white/20 hidden md:block">
            Building the AI Operating System for Healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
}
