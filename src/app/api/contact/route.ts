import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, hospital, hospitalName, city, beds, hospitalSize, role, message, useCase, preferredTime, agents, type } = body;

    const recipientName = name || "";
    const recipientEmail = email || "";
    const hospitalDisplay = hospital || hospitalName || "";
    const formType = type === "book-demo" ? "Book a Demo Request" : "Contact Form";

    if (!recipientEmail || !recipientName) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // Fallback: log and return success (configure RESEND_API_KEY in Vercel env vars)
      console.log(`[${formType}] ${recipientName} <${recipientEmail}> | Hospital: ${hospitalDisplay}`);
      return NextResponse.json({ ok: true });
    }

    const htmlBody = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #1B4FD8; margin-bottom: 4px;">New ${formType}</h2>
        <p style="color: #6B7280; font-size: 14px; margin-bottom: 24px;">Received via zonov.ai</p>
        <table style="width: 100%; border-collapse: collapse;">
          ${[
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
          ].map(([label, value]) => `
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #6B7280; width: 140px; vertical-align: top;">${label}</td>
              <td style="padding: 8px 0; font-size: 14px; color: #111827; vertical-align: top;">${value}</td>
            </tr>
          `).join("")}
        </table>
        <div style="margin-top: 32px; padding: 16px; background: #EBF0FF; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #1B4FD8;">Reply to: <a href="mailto:${recipientEmail}" style="color: #1B4FD8;">${recipientEmail}</a></p>
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
        to: ["hello@zonov.ai"],
        reply_to: recipientEmail,
        subject: `[${formType}] ${recipientName} — ${hospitalDisplay || recipientEmail}`,
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
