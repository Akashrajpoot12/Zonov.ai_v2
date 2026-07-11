"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowRight, MessageSquare, Phone, Globe, Smartphone, Mail, User, Brain, ShieldCheck, Lock, Cloud, Key, ClipboardList, EyeOff } from 'lucide-react';
import FadeIn from "@/components/ui/FadeIn";

// --- DATA ---
const STEPS = [
  {
    id: '01',
    name: 'DEFINE',
    title: 'Define',
    description: 'Identify the highest-impact opportunities for AI to transform your practice and design an expert solution.'
  },
  {
    id: '02',
    name: 'TRAIN',
    title: 'Train',
    description: 'Stress-test your agent against millions of simulated patient interactions to guarantee safe performance before deployment.'
  },
  {
    id: '03',
    name: 'SECURE',
    title: 'Secure',
    description: 'Protect patient data with HIPAA-compliant infrastructure, end-to-end encryption, and rigorous access controls.'
  },
  {
    id: '04',
    name: 'OPTIMIZE',
    title: 'Optimize',
    description: 'Continuously improve agent performance and capabilities through autonomous self-learning, based on your real-world data.'
  }
];

const METRICS_DATA = [
  { name: "OPD Efficiency", passes: "Up to 60%", rate: "99%", color: "bg-green-500" },
  { name: "Doc. Time Saved", passes: "~2 hrs/doc", rate: "100%", color: "bg-green-500" },
  { name: "Claim Rejections", passes: "-20%", rate: "98%", color: "bg-green-500" },
  { name: "Finance Leakage", passes: "-20%", rate: "95%", color: "bg-amber-500" }
];

const DEFINE_LABELS: Record<number, string> = {
  2: "Global Directives",
  5: "Functional Memory",
  8: "Dynamic Behaviors",
  11: "Core Persona",
  14: "Context Graphs",
  17: "Actions",
  20: "Safeguards"
};

const DEFINE_PAGES_CONTENT: any = {
  0: { title: "Clinical Workflows", items: ["Voice-to-Text Prescriptions", "OPD Intake Automation", "Diagnostics Tracking"] },
  1: { title: "Hospital Operations", items: ["IPD Handovers", "OT Scheduling", "Pharmacy Alerts"] },
  2: { title: "Finance & Claims", items: ["Claim Scrubbing", "Leakage Detection", "Auto-Billing"] },
  3: { title: "Patient Experience", items: ["24/7 Virtual Support", "Automated Follow-ups", "Appointment Booking"] }
};

const DEPLOY_LABELS = [
  { label: "HIPAA COMPLIANT", Icon: ShieldCheck, fill: false },
  { label: "E2E ENCRYPTION", Icon: Lock, fill: true },
  { label: "PRIVATE CLOUD", Icon: Cloud, fill: true },
  { label: "ROLE ACCESS", Icon: Key, fill: false },
  { label: "AUDIT TRAILS", Icon: ClipboardList, fill: false },
  { label: "ZERO LEAK", Icon: EyeOff, fill: true }
];

const NUM_PAGES = 32;

const CHAT_DATA: Record<number, { user: string, bot: string }> = {
  0: {
    user: "No, nothing like that.",
    bot: "Are there any prior medical conditions I should know about?"
  },
  1: {
    user: "Just a bit of morning fatigue.",
    bot: "Have you experienced any unusual dizziness or fatigue lately?"
  },
  2: {
    user: "About a 4 out of 10.",
    bot: "How would you rate your average pain level this week?"
  },
  3: {
    user: "I take Vitamin D supplements.",
    bot: "Are you currently taking any over-the-counter medications?"
  },
  4: {
    user: "Yes, standard blood work.",
    bot: "Did you complete the lab tests we discussed last month?"
  }
};

// --- COMPONENTS ---

