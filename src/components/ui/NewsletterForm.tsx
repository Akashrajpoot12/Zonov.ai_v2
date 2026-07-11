"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <p className="type-body mt-6 inline-flex items-center gap-1.5" style={{ color: "var(--secondary)" }}>
      <Check className="w-4 h-4" strokeWidth={2.5} /> You&apos;re subscribed. We&apos;ll be in touch.
    </p>
  ) : (
    <form
      className="flex gap-3 mt-6 w-full max-w-lg"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
    >
      <input
        type="email"
        placeholder="your@hospital.com"
        required
        className="flex-1 px-4 py-2.5 rounded-lg border type-body"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", color: "var(--text)", outline: "none" }}
      />
      <button type="submit" className="btn btn-primary whitespace-nowrap">Subscribe</button>
    </form>
  );
}
