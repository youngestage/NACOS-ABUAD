"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Cloud,
  Cpu,
  Palette,
  Terminal,
  CheckCircle2,
  Users,
  Zap,
  RotateCcw,
} from "lucide-react";

interface SkillDiscoveryPreviewProps {
  onOpenQuiz: () => void;
}

interface Trait {
  id: string;
  label: string;
  icon: string;
  trackId: string;
}

interface TrackData {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  matchScore: number;
  rationale: string;
  coreStack: string[];
  mentorsCount: number;
  placementOutcome: string;
  secondaryTitle: string;
  secondaryCategory: string;
  secondaryScore: number;
  secondaryStack: string[];
  tertiaryTitle: string;
  tertiaryCategory: string;
  tertiaryScore: number;
  tertiaryStack: string[];
}

const traits: Trait[] = [
  { id: "sec", label: "Breaking & Securing Protocols", icon: "🛡️", trackId: "cybersecurity" },
  { id: "cloud", label: "Scaling Distributed Clouds", icon: "☁️", trackId: "cloud" },
  { id: "ai", label: "Training AI & Neural Models", icon: "🤖", trackId: "ai" },
  { id: "ui", label: "Pixel-Perfect UI & Interaction", icon: "🎨", trackId: "design" },
  { id: "devops", label: "CI/CD Automation & Pipelines", icon: "⚡", trackId: "devops" },
];

