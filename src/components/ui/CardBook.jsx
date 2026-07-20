'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Mic,
  IdCard,
  Stethoscope,
  TriangleAlert,
  Microscope,
  Bone,
  Pill,
  BedDouble,
  Syringe,
  ReceiptText,
  TrendingUp,
  LineChart,
  CheckCircle2,
  Phone,
  Lock,
  Link2,
} from 'lucide-react';
import styles from './CardBook.module.css';

const ZONOV_CARDS = [
  {
    id: 1,
    label: 'REGISTRATION',
    icon: Mic,
    title: 'Voice Registration',
    desc: 'Patient registered in under 90 seconds, just speak, no typing, no forms.',
  },
  {
    id: 2,
    label: 'REGISTRATION',
    icon: IdCard,
    title: 'Health ID Auto-Fetch',
    desc: 'Scans the national health ID and pulls complete patient history instantly.',
  },
  {
    id: 3,
    label: 'PRESCRIPTION',
    icon: Stethoscope,
    title: 'Voice Prescription',
    desc: 'Doctors dictate, AI writes, codes, and saves the prescription error-free.',
  },
  {
    id: 4,
    label: 'PRESCRIPTION',
    icon: TriangleAlert,
    title: 'Drug Safety Check',
    desc: 'Flags dangerous drug interactions before the prescription is signed.',
  },
  {
    id: 5,
    label: 'DIAGNOSTICS',
    icon: Microscope,
    title: 'Lab Intelligence',
    desc: 'Reads lab results against patient history and flags critical values in <2 min.',
  },
  {
    id: 6,
    label: 'DIAGNOSTICS',
    icon: Bone,
    title: 'Report Generation',
    desc: 'AI-assisted radiology and pathology report drafting, 40% faster turnaround.',
  },
  {
    id: 7,
    label: 'PHARMACY',
    icon: Pill,
    title: 'Expiry Alerts',
    desc: 'Near-expiry and low-stock alerts in real time, zero wastage, zero stockouts.',
  },
  {
    id: 8,
    label: 'IPD',
    icon: BedDouble,
    title: 'Nursing Handovers',
    desc: 'Structured, voice-captured shift handovers, nothing missed, ever.',
  },
  {
    id: 9,
    label: 'OT',
    icon: Syringe,
    title: 'OT Scheduling',
    desc: 'Intelligent OT allocation that eliminates conflicts and reduces delays by 30%.',
  },
  {
    id: 10,
    label: 'CLAIMS',
    icon: ReceiptText,
    title: 'Claim Scrubbing',
    desc: 'Every claim validated before submission, 20% fewer rejections guaranteed.',
  },
  {
    id: 11,
    label: 'FINANCE',
    icon: TrendingUp,
    title: 'Revenue Recovery',
    desc: 'Unbilled procedures caught automatically, 20% revenue leakage recovered.',
  },
  {
    id: 12,
    label: 'FINANCE',
    icon: LineChart,
    title: 'Live P&L Dashboard',
    desc: 'Per-patient profitability visible to hospital leadership in real time.',
  },
  {
    id: 13,
    label: 'DISCHARGE',
    icon: CheckCircle2,
    title: 'Discharge Planning',
    desc: 'AI coordinates discharge checklists across departments, cuts time by 60%.',
  },
  {
    id: 14,
    label: 'FOLLOW-UP',
    icon: Phone,
    title: 'Patient Follow-up',
    desc: 'AI calls patients post-discharge daily, monitors recovery, escalates if needed.',
  },
  {
    id: 15,
    label: 'COMPLIANCE',
    icon: Lock,
    title: 'Standards Compliant',
    desc: 'Built to national digital health standards by design, with audit trails on every interaction.',
  },
  {
    id: 16,
    label: 'INTEGRATIONS',
    icon: Link2,
    title: 'HIS Integration',
    desc: 'Works with Practo, eHospital, HIS Pro, and 20+ systems. No rip-and-replace.',
  },
];

