import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ChatBot from "@/components/ui/ChatBot";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

// Self-hosted Montserrat (variable font — full 100–900 weight range + italics).
// Exposed as --font-montserrat; globals.css aliases the legacy font variables
// (--font-playfair / --font-inter / --font-google-sans) onto it, so every
// existing usage across the site resolves to Montserrat with no per-file edits.
const montserrat = localFont({
  src: [
    { path: "../fonts/Montserrat-VariableFont_wght.ttf", style: "normal" },
    { path: "../fonts/Montserrat-Italic-VariableFont_wght.ttf", style: "italic" },
  ],
  variable: "--font-montserrat",
  weight: "100 900",
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
    // OG image is generated automatically by src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonov.ai — AI Operating System for Healthcare",
    description: "Deploy AI agents across every hospital workflow.",
    // Twitter image falls back to the generated opengraph-image
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
      className={`${montserrat.variable} h-full`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-bg text-text antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
