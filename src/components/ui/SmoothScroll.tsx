"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who prefer reduced motion — skip smooth scroll entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.15, // snappy — low latency between wheel input and scroll position
      smoothWheel: true,
      wheelMultiplier: 1.0,
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