export default function AiCareModelSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Only run the auto-advance loop while the section is actually on screen —
  // avoids re-rendering the 32-card 3D visual every 4.5s (and the frame hitch
  // that causes) when the user has scrolled elsewhere.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isHovering || !inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovering, inView]);

  return (
    <section ref={sectionRef} className="bg-[var(--bg)] section-py overflow-hidden">
      <div className="container-wide px-edge text-center mb-16">
        <FadeIn>
          <p className="type-mono text-[var(--primary)] mb-4">CLINICAL AGENTS</p>
          <h2 className="type-h1 text-[var(--text)] max-w-3xl mx-auto [text-wrap:balance] google-sans-700">
            AI built for your care model
          </h2>
          <p className="type-body-lg text-[var(--text-muted)] mt-4 max-w-xl mx-auto">
            Custom clinical agents for your unique patients and workflows.
          </p>
        </FadeIn>
      </div>

      <div className="container-wide px-edge grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <div 
          className="lg:col-span-4 flex flex-col justify-center h-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex flex-col space-y-4 mb-12 relative ml-4 lg:ml-0">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--border)]" />
            <div 
              className="absolute left-[-1px] w-[3px] bg-[var(--primary)] transition-all duration-500 ease-in-out"
              style={{ 
                top: `${activeStep * 25}%`, 
                height: '25%',
                marginTop: activeStep === 0 ? '0' : '16px'
              }} 
            />
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`text-left pl-6 py-2 text-xs font-mono tracking-[0.2em] transition-all duration-300 z-10 ${
                  activeStep === idx ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {step.id} {step.name}
              </button>
            ))}
          </div>

          <div className="min-h-[160px] md:min-h-[200px] relative ml-4 lg:ml-0">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  activeStep === idx 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <h3 className="text-xl md:text-2xl text-[var(--text)] mb-4 font-medium" style={{ fontFamily: "var(--font-playfair)" }}>{step.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-8 text-sm md:text-base">
                  {step.description}
                </p>
                <a href="#" className="inline-flex items-center text-sm font-semibold text-[var(--text)] hover:opacity-70 transition-opacity">
                  Explore Platform <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 relative h-[450px] md:h-[650px] w-full flex items-center justify-center perspective-[1400px]">
          <Visualization activeStep={activeStep} />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-[1400px] { perspective: 1400px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes cbModelFadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}} />
    </section>
  );
}

function Visualization({ activeStep }: { activeStep: number }) {
  const pages = Array.from({ length: NUM_PAGES });

  const getPageStyle = (index: number) => {
    let hingeAngle = index * (360 / NUM_PAGES); 
    let radius = 100; 
    let pageTurn = -85; 
    let zIndex = index; 
    let opacity = 1;

    return {
      transformOrigin: 'left center', 
      transform: `rotateY(${hingeAngle}deg) translateZ(${radius}px) rotateY(${pageTurn}deg)`,
      transition: 'transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
      zIndex: zIndex,
      opacity: opacity
    };
  };

  const getPivotStyle = () => {
    let rotY = 0;
    let rotX = -12;
    if (activeStep === 0) rotY = -35;  
    if (activeStep === 1) rotY = 15;   
    if (activeStep === 2) rotY = 140;  
    if (activeStep === 3) rotY = 280;  

    return {
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: 'transform 2.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
    };
  };


  const renderCards = (filterFn: (i: number) => boolean) => pages.map((_, i) => {
    if (!filterFn(i)) return null;
    const chat = CHAT_DATA[i];
    const isMainCard = i === 0;
    
    return (
      <div
        key={i}
        className="absolute transform-style-3d"
        style={{
          width: '150px',
          height: '200px', 
          left: '0px', 
          top: '-100px',
          borderRadius: '10px',
          backgroundColor: '#e0e7ff',
          border: '1px solid #a5b4fc',
          boxShadow: '0 4px 12px rgba(27, 79, 216, 0.2), inset -5px 0 25px rgba(165, 180, 252, 0.4)',
          ...getPageStyle(i)
        }}
      >



      </div>
    );
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-data-flow {
          animation: slideRight 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div 
        className={`absolute top-[10%] w-full flex justify-center items-center transition-all duration-1000 z-40 ${
          activeStep === 2 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="flex items-center">
          {DEPLOY_LABELS.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-lg relative bg-white border ${
                    item.fill 
                      ? 'border-[#a5b4fc] text-[var(--primary)]' 
                      : 'border-[#d6e2ff] text-[var(--text-muted)]'
                  }`}
                >
                  <item.Icon size={24} strokeWidth={1.5} />
                  {item.fill && <div className="absolute inset-0 rounded-2xl bg-[var(--primary)] opacity-10 blur-md -z-10" />}
                </div>
                <span className="absolute top-[120%] text-[9px] tracking-widest font-mono text-[var(--text)] font-bold uppercase whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#d6e2ff]">
                  {item.label}
                </span>
              </div>
              {i < DEPLOY_LABELS.length - 1 && (
                <div className="w-8 md:w-12 h-[2px] bg-[#d6e2ff] relative overflow-hidden flex-shrink-0">
                  <div 
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-80 animate-data-flow" 
                    style={{ animationDelay: `${i * 0.2}s` }} 
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div 
        className={`absolute inset-0 md:inset-auto md:right-0 md:top-1/2 flex items-center justify-center transition-all duration-1000 z-50 origin-left ${
          activeStep === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: activeStep === 0 
            ? 'translateY(-50%) translateX(0) scale(1)' 
            : 'translateY(-50%) translateX(-250px) scale(0.3)'
        }}
      >
        <div className="w-full max-w-[360px] bg-[#f0f4ff]/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_60px_rgba(27,79,216,0.2)] border border-[#d6e2ff] text-sm grid grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col p-3 bg-white border border-[#d6e2ff] rounded-xl shadow-sm">
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              </div>
              <h4 className="text-[10px] font-bold text-[var(--text)] uppercase tracking-wider mb-2 line-clamp-1">
                {DEFINE_PAGES_CONTENT[i]?.title}
              </h4>
              <div className="space-y-1">
                {DEFINE_PAGES_CONTENT[i]?.items.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <ArrowRight className="w-2 h-2 text-[var(--primary)] shrink-0" />
                    <span className="text-[8px] text-[var(--text-muted)] font-medium leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div 
        className={`absolute inset-0 md:inset-auto md:right-0 md:top-1/2 flex items-center justify-center transition-all duration-1000 z-50 origin-left ${
          activeStep === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: activeStep === 1 
            ? 'translateY(-50%) translateX(0) scale(1)' 
            : 'translateY(-50%) translateX(-250px) scale(0.3)'
        }}
      >
        <div className="w-full max-w-[360px] bg-[#f0f4ff]/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_60px_rgba(27,79,216,0.2)] border border-[#d6e2ff] text-sm space-y-4">
          <div className="text-[var(--text-muted)] border-b border-[var(--border)] pb-3 mb-4 uppercase tracking-wider font-mono text-[9px] flex justify-between items-center">
            <span>Simulated Interactions</span>
            <span className="text-[var(--primary)] font-bold">Live Test</span>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {[0, 1, 2].map((i) => {
              const chat = CHAT_DATA[i];
              return (
                <div key={i} className="flex flex-col space-y-3 pb-3 border-b border-[var(--border)] last:border-0 last:pb-0">
                  <div className="flex items-start justify-end space-x-2">
                    <div className="bg-[#f9fafb] rounded-xl rounded-tr-sm px-3 py-2 text-[11px] leading-[1.5] text-[var(--text)] max-w-[85%] border border-[var(--border)] shadow-sm font-medium">
                      {chat.user}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#f9fafb] border border-[#d6e2ff] text-[var(--text-muted)] flex items-center justify-center shrink-0 shadow-sm">
                      <User size={12} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="flex items-start justify-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 shadow-md">
                      <MessageCircle size={12} strokeWidth={2} />
                    </div>
                    <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 text-[11px] leading-[1.5] text-[var(--text)] max-w-[85%] border border-[var(--border)] shadow-sm font-medium">
                      {chat.bot}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div 
        className={`absolute inset-0 md:inset-auto md:right-0 md:top-1/2 flex items-center justify-center transition-all duration-1000 z-50 origin-left ${
          activeStep === 3 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transform: activeStep === 3 
            ? 'translateY(-50%) translateX(0) scale(1)' 
            : 'translateY(-50%) translateX(-250px) scale(0.3)'
        }}
      >
        <div className="w-full max-w-[360px] bg-[#f0f4ff]/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_60px_rgba(27,79,216,0.2)] border border-[#d6e2ff] text-sm">
          <div className="grid grid-cols-4 gap-2 text-[var(--text-muted)] border-b border-[var(--border)] pb-3 mb-4 uppercase tracking-wider font-mono text-[9px]">
            <div className="col-span-2">Metric</div>
            <div className="text-right">Passes</div>
            <div className="text-right">Pass Rate</div>
          </div>
          {METRICS_DATA.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 py-2.5 items-center text-[var(--text)]">
              <div className="col-span-2 font-medium text-[11px]">{row.name}</div>
              <div className="text-right font-mono text-[var(--text-muted)] text-[11px]">{row.passes}</div>
              <div className="text-right flex items-center justify-end space-x-2">
                <span className="font-mono text-[11px] font-semibold">{row.rate}</span>
                <div className="w-1.5 h-3.5 rounded-full bg-gray-200 overflow-hidden hidden sm:block">
                  <div className={`w-full h-full ${row.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div 
        className="relative w-0 h-0 transform-style-3d"
        style={getPivotStyle()}
      >
        {renderCards((i) => true)}
      </div>
    </div>
  );
}
