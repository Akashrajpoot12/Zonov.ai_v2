"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Job } from "@/lib/jobs";

/* Filterable open-roles list: department tabs + location dropdown. */
export default function CareerRoles({ jobs }: { jobs: Job[] }) {
  const [dept, setDept] = useState("All");
  const [loc, setLoc] = useState("All");

  const departments = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach((j) => {
      if (j.department) counts[j.department] = (counts[j.department] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [jobs]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.location && set.add(j.location));
    return Array.from(set).sort();
  }, [jobs]);

  const filtered = jobs.filter(
    (j) =>
      (dept === "All" || j.department === dept) &&
      (loc === "All" || j.location === loc)
  );

  const Dot = () => (
    <span className="w-1 h-1 rounded-full bg-[var(--text-dim)] inline-block" />
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {[["All", jobs.length] as [string, number], ...departments].map(
            ([d, c]) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`type-mono text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                  dept === d
                    ? "bg-[var(--text)] text-white border-[var(--text)]"
                    : "bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-strong)]"
                }`}
              >
                {d} ({c})
              </button>
            )
          )}
        </div>
        <select
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          className="type-mono text-[11px] rounded-full border border-[var(--border)] bg-white px-4 py-2 text-[var(--text-muted)] outline-none focus:border-[var(--primary)] cursor-pointer self-start lg:self-auto"
        >
          <option value="All">ALL LOCATIONS</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Roles */}
      <div className="border-t border-[var(--border)]">
        {filtered.map((job) => (
          <Link
            key={job.slug}
            href={`/careers/apply?role=${encodeURIComponent(job.title)}`}
            className="group grid grid-cols-[1fr_auto] sm:grid-cols-[130px_1fr_auto] gap-4 md:gap-6 items-center py-6 border-b border-[var(--border)] hover:bg-[var(--bg)] transition-colors px-3 -mx-3 rounded-lg"
          >
            <span className="hidden sm:inline-flex type-mono text-[10px] px-2.5 py-1 rounded bg-[var(--bg)] text-[var(--text-muted)] w-fit uppercase tracking-wider">
              {job.department || "Team"}
            </span>
            <div className="min-w-0">
              <h3 className="type-h4 text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                {job.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 type-caption text-[var(--text-muted)] mt-1.5">
                {job.location && <span>{job.location}</span>}
                {job.workMode && (<><Dot /><span>{job.workMode}</span></>)}
                {job.type && (<><Dot /><span>{job.type}</span></>)}
                {job.salary && (<><Dot /><span>{job.salary}</span></>)}
                {job.equity && (<><Dot /><span className="text-[var(--secondary)]">{job.equity}</span></>)}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--text-dim)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center type-body text-[var(--text-muted)]">
            No roles match these filters right now.
          </p>
        )}
      </div>
    </div>
  );
}
