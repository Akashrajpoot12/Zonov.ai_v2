import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp, escapeHtml, isValidEmail, clampStr } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit — this endpoint sends an email per request.
    const limit = rateLimit(`contact:${clientIp(req)}`, 5, 60_000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const body = await req.json();
    const { phone, hospital, hospitalName, city, beds, hospitalSize, role, message, useCase, preferredTime, agents, resumeLink, linkedin, type } = body;

    const recipientName = clampStr(body.name, 120);
    const recipientEmail = clampStr(body.email, 254);
    const hospitalDisplay = clampStr(hospital || hospitalName, 160);
    const isJobApplication = type === "job-application";
    const formType = type === "book-demo"
      ? "Book a Demo Request"
      : isJobApplication
      ? "Job Application"
      : "Contact Form";

    if (!recipientName || !isValidEmail(recipientEmail)) {
      return NextResponse.json({ error: "A valid name and email are required" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // Fallback: log and return success (configure RESEND_API_KEY in Vercel env vars)
      console.log(`[${formType}] ${recipientName} <${recipientEmail}> | ${isJobApplication ? `Position: ${clampStr(role, 160) || "General Application"}` : `Hospital: ${hospitalDisplay}`}`);
      return NextResponse.json({ ok: true });
    }

    // Job applications and contact/demo requests carry different fields, so
    // build a row set tailored to each — keeps the notification email readable.
    const rows: [string, unknown][] = isJobApplication
      ? [
          ["Name", recipientName],
          ["Email", recipientEmail],
          ["Phone", phone || "—"],
          ["Position", clampStr(role, 160) || "General Application"],
          ["Resume", clampStr(resumeLink, 500) || "—"],
          ["LinkedIn / Portfolio", clampStr(linkedin, 500) || "—"],
          ["Message", clampStr(message, 4000) || "—"],
        ]
      : [
          ["Name", recipientName],
          ["Email", recipientEmail],
          ["Phone", phone || "—"],
          ["Hospital", hospitalDisplay || "—"],
          ["City", city || "—"],
          ["Beds", beds || hospitalSize || "—"],
          ["Role", role || "—"],
          ["Preferred Time", preferredTime || "—"],
          ["Agents Interested", agents ? (Array.isArray(agents) ? agents.join(", ") : agents) : "—"],
          ["Message / Use Case", message || useCase || "—"],
        ];

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1B4FD8; margin-bottom: 4px;">New ${formType}</h2>
        <p style="color: #6B7280; font-size: 14px; margin-bottom: 24px;">Received via zonov.ai</p>
        <table style="width: 100%; border-collapse: collapse;">
          ${rows.map(([label, value]) => `
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #6B7280; width: 140px; vertical-align: top;">${label}</td>
              <td style="padding: 8px 0; font-size: 14px; color: #111827; vertical-align: top;">${escapeHtml(value)}</td>
            </tr>
          `).join("")}
        </table>
        <div style="margin-top: 32px; padding: 16px; background: #EBF0FF; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #1B4FD8;">Reply to: <a href="mailto:${escapeHtml(recipientEmail)}" style="color: #1B4FD8;">${escapeHtml(recipientEmail)}</a></p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Zonov.ai Website <noreply@zonov.ai>",
        to: [isJobApplication ? "careers@zonov.ai" : "hello@zonov.ai"],
        reply_to: recipientEmail,
        subject: `[${formType}] ${recipientName} — ${isJobApplication ? clampStr(role, 160) || "General Application" : hospitalDisplay || recipientEmail}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
