// Job listings for /careers.
//
// Source of truth is a Google Sheet published as CSV (no API key needed):
//   Sheet → File → Share → Publish to web → choose the sheet, format "CSV" → Publish.
//   Paste that URL into GOOGLE_SHEETS_JOBS_CSV_URL (see .env.local).
//
// Expected columns (first row = headers, order/case flexible):
//   Title | Department | Location | Type | Description | Active
//   - Title is required; a row with no Title is skipped.
//   - Active: "no"/"false" hides a row; anything else (or empty) shows it.
//
// If the env var is unset or the fetch fails, we fall back to the list below,
// so the page always renders. The careers page revalidates hourly, so adding a
// row in the Sheet shows up on the site within the hour — no code change, no deploy.

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

const FALLBACK_JOBS: Job[] = [
  { slug: "senior-full-stack-engineer", title: "Senior Full-Stack Engineer", department: "Engineering", location: "Remote India", type: "Full-time", description: "" },
  { slug: "ai-ml-engineer-clinical-nlp", title: "AI/ML Engineer — Clinical NLP", department: "AI Research", location: "Bangalore", type: "Full-time", description: "" },
  { slug: "product-manager-patient-workflows", title: "Product Manager — Patient Workflows", department: "Product", location: "Remote India", type: "Full-time", description: "" },
  { slug: "clinical-consultant", title: "Clinical Consultant", department: "Healthcare", location: "Delhi / Mumbai", type: "Full-time", description: "" },
  { slug: "enterprise-sales-executive", title: "Enterprise Sales Executive", department: "Sales", location: "Mumbai", type: "Full-time", description: "" },
  { slug: "ux-designer-healthcare", title: "UX Designer — Healthcare", department: "Design", location: "Remote India", type: "Full-time", description: "" },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Minimal RFC-4180-style CSV parser: handles quoted fields, escaped quotes (""),
// and commas / newlines inside quotes. Tolerates CRLF and LF line endings.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export async function getJobs(): Promise<Job[]> {
  const url = process.env.GOOGLE_SHEETS_JOBS_CSV_URL;
  if (!url) return FALLBACK_JOBS;

  try {
    // Revalidate hourly — Sheet edits appear within the hour without a rebuild.
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK_JOBS;

    const rows = parseCsv(await res.text()).filter((r) => r.some((c) => c.trim() !== ""));
    if (rows.length < 2) return FALLBACK_JOBS;

    const headers = rows[0].map((h) => h.trim().toLowerCase());
    const col = (name: string) => headers.indexOf(name);
    const iTitle = col("title");
    const iDept = col("department");
    const iLoc = col("location");
    const iType = col("type");
    const iDesc = col("description");
    const iActive = col("active");
    if (iTitle === -1) return FALLBACK_JOBS;

    const at = (r: string[], i: number) => (i === -1 ? "" : (r[i] || "").trim());

    const jobs: Job[] = [];
    for (const r of rows.slice(1)) {
      const title = at(r, iTitle);
      if (!title) continue;
      const active = at(r, iActive).toLowerCase();
      if (active === "no" || active === "false") continue;
      jobs.push({
        slug: slugify(title),
        title,
        department: at(r, iDept),
        location: at(r, iLoc),
        type: at(r, iType) || "Full-time",
        description: at(r, iDesc),
      });
    }
    return jobs.length ? jobs : FALLBACK_JOBS;
  } catch {
    return FALLBACK_JOBS;
  }
}
