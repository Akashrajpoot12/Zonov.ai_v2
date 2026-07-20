"use client";

// Per-agent live-preview scenes (DARK theme). Each agent renders a DIFFERENT,
// multi-element product mockup (header rows, stacked panels, badges, charts,
// gauges) so every window is a distinct composition. Rendered on the dark
// "live" screen frame provided by AgentsPipeline.

export type PreviewAgent = {
  slug: string;
  short: string;
  outcome: string;
  color: string;
};

const PANEL = "glass-card-dark rounded-[16px] shadow-lg";
const LABEL = "text-white/40 text-[9px] uppercase tracking-widest font-mono";
const TILE = "bg-white/[0.04] border border-white/10 rounded-[10px]";

function Check({ c, size = 11 }: { c: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Chip({ label, c, tone = "brand" }: { label: string; c: string; tone?: "brand" | "warn" | "crit" | "muted" }) {
  const styles =
    tone === "crit" ? { background: "rgba(220,38,38,0.18)", color: "#F87171" }
      : tone === "warn" ? { background: "rgba(217,119,6,0.18)", color: "#FBBF24" }
        : tone === "muted" ? { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }
          : { background: `${c}22`, color: c };
  return <span className="text-[8px] font-mono px-2 py-0.5 rounded-full whitespace-nowrap" style={styles}>{label}</span>;
}

/* 01, Registration: patient header + intake form + queue footer */
function Registration({ c }: { c: string }) {
  const rows: [string, string, boolean][] = [
    ["Health ID", "14-2938-8821", true],
    ["Insurance", "Star Health", true],
    ["Department", "General OPD", false],
  ];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className={`${PANEL} p-3 flex items-center gap-3`}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold" style={{ background: `${c}33`, border: `1px solid ${c}66` }}>RS</div>
        <div className="flex-1">
          <p className="text-white text-[12px] font-semibold leading-tight">Rahul Sharma</p>
          <p className="text-white/40 text-[9px] font-mono">Token · A-042</p>
        </div>
        <Chip label="VERIFIED ✓" c={c} />
      </div>
      <div className={`${PANEL} p-3`}>
        <span className={LABEL}>New Patient Intake</span>
        <div className="space-y-1.5 mt-2">
          {rows.map(([k, v, auto]) => (
            <div key={k} className="flex items-center justify-between">
              <span className="text-white/45 text-[10px] font-mono">{k}</span>
              <span className="text-white/85 text-[11px] flex items-center gap-1.5">{v}{auto && <Check c={c} />}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-1">
        <Chip label="QUEUE · 4 WAITING" c={c} tone="muted" />
        <span className="text-[10px] font-mono" style={{ color: c }}>~90s avg intake</span>
      </div>
    </div>
  );
}

/* 02, Prescription: recording bar + waveform + transcribed Rx list */
function Prescription({ c }: { c: string }) {
  const bars = [40, 70, 30, 90, 55, 75, 35, 80, 50, 65, 45, 85, 30, 60, 40, 72];
  const rx = ["Tab Paracetamol 500mg, 1-0-1", "Cap Amoxicillin 500mg, 1-1-1", "Syrup Ambroxol, 2 tsp SOS"];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className={`${PANEL} p-3`}>
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 text-white/60 text-[10px] font-mono"><span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" /> Recording 02:14</span>
          <Chip label="VOICE → EMR" c={c} />
        </div>
        <div className="flex items-end gap-[3px] h-9">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, background: i % 2 ? c : "rgba(255,255,255,0.18)" }} />
          ))}
        </div>
      </div>
      <div className={`${PANEL} p-3`}>
        <span className={LABEL}>Transcribed Prescription</span>
        <div className="mt-2 space-y-1.5">
          {rx.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80 text-[10px]"><Check c={c} /> {r}</div>
          ))}
        </div>
      </div>
      <div className="flex justify-end px-1"><Chip label="SIGNED & SENT TO EMR ✓" c={c} /></div>
    </div>
  );
}

