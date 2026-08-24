"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowRight, Search, CheckCircle2 } from "lucide-react";

interface FinalCTAProps {
  onOpenQuiz: () => void;
  onOpenAuth: (mode?: "login" | "signup" | "mentor") => void;
}

export default function FinalCTA({ onOpenQuiz, onOpenAuth }: FinalCTAProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section className="w-full bg-forest text-paper py-10 sm:py-14 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#3DDC84]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[450px] h-[250px] bg-[#008751]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="flex-1 max-w-xl text-left space-y-4">
            {/* Main Headline */}
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-paper tracking-tight leading-[1.15]">
              Still looking for answers? <br />
              <span className="text-signal">Your roadmap is ready.</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-paper/85 font-body leading-relaxed max-w-lg">
              Take the 3-minute quiz or connect directly with a senior mentor today.
            </p>

            {/* Dual High-Contrast CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-paper text-forest hover:bg-white font-bold text-xs sm:text-sm transition-all duration-150 transform hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-signal"
              >
                <Sparkles className="w-3.5 h-3.5 text-forest" />
                <span>Take the Skill Quiz</span>
                <ArrowRight className="w-3.5 h-3.5 text-forest group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#mentors"
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-paper/30 hover:border-paper bg-white/10 hover:bg-white/20 text-paper font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2 text-center"
              >
                <Search className="w-3.5 h-3.5 text-paper/80" />
                <span>Browse Mentors</span>
              </a>
            </div>

            {/* Trust points */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-mono text-paper/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-signal" /> 100% Free for Students
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-signal" /> Peer-Verified Roadmaps
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-signal" /> No Experience Needed
              </span>
            </div>
          </div>

          {/* Right Column: Clean SVG Illustration directly on green canvas */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 w-full max-w-md lg:max-w-lg flex items-center justify-center relative"
          >
            <div className="relative w-full h-56 sm:h-64 md:h-72 flex items-center justify-center">
              <Image
                src="/images/undraw_looking-for-answers_5p23.svg"
                alt="Looking for answers illustration"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
