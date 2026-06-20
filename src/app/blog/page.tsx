import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { FadeInStagger, FadeInItem } from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "Blog — Zonov.ai",
  description: "Research, case studies, and practical thinking from the team building AI for healthcare.",
};

const posts = [
  {
    slug: "future-of-hospital-operations",
    category: "Industry Trends",
    title: "Future of Hospital Operations",
    excerpt: "From reactive management to AI-orchestrated facilities — how intelligence embedded in every workflow will define the next decade of hospital operations.",
    read: "8 min",
  },
  {
    slug: "revenue-leakage-in-healthcare",
    category: "Revenue",
    title: "Revenue Leakage in Healthcare",
    excerpt: "Charge capture failure, undercoding, and unappealed denials quietly cost hospitals 5–15% of collectible revenue. Here is where to find it and how to stop it.",
    read: "9 min",
  },
  {
    slug: "ai-vs-traditional-hims",
    category: "Technology",
    title: "AI vs Traditional HIMS",
    excerpt: "Traditional HIMS platforms record what happened. AI-native platforms predict and act. Understanding the architectural difference is the first step to choosing correctly.",
    read: "7 min",
  },
  {
    slug: "how-ai-reduces-doctor-burnout",
    category: "Clinical Operations",
    title: "How AI Reduces Doctor Burnout",
    excerpt: "Documentation burden — not clinical complexity — drives burnout. Voice AI can return four hours per day to physicians while improving note accuracy.",
    read: "8 min",
  },
  {
    slug: "ai-powered-patient-follow-up",
    category: "Clinical Operations",
    title: "AI-Powered Patient Follow-Up",
    excerpt: "40% of discharged patients miss follow-up appointments. Systematic AI follow-up programs reduce 30-day readmissions by 25–35% in published studies.",
    read: "6 min",
  },
  {
    slug: "digital-transformation-in-healthcare",
    category: "Industry Trends",
    title: "Digital Transformation in Healthcare",
    excerpt: "The first wave digitized paper. The current wave transforms data into intelligence. India is positioned unusually well for this phase — here is why.",
    read: "9 min",
  },
  {
    slug: "hospital-efficiency-metrics",
    category: "AI Strategy",
    title: "Hospital Efficiency Metrics",
    excerpt: "Most hospital dashboards measure lagging indicators. The metrics that drive improvement are upstream process measures tracked in real time.",
    read: "7 min",
  },
  {
    slug: "voice-ai-for-doctors",
    category: "Technology",
    title: "Voice AI for Doctors",
    excerpt: "The first doctor-native interface since the stethoscope. How clinical voice AI achieves >98% accuracy and changes the quality of the consultation itself.",
    read: "7 min",
  },
  {
    slug: "ai-in-revenue-cycle-management",
    category: "Revenue",
    title: "AI in Revenue Cycle Management",
    excerpt: "A 4–8 percentage point improvement in net collection rate across the full revenue cycle — from registration validation to denial management.",
    read: "9 min",
  },
  {
    slug: "reducing-waiting-time-through-automation",
    category: "Clinical Operations",
    title: "Reducing Waiting Time Through Automation",
    excerpt: "Most OPD waiting time is administrative friction, not clinical bottleneck. Pre-registration, smart queuing, and discharge orchestration each cut wait times independently.",
    read: "6 min",
  },
  {
    slug: "intelligent-hospital-operations",
    category: "AI Strategy",
    title: "Intelligent Hospital Operations",
    excerpt: "Every major operational failure is preceded by a detectable signal. Intelligent operations means catching signals before they become failures.",
    read: "8 min",
  },
  {
    slug: "ai-for-multi-hospital-chains",
    category: "AI Strategy",
    title: "AI for Multi-Hospital Chains",
    excerpt: "Network-level intelligence enables cross-unit learning, optimized resource allocation, and continuous monitoring that no management structure can replicate at scale.",
    read: "8 min",
  },
  {
    slug: "hospital-analytics-explained",
    category: "Technology",
    title: "Hospital Analytics Explained",
    excerpt: "Three generations of hospital analytics: reporting, BI dashboards, and AI-native. Most hospitals are on generation two and wondering why data investment isn't translating to impact.",
    read: "7 min",
  },
  {
    slug: "predictive-healthcare-operations",
    category: "Industry Trends",
    title: "Predictive Healthcare Operations",
    excerpt: "By 7 AM, a predictive operations platform already knows the four most important things that will happen today. Here is what that looks like in practice.",
    read: "8 min",
  },
  {
    slug: "future-of-clinical-documentation",
    category: "Clinical Operations",
    title: "Future of Clinical Documentation",
    excerpt: "EMRs were designed for billing, not clinical use. AI reverses the documentation burden: physicians review and approve rather than author from scratch.",
    read: "7 min",
  },
  {
    slug: "ai-agents-in-healthcare",
    category: "Technology",
    title: "AI Agents in Healthcare",
    excerpt: "Agents pursue multi-step goals autonomously — not just responding to queries. The architecture behind the next generation of healthcare workflow automation.",
    read: "8 min",
  },
  {
    slug: "building-smart-hospitals",
    category: "AI Strategy",
    title: "Building Smart Hospitals",
    excerpt: "Four sequential phases — data foundation, intelligence deployment, autonomous operations, and adaptive operations — define the smart hospital roadmap.",
    read: "9 min",
  },
  {
    slug: "healthcare-automation-trends",
    category: "Industry Trends",
    title: "Healthcare Automation Trends",
    excerpt: "Ambient clinical intelligence, integrated revenue cycle AI, and AI-augmented RPA are the three automation trends with the highest near-term ROI in healthcare.",
    read: "7 min",
  },
  {
    slug: "autonomous-hospitals-the-next-decade",
    category: "Industry Trends",
    title: "Autonomous Hospitals: The Next Decade",
    excerpt: "By 2030, registration, scheduling, charge capture, follow-up, and supply replenishment will all be autonomous in leading hospitals. Here is the path there.",
    read: "10 min",
  },
];

