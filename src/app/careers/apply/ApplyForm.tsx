"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors";

export default function ApplyForm({ position }: { position: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
    linkedin: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!form.resumeLink.trim() && !form.linkedin.trim()) {
      setError("Please share a resume link or your LinkedIn/portfolio so we can review your background.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: position, type: "job-application" }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email your resume to careers@zonov.ai");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-[var(--radius-lg)] p-8 shadow-sm flex flex-col items-center justify-center text-center py-14 gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "var(--primary-subtle)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="type-h3 text-[var(--text)]">Application received!</h3>
        <p className="type-body text-[var(--text-muted)] max-w-sm">
          Thanks for applying{position !== "General Application" ? ` for ${position}` : ""}. Our team reviews every
          application and will get back to you within a week.
        </p>
        <Link href="/careers" className="btn btn-ghost mt-2">
          View other roles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[var(--radius-lg)] p-8 shadow-sm">
      <div className="mb-6">
        <p className="type-caption text-[var(--text-muted)]">Applying for</p>
        <p className="type-h4 text-[var(--text)]">{position}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="type-caption text-[var(--text-muted)] block mb-1.5">Full name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
          </div>
          <div>
            <label className="type-caption text-[var(--text-muted)] block mb-1.5">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} />
          </div>
        </div>
        <div>
          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 ..." className={inputClass} />
        </div>
        <div>
          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Resume link *</label>
          <input name="resumeLink" value={form.resumeLink} onChange={handleChange} placeholder="Google Drive / Dropbox link to your resume (PDF)" className={inputClass} />
          <p className="type-caption text-[var(--text-dim)] mt-1.5">
            Upload your resume to Google Drive or Dropbox and paste a shareable link (set access to &ldquo;anyone with the link&rdquo;).
          </p>
        </div>
        <div>
          <label className="type-caption text-[var(--text-muted)] block mb-1.5">LinkedIn / Portfolio</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/... (optional)" className={inputClass} />
        </div>
        <div>
          <label className="type-caption text-[var(--text-muted)] block mb-1.5">Why do you want to join? (optional)</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="A few lines about you and why this role..." className={`${inputClass} resize-none`} />
        </div>
        {error && <p className="type-caption text-[var(--error)]">{error}</p>}
        <div>
          <button type="submit" disabled={loading} className="btn btn-primary-lg btn-mobile-full">
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
        <p className="type-caption text-[var(--text-dim)]">
          Prefer email? Send your resume to <a href="mailto:careers@zonov.ai" className="text-[var(--primary)]">careers@zonov.ai</a>.
        </p>
      </form>
    </div>
  );
}
