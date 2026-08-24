"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, Award, CheckCircle2 } from "lucide-react";
import Lightfall from "@/components/Lightfall";

interface SkillDiscoveryPreviewProps {
  onOpenQuiz: () => void;
}

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  return (
    <section id="skills" className="relative w-full py-24 sm:py-32 bg-paper border-t border-line overflow-hidden">
      
      {/* Lightfall Canvas as the Background for the Entire Section on Site Paper BG */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none -z-0 opacity-70">
        <Lightfall
          colors={["#008751", "#16452E", "#3DDC84", "#C89B3C"]}
          backgroundColor="#F7F5EF"
          speed={0.5}
          streakCount={4}
          streakWidth={1.2}
          streakLength={1.2}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={2.4}
          backgroundGlow={0.4}
          opacity={0.85}
          mouseInteraction={true}
          mouseStrength={0.5}
          mouseRadius={0.9}
        />
      </div>

      {/* Content Container laid openly across the canvas */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-7 sm:space-y-8">
        
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 border border-forest/15 text-xs font-mono font-semibold uppercase tracking-wider text-forest backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-forest" />
          <span>AI SKILL DIAGNOSTIC</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight max-w-3xl mx-auto leading-[1.12]">
          Discover your highest-leverage tech path in <span className="text-forest">3 minutes.</span>
        </h2>

        {/* Subhead */}
        <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed max-w-2xl mx-auto">
          Stop guessing which framework to learn or struggling alone. Our diagnostic maps your problem-solving tendencies directly to high-demand tracks and senior ABUAD mentors.
        </p>

        {/* 3 Clean Horizontal Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-mono text-ink/80 pt-1">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-forest" />
            <span>15+ Tech Sub-Domains</span>
          </span>
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-forest" />
            <span>Instant Mentor Match</span>
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gold" />
            <span>Custom Semester Roadmap</span>
          </span>
        </div>

        {/* Action CTA Button */}
        <div className="pt-3 flex flex-col items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="px-8 py-4 rounded-full bg-forest hover:bg-forest-dark text-paper font-semibold text-sm sm:text-base transition-all duration-150 transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Take the 3-Minute Skill Quiz</span>
            <ArrowRight className="w-4 h-4 text-signal group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs font-mono text-ink/55">
            Free · No login required to start · 1,200+ ABUAD students calibrated
          </p>
        </div>

      </div>

    </section>
  );
}
