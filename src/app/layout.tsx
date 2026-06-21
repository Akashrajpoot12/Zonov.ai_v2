import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ui/ChatBot";

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zonov.ai — AI Operating System for Healthcare",
    template: "%s | Zonov.ai",
  },
  description:
    "Zonov.ai is an AI-powered Healthcare Operating System that automates hospital workflows from patient registration to final billing using intelligent AI agents.",
  keywords: [
    "Healthcare AI", "Hospital AI agents", "Patient registration AI",
    "Doctor AI assistant", "Healthcare automation", "AI operating system",
    "Hospital workflow automation", "Clinical documentation AI",
    "Healthcare AI India", "Zonov.ai",
  ],
  authors: [{ name: "Zonov.ai" }],
  creator: "Zonov.ai",
  metadataBase: new URL("https://zonov.ai"),
  openGraph: {
    title: "Zonov.ai — AI Operating System for Healthcare",
    description: "Deploy AI agents across every hospital workflow — registration, documentation, diagnostics, billing, and operations.",
    url: "https://zonov.ai",
    siteName: "Zonov.ai",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zonov.ai — AI Operating System for Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonov.ai — AI Operating System for Healthcare",
    description: "Deploy AI agents across every hospital workflow.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo1.png", type: "image/png" },
    ],
    apple: "/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text antialiased">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
