"use client";
import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const variants: Variants = {
  hidden: (y: number) => ({ opacity: 0, y }),
  visible: (y: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  y = 20,
  className,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      custom={y}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container — wraps multiple FadeIn children */
export function FadeInStagger({
  children,
  stagger = 0.1,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

/* Single item for use inside FadeInStagger */
export function FadeInItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Vertical line animation */
export function LineGrow({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{ originY: 0 }}
    />
  );
}
