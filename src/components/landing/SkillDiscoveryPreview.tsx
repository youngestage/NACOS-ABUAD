"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, CheckCircle2 } from "lucide-react";

interface SkillDiscoveryPreviewProps {
  onOpenQuiz: () => void;
}

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  return (
    <section id="skills" className="py-20 sm:py-28 bg-paper border-t border-line relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-forest/6 via-[#3DDC84]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-8">
        
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 border border-forest/15 text-xs font-mono font-semibold uppercase tracking-wider text-forest">
          <Sparkles className="w-3.5 h-3.5 text-signal" />
          <span>AI SKILL DIAGNOSTIC</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight max-w-3xl mx-auto leading-[1.15]">
          Discover your highest-leverage tech path in <span className="text-forest">3 minutes.</span>
        </h2>

        {/* Subhead */}
        <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed max-w-2xl mx-auto">
          Stop guessing which framework to learn or struggling alone. Our diagnostic maps your problem-solving tendencies directly to high-demand tracks and senior ABUAD mentors.
        </p>

        {/* 3 Clean Horizontal Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-mono text-ink/80 pt-2">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-forest" />
            <span>15+ Tech Sub-Domains</span>
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-signal" />
            <span>Instant Mentor Match</span>
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gold" />
            <span>Custom Semester Roadmap</span>
          </span>
        </div>

        {/* CTA Button & Social Proof */}
        <div className="pt-4 flex flex-col items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="px-8 py-4 rounded-full bg-forest hover:bg-forest-dark text-paper font-semibold text-sm sm:text-base transition-all duration-150 transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Take the 3-Minute Skill Quiz</span>
            <ArrowRight className="w-4 h-4 text-paper/70 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs font-mono text-ink/50">
            Free · No login required to start · 1,200+ students calibrated
          </p>
        </div>

      </div>
    </section>
  );
}
