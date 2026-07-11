"use client";

import { ShieldCheck, LayoutGrid, Activity, Lock, Clock } from "lucide-react";

const COMPLIANCES = [
  { text: "ABDM & ABHA Compliant", Icon: ShieldCheck },
  { text: "Works with Your Existing HIS", Icon: LayoutGrid },
  { text: "HL7 / FHIR Integration", Icon: Activity },
  { text: "End-to-End Encryption", Icon: Lock },
  { text: "Live in 2-8 Weeks", Icon: Clock }
];

export default function LogoMarquee() {
  const doubled = [...COMPLIANCES, ...COMPLIANCES, ...COMPLIANCES]; // triple to ensure it loops smoothly without gaps

  return (
    <div className="py-8 border-t border-white/5 bg-[var(--dark-navy)]">
      <div className="container-wide mb-6">
        <p className="type-mono text-[var(--secondary)] text-[11px] tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse" />
          ENTERPRISE-GRADE, BUILT FOR INDIAN HEALTHCARE
        </p>
      </div>
      <div
        className="overflow-hidden"
        style={{
          marginLeft: "calc(var(--space-edge) * -1)",
          marginRight: "calc(var(--space-edge) * -1)",
        }}
      >
        <div className="border-t border-b border-white/5 relative bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
          {/* Subtle gradient overlays for fade effect at edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[var(--dark-navy)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[var(--dark-navy)] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee py-5 hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
            {doubled.map((item, i) => (
              <div
                key={`${item.text}-${i}`}
                className="flex items-center gap-8 justify-center shrink-0 px-6"
              >
                {/* Clean Minimalist Text */}
                <div className="flex items-center gap-4 cursor-default group">
                  
                  {/* Clean Icon */}
                  <div className="flex items-center justify-center text-[var(--secondary)] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,180,174,0.5)]">
                    <item.Icon size={18} strokeWidth={2.5} />
                  </div>

                  <span className="relative text-white/70 text-[16px] font-medium tracking-wide whitespace-nowrap group-hover:text-white transition-colors">
                    {item.text}
                    {/* Cyan Underline Swipe Effect */}
                    <span className="absolute left-0 -bottom-1.5 h-[2px] w-0 bg-[var(--secondary)] transition-all duration-300 group-hover:w-full" />
                  </span>
                </div>
                
                {/* AI Sparkle Separator */}
                {i !== doubled.length - 1 && (
                  <span className="text-white/20 text-[10px] ml-2">✦</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
