import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Zonov.ai team about pricing, implementation timelines, and ROI projections for deploying healthcare AI agents at your hospital.",
  keywords: ["Contact Zonov.ai", "Healthcare AI sales", "Hospital AI inquiry", "Zonov.ai contact"],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Zonov.ai",
    description: "Talk to the Zonov.ai team about pricing, implementation, and ROI.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Zonov.ai",
    description: "Talk to the Zonov.ai team about pricing, implementation, and ROI.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
