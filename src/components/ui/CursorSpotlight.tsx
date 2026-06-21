"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorSpotlightProps {
  /** Spotlight color (defaults to teal). */
  color?: string;
  /** Diameter of the glow in px. */
  size?: number;
}

/**
 * Soft glow that follows the cursor inside its nearest positioned parent.
 * Drop it as the first child of a `position: relative; overflow: hidden`
 * dark section. It listens on the parent element, so content clicks are
 * never blocked.
 */
export default function CursorSpotlight({
  color = "rgba(0,180,174,0.18)",
  size = 480,
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 150, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 25, mass: 0.4 });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      x.set(e.clientX - rect.left - size / 2);
      y.set(e.clientY - rect.top - size / 2);
    };
    const onLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, size]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
        className="absolute rounded-full will-change-transform"
      />
    </div>
  );
}
