import React from "react";

// Lightweight Markdown-subset renderer for blog article bodies.
// Supported syntax (one block per blank-line-separated chunk / line):
//   ## Heading            -> section heading (h2)
//   ### Subheading        -> sub heading (h3)
//   > quote line(s)       -> pull quote
//   - item                -> bullet list (consecutive lines)
//   1. item               -> numbered list (consecutive lines)
//   **bold** inline       -> bold within any text
//   anything else         -> paragraph (first one is styled as a larger "lead")
//
// Plain prose with no markers still renders as clean paragraphs, so articles
// look fine even before they are structured.

function renderInline(text: string): React.ReactNode[] {
  // Split on **bold** while keeping the delimiters, then alternate.
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-[var(--text)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let firstParagraph = true;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === "") {
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="type-h4 text-[var(--text)] font-semibold mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="type-h3 text-[var(--text)] font-semibold mt-12 mb-4">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // Pull quote (gathers consecutive "> " lines)
    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quote.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <blockquote
          key={key++}
          className="my-8 pl-6 border-l-4 border-[var(--primary)] text-[var(--text)] italic leading-relaxed"
          style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
        >
          {renderInline(quote.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 mb-6 space-y-2 marker:text-[var(--primary)]">
          {items.map((it, idx) => (
            <li key={idx} className="type-body-lg text-[var(--text-muted)] leading-relaxed">
              {renderInline(it)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push(
        <ol key={key++} className="list-decimal pl-6 mb-6 space-y-2 marker:text-[var(--primary)] marker:font-semibold">
          {items.map((it, idx) => (
            <li key={idx} className="type-body-lg text-[var(--text-muted)] leading-relaxed">
              {renderInline(it)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph, the first one reads as a larger lead-in.
    blocks.push(
      <p
        key={key++}
        className={
          firstParagraph
            ? "type-subtitle text-[var(--text)] mb-6 leading-relaxed"
            : "type-body-lg text-[var(--text)] mb-6 leading-relaxed"
        }
      >
        {renderInline(line)}
      </p>
    );
    firstParagraph = false;
    i++;
  }

  return <div className="article-body">{blocks}</div>;
}
