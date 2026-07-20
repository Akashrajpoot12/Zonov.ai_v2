"use client";

import {
  Building2,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  Pill,
  CreditCard,
  ScanLine,
  Network,
  CalendarClock,
  Video,
  Microscope,
  Ambulance,
  BedDouble,
  BarChart3,
} from "lucide-react";
import Typewriter from "@/components/ui/Typewriter";

/* ═══════════════════════════════════════════════════════════════
   INTEGRATION ICONS, a full-width row of chips that gently bob up
   and down (traveling wave). No horizontal scroll. White theme.
   ═══════════════════════════════════════════════════════════════ */

const ITEMS = [
  { Icon: Building2, label: "Hospital Information System" },
  { Icon: Stethoscope, label: "Clinical / EMR" },
  { Icon: ClipboardList, label: "Electronic Health Records" },
  { Icon: FlaskConical, label: "Lab & Diagnostics (LIS)" },
  { Icon: HeartPulse, label: "Patient Monitoring" },
  { Icon: Pill, label: "Pharmacy" },
  { Icon: CreditCard, label: "Billing & Claims" },
  { Icon: ScanLine, label: "National Health ID (ABHA)" },
  { Icon: Network, label: "HL7 / FHIR Interoperability" },
  { Icon: CalendarClock, label: "Appointment Scheduling" },
  { Icon: Video, label: "Telemedicine" },
  { Icon: Microscope, label: "Radiology & Imaging" },
  { Icon: Ambulance, label: "Emergency & Ambulance" },
  { Icon: BedDouble, label: "Bed & IPD Management" },
  { Icon: BarChart3, label: "Analytics & Reporting" },
];

const WAVE_DURATION = 5; // seconds per bob cycle (slow, calm)
const WAVE_STEP = 0.4; // phase offset between neighbours → gentle traveling wave

export default function IntegrationArc() {
  return (
    <section className="relative bg-[var(--surface)] overflow-hidden py-16 md:py-20">
      {/* Heading */}
      <div className="container-wide px-edge">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="type-mono text-[var(--secondary)] mb-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
            Seamless Integrations
          </p>
          <h2 className="type-h2 text-[var(--text)] [text-wrap:balance] mb-4 google-sans-700">
            <Typewriter text="Connects with your entire hospital stack" />
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] [text-wrap:pretty]">
            Zonov.ai plugs into your EMR, HIS, labs, pharmacy, and billing over
            secure APIs and HL7/FHIR, no rip-and-replace.
          </p>
        </div>
      </div>

      {/* Icons, full-bleed: spread across the whole width on desktop (fills
          the side gaps at any zoom), wrap + centre on smaller screens */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 py-4 lg:flex-nowrap lg:justify-between">
          {ITEMS.map((item, i) => {
            const color = i % 2 === 0 ? "var(--primary)" : "var(--secondary)";
            const waveDelay = -(i * WAVE_STEP); // negative → traveling wave from the start
            return (
              <div
                key={item.label}
                title={item.label}
                aria-label={item.label}
                className="wave-chip shrink-0 rounded-full flex items-center justify-center border border-[var(--border)] shadow-[0_10px_26px_rgba(13,31,60,0.12)]"
                style={{
                  width: "clamp(46px, 5.2vw, 58px)",
                  height: "clamp(46px, 5.2vw, 58px)",
                  background: "linear-gradient(160deg, #FFFFFF, #F4F7FC)",
                  // @ts-expect-error, CSS custom properties
                  "--wave-amp": "clamp(8px, 1.4vw, 15px)",
                  "--wave-dur": `${WAVE_DURATION}s`,
                  animation: "icon-wave var(--wave-dur) ease-in-out infinite",
                  animationDelay: `${waveDelay}s`,
                }}
              >
                <item.Icon
                  style={{ width: "44%", height: "44%", color }}
                  strokeWidth={2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
