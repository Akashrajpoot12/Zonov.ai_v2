"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER — types `text` out one character at a time when it
   scrolls into view, with a caret that disappears when done.
   JS-driven, so it runs regardless of the OS reduced-motion setting.
   ═══════════════════════════════════════════════════════════════ */

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
  startDelay?: number; // ms before typing begins
  caret?: boolean;
}

export default function Typewriter({
  text,
  className,
  speed = 45,
  startDelay = 150,
  caret = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const started = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= text.length; i++) {
      timers.push(setTimeout(() => setCount(i), startDelay + i * speed));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, text, speed, startDelay]);

  const done = count >= text.length;

  return (
    <span ref={ref} className={className}>
      {/* Full text for SEO + screen readers (visually hidden) */}
      <span className="sr-only">{text}</span>
      {/* Visible text that types out */}
      <span aria-hidden="true">
        {text.slice(0, count)}
        {caret && !done && <span className="tw-caret">|</span>}
      </span>
    </span>
  );
}
