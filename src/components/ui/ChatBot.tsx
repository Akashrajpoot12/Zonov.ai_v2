"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) { i++; continue; }

    // Numbered list item: "1. text"
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="flex flex-col gap-1 pl-1 my-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="font-semibold flex-shrink-0" style={{ color: "var(--primary)" }}>{idx + 1}.</span>
              <span dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Bullet list item: "- text" or "• text"
    if (/^[-•*]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-•*]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-•*]\s/, ""));
        i++;
      }
      elements.push(
        <ul key={i} className="flex flex-col gap-1 pl-1 my-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--primary)" }} />
              <span dangerouslySetInnerHTML={{ __html: inlineMd(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} dangerouslySetInnerHTML={{ __html: inlineMd(line) }} className="leading-relaxed" />
    );
    i++;
  }

  return <div className="flex flex-col gap-1.5 text-[13px]">{elements}</div>;
}

function inlineMd(text: string): string {
  return text
    // Markdown links [label](url) — allow internal paths, http(s), and mailto only
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*|mailto:[^\s)]+)\)/g,
      (_m, label, url) => {
        const ext = /^https?:/.test(url);
        return `<a href="${url}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""} style="color:var(--primary);text-decoration:underline;font-weight:500">${label}</a>`;
      }
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:rgba(27,79,216,0.1);padding:1px 5px;border-radius:4px;font-size:12px">$1</code>');
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm the Zonov.ai assistant <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-3px;margin:0 1px\" aria-hidden=\"true\"><path d=\"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2\"/><path d=\"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2\"/><path d=\"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8\"/><path d=\"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15\"/></svg> I can help you learn about our 8 AI agents, implementation, pricing, or anything else. What would you like to know?",
};

const QUICK_REPLIES = [
  "What can your AI agents do?",
  "How long does setup take?",
  "Pricing",
  "Book a demo",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages]);

  async function sendMessage(preset?: string) {
    const text = (typeof preset === "string" ? preset : input).trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Sorry, I couldn't process that. Please try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[360px] max-h-[520px] flex flex-col rounded-[20px] overflow-hidden shadow-2xl shadow-black/20"
            style={{ border: "1px solid var(--border)" }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ background: "linear-gradient(120deg, var(--dark-navy) 0%, #14275a 100%)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-lg shadow-black/20"
                style={{ background: "linear-gradient(135deg, #1B4FD8, #7C3AED, #00B4AE)" }}
              >
                Z
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white leading-tight">Zonov.ai</p>
                <p className="text-[11px] text-white/50 leading-tight">AI Assistant</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
                </span>
                <span className="text-[11px] text-white/50">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-3" style={{ background: "#F8FAFF", maxHeight: "360px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[82%] rounded-[14px] px-3.5 py-2.5"
                    style={
                      msg.role === "user"
                        ? { background: "var(--primary)", color: "#fff", borderBottomRightRadius: "4px" }
                        : { background: "#fff", color: "var(--text)", border: "1px solid var(--border)", borderBottomLeftRadius: "4px" }
                    }
                  >
                    {msg.role === "user"
                      ? <p className="text-[13px] leading-relaxed">{msg.content}</p>
                      : renderMarkdown(msg.content)
                    }
                  </div>
                </div>
              ))}
              {/* Quick-reply suggestions — shown only on the opening message */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="text-[12px] px-3 py-1.5 rounded-full border transition-colors"
                      style={{ borderColor: "var(--primary)", color: "var(--primary)", background: "rgba(27,79,216,0.06)" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-[14px] px-4 py-3 flex gap-1 items-center" style={{ background: "#fff", border: "1px solid var(--border)", borderBottomLeftRadius: "4px" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--text-muted)" }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ background: "#fff", borderColor: "var(--border)" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about our AI agents..."
                aria-label="Ask the Zonov.ai assistant"
                className="flex-1 text-[13px] outline-none bg-transparent"
                style={{ color: "var(--text)" }}
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: input.trim() && !loading ? "var(--primary)" : "var(--border)",
                  color: input.trim() && !loading ? "#fff" : "var(--text-muted)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/20 transition-all"
        style={{ background: open ? "var(--dark-navy)" : "var(--primary)", color: "#fff" }}
        aria-label={open ? "Close chat" : "Chat with the Zonov.ai assistant"}
      >
        {!open && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-40 pointer-events-none"
            style={{ background: "var(--primary)", animationDuration: "2.2s" }}
          />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
