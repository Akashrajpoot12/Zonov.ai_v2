import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Zonov.ai, AI Operating System for Healthcare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated Open Graph image (also used for Twitter).
// Brand: Sapphire Health, navy gradient, white headline, accent highlight.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0D1F3C 0%, #122050 60%, #0A1830 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top, wordmark + eyebrow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 34,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Zonov<span style={{ color: "#60A5FA" }}>.ai</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            AI Operating System for Healthcare
          </div>
        </div>

        {/* Middle, headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            The AI Workforce for&nbsp;
            <span style={{ color: "#60A5FA" }}>Healthcare.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 880,
            }}
          >
            Automate every hospital workflow, from patient registration to final
            billing, with specialized AI agents.
          </div>
        </div>

        {/* Bottom, trust row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <span style={{ display: "flex" }}>National Health ID Ready</span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>•</span>
          <span style={{ display: "flex" }}>Works with your existing HIS</span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>•</span>
          <span style={{ display: "flex" }}>Made in India</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
