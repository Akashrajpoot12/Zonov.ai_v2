"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * True when the user has asked the OS to reduce motion.
 * SSR-safe (assumes motion is allowed on the server) and reacts live
 * if the preference changes. Avoids setState-in-effect.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches, // client snapshot
    () => false // server snapshot: assume motion is allowed
  );
}
