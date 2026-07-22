"use client";

import { useState } from "react";
import Link from "next/link";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors";

const labelClass = "type-caption text-[var(--text-muted)] block mb-1.5";

const sectionLabel =
  "type-mono text-[var(--text-dim)] text-[11px] mb-4 pb-2 border-b border-[var(--border)]";

export default function ApplyForm({ position }: { position: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    collegeName: "",
    education: "",
    gradYear: "",
    cgpa: "",
    tenth: "",
    twelfth: "",
    experienceLevel: "",
    experience: "",
    skills: "",
    resumeLink: "",
    linkedin: "",
    github: "",
    message: "",
    website: "", // honeypot
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    <div className="bg-white rounded-[var(--radius-lg)] p-6 md:p-8 shadow-sm">
      <div className="mb-8">
        <p className="type-caption text-[var(--text-muted)]">Applying for</p>
        <p className="type-h4 text-[var(--text)]">{position}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Honeypot: hidden from real users, catches form-filling bots */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        {/* Personal details */}
        <div>
          <p className={sectionLabel}>PERSONAL DETAILS</p>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 ..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Address / City</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="City, State" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <p className={sectionLabel}>EDUCATION</p>
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>College / University name</label>
              <input name="collegeName" value={form.collegeName} onChange={handleChange} placeholder="e.g. IIT Delhi" className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Highest qualification</label>
                <input name="education" value={form.education} onChange={handleChange} placeholder="e.g. B.Tech, Computer Science" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Passing / graduation year</label>
                <input name="gradYear" value={form.gradYear} onChange={handleChange} placeholder="e.g. 2024" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Degree CGPA / %</label>
                <input name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="e.g. 8.5 / 85%" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>10th %</label>
                <input name="tenth" value={form.tenth} onChange={handleChange} placeholder="e.g. 90%" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>12th %</label>
                <input name="twelfth" value={form.twelfth} onChange={handleChange} placeholder="e.g. 88%" className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className={sectionLabel}>EXPERIENCE</p>
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Experience level</label>
              <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
                <option value="">Select...</option>
                <option value="Fresher">Fresher</option>
                <option value="Internship">Internship</option>
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1 to 3 years">1 to 3 years</option>
                <option value="3 to 5 years">3 to 5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Previous experience</label>
              <textarea name="experience" value={form.experience} onChange={handleChange} rows={3} placeholder="Company, role, and duration. Mention if it was an internship or full-time." className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        {/* Skills & links */}
        <div>
          <p className={sectionLabel}>SKILLS & LINKS</p>
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Key skills</label>
              <textarea name="skills" value={form.skills} onChange={handleChange} rows={2} placeholder="e.g. React, Python, SQL, communication, sales..." className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Resume link *</label>
              <input name="resumeLink" value={form.resumeLink} onChange={handleChange} placeholder="Google Drive / Dropbox link to your resume (PDF)" className={inputClass} />
              <p className="type-caption text-[var(--text-dim)] mt-1.5">
                Upload your resume to Google Drive or Dropbox and paste a shareable link (set access to &ldquo;anyone with the link&rdquo;).
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>LinkedIn</label>
                <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>GitHub / Portfolio</label>
                <input name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>Why do you want to join? (optional)</label>
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