const trackProfiles: Record<string, TrackData> = {
  cybersecurity: {
    id: "cybersecurity",
    title: "Cybersecurity & Defense",
    category: "Systems Security",
    icon: <Shield className="w-5 h-5 text-forest" />,
    matchScore: 96,
    rationale:
      "High natural aptitude for network packet analysis, kernel security audits, and ethical penetration testing.",
    coreStack: ["Wireshark", "Burp Suite", "Linux Hardening", "OWASP Top 10", "Python Sec"],
    mentorsCount: 14,
    placementOutcome: "Top Placements: Moniepoint, Interswitch & CyberSOC",
    secondaryTitle: "DevOps & Release Eng",
    secondaryCategory: "Automation",
    secondaryScore: 88,
    secondaryStack: ["GitHub Actions", "Kubernetes", "Docker", "Prometheus"],
    tertiaryTitle: "Cloud Architecture",
    tertiaryCategory: "Infrastructure",
    tertiaryScore: 82,
    tertiaryStack: ["AWS / GCP", "Terraform", "Serverless", "Database Clustering"],
  },
  cloud: {
    id: "cloud",
    title: "Cloud Computing & Architecture",
    category: "Distributed Infrastructure",
    icon: <Cloud className="w-5 h-5 text-forest" />,
    matchScore: 95,
    rationale:
      "Strong intuition for multi-region microservices, asynchronous message queues, and fault-tolerant serverless clusters.",
    coreStack: ["AWS / GCP", "Terraform", "Docker", "Kubernetes", "Redis Caching"],
    mentorsCount: 19,
    placementOutcome: "Top Placements: Paystack, Sterling Bank & AWS Community",
    secondaryTitle: "DevOps & Reliability",
    secondaryCategory: "Automation",
    secondaryScore: 90,
    secondaryStack: ["CI/CD Pipelines", "Helm", "Nginx", "Grafana"],
    tertiaryTitle: "Backend Systems",
    tertiaryCategory: "Software Eng",
    tertiaryScore: 85,
    tertiaryStack: ["Node.js / Go", "PostgreSQL", "Kafka", "gRPC"],
  },
  ai: {
    id: "ai",
    title: "AI & Machine Learning Systems",
    category: "Applied Intelligence",
    icon: <Cpu className="w-5 h-5 text-forest" />,
    matchScore: 97,
    rationale:
      "Exceptional affinity for mathematical modeling, PyTorch transformer architectures, and scalable inference pipelines.",
    coreStack: ["PyTorch", "Hugging Face", "FastAPI", "Vector DBs", "NumPy / Pandas"],
    mentorsCount: 12,
    placementOutcome: "Top Placements: DataCamp, Google Developer Experts & Research",
    secondaryTitle: "Data Engineering",
    secondaryCategory: "Big Data Infra",
    secondaryScore: 89,
    secondaryStack: ["Apache Spark", "Airflow", "dbt", "Snowflake"],
    tertiaryTitle: "Backend Systems",
    tertiaryCategory: "Engineering",
    tertiaryScore: 84,
    tertiaryStack: ["Python", "Docker", "PostgreSQL", "REST APIs"],
  },
  design: {
    id: "design",
    title: "UI/UX & Product Engineering",
    category: "Frontend & Interaction",
    icon: <Palette className="w-5 h-5 text-forest" />,
    matchScore: 94,
    rationale:
      "Sharp eye for spatial layout, design token systems, accessible micro-interactions, and high-performance component trees.",
    coreStack: ["Figma Tokens", "Tailwind CSS", "Next.js", "Framer Motion", "Storybook"],
    mentorsCount: 16,
    placementOutcome: "Top Placements: Flutterwave, Kuda Bank & Design Agencies",
    secondaryTitle: "Fullstack Web Eng",
    secondaryCategory: "Web Systems",
    secondaryScore: 87,
    secondaryStack: ["TypeScript", "React", "Server Actions", "Prisma"],
    tertiaryTitle: "Mobile Dev (Flutter)",
    tertiaryCategory: "Mobile Apps",
    tertiaryScore: 81,
    tertiaryStack: ["Dart", "Bloc Architecture", "iOS / Android", "Firebase"],
  },
  devops: {
    id: "devops",
    title: "DevOps & Infrastructure Automation",
    category: "Platform Engineering",
    icon: <Terminal className="w-5 h-5 text-forest" />,
    matchScore: 96,
    rationale:
      "Prefers automated testing suites, declarative infrastructure as code, container orchestration, and zero-downtime deployments.",
    coreStack: ["GitHub Actions", "Terraform", "Kubernetes", "Ansible", "Nginx"],
    mentorsCount: 15,
    placementOutcome: "Top Placements: Sterling Bank, Moniepoint & AWS Community",
    secondaryTitle: "Cloud Architecture",
    secondaryCategory: "Infrastructure",
    secondaryScore: 91,
    secondaryStack: ["AWS", "Docker", "Serverless", "Vault"],
    tertiaryTitle: "Cybersecurity & Audit",
    tertiaryCategory: "Security",
    tertiaryScore: 83,
    tertiaryStack: ["Linux", "SSL/TLS", "SIEM", "Hardening"],
  },
};

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  const [selectedTrait, setSelectedTrait] = useState<string>("sec");
  const prefersReduced = useReducedMotion();

  const activeTrait = traits.find((t) => t.id === selectedTrait) || traits[0];
  const activeProfile = trackProfiles[activeTrait.trackId] || trackProfiles.cybersecurity;

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - activeProfile.matchScore / 100);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-paper border-t border-line relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-b from-forest/5 via-[#3DDC84]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 border border-forest/15 text-xs font-mono font-semibold uppercase tracking-wider text-forest">
              <Sparkles className="w-3.5 h-3.5 text-signal" />
              <span>AI-POWERED APTITUDE CALIBRATION</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              Discover your highest-leverage tech path.
            </h2>
            <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed">
              Every student learns differently. Select your natural problem-solving tendencies below to see live aptitude matching.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="self-start md:self-auto px-6 py-3 rounded-full bg-forest hover:bg-forest-dark text-paper text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 transform hover:scale-[1.02] shadow-xs cursor-pointer shrink-0"
          >
            <span>Take full diagnostic quiz</span>
            <ArrowRight className="w-4 h-4 text-signal" />
          </button>
        </div>

        {/* Interactive Problem-Solving Traits Selector */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-mono text-xs text-ink/60 uppercase tracking-wider font-semibold">
              Select Your Engineering Tendency:
            </span>
            <span className="text-[11px] font-mono text-forest flex items-center gap-1 hidden sm:inline-flex">
              <Zap className="w-3 h-3 text-signal" /> Live Match Recalculation Active
            </span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {traits.map((trait) => {
              const isSelected = selectedTrait === trait.id;
              return (
                <button
                  key={trait.id}
                  onClick={() => setSelectedTrait(trait.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer border ${
                    isSelected
                      ? "bg-forest text-paper border-forest shadow-xs font-semibold scale-[1.02]"
                      : "bg-white text-ink/75 hover:text-ink hover:bg-white/90 border-line shadow-2xs"
                  }`}
                >
                  <span>{trait.icon}</span>
                  <span>{trait.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Primary Spotlight Match Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line p-6 sm:p-8 lg:p-10 shadow-2xs flex flex-col justify-between relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProfile.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Header Row: Track Badge + Circular Match Gauge */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-line">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-forest font-semibold px-3 py-1 rounded-full bg-forest/10 border border-forest/15 inline-flex items-center gap-1.5">
                      {activeProfile.icon}
                      <span>{activeProfile.category}</span>
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight">
                      {activeProfile.title}
                    </h3>
                  </div>

                  {/* High-Contrast Signal Green Circular Gauge */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0">
                    <svg className="w-16 h-16 sm:w-18 sm:h-18 -rotate-90" viewBox="0 0 60 60">
                      <circle
                        cx="30"
                        cy="30"
                        r={radius}
                        fill="none"
                        stroke="#E8E5DC"
                        strokeWidth="4.5"
                      />
                      <motion.circle
                        cx="30"
                        cy="30"
                        r={radius}
                        fill="none"
                        stroke="#3DDC84"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={prefersReduced ? {} : { strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="font-mono text-xs sm:text-sm font-bold text-ink leading-none">
                        {activeProfile.matchScore}%
                      </span>
                      <span className="text-[9px] font-mono text-ink/50 uppercase">Match</span>
                    </div>
                  </div>
                </div>

                {/* Rationale Copy */}
                <div className="space-y-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink/50 font-semibold block">
                    AI Match Rationale:
                  </span>
                  <p className="text-sm sm:text-base text-ink/80 font-body leading-relaxed">
                    {activeProfile.rationale}
                  </p>
                </div>

                {/* Core Stack Badges */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-ink/50 font-semibold block">
                    Curated Core Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProfile.coreStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-paper border border-line font-mono text-xs font-medium text-ink/85 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Placement Proof */}
                <div className="p-3.5 rounded-2xl bg-paper/80 border border-line text-xs font-mono text-ink/75 flex items-center justify-between gap-3">
                  <span className="font-semibold text-forest">Verified Track Proof:</span>
                  <span className="text-ink/80 truncate">{activeProfile.placementOutcome}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Action Footer */}
            <div className="mt-8 pt-5 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono text-ink/65 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-signal" />
                <span>{activeProfile.mentorsCount} Verified ABUAD Mentors Available</span>
              </span>

              <button
                onClick={onOpenQuiz}
                className="text-xs sm:text-sm font-mono font-semibold text-forest hover:text-forest-dark inline-flex items-center gap-1.5 cursor-pointer group"
              >
                <span>Calibrate My Score</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Secondary & Tertiary Complementary Matches (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Secondary Match Card */}
            <div className="bg-white rounded-3xl border border-line p-6 sm:p-7 shadow-2xs flex flex-col justify-between flex-1 hover:border-forest/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-forest font-semibold bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/15">
                    {activeProfile.secondaryCategory}
                  </span>
                  <span className="font-mono text-xs font-bold text-forest bg-signal/15 px-2.5 py-0.5 rounded-full">
                    {activeProfile.secondaryScore}% Match
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg text-ink">
                    {activeProfile.secondaryTitle}
                  </h4>
                  <p className="text-xs text-ink/65 font-body mt-1 leading-relaxed">
                    Strong secondary alignment. Ideal for building multi-disciplinary technical breadth.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProfile.secondaryStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded bg-paper border border-line font-mono text-[11px] text-ink/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-mono">
                <span className="text-ink/50">#2 Ranked Affinity</span>
                <button
                  onClick={onOpenQuiz}
                  className="text-forest hover:text-forest-dark font-semibold cursor-pointer"
                >
                  Explore →
                </button>
              </div>
            </div>

            {/* Tertiary Match Card */}
            <div className="bg-white rounded-3xl border border-line p-6 sm:p-7 shadow-2xs flex flex-col justify-between flex-1 hover:border-forest/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-forest font-semibold bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/15">
                    {activeProfile.tertiaryCategory}
                  </span>
                  <span className="font-mono text-xs font-bold text-forest bg-signal/15 px-2.5 py-0.5 rounded-full">
                    {activeProfile.tertiaryScore}% Match
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg text-ink">
                    {activeProfile.tertiaryTitle}
                  </h4>
                  <p className="text-xs text-ink/65 font-body mt-1 leading-relaxed">
                    Solid foundational synergy. Broadens your campus portfolio and SIWES flexibility.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProfile.tertiaryStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded bg-paper border border-line font-mono text-[11px] text-ink/75"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-mono">
                <span className="text-ink/50">#3 Ranked Affinity</span>
                <button
                  onClick={onOpenQuiz}
                  className="text-forest hover:text-forest-dark font-semibold cursor-pointer"
                >
                  Explore →
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-xs sm:text-sm text-ink/70 font-body">
            Not sure where you fit? Over 1,200+ NACOS students have calibrated their roadmap this session.
          </p>
          <button
            onClick={onOpenQuiz}
            className="font-mono text-xs sm:text-sm font-semibold text-forest hover:text-forest-dark inline-flex items-center gap-1.5 cursor-pointer group"
          >
            <span>Take the complete 3-minute Skill Discovery quiz</span>
            <ArrowRight className="w-3.5 h-3.5 text-signal group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
