// Shared security helpers for the public API routes.
//
// NOTE on rate limiting: this is an in-memory, per-instance limiter. On
// serverless (Vercel) each lambda instance has its own Map, so it throttles
// bursts hitting a single instance rather than enforcing a global limit. It
// meaningfully raises the cost of abuse with zero external dependencies; for
// strict global limits pair it with a platform WAF or Upstash Ratelimit.

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  // Opportunistic cleanup so the Map can't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.reset) buckets.delete(k);
  }

  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  }
  b.count++;
  return { ok: true, retryAfter: 0 };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Escape user/model-controlled values before interpolating into HTML (emails).
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Coerce to a trimmed string capped at `max` characters.
export function clampStr(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}
