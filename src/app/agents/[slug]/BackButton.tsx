"use client";

import { useRouter } from "next/navigation";

// Goes back to wherever the visitor came from (home orbit, /agents pipeline,
// search, etc.) using browser history. Falls back to /agents when there is no
// in-app history (e.g. the page was opened directly via a shared link).
export default function BackButton({ fallback = "/agents" }: { fallback?: string }) {
  const router = useRouter();

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex w-fit items-center gap-2 type-mono text-white/40 hover:text-white/70 transition-colors mb-8 cursor-pointer"
    >
      ← Back
    </button>
  );
}
