"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who prefer reduced motion — skip smooth scroll entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.2,            // higher = snappier, reaches target faster (less "floaty" lag)
      smoothWheel: true,
      wheelMultiplier: 1.6, // each wheel notch travels more distance = feels fast, not sluggish
      touchMultiplier: 2,   // matching quickness for touch
      // NOTE: syncTouch intentionally omitted. It hijacks native touch/trackpad
      // scrolling and adds noticeable latency/jank on precision touchpads and
      // mobile — the main cause of the "delayed / slow" scroll feel.
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // stop the loop so remounts don't stack RAFs
      lenis.destroy();
    };
  }, []);

  return null;
}
