import { MetadataRoute } from "next";

const BASE_URL = "https://zonov.ai";

const AGENT_SLUGS = [
  "patient-registration",
  "doctor-prescription",
  "investigation",
  "pharmacy",
  "ipd",
  "ot",
  "claim",
  "finance",
];

const BLOG_SLUGS = [
  "why-hospitals-need-ai-workforce",
  "future-of-hospital-operations",
  "revenue-leakage-in-healthcare",
  "ai-vs-traditional-hims",
  "how-ai-reduces-doctor-burnout",
  "ai-powered-patient-followup",
  "digital-transformation-healthcare",
  "hospital-efficiency-metrics",
  "voice-ai-for-doctors",
  "ai-in-revenue-cycle-management",
  "reducing-waiting-time-automation",
  "intelligent-hospital-operations",
  "ai-for-multi-hospital-chains",
  "hospital-analytics-explained",
  "predictive-healthcare-operations",
  "future-of-clinical-documentation",
  "ai-agents-in-healthcare",
  "building-smart-hospitals",
  "healthcare-automation-trends",
  "autonomous-hospitals-next-decade",
];

const CUSTOMER_SLUGS = [
  "sunrise-multispeciality",
  "metro-heart-institute",
  "carefirst-medical",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/platform`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/agents`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/customers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/use-cases`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/book-demo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/integrations`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const agentPages: MetadataRoute.Sitemap = AGENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/agents/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const customerPages: MetadataRoute.Sitemap = CUSTOMER_SLUGS.map((slug) => ({
    url: `${BASE_URL}/customers/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...agentPages, ...blogPages, ...customerPages];
}
