"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, Award, CheckCircle2 } from "lucide-react";
import Lightfall from "@/components/Lightfall";

interface SkillDiscoveryPreviewProps {
  onOpenQuiz: () => void;
}

export default function SkillDiscoveryPreview({ onOpenQuiz }: SkillDiscoveryPreviewProps) {
  return (
    <section id="skills" className="relative w-full py-24 sm:py-32 bg-[#0A160F] text-paper border-t border-line/15 overflow-hidden">
      
      {/* 1. Base Layer: Lightfall WebGL Shimmer Stream */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-90">
        <Lightfall
          colors={["#3DDC84", "#008751", "#235F41", "#C89B3C"]}
          backgroundColor="#0A160F"
          speed={0.6}
          streakCount={4}
          streakWidth={1.2}
          streakLength={1.2}
          glow={1.2}
          density={0.7}
          twinkle={1}
          zoom={2.6}
          backgroundGlow={0.6}
          opacity={0.9}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={0.9}
        />
      </div>

      {/* 2. Glassmorphism Frosted Blur Layer (Subtle touch to maintain crisp streaks & clear text) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-1 bg-gradient-to-b from-[#0A160F]/45 via-[#0A160F]/30 to-[#0A160F]/45 backdrop-blur-[2px]" />

      {/* 3. Content Container on Top of the Glass Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-7 sm:space-y-8">
        
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-semibold uppercase tracking-wider text-signal shadow-xs backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-signal" />
          <span>AI SKILL DIAGNOSTIC</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-paper tracking-tight max-w-3xl mx-auto leading-[1.12] drop-shadow-sm">
          Discover your highest-leverage tech path in <span className="text-signal">3 minutes.</span>
        </h2>

        {/* Subhead */}
        <p className="text-base sm:text-lg text-paper/90 font-body leading-relaxed max-w-2xl mx-auto drop-shadow-xs">
          Stop guessing which framework to learn or struggling alone. Our diagnostic maps your problem-solving tendencies directly to high-demand tracks and senior ABUAD mentors.
        </p>

        {/* 3 Clean Horizontal Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-mono text-paper/90 pt-1">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-signal" />
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

        {/* Action CTA Button */}
        <div className="pt-3 flex flex-col items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="px-8 py-4 rounded-full bg-forest hover:bg-forest-light text-paper border border-white/20 font-semibold text-sm sm:text-base transition-all duration-150 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 group cursor-pointer backdrop-blur-md"
          >
            <span>Take the 3-Minute Skill Quiz</span>
            <ArrowRight className="w-4 h-4 text-signal group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs font-mono text-paper/60">
            Free · No login required to start · 1,200+ ABUAD students calibrated
          </p>
        </div>

      </div>

    </section>
  );
}