const categoryStyle: Record<string, { bg: string; color: string }> = {
  "AI Strategy": { bg: "rgba(27,79,216,0.12)", color: "var(--primary)" },
  "Clinical Operations": { bg: "rgba(0,180,174,0.12)", color: "var(--secondary)" },
  Revenue: { bg: "rgba(124,58,237,0.12)", color: "var(--purple)" },
  Technology: { bg: "rgba(27,79,216,0.12)", color: "var(--primary)" },
  "Industry Trends": { bg: "rgba(0,180,174,0.12)", color: "var(--secondary)" },
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">

        <section className="bg-[var(--bg)] pt-40 pb-16">
          <div className="container-wide">
            <FadeIn>
              <p className="type-mono text-[var(--primary)] mb-3">THE ZONOV.AI BLOG</p>
              <h1 className="type-display">
                Insights on AI, healthcare,
                <br />
                <em style={{ fontFamily: "var(--font-playfair)" }}>and the future of hospitals.</em>
              </h1>
              <p className="type-body-lg text-[var(--text-muted)] mt-4 max-w-xl">
                Research, case studies, and practical thinking from the team building the AI workforce for healthcare.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Link
                href="/blog/why-hospitals-need-ai-workforce"
                className="block bg-[var(--dark-navy)] rounded-[var(--radius-xl)] overflow-hidden mt-12 flex flex-col lg:flex-row hover:opacity-95 transition-opacity"
              >
                <div className="p-10 md:p-14 flex flex-col justify-between flex-1">
                  <div>
                    <p className="type-mono text-white/40 mb-4">FEATURED</p>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 type-mono"
                      style={{ background: "rgba(27,79,216,0.2)", color: "var(--primary)" }}
                    >
                      AI Strategy
                    </span>
                    <h2
                      className="text-white leading-tight"
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(26px, 3vw, 44px)",
                        fontStyle: "italic",
                      }}
                    >
                      Why Hospitals Need AI Workforce
                    </h2>
                    <p className="text-white/60 type-body mt-4 max-w-sm">
                      India&apos;s doctor-to-patient ratio, rising administrative burden, and the business case for deploying purpose-built AI agents across hospital operations.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div>
                      <p className="type-caption text-white/40">Zonov.ai Team</p>
                      <p className="type-caption text-white/40">June 2025 · 7 min read</p>
                    </div>
                    <span className="btn btn-glass self-start sm:self-auto">Read Article →</span>
                  </div>
                </div>
                <div className="bg-[rgba(27,79,216,0.1)] flex items-center justify-center min-h-[280px] lg:w-[420px] p-10">
                  <div
                    className="rounded-xl p-6 w-full max-w-xs"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="grid grid-cols-2 gap-2 text-white">
                      <p className="type-caption text-white/40 pb-2 border-b border-white/10">Workflow</p>
                      <p className="type-caption text-white/40 pb-2 border-b border-white/10 text-right">Handled by AI</p>

                      <p className="type-body py-2">Registration</p>
                      <p className="type-body py-2 text-right text-[var(--secondary)]">✓</p>

                      <p className="type-body py-2">Follow-Up</p>
                      <p className="type-body py-2 text-right text-[var(--secondary)]">✓</p>

                      <p className="type-body py-2">Billing Audit</p>
                      <p className="type-body py-2 text-right text-[var(--secondary)]">✓</p>

                      <p className="type-body py-2">Documentation</p>
                      <p className="type-body py-2 text-right text-[var(--secondary)]">✓</p>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[var(--surface)] section-py">
          <div className="container-wide">
            <FadeIn>
              <h2 className="type-h3 mb-2">All Articles</h2>
              <p className="type-body text-[var(--text-muted)]">Thinking from the team.</p>
            </FadeIn>
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {posts.map((post) => {
                const style = categoryStyle[post.category] ?? { bg: "rgba(27,79,216,0.12)", color: "var(--primary)" };
                return (
                  <FadeInItem key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="block card h-full flex flex-col hover:shadow-md transition-shadow">
                      <span
                        className="type-mono text-xs inline-block px-3 py-1 rounded-full self-start"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {post.category}
                      </span>
                      <h3 className="type-h4 mt-3 mb-2">{post.title}</h3>
                      <p
                        className="type-body text-[var(--text-muted)] flex-1"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        } as React.CSSProperties}
                      >
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
                        <p className="type-caption text-[var(--text-muted)]">Zonov.ai Team · June 2025</p>
                        <p className="type-caption text-[var(--text-muted)]">{post.read} read</p>
                      </div>
                    </Link>
                  </FadeInItem>
                );
              })}
            </FadeInStagger>
          </div>
        </section>

        <section className="bg-[var(--dark-navy)] section-py noise relative">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <FadeIn>
              <p className="type-mono text-white/40 mb-3">NEWSLETTER</p>
              <h2 className="type-h2 text-white">The AI hospital digest.</h2>
              <p className="type-body-lg text-white/60 mt-3 mb-8">
                One email per month. What&apos;s changing in healthcare AI, regulatory updates, and implementation lessons from hospitals on the Zonov.ai platform.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@hospital.com"
                  className="flex-1 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0 16px",
                    height: "50px",
                    color: "white",
                  }}
                />
                <button type="submit" className="btn btn-primary-lg">Subscribe</button>
              </form>
              <p className="type-caption text-white/30 mt-4">No spam. Unsubscribe anytime.</p>
            </FadeIn>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
