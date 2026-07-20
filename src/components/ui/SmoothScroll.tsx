"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Respect users who prefer reduced motion, skip smooth scroll entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.32, // higher = snappier, reaches target faster (less "floaty" lag)
      smoothWheel: true,
      wheelMultiplier: 2.3, // each wheel notch travels more distance = feels fast
      touchMultiplier: 2.5,
      // syncTouch omitted on purpose, it hijacks native touch/trackpad and adds lag.
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Late-loading content (images, web fonts, whileInView sections) changes the
    // page height AFTER Lenis first measures it. Without a recompute, Lenis caps
    // scrolling at the stale limit and the page feels "stuck" partway down.
    const recompute = () => lenis.resize();
    window.addEventListener("load", recompute);
    document.fonts?.ready.then(recompute).catch(() => {});
    const settle = window.setTimeout(recompute, 700);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", recompute);
      clearTimeout(settle);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis persists across client-side navigations (it lives in the root layout),
  // but the page content, and its height, changes underneath it. Reset to the
  // top and recompute bounds so scrolling doesn't stick at the previous page's
  // stale position/limit.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    const t = window.setTimeout(() => lenis.resize(), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
