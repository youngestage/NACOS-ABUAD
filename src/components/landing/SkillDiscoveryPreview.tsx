"use client";

import React from "react";
import { ArrowRight, Sparkles, Shield, Cloud, Terminal, CheckCircle2 } from "lucide-react";

interface SkillDiscoveryPreviewProps {
  onOpenQuiz: () => void;
}

interface SkillCard {
  title: string;
  category: string;
  percentage: number;
  icon: React.ReactNode;
  whyMatches: string;
  keySkills: string[];
  mentorsCount: number;
}

const skillCards: SkillCard[] = [
  {
    title: "Cybersecurity & Defense",
    category: "Systems Security",
    percentage: 94,
    icon: <Shield className="w-5 h-5 text-forest" />,
    whyMatches: "High aptitude for network protocols, vulnerability analysis, and ethical penetration testing.",
    keySkills: ["Wireshark", "Burp Suite", "Linux Hardening", "OWASP Top 10"],
    mentorsCount: 14,
  },
  {
    title: "Cloud Computing & Arch",
    category: "Infrastructure",
    percentage: 87,
    icon: <Cloud className="w-5 h-5 text-forest" />,
    whyMatches: "Strong intuition for distributed backend architectures, microservices, and serverless deployments.",
    keySkills: ["AWS / GCP", "Terraform", "Docker", "Database Clustering"],
    mentorsCount: 19,
  },
  {
    title: "DevOps & Release Eng",
    category: "Automation",
    percentage: 82,
    icon: <Terminal className="w-5 h-5 text-forest" />,
    whyMatches: "Prefers continuous integration pipelines, container orchestration, and reliable production tooling.",
    keySkills: ["GitHub Actions", "Kubernetes", "Nginx", "Prometheus"],
    mentorsCount: 11,
  },
];

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  return (
    <section id="skills" className="py-20 bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-signal" />
              AI RECOMMENDATION PREVIEW
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink tracking-tight">
              Discover your highest-leverage tech path.
            </h2>
            <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed">
              Every student learns differently. The AI diagnostic maps your problem-solving style to real industry career tracks and matches you with mentors who’ve cleared the path.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-paper text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 transform hover:scale-[1.02] shadow-xs"
          >
            <span>Take the full quiz</span>
            <ArrowRight className="w-4 h-4 text-signal" />
          </button>
        </div>

        {/* 3 Result Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCards.map((card, idx) => {
            const radius = 18;
            const circumference = 2 * Math.PI * radius;
            const strokeOffset = circumference * (1 - card.percentage / 100);

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-line p-6 flex flex-col justify-between hover:border-forest/40 transition-all duration-200 shadow-2xs hover:shadow-xs group"
              >
                <div>
                  {/* Card Header with Progress Ring */}
                  <div className="flex items-start justify-between pb-4 mb-4 border-b border-line">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-paper border border-line">
                        {card.icon}
                      </div>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-forest font-semibold block">
                          {card.category}
                        </span>
                        <h3 className="font-display font-bold text-lg text-ink group-hover:text-forest transition-colors">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    {/* Circular Signal Green Progress Indicator */}
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                        <circle
                          cx="22"
                          cy="22"
                          r={radius}
                          fill="none"
                          stroke="#E2E8DF"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="22"
                          cy="22"
                          r={radius}
                          fill="none"
                          stroke="#3DDC84"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeOffset}
                        />
                      </svg>
                      <span className="absolute font-mono text-[11px] font-bold text-ink">
                        {card.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Why this matches you */}
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50 font-semibold block">
                      Why this matches:
                    </span>
                    <p className="text-sm text-ink/75 font-body leading-relaxed">
                      {card.whyMatches}
                    </p>
                  </div>

                  {/* Key Skills Pill Chips */}
                  <div className="mt-5 space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50 font-semibold block">
                      Core Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {card.keySkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-paper border border-line text-ink/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-4 border-t border-line-subtle flex items-center justify-between text-xs font-mono">
                  <span className="text-ink/65 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    {card.mentorsCount} Mentors ready
                  </span>
                  <button
                    onClick={onOpenQuiz}
                    className="font-semibold text-forest group-hover:text-forest-dark hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Diagnose me →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-ink/70 font-body mb-3">
            Not sure where you belong? 800+ NACOS students have taken the test this semester.
          </p>
          <button
            onClick={onOpenQuiz}
            className="font-mono text-sm font-semibold text-forest hover:text-forest-dark hover:underline inline-flex items-center gap-1.5"
          >
            <span>Take the 3-minute Skill Discovery quiz</span>
            <ArrowRight className="w-4 h-4 text-signal" />
          </button>
        </div>
      </div>
    </section>
  );
}
