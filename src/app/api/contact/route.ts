import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit, clientIp, escapeHtml, isValidEmail, clampStr, readJsonLimited } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit, this endpoint sends an email per request.
    const limit = rateLimit(`contact:${clientIp(req)}`, 5, 60_000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    // Job applications may upload a resume file, so they come in as multipart.
    // Everything else stays JSON. Parse accordingly and, for multipart, pull
    // the resume out as an email attachment.
    let body: Record<string, unknown>;
    let resumeAttachment: { filename: string; content: string } | null = null;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const MAX_UPLOAD = 6_000_000; // ~6MB total request (resume PDFs are small)
      const len = Number(req.headers.get("content-length") || 0);
      if (len > MAX_UPLOAD) {
        return NextResponse.json({ error: "Attachment too large. Max 5MB." }, { status: 413 });
      }

      let form: FormData;
      try {
        form = await req.formData();
      } catch {
        return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
      }

      body = {};
      for (const [key, value] of form.entries()) {
        if (typeof value === "string") body[key] = value;
      }

      const file = form.get("resumeFile");
      if (file instanceof File && file.size > 0) {
        const MAX_FILE = 5_000_000; // 5MB
        if (file.size > MAX_FILE) {
          return NextResponse.json({ error: "Resume file too large. Max 5MB." }, { status: 413 });
        }
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (file.type && !allowedTypes.includes(file.type)) {
          return NextResponse.json({ error: "Resume must be a PDF or Word document." }, { status: 415 });
        }
        const buf = Buffer.from(await file.arrayBuffer());
        // Sanitize the filename: keep it readable but strip anything that
        // isn't a word char/dot/dash so it can't break the email headers.
        const safeName = clampStr(file.name, 200).replace(/[^\w.\-]+/g, "_") || "resume.pdf";
        resumeAttachment = { filename: safeName, content: buf.toString("base64") };
      }
    } else {
      // Cap the body so an oversized payload can't be buffered into memory.
      const parsed = await readJsonLimited<Record<string, unknown>>(req, 50_000);
      if (!parsed) {
        return NextResponse.json({ error: "Invalid or oversized request" }, { status: 413 });
      }
      body = parsed;
    }

    // Honeypot: a hidden field real users never fill. If a bot populates it,
    // pretend success but drop the submission silently.
    if (clampStr(body.website, 1) !== "") {
      return NextResponse.json({ ok: true });
    }

    const { phone, hospital, hospitalName, city, beds, hospitalSize, role, message, useCase, preferredTime, agents, resumeLink, linkedin, type, address, education, gradYear, experienceLevel, experience, skills, gender, collegeName, cgpa, tenth, twelfth, github } = body;

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

    // SMTP config. zonov.ai mailboxes are hosted on Hostinger, so we send from a
    // real zonov.ai mailbox: messages are properly authenticated, land in the
    // inbox (not spam), support attachments, and need no DNS changes.
    const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
    const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;

    // No credentials configured yet: log the lead and return success so the
    // visitor still sees a confirmation instead of an error.
    if (!SMTP_USER || !SMTP_PASS) {
      console.log(`[${formType}] ${recipientName} <${recipientEmail}> | ${isJobApplication ? `Position: ${clampStr(role, 160) || "General Application"}` : `Hospital: ${hospitalDisplay}`}`);
      return NextResponse.json({ ok: true });
    }

    // Job applications and contact/demo requests carry different fields, so
    // build a row set tailored to each, keeps the notification email readable.
    const rows: [string, unknown][] = isJobApplication
      ? [
          ["Name", recipientName],
          ["Email", recipientEmail],
          ["Phone", clampStr(phone, 40) || "-"],
          ["Gender", clampStr(gender, 40) || "-"],
          ["Address / City", clampStr(address, 200) || "-"],
          ["Position", clampStr(role, 160) || "General Application"],
          ["College / University", clampStr(collegeName, 200) || "-"],
          ["Education", clampStr(education, 200) || "-"],
          ["Passing Year", clampStr(gradYear, 20) || "-"],
          ["Degree CGPA / %", clampStr(cgpa, 40) || "-"],
          ["10th %", clampStr(tenth, 40) || "-"],
          ["12th %", clampStr(twelfth, 40) || "-"],
          ["Experience Level", clampStr(experienceLevel, 60) || "-"],
          ["Previous Experience", clampStr(experience, 2000) || "-"],
          ["Skills", clampStr(skills, 1000) || "-"],
          ["Resume", [resumeAttachment ? `Attached: ${resumeAttachment.filename}` : null, clampStr(resumeLink, 500) || null].filter(Boolean).join(" • ") || "-"],
          ["LinkedIn", clampStr(linkedin, 500) || "-"],
          ["GitHub / Portfolio", clampStr(github, 500) || "-"],
          ["Message", clampStr(message, 4000) || "-"],
        ]
      : [
          ["Name", recipientName],
          ["Email", recipientEmail],
          ["Phone", clampStr(phone, 40) || "-"],
          ["Hospital", hospitalDisplay || "-"],
          ["City", clampStr(city, 120) || "-"],
          ["Beds", clampStr(beds || hospitalSize, 60) || "-"],
          ["Role", clampStr(role, 160) || "-"],
          ["Preferred Time", clampStr(preferredTime, 120) || "-"],
          ["Agents Interested", clampStr(Array.isArray(agents) ? agents.join(", ") : agents, 500) || "-"],
          ["Message / Use Case", clampStr(message || useCase, 4000) || "-"],
        ];

    // Zonov.ai-branded notification email. Built with table-based layout and
    // inline styles so it renders consistently across email clients (Gmail,
    // Outlook, Apple Mail). The header uses a solid brand color as an Outlook
    // fallback with a gradient layered on top for clients that support it.
    const BLUE = "#1863DE";
    const INK = "#2A2C31";
    const MUTED = "#6B7280";

    const headline = isJobApplication ? "New Job Application" : formType;
    const positionLabel = isJobApplication
      ? clampStr(role, 160) || "General Application"
      : hospitalDisplay || "";

    const detailRows = rows
      .map(
        ([label, value], i) => `
          <tr>
            <td style="padding:11px 20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:${MUTED};width:150px;vertical-align:top;background:${i % 2 ? "#ffffff" : "#f8fafc"};border-bottom:1px solid #eef1f6;">${label}</td>
            <td style="padding:11px 20px;font-size:14px;color:${INK};line-height:1.5;vertical-align:top;background:${i % 2 ? "#ffffff" : "#f8fafc"};border-bottom:1px solid #eef1f6;word-break:break-word;">${escapeHtml(value)}</td>
          </tr>`
      )
      .join("");

    const attachmentCallout = resumeAttachment
      ? `<tr><td style="padding:16px 24px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="padding:13px 16px;background:#e9fbf9;border:1px solid #b9efe9;border-radius:10px;font-size:13px;color:#0f766e;">
              &#128206; <strong>Resume attached:</strong> ${escapeHtml(resumeAttachment.filename)}
            </td>
          </tr></table>
        </td></tr>`
      : "";

    const htmlBody = `
    <div style="margin:0;padding:0;background:#eef1f7;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f7;padding:28px 12px;">
        <tr><td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(24,99,222,.10);font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <tr><td style="background-color:${BLUE};background:linear-gradient(135deg,#1863DE 0%,#1B4FD8 55%,#03C3B6 130%);padding:26px 28px;">
              <div style="font-size:26px;font-weight:800;letter-spacing:-.02em;color:#ffffff;">zonov<span style="color:#7ff0e7;">.ai</span></div>
              <div style="font-size:12px;color:rgba(255,255,255,.85);margin-top:2px;">The Future of Healthcare..Now!</div>
            </td></tr>
            <tr><td style="padding:24px 28px 4px;">
              <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:${BLUE};">${escapeHtml(headline)}</div>
              <div style="font-size:22px;font-weight:800;color:${INK};margin-top:6px;">${escapeHtml(recipientName)}</div>
              ${positionLabel ? `<div style="display:inline-block;margin-top:10px;padding:5px 12px;background:#EBF0FF;border-radius:999px;font-size:13px;font-weight:600;color:${BLUE};">${escapeHtml(positionLabel)}</div>` : ""}
            </td></tr>
            ${attachmentCallout}
            <tr><td style="padding:20px 24px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef1f6;border-radius:12px;overflow:hidden;">
                ${detailRows}
              </table>
            </td></tr>
            <tr><td style="padding:22px 24px 26px;">
              <a href="mailto:${escapeHtml(recipientEmail)}" style="display:inline-block;background:${BLUE};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:10px;">Reply to ${escapeHtml(recipientName)}</a>
              <div style="font-size:12px;color:${MUTED};margin-top:12px;">Or reply directly to <a href="mailto:${escapeHtml(recipientEmail)}" style="color:${BLUE};">${escapeHtml(recipientEmail)}</a></div>
            </td></tr>
            <tr><td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #eef1f6;">
              <div style="font-size:12px;color:#9aa3b2;">Captured automatically via <a href="https://zonov.ai" style="color:${BLUE};text-decoration:none;">zonov.ai</a> &mdash; AI Operating System for Healthcare.</div>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </div>`;

    // Job applications go to the recruiting inbox; other forms to the general
    // inbox. Overridable via env without a code change.
    const toAddress = isJobApplication
      ? process.env.CAREERS_TO || "lavi@zonov.ai"
      : process.env.CONTACT_TO || "hello@zonov.ai";

    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465, // 465 = implicit TLS, 587 = STARTTLS
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        // From must be the authenticated mailbox for the server to accept it.
        from: `"Zonov.ai Website" <${SMTP_USER}>`,
        to: toAddress,
        replyTo: recipientEmail,
        subject: `[${formType}] ${recipientName}, ${isJobApplication ? clampStr(role, 160) || "General Application" : hospitalDisplay || recipientEmail}`,
        html: htmlBody,
        attachments: resumeAttachment
          ? [{ filename: resumeAttachment.filename, content: resumeAttachment.content, encoding: "base64" }]
          : undefined,
      });
    } catch (err) {
      console.error("SMTP send error:", err);
      return NextResponse.json({ error: "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
