"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Cloud,
  Cpu,
  Palette,
  CheckCircle2,
  Zap,
  TrendingUp,
  GitPullRequest,
  Star,
  Terminal,
  Award,
} from "lucide-react";

interface SkillDiscoveryPreviewProps {
  onOpenQuiz: () => void;
}

interface TrackArchetype {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  icon: React.ReactNode;
  matchScore: number;
  marketDemand: "Extreme 🔥" | "Very High ⚡" | "High 🚀";
  systemBreakdown: {
    label: string;
    score: number;
  }[];
  roadmap: {
    weeks: string;
    milestone: string;
    detail: string;
    status: "done" | "active" | "target";
  }[];
  stack: string[];
  mentor: {
    name: string;
    role: string;
    company: string;
    avatarInitials: string;
    avatarBg: string;
    rating: string;
    mentees: number;
  };
}

const archetypes: TrackArchetype[] = [
  {
    id: "security",
    tabLabel: "Systems & Security",
    badge: "SYSTEMS SECURITY ARCHETYPE",
    title: "Cybersecurity & Kernel Defense",
    icon: <Shield className="w-4 h-4 text-signal" />,
    matchScore: 96,
    marketDemand: "Extreme 🔥",
    systemBreakdown: [
      { label: "Socket & Packet Inspection", score: 96 },
      { label: "Cryptographic Protocols", score: 92 },
      { label: "Linux Daemon Hardening", score: 94 },
      { label: "Reverse Engineering", score: 88 },
    ],
    roadmap: [
      {
        weeks: "W1-W2",
        milestone: "Network Protocol Audits",
        detail: "Wireshark packet tracing & TCP/IP handshake vulnerability analysis",
        status: "done",
      },
      {
        weeks: "W3-W4",
        milestone: "Custom Firewall Scanner",
        detail: "Building an async Python socket port scanner with CVE matching",
        status: "active",
      },
      {
        weeks: "W5-W6",
        milestone: "Production SIWES Defense",
        detail: "Penetration testing sandbox and verifiable NACOS security credential",
        status: "target",
      },
    ],
    stack: ["Wireshark", "Burp Suite", "Linux", "OWASP", "Python Sec", "Metasploit"],
    mentor: {
      name: "Tobi Ogunlesi",
      role: "Software Engineering, 500L",
      company: "CyberSOC SIWES Fellow",
      avatarInitials: "TO",
      avatarBg: "bg-[#0F1912]",
      rating: "4.98",
      mentees: 18,
    },
  },
  {
    id: "cloud",
    tabLabel: "Cloud & Distributed",
    badge: "INFRASTRUCTURE ARCHETYPE",
    title: "Cloud & Microservice Architecture",
    icon: <Cloud className="w-4 h-4 text-signal" />,
    matchScore: 95,
    marketDemand: "Very High ⚡",
    systemBreakdown: [
      { label: "Multi-Region Microservices", score: 95 },
      { label: "Async Message Queues", score: 91 },
      { label: "Container Orchestration", score: 94 },
      { label: "Database Clustering", score: 89 },
    ],
    roadmap: [
      {
        weeks: "W1-W2",
        milestone: "Dockerized Microservices",
        detail: "Modular service separation with REST/gRPC and Docker Compose",
        status: "done",
      },
      {
        weeks: "W3-W4",
        milestone: "Terraform Multi-Cloud Infra",
        detail: "Automating AWS VPCs, ECS clusters, and Redis caching layers",
        status: "active",
      },
      {
        weeks: "W5-W6",
        milestone: "Fault-Tolerant Deployments",
        detail: "Zero-downtime blue/green rollouts with Prometheus observability",
        status: "target",
      },
    ],
    stack: ["AWS / GCP", "Terraform", "Docker", "Kubernetes", "Redis", "Kafka"],
    mentor: {
      name: "Farouq Mohammed",
      role: "CS Alumni, Class of '24",
      company: "Cloud Associate @ Sterling",
      avatarInitials: "FM",
      avatarBg: "bg-forest",
      rating: "5.00",
      mentees: 24,
    },
  },
  {
    id: "ai",
    tabLabel: "AI & Machine Learning",
    badge: "INTELLIGENCE ARCHETYPE",
    title: "Applied AI & Neural Systems",
    icon: <Cpu className="w-4 h-4 text-signal" />,
    matchScore: 97,
    marketDemand: "Extreme 🔥",
    systemBreakdown: [
      { label: "Transformer Architecture", score: 97 },
      { label: "Vector Search & Embeddings", score: 94 },
      { label: "Low-Latency Inference API", score: 92 },
      { label: "Data Pipeline Automation", score: 90 },
    ],
    roadmap: [
      {
        weeks: "W1-W2",
        milestone: "PyTorch Foundations",
        detail: "Tensor operations, backpropagation, and loss surface optimization",
        status: "done",
      },
      {
        weeks: "W3-W4",
        milestone: "RAG & LLM Fine-Tuning",
        detail: "Embedding retrieval with pgvector, Chroma, and FastAPI endpoints",
        status: "active",
      },
      {
        weeks: "W5-W6",
        milestone: "Production AI Assistant",
        detail: "GPU model quantization and deployed fullstack AI web application",
        status: "target",
      },
    ],
    stack: ["PyTorch", "Hugging Face", "FastAPI", "pgvector", "LangChain", "Docker"],
    mentor: {
      name: "Kenechukwu Okafor",
      role: "Computer Science, 400L",
      company: "AI Researcher (A+ Thesis)",
      avatarInitials: "KO",
      avatarBg: "bg-gold",
      rating: "4.96",
      mentees: 15,
    },
  },
  {
    id: "product",
    tabLabel: "Product & UI Engineering",
    badge: "FRONTEND ARCHETYPE",
    title: "Fullstack Product & Design Systems",
    icon: <Palette className="w-4 h-4 text-signal" />,
    matchScore: 94,
    marketDemand: "Very High ⚡",
    systemBreakdown: [
      { label: "Design Token Architecture", score: 96 },
      { label: "React / Next.js Server Actions", score: 94 },
      { label: "Framer Motion Micro-Interactions", score: 92 },
      { label: "Accessible Semantic Markup", score: 95 },
    ],
    roadmap: [
      {
        weeks: "W1-W2",
        milestone: "Figma Token Pipeline",
        detail: "Building atomic design libraries and translating tokens to Tailwind",
        status: "done",
      },
      {
        weeks: "W3-W4",
        milestone: "Interactive Web App",
        detail: "Optimistic UI updates, fluid gestures, and TanStack state slices",
        status: "active",
      },
      {
        weeks: "W5-W6",
        milestone: "Production Portfolio Ship",
        detail: "Lighthouse 100 performance score and hackathon submission launch",
        status: "target",
      },
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Prisma", "Figma"],
    mentor: {
      name: "Chidinma Adeleke",
      role: "Computer Science, 300L",
      company: "Placed at Paystack (Intern)",
      avatarInitials: "CA",
      avatarBg: "bg-forest-light",
      rating: "4.99",
      mentees: 21,
    },
  },
];

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  const [selectedId, setSelectedId] = useState<string>("security");
  const prefersReduced = useReducedMotion();

  const active = archetypes.find((a) => a.id === selectedId) || archetypes[0];

  return (
    <section id="skills" className="py-20 sm:py-28 bg-paper border-t border-line relative overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-b from-forest/5 via-[#3DDC84]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 border border-forest/15 text-xs font-mono font-semibold uppercase tracking-wider text-forest">
              <Sparkles className="w-3.5 h-3.5 text-signal" />
              <span>AI CAREER TELEMETRY & BLUEPRINT</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              Your custom semester engineering roadmap<span className="text-forest">.</span>
            </h2>
            <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed">
              Stop guessing what framework to learn. Our diagnostic calibrates your problem-solving style directly to high-demand Nigerian tech tracks and ABUAD mentors.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="self-start md:self-auto px-6 py-3.5 rounded-full bg-forest hover:bg-forest-dark text-paper text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 transform hover:scale-[1.02] shadow-sm cursor-pointer shrink-0"
          >
            <span>Take 3-min Diagnostic</span>
            <ArrowRight className="w-4 h-4 text-signal" />
          </button>
        </div>

        {/* Interactive Archetype Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {archetypes.map((arch) => {
            const isSelected = selectedId === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => setSelectedId(arch.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-mono transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? "bg-forest text-paper border-forest shadow-xs font-semibold"
                    : "bg-white text-ink/70 hover:text-ink hover:bg-white/90 border-line shadow-2xs"
                }`}
              >
                <span>{arch.icon}</span>
                <span>{arch.tabLabel}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-signal ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Master Bento Grid (3-Module Architectural Matrix) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Module 1: Competency Telemetry & Radar (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-line p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
                  Aptitude Telemetry
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-signal bg-forest px-2.5 py-0.5 rounded-full">
                  {active.marketDemand}
                </span>
              </div>

              {/* Central Match Gauge Metric */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-paper/70 border border-line">
                <div>
                  <span className="text-[11px] font-mono text-ink/50 uppercase block">
                    Diagnostic Match
                  </span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-ink">
                    {active.matchScore}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-ink/50 uppercase block">
                    Semester Target
                  </span>
                  <span className="font-mono font-bold text-xs text-forest block">
                    Distinction Ready
                  </span>
                </div>
              </div>

              {/* 4 Fine-Grained Aptitude Bars */}
              <div className="space-y-3 pt-1">
                {active.systemBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-ink/75 truncate">{item.label}</span>
                      <span className="font-bold text-ink">{item.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                      <motion.div
                        key={`${active.id}-${idx}`}
                        className="h-full bg-forest rounded-full"
                        initial={prefersReduced ? {} : { width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stack Pills */}
            <div className="pt-5 mt-5 border-t border-line">
              <span className="text-[11px] font-mono text-ink/50 uppercase tracking-wider block mb-2">
                Production Toolchain:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {active.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-paper border border-line font-mono text-[11px] text-ink/80 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Module 2: 6-Week Structured Semester Roadmap (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-line p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div>
                  <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider block">
                    {active.badge}
                  </span>
                  <h3 className="font-display font-bold text-xl text-ink tracking-tight mt-0.5">
                    {active.title}
                  </h3>
                </div>
              </div>

              {/* 3 Step Connected Roadmap Progression */}
              <div className="space-y-4 relative">
                {/* Vertical Step Connector Line */}
                <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-line -z-0" />

                {active.roadmap.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 border ${
                        step.status === "done"
                          ? "bg-forest text-paper border-forest"
                          : step.status === "active"
                          ? "bg-signal text-ink border-signal shadow-xs"
                          : "bg-paper text-ink/50 border-line"
                      }`}
                    >
                      {step.status === "done" ? "✓" : idx + 1}
                    </div>

                    <div className="space-y-0.5 flex-1 pt-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-forest bg-forest/10 px-1.5 py-0.5 rounded">
                          {step.weeks}
                        </span>
                        <h4 className="font-display font-bold text-sm text-ink">
                          {step.milestone}
                        </h4>
                      </div>
                      <p className="text-xs text-ink/70 font-body leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Tag */}
            <div className="p-3 rounded-xl bg-forest/5 border border-forest/15 mt-5 flex items-center justify-between text-xs font-mono">
              <span className="text-forest font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-signal" />
                <span>NACOS Verified Semester Syllabus</span>
              </span>
              <span className="text-ink/60">6-Week Track</span>
            </div>
          </div>

          {/* Module 3: Paired Senior Mentor Spotlight (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-line p-6 sm:p-7 shadow-2xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
                  Lead Track Mentor
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-gold font-bold">
                  <Star className="w-3.5 h-3.5 fill-gold" />
                  {active.mentor.rating}
                </span>
              </div>

              {/* Mentor Avatar Card */}
              <div className="space-y-3">
                <div
                  className={`w-14 h-14 rounded-2xl ${active.mentor.avatarBg} text-paper border border-line flex items-center justify-center font-display font-bold text-lg shadow-sm`}
                >
                  {active.mentor.avatarInitials}
                </div>

                <div>
                  <h4 className="font-display font-bold text-base text-ink">
                    {active.mentor.name}
                  </h4>
                  <p className="text-xs font-mono text-ink/65">
                    {active.mentor.role}
                  </p>
                  <p className="text-xs font-mono font-medium text-forest mt-0.5">
                    {active.mentor.company}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-paper border border-line text-xs font-mono text-ink/75 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Active Mentees:</span>
                    <span className="font-bold text-ink">{active.mentor.mentees} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Async Reviews:</span>
                    <span className="text-signal font-semibold">Sundays</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Booking Trigger */}
            <div className="pt-4 border-t border-line">
              <button
                onClick={onOpenQuiz}
                className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-paper font-semibold text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Pair with Mentor</span>
                <ArrowRight className="w-3.5 h-3.5 text-signal" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-10 text-center space-y-2">
          <p className="text-xs sm:text-sm text-ink/70 font-body">
            Not sure where you belong? 1,200+ NACOS students have calibrated their roadmap this semester.
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
