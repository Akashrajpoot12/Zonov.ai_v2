"use client";

const HOSPITALS = [
  "AIIMS Delhi", "Fortis Healthcare", "Apollo Hospitals", "Max Healthcare",
  "Manipal Hospitals", "Medanta", "Narayana Health", "HCG Oncology",
  "KIMS Hospitals", "Care Hospitals", "Aster DM Healthcare", "Columbia Asia",
];

export default function LogoMarquee() {
  const doubled = [...HOSPITALS, ...HOSPITALS];

  return (
    <div className="py-10 border-t border-white/10">
      <div className="container-wide mb-5">
        <p className="type-mono text-white/40">Trusted by Healthcare Leaders Across India</p>
      </div>
      <div
        className="overflow-hidden"
        style={{
          marginLeft: "calc(var(--space-edge) * -1)",
          marginRight: "calc(var(--space-edge) * -1)",
        }}
      >
        <div className="border-t border-b border-white/10">
          <div className="flex animate-marquee" style={{ width: "max-content" }}>
            {doubled.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center justify-center shrink-0 px-10 h-[72px]"
                style={{ minWidth: 220 }}
              >
                <span className="text-white/40 text-[13px] font-medium tracking-wide whitespace-nowrap hover:text-white/70 transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
