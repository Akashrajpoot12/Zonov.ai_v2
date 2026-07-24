import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp, escapeHtml, readJsonLimited } from "@/lib/security";

const SYSTEM_PROMPT = `You are the Zonov.ai Assistant, the intelligent AI assistant on Zonov.ai's website. If asked your name, say you are the Zonov.ai assistant. Zonov.ai builds specialized AI agents for hospitals and healthcare organizations worldwide.

## About Zonov.ai
- Mission: Eliminate healthcare inefficiency through AI-powered autonomous agents
- Vision: Become the AI Operating System powering every hospital, clinic, laboratory, and healthcare network globally
- Headquarters: Jaipur, India (with a US office)
- Email: hello@zonov.ai

## Our 8 AI Agents
1. **Registration Agent**, Voice-based patient registration, national health ID / insurance auto-fill, 60% faster OPD
2. **Doctor Prescription Agent**, Voice-to-prescription, voice-to-EMR notes, ICD-10 auto-coding, saves 2 hrs/doctor/day
3. **Investigation Agent**, AI-assisted diagnostic reporting, critical value alerts, LIS/RIS auto-routing, 40% faster results
4. **Pharmacy Agent**, Near-expiry medicine alerts, auto stock reorder, zero expiry wastage
5. **IPD Agent**, Structured nursing handovers, mistreatment alerts, care plan tracking, 100% handover completion
6. **OT Agent**, AI OT scheduling, real-time OT monitoring, emergency case management, 30% fewer OT delays
7. **Claim Agent**, Pre-submission claim scrubbing, auto appeal generation, 20% fewer claim rejections
8. **Finance Agent**, Revenue leakage detection, per-patient P&L tracking, 20% leakage recovered

## Leadership Team
- **Arvind Chawla**, CEO & Founder (Ex-EMS, IPCURE)
- **Dr. Sanjeev Kalra**, CBO & Co-Founder (MD, MDBA, AHCLM, MHA)
- **Dr. Parul Panwar**, Chief Medical Officer (Ex-Manipal Hospital)

## Key Facts
- Implementation time: 2–8 weeks depending on facility size
- Works with existing HIS/HIMS, no need to replace current infrastructure
- Compliant with national digital health standards
- Supports hospitals, multi-specialty chains, clinics, diagnostic centers, labs, insurance companies
- Market: $900B+ global healthcare IT market, $180B AI in healthcare by 2030

## Pricing
- Contact the sales team for pricing, it depends on the number of agents, facility size, and deployment type
- Book a demo at /book-demo for a tailored ROI discussion

## Common Questions
- Does it replace doctors? No, it handles administrative, documentation, and workflow tasks so clinicians focus on patients
- Is patient data secure? Yes, end-to-end encryption, role-based access controls, audit trails, healthcare compliance
- Does it integrate with existing HIMS? Yes, via APIs and HL7/FHIR integration protocols
- Implementation time? 2–8 weeks, most hospitals are live with core agents within the first month

## Website pages (point visitors to the right one)
- /, Home overview
- /platform, How the platform works (raw data → clinical events → insights → agent decisions), security
- /agents, All 8 AI agents; each agent also has its own detail page at /agents/<slug> (e.g. /agents/patient-registration, /agents/doctor-prescription, /agents/investigation, /agents/pharmacy, /agents/ipd, /agents/ot, /agents/claim, /agents/finance)
- /use-cases, Use cases organized by hospital department
- /customers, Customer stories and measured results
- /integrations, Works with existing HIS/HIMS, HL7/FHIR, national health IDs
- /guides, Guides and resources
- /blog, Articles on healthcare AI, automation, and operations
- /about, Company, mission, vision, leadership team
- /careers, Open roles (apply via lavi@zonov.ai)
- /contact, Contact the team
- /book-demo, Book a personalized demo (best for pricing/ROI)

## Your role
- Answer ANY question related to Zonov.ai, its products, the 8 agents, the platform, pricing, implementation, compliance, security, integrations, customers, the company, careers, or how to navigate/use this website.
- When relevant, point the visitor to the most useful page above (use the exact path, e.g. "See /agents/pharmacy").
- If you genuinely don't know a specific detail, say so briefly and direct them to the relevant page, /book-demo, or hello@zonov.ai, never invent facts, numbers, or features.
- Stay on topic: Zonov.ai and healthcare AI. Politely decline unrelated/off-topic requests and steer back.
- Be helpful, concise, and professional. Respond in the same language as the user (Hindi or English).

## Lead qualification (important)
- You are also a friendly sales assistant. When a visitor shows buying intent, asks about pricing, a demo, implementation for their facility, or "how do I get started", naturally and politely gather, over the course of the conversation:
  - their **name**
  - their **hospital / organization name**
  - their **role** (e.g. doctor, admin, owner, IT head)
  - approximate **bed count or facility size**
  - a **contact** (email or phone)
- Ask for at most one or two details at a time, never interrogate. Keep it conversational.
- As soon as you have a name, a hospital, AND a contact (email or phone), call the **capture_lead** function to pass the lead to the sales team. Call it silently, do not announce the function. Then tell the user a Zonov.ai specialist will reach out shortly, and point them to /book-demo for a faster slot.
- Do not call capture_lead more than once for the same person unless they provide new/corrected details.

## Formatting rules (strictly follow these)
- Use **bold** for agent names, key terms, and important numbers
- Use numbered lists (1. 2. 3.) when listing multiple agents or steps
- Use bullet points (- ) for features or short facts
- Keep each response under 120 words unless listing all agents
- Never write long paragraphs, break into short lines
- Start every response with a one-line direct answer, then details below
- Do NOT use headers (##) in responses, only bold, bullets, and numbered lists`;