/* 03, Investigation: test-status chips + report table + critical banner */
function Investigation({ c }: { c: string }) {
  const rows: [string, string, string, boolean][] = [
    ["Hemoglobin", "9.2", "g/dL", true],
    ["WBC Count", "8,400", "/µL", false],
    ["Platelets", "2.4L", "/µL", false],
  ];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex gap-2">
        <Chip label="BLOOD ✓" c={c} />
        <Chip label="X-RAY ✓" c={c} />
        <Chip label="MRI ⏳" c={c} tone="muted" />
      </div>
      <div className={`${PANEL} p-3`}>
        <div className="flex items-center justify-between mb-2">
          <span className={LABEL}>CBC Panel, Report</span>
          <Chip label="READY" c={c} />
        </div>
        <div className="space-y-1.5">
          {rows.map(([name, val, unit, crit]) => (
            <div key={name} className="flex items-center justify-between rounded-lg px-2 py-1.5" style={{ background: crit ? "rgba(220,38,38,0.12)" : "rgba(255,255,255,0.04)" }}>
              <span className="text-white/70 text-[10px]">{name}</span>
              <span className="flex items-center gap-2">
                <span className="text-white text-[11px] font-medium">{val} <span className="text-white/40 text-[9px]">{unit}</span></span>
                {crit && <Chip label="CRITICAL" c={c} tone="crit" />}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)" }}>
        <span className="text-[11px]">⚠</span>
        <span className="text-[10px] text-white/80 font-mono">Critical value alert sent to physician</span>
      </div>
    </div>
  );
}

/* 04, Pharmacy: summary stat tiles + stock list with bars */
function Pharmacy({ c }: { c: string }) {
  const stats: [string, string, string][] = [["In Stock", "248", "#fff"], ["Near Expiry", "12", "#FBBF24"], ["Reorder", "3", "#F87171"]];
  const meds: [string, number, string, string][] = [
    ["Amoxicillin 500mg", 80, "", ""],
    ["Insulin (vials)", 30, "Expires 9d", "warn"],
    ["Atorvastatin 10mg", 18, "Reorder", "crit"],
  ];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2">
        {stats.map(([k, v, col]) => (
          <div key={k} className={`${TILE} p-2.5 text-center`}>
            <p className="text-[15px] font-semibold leading-none" style={{ color: col }}>{v}</p>
            <p className="text-white/40 text-[8px] font-mono mt-1 uppercase tracking-wide">{k}</p>
          </div>
        ))}
      </div>
      <div className={`${PANEL} p-3`}>
        <span className={LABEL}>Stock Monitor</span>
        <div className="space-y-2.5 mt-2">
          {meds.map(([name, pct, badge, tone]) => (
            <div key={name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/75 text-[10px]">{name}</span>
                {badge && <Chip label={badge} c={c} tone={tone as "warn" | "crit"} />}
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct < 25 ? "#DC2626" : c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 05, IPD: patient header + vitals tiles + handover checklist */
function IPD({ c }: { c: string }) {
  const vitals: [string, string][] = [["BP", "120/80"], ["HR", "78"], ["SpO₂", "98%"]];
  const handover = ["Meds administered", "Vitals charted", "Pending: 2 PM review"];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className={`${PANEL} p-3 flex items-center gap-3`}>
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: `${c}22`, border: `1px solid ${c}55` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
        </div>
        <div className="flex-1">
          <p className="text-white text-[12px] font-semibold leading-tight">Bed 214 · Ward B</p>
          <p className="text-white/40 text-[9px] font-mono">Shift A → B handover</p>
        </div>
        <Chip label="STABLE" c={c} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {vitals.map(([k, v]) => (
          <div key={k} className={`${TILE} p-2.5 text-center`}>
            <p className="text-white/40 text-[8px] font-mono uppercase">{k}</p>
            <p className="text-white text-[13px] font-semibold mt-0.5">{v}</p>
          </div>
        ))}
      </div>
      <div className={`${PANEL} p-3 space-y-1.5`}>
        {handover.map((h, i) => (
          <div key={h} className="flex items-center gap-2 text-[10px]" style={{ color: i === 2 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.8)" }}>
            {i === 2 ? <span className="w-[11px] h-[11px] rounded-full border border-white/30 inline-block" /> : <Check c={c} />}{h}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 06, OT: status row + schedule timeline */
function OT({ c }: { c: string }) {
  const suites: [string, number, number, string, boolean][] = [
    ["OT-1", 10, 45, "Cardiac", false],
    ["OT-2", 35, 40, "Ortho", false],
    ["OT-3", 55, 32, "Emergency", true],
  ];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Chip label="3 SUITES ACTIVE" c={c} />
        <Chip label="NEXT CASE · 15 MIN" c={c} tone="muted" />
      </div>
      <div className={`${PANEL} p-3`}>
        <span className={LABEL}>OT Schedule, Today</span>
        <div className="space-y-2.5 mt-3">
          {suites.map(([name, left, width, label, emg]) => (
            <div key={name} className="flex items-center gap-2">
              <span className="text-white/50 text-[9px] font-mono w-8">{name}</span>
              <div className="relative flex-1 h-5 rounded bg-white/[0.05]">
                <div className="absolute top-0 h-full rounded flex items-center px-2" style={{ left: `${left}%`, width: `${width}%`, background: emg ? "rgba(220,38,38,0.35)" : `${c}44`, border: `1px solid ${emg ? "#DC2626" : c}` }}>
                  <span className="text-white/85 text-[8px] truncate">{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end px-1"><span className="text-[10px] font-mono" style={{ color: c }}>Emergency slot auto-inserted · no delay</span></div>
    </div>
  );
}

/* 07, Claim: approval gauge + scrubbing checklist + amount */
function Claim({ c }: { c: string }) {
  const checks: [string, boolean][] = [
    ["Codes valid", true],
    ["Documents attached", true],
    ["Eligibility verified", true],
    ["Missing pre-auth", false],
  ];
  const r = 26, circ = 2 * Math.PI * r, pct = 94;
  return (
    <div className="w-full flex flex-col gap-3">
      <div className={`${PANEL} p-3 flex items-center gap-4`}>
        <div className="relative w-[64px] h-[64px] flex-shrink-0">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={r} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
            <circle cx="32" cy="32" r={r} stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} transform="rotate(-90 32 32)" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-white text-[13px] font-semibold">{pct}%</span>
        </div>
        <div>
          <span className={LABEL}>Approval Likelihood</span>
          <p className="text-white text-[12px] font-medium mt-1">Claim #CLM-4471</p>
          <p className="text-white/50 text-[10px] font-mono mt-0.5">Pre-authorized · Star Health</p>
        </div>
      </div>
      <div className={`${PANEL} p-3 space-y-1.5`}>
        <span className={LABEL}>Pre-submission scrub</span>
        {checks.map(([label, ok]) => (
          <div key={label} className="flex items-center gap-2 text-[10px]" style={{ color: ok ? "rgba(255,255,255,0.8)" : "#FBBF24" }}>
            {ok ? <Check c={c} /> : <span className="text-[11px] leading-none">⚠</span>}{label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 08, Finance: revenue KPI + sparkline + leakage breakdown */
function Finance({ c }: { c: string }) {
  const leaks: [string, number][] = [["Charge capture", 70], ["Coding gaps", 45], ["Denials", 30]];
  return (
    <div className="w-full flex flex-col gap-3">
      <div className={`${PANEL} p-3`}>
        <div className="flex items-start justify-between">
          <div>
            <span className={LABEL}>Revenue Recovered · MTD</span>
            <p className="text-white text-[24px] font-semibold leading-none mt-1">20%<span className="text-[14px] text-white/60"> recovered</span></p>
            <p className="text-[10px] font-mono mt-1" style={{ color: c }}>▲ 18% vs last month</p>
          </div>
          <svg width="72" height="40" viewBox="0 0 72 40" fill="none" className="mt-1">
            <polyline points="0,32 12,26 24,29 36,16 48,19 60,8 72,4" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="72" cy="4" r="2.5" fill={c} />
          </svg>
        </div>
      </div>
      <div className={`${PANEL} p-3`}>
        <span className={LABEL}>Leakage by source</span>
        <div className="mt-2 space-y-2">
          {leaks.map(([name, pct]) => (
            <div key={name} className="flex items-center gap-2">
              <span className="text-white/60 text-[9px] w-24 truncate">{name}</span>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgentPreview({ a }: { a: PreviewAgent }) {
  const c = a.color;
  switch (a.slug) {
    case "patient-registration": return <Registration c={c} />;
    case "doctor-prescription": return <Prescription c={c} />;
    case "investigation": return <Investigation c={c} />;
    case "pharmacy": return <Pharmacy c={c} />;
    case "ipd": return <IPD c={c} />;
    case "ot": return <OT c={c} />;
    case "claim": return <Claim c={c} />;
    case "finance": return <Finance c={c} />;
    default: return null;
  }
}