export default function CardBook({
  cards = ZONOV_CARDS,
  radius = 235,
  arc = 150,
  gapFront = 14,
  speed = 5,
  cardW = 120,
  cardH = 255,
  expandPadW = 85,
  expandPadH = 55,
  tilt = 20,
  autoSpin = true,
}) {
  const [activeKey, setActiveKey] = useState(null);
  const activeKeyRef = useRef(null);
  const rotationRef = useRef(gapFront);
  const targetRef = useRef(null);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const idleRef = useRef(true);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);
  const reduce = useRef(false);
  const ringRef = useRef(null);
  const placedRef = useRef([]);

  const half = Math.ceil(cards.length / 2);
  const left = cards.slice(0, half);
  const right = cards.slice(half);

  const placed = [];
  right.forEach((c, i) => {
    const f = right.length <= 1 ? 0 : i / (right.length - 1);
    placed.push({ card: c, angle: +(gapFront + f * arc), key: `r${i}` });
  });
  left.forEach((c, i) => {
    const f = left.length <= 1 ? 0 : i / (left.length - 1);
    placed.push({ card: c, angle: -(gapFront + f * arc), key: `l${i}` });
  });
  placedRef.current = placed;

  useEffect(() => {
    reduce.current =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }, []);



  useEffect(() => {
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      let r = rotationRef.current;
      if (draggingRef.current) {
        // pointer-driven, no auto movement
      } else if (targetRef.current != null) {
        const diff = targetRef.current - r;
        if (Math.abs(diff) < 0.1) { r = targetRef.current; targetRef.current = null; }
        else r += diff * Math.min(1, dt * 6);
      } else if (autoSpin && idleRef.current && !reduce.current) {
        r += speed * dt;
      }
      rotationRef.current = r;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${r}deg)`;
      }

      let newFrontKey = null;
      let best = Infinity;
      for (const p of placedRef.current) {
        const eff = (((p.angle + r) % 360) + 540) % 360 - 180;
        const d = Math.abs(eff);
        if (d < best) { best = d; newFrontKey = p.key; }
      }
      
      if (newFrontKey !== activeKeyRef.current) {
        activeKeyRef.current = newFrontKey;
        setActiveKey(newFrontKey);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoSpin, speed]);

  const onDown = (e) => {
    draggingRef.current = true;
    idleRef.current = false;
    targetRef.current = null;
    lastXRef.current = e.clientX ?? (e.touches?.[0]?.clientX) ?? 0;
    if (e.currentTarget.setPointerCapture && e.pointerId != null) {
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    }
  };

  const onMove = (e) => {
    if (!draggingRef.current) return;
    const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? 0;
    const dx = x - lastXRef.current;
    lastXRef.current = x;
    const next = rotationRef.current + dx * 0.3;
    rotationRef.current = next;
  };

  const end = () => {
    draggingRef.current = false;
    clearTimeout(end._t);
    end._t = setTimeout(() => { idleRef.current = true; }, 2200);
  };

  const focusCard = useCallback((angle) => {
    idleRef.current = false;
    const cur = rotationRef.current;
    const base = -angle;
    const k = Math.round((cur - base) / 360);
    targetRef.current = base + k * 360;
    clearTimeout(end._t);
    end._t = setTimeout(() => { idleRef.current = true; }, 3800);
  }, []);

  return (
    <div className={styles.root}>
      <div
        className={styles.stage}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      >
        <div className={styles.world} style={{ transform: `rotateX(${tilt}deg)` }}>
          <div className={styles.ring} ref={ringRef} style={{ transform: `rotateY(${rotationRef.current}deg)` }}>
            {placed.map(({ card, angle, key }) => {
              const isFront = key === activeKey;
              const Icon = card.icon;
              const w = isFront ? cardW + expandPadW : cardW;
              const h = isFront ? cardH + expandPadH : cardH;
              const z = isFront ? radius + 60 : radius;
              return (
                <div
                  key={card.id ?? key}
                  className={`${styles.card}${isFront ? ` ${styles.isFront}` : ''}`}
                  onClick={() => focusCard(angle)}
                  style={{
                    width: w,
                    height: h,
                    marginLeft: -w / 2,
                    marginTop: -h / 2,
                    transform: `rotateY(${angle}deg) translateZ(${z}px)`,
                    zIndex: isFront ? 999 : Math.round(200 - Math.abs(angle)),
                  }}
                >
                  <div className={styles.face}>
                    {card.label && (
                      <span className={styles.label}>{card.label}</span>
                    )}
                    {isFront && (
                      <div className={styles.content}>
                        {card.label && (
                          <div className={styles.eyebrow}>{card.label}</div>
                        )}
                        <div className={styles.icon} aria-hidden="true">
                          {Icon ? (
                            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                          ) : null}
                        </div>
                        {card.title && (
                          <h3 className={styles.title}>{card.title}</h3>
                        )}
                        {card.desc && (
                          <p className={styles.desc}>{card.desc}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div
              className={styles.spine}
              style={{ transform: `translateZ(${radius}px) translateX(-50%)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
