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
  CheckCircle2,
  Star,
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
  marketDemand: string;
  rationale: string;
  roadmap: {
    weeks: string;
    milestone: string;
    detail: string;
    done: boolean;
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
  placementOutcome: string;
}

const archetypes: TrackArchetype[] = [
  {
    id: "security",
    tabLabel: "Systems & Security",
    badge: "SYSTEMS SECURITY",
    title: "Cybersecurity & Defense",
    icon: <Shield className="w-4 h-4 text-forest" />,
    matchScore: 96,
    marketDemand: "High Demand 🔥",
    rationale:
      "High natural aptitude for network packet analysis, kernel security audits, and ethical penetration testing.",
    roadmap: [
      {
        weeks: "W1–W2",
        milestone: "Network Protocol Audits",
        detail: "Wireshark packet tracing & socket vulnerability analysis",
        done: true,
      },
      {
        weeks: "W3–W4",
        milestone: "Custom Firewall Scanner",
        detail: "Async Python socket port scanner with CVE matching",
        done: false,
      },
      {
        weeks: "W5–W6",
        milestone: "Production SIWES Defense",
        detail: "Penetration testing sandbox and NACOS verified credential",
        done: false,
      },
    ],
    stack: ["Wireshark", "Burp Suite", "Linux Hardening", "OWASP Top 10", "Python Sec"],
    mentor: {
      name: "Tobi Ogunlesi",
      role: "Software Engineering, 500L",
      company: "CyberSOC SIWES Fellow",
      avatarInitials: "TO",
      avatarBg: "bg-[#0F1912]",
      rating: "4.98",
      mentees: 18,
    },
    placementOutcome: "Moniepoint, Interswitch & CyberSOC",
  },
  {
    id: "cloud",
    tabLabel: "Cloud & Infrastructure",
    badge: "DISTRIBUTED CLOUD",
    title: "Cloud Architecture & DevOps",
    icon: <Cloud className="w-4 h-4 text-forest" />,
    matchScore: 95,
    marketDemand: "High Demand ⚡",
    rationale:
      "Strong intuition for multi-region microservices, asynchronous queues, and fault-tolerant serverless clusters.",
    roadmap: [
      {
        weeks: "W1–W2",
        milestone: "Dockerized Microservices",
        detail: "Service separation with REST/gRPC and Docker Compose",
        done: true,
      },
      {
        weeks: "W3–W4",
        milestone: "Terraform Cloud Infra",
        detail: "Automating AWS VPCs, ECS clusters, and Redis caching",
        done: false,
      },
      {
        weeks: "W5–W6",
        milestone: "Zero-Downtime Deployments",
        detail: "Blue/green rollouts with Prometheus observability",
        done: false,
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
    placementOutcome: "Paystack, Sterling Bank & AWS Community",
  },
  {
    id: "ai",
    tabLabel: "AI & Machine Learning",
    badge: "APPLIED AI",
    title: "Applied AI & Neural Systems",
    icon: <Cpu className="w-4 h-4 text-forest" />,
    matchScore: 97,
    marketDemand: "High Demand 🔥",
    rationale:
      "Exceptional affinity for transformer architectures, embedding retrieval, and scalable inference pipelines.",
    roadmap: [
      {
        weeks: "W1–W2",
        milestone: "PyTorch Foundations",
        detail: "Tensor operations, backpropagation, and loss surface optimization",
        done: true,
      },
      {
        weeks: "W3–W4",
        milestone: "RAG & LLM Fine-Tuning",
        detail: "Embedding retrieval with pgvector, Chroma, and FastAPI",
        done: false,
      },
      {
        weeks: "W5–W6",
        milestone: "Production AI Web App",
        detail: "GPU model quantization and deployed fullstack AI application",
        done: false,
      },
    ],
    stack: ["PyTorch", "Hugging Face", "FastAPI", "pgvector", "LangChain"],
    mentor: {
      name: "Kenechukwu Okafor",
      role: "Computer Science, 400L",
      company: "AI Researcher (A+ Thesis)",
      avatarInitials: "KO",
      avatarBg: "bg-gold",
      rating: "4.96",
      mentees: 15,
    },
    placementOutcome: "DataCamp, Google Developer Experts & Research",
  },
  {
    id: "product",
    tabLabel: "Product & UI Engineering",
    badge: "FRONTEND & UI",
    title: "Product & Frontend Systems",
    icon: <Palette className="w-4 h-4 text-forest" />,
    matchScore: 94,
    marketDemand: "High Demand ⚡",
    rationale:
      "Sharp eye for design token architecture, accessible micro-interactions, and high-performance component trees.",
    roadmap: [
      {
        weeks: "W1–W2",
        milestone: "Figma Token Pipeline",
        detail: "Building atomic design libraries and token translation to Tailwind",
        done: true,
      },
      {
        weeks: "W3–W4",
        milestone: "Interactive Web App",
        detail: "Optimistic UI updates, fluid gestures, and TanStack state slices",
        done: false,
      },
      {
        weeks: "W5–W6",
        milestone: "Production Portfolio Ship",
        detail: "Lighthouse 100 performance score and hackathon submission",
        done: false,
      },
    ],
    stack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Prisma"],
    mentor: {
      name: "Chidinma Adeleke",
      role: "Computer Science, 300L",
      company: "Placed at Paystack (Intern)",
      avatarInitials: "CA",
      avatarBg: "bg-forest-light",
      rating: "4.99",
      mentees: 21,
    },
    placementOutcome: "Flutterwave, Kuda Bank & Paystack",
  },
];

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  const [selectedId, setSelectedId] = useState<string>("security");

  const active = archetypes.find((a) => a.id === selectedId) || archetypes[0];

  return (
    <section id="skills" className="py-20 sm:py-28 bg-paper border-t border-line relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-b from-forest/5 via-[#3DDC84]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 border border-forest/15 text-xs font-mono font-semibold uppercase tracking-wider text-forest">
              <Sparkles className="w-3.5 h-3.5 text-signal" />
              <span>AI RECOMMENDATION BLUEPRINT</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              Your custom semester roadmap<span className="text-forest">.</span>
            </h2>
            <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed">
              Explore how your problem-solving tendencies map to structured semester milestones and senior peer mentors.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="self-start md:self-auto px-6 py-3.5 rounded-full bg-forest hover:bg-forest-dark text-paper text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 transform hover:scale-[1.02] shadow-sm cursor-pointer shrink-0"
          >
            <span>Take 3-min Quiz</span>
            <ArrowRight className="w-4 h-4 text-signal" />
          </button>
        </div>

        {/* Simplified Filter Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {archetypes.map((arch) => {
            const isSelected = selectedId === arch.id;
            return (
              <button
                key={arch.id}
                onClick={() => setSelectedId(arch.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? "bg-forest text-paper border-forest shadow-xs font-semibold"
                    : "bg-white text-ink/70 hover:text-ink hover:bg-white/90 border-line shadow-2xs"
                }`}
              >
                <span>{arch.icon}</span>
                <span>{arch.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Clean 2-Column Master Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Track Blueprint & 6-Week Milestones (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line p-6 sm:p-8 lg:p-10 shadow-2xs flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Track Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-5 border-b border-line">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-forest font-semibold block">
                      {active.badge}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mt-0.5">
                      {active.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-forest text-paper font-mono text-xs font-bold shadow-xs">
                    {active.matchScore}% Match
                  </span>
                </div>

                {/* Rationale */}
                <p className="text-sm sm:text-base text-ink/80 font-body leading-relaxed">
                  {active.rationale}
                </p>

                {/* 6-Week Structured Roadmap */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-ink/50 uppercase tracking-wider font-semibold block">
                    6-Week Semester Progression:
                  </span>
                  
                  <div className="space-y-3">
                    {active.roadmap.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-paper/60 border border-line flex items-start gap-3"
                      >
                        <span className="font-mono text-xs font-bold text-forest bg-forest/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                          {step.weeks}
                        </span>
                        <div className="space-y-0.5">
                          <h4 className="font-display font-bold text-sm text-ink">
                            {step.milestone}
                          </h4>
                          <p className="text-xs text-ink/70 font-body">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-2">
                  <span className="text-xs font-mono text-ink/50 uppercase tracking-wider font-semibold block mb-2">
                    Core Toolchain:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {active.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-paper border border-line font-mono text-xs text-ink/80 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Lead Mentor & Placement Proof (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-line p-6 sm:p-8 lg:p-10 shadow-2xs flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Mentor Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
                    Assigned Track Mentor
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-gold font-bold">
                    <Star className="w-3.5 h-3.5 fill-gold" />
                    {active.mentor.rating}
                  </span>
                </div>

                {/* Mentor Profile */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${active.mentor.avatarBg} text-paper border border-line flex items-center justify-center font-display font-bold text-lg shadow-sm shrink-0`}
                  >
                    {active.mentor.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-ink">
                      {active.mentor.name}
                    </h4>
                    <p className="text-xs font-mono text-ink/65">
                      {active.mentor.role}
                    </p>
                    <p className="text-xs font-mono font-medium text-forest mt-0.5">
                      {active.mentor.company}
                    </p>
                  </div>
                </div>

                {/* Mentor Availability Pill */}
                <div className="p-3.5 rounded-2xl bg-paper/60 border border-line text-xs font-mono text-ink/75 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>{active.mentor.mentees} Active Students</span>
                  </span>
                  <span className="text-forest font-semibold">Weekly Reviews</span>
                </div>

                {/* Placement Proof */}
                <div className="p-3.5 rounded-2xl bg-forest/5 border border-forest/15 space-y-1">
                  <span className="text-[11px] font-mono text-forest uppercase font-semibold block">
                    Alumni Placement Record:
                  </span>
                  <p className="text-xs font-mono text-ink/80 font-medium">
                    {active.placementOutcome}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Direct Action Button */}
            <div className="pt-6 mt-6 border-t border-line">
              <button
                onClick={onOpenQuiz}
                className="w-full py-3.5 rounded-2xl bg-forest hover:bg-forest-dark text-paper font-semibold text-xs sm:text-sm font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>Pair with Mentor in this Track</span>
                <ArrowRight className="w-3.5 h-3.5 text-signal" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
