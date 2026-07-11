import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "See Zonov.ai's healthcare AI agents in action with a live walkthrough tailored to your hospital. Go live in 1–2 weeks with zero disruption to existing workflows.",
  keywords: ["Book a demo", "Healthcare AI demo", "Hospital AI walkthrough", "Zonov.ai demo"],
  alternates: { canonical: "/book-demo" },
  openGraph: {
    title: "Book a Demo | Zonov.ai",
    description: "Book a private demo of Zonov.ai's AI agents for your hospital.",
    url: "/book-demo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo | Zonov.ai",
    description: "Book a private demo of Zonov.ai's AI agents for your hospital.",
  },
};

export default function BookDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