const LEAD_TOOL: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "capture_lead",
    description:
      "Save a qualified sales lead and notify the Zonov.ai sales team. Call this once you have collected, at minimum, the visitor's name, their hospital/organization, and a contact (email or phone). Call silently, do not mention the function to the user.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's full name" },
        hospital: { type: "string", description: "Hospital or organization name" },
        role: { type: "string", description: "Their role, e.g. doctor, administrator, owner, IT head" },
        bedCount: { type: "string", description: "Approximate number of beds or facility size, if mentioned" },
        city: { type: "string", description: "City, if mentioned" },
        email: { type: "string", description: "Email address, if provided" },
        phone: { type: "string", description: "Phone number, if provided" },
        interest: { type: "string", description: "What they're interested in, agents, use case, or notes from the chat" },
      },
      required: ["name", "hospital"],
    },
  },
};

export const runtime = "nodejs";

type IncomingMessage = { role: "user" | "assistant"; content: string };

// Forward a qualified lead to the sales team via Resend (same destination as the contact form).
async function sendLead(lead: Record<string, unknown>): Promise<void> {
  const contact = (lead.email as string) || (lead.phone as string) || "-";
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.log(`[Chatbot Lead] ${lead.name} <${contact}> | Hospital: ${lead.hospital}`);
    return;
  }

  const rows = [
    ["Name", lead.name],
    ["Hospital", lead.hospital],
    ["Role", lead.role],
    ["Beds / Size", lead.bedCount],
    ["City", lead.city],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Interest", lead.interest],
  ]
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#6B7280;width:140px;vertical-align:top;">${label}</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;vertical-align:top;">${escapeHtml(value || "-")}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#1B4FD8;margin-bottom:4px;">New Chatbot Lead</h2>
      <p style="color:#6B7280;font-size:14px;margin-bottom:24px;">Captured by the Zonov.ai assistant on zonov.ai</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Zonov.ai Website <arvind@zonov.ai>",
        to: ["hello@zonov.ai"],
        subject: `[Chatbot Lead] ${lead.name}, ${lead.hospital || contact}`,
        html,
      }),
    });
    if (!res.ok) console.error("Lead email failed:", await res.text());
  } catch (err) {
    console.error("Lead email error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit, the loop below can call GPT-4o up to 3x per request.
    const limit = rateLimit(`chat:${clientIp(req)}`, 15, 60_000);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
      );
    }

    const client = new OpenAI(); // reads OPENAI_API_KEY from env

    // Cap the body: up to 50 messages × 4000 chars ≈ 200KB of legit content.
    const body = await readJsonLimited<{ messages?: IncomingMessage[] }>(req, 300_000);
    if (!body) {
      return NextResponse.json({ error: "Invalid or oversized request" }, { status: 413 });
    }
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Only accept user/assistant turns with string content within a length cap.
    // Prevents clients injecting a "system" role (prompt-injection) or oversized payloads.
    const clean = messages.filter(
      (m): m is IncomingMessage =>
        m != null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length > 0 &&
        m.content.length <= 4000
    );
    if (clean.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const convo: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...clean.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    ];

    // Manual tool-use loop: the assistant may call capture_lead, then continue to a text reply.
    let reply = "";
    for (let turn = 0; turn < 3; turn++) {
      const response = await client.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 700,
        messages: convo,
        tools: [LEAD_TOOL],
      });

      const message = response.choices[0]?.message;
      if (!message) break;

      if (message.content) reply = message.content;

      const toolCalls = message.tool_calls ?? [];
      if (toolCalls.length === 0) break;

      // Feed tool results back so the assistant can produce a final text reply.
      convo.push(message);
      for (const call of toolCalls) {
        if (call.type !== "function") continue;
        let result = "Unknown function.";
        if (call.function.name === "capture_lead") {
          let args: Record<string, unknown> = {};
          try {
            args = JSON.parse(call.function.arguments || "{}");
          } catch {
            /* ignore malformed args */
          }
          await sendLead(args);
          result = "Lead saved and the sales team has been notified.";
        }
        convo.push({ role: "tool", tool_call_id: call.id, content: result });
      }
    }

    return NextResponse.json({
      reply: reply || "Sorry, I couldn't process that. Please try again.",
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
