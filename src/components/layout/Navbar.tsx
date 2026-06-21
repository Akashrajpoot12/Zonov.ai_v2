"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Products", href: "/agents" },
  { label: "Customers", href: "/customers" },
  { label: "Guides", href: "/guides" },
  {
    label: "Company",
    href: "/about",
    dropdown: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between h-[76px] px-5 w-full max-w-[1196px] transition-all duration-300 rounded-full ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg shadow-black/8 border border-[var(--border)]"
            : "bg-white/80 backdrop-blur-sm border border-[var(--border-strong)]/60 shadow-md shadow-black/5"
        }`}
        style={{ WebkitBackdropFilter: "blur(12px)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="Zonov.ai home">
          <Image
            src="/logo1.png"
            alt="Zonov.ai — The Future of Healthcare"
            width={140}
            height={40}
            priority
            style={{ height: "70px", width: "auto" }}
          />
        </Link>

        {/* Desktop Nav — absolutely centered */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={link.href} className={`type-nav transition-colors flex items-center gap-1 ${pathname.startsWith(link.href) && link.href !== "/" ? "text-[var(--primary)] font-semibold" : "text-[var(--text-muted)] hover:text-[var(--text)]"}`}>
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-[var(--border)] rounded-[16px] shadow-xl shadow-black/8 py-2 min-w-[200px] z-50"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] transition-colors rounded-lg mx-1"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] opacity-40 flex-shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`type-nav transition-colors relative ${
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                    ? "text-[var(--primary)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {link.label}
                {(link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[var(--primary)]" />
                )}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link href="/book-demo" className="hidden lg:inline-flex items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-[13px] font-medium transition-colors rounded-full px-5 h-[36px]">
            Book a Demo
          </Link>
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-[var(--border)]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 px-3 rounded-lg text-[var(--text)] hover:bg-[var(--bg)] transition-colors text-[15px]"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 mt-1 flex flex-col gap-0.5">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 px-3 rounded-lg text-[13px] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-[var(--border)] mt-2">
                <Link
                  href="/book-demo"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary w-full justify-center"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  );
}
