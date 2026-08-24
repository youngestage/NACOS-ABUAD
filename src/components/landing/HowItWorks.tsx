"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HowItWorksProps {
  onOpenQuiz: () => void;
  onOpenAuth: (mode?: "login" | "signup" | "mentor") => void;
}

export default function HowItWorks({ onOpenQuiz, onOpenAuth }: HowItWorksProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-paper border-t border-line relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-b from-forest/5 via-[#3DDC84]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-20 sm:mb-28">
          <div className="inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-forest font-semibold">
            <span className="w-8 h-px bg-forest/40" />
            <span>HOW IT WORKS</span>
            <span className="w-8 h-px bg-forest/40" />
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
            Process section<span className="text-forest">.</span>
          </h2>

          <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed max-w-lg mx-auto">
            A structured, 3-step peer progression designed around your semester schedule.
          </p>
        </div>

        {/* Desktop Process Wave Section */}
        <div className="hidden md:block relative w-full h-[640px] max-w-6xl mx-auto">
          
          {/* Continuous Balanced Undulating SVG Wave Curve */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
            viewBox="0 0 1000 640"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Glow Path */}
            <path
              d="M 0,340 C 80,340 120,390 200,390 C 320,390 380,190 500,190 C 620,190 680,390 800,390 C 880,390 920,340 1000,340"
              stroke="#3DDC84"
              strokeWidth="6"
              strokeLinecap="round"
              className="opacity-30 blur-xs"
            />
            {/* Main Brand Green Wave */}
            <motion.path
              d="M 0,340 C 80,340 120,390 200,390 C 320,390 380,190 500,190 C 620,190 680,390 800,390 C 880,390 920,340 1000,340"
              stroke="#008751"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={prefersReduced ? {} : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* 3-Column Layout Perfectly Aligned with Wave Points */}
          <div className="grid grid-cols-3 h-full relative z-20">
            
            {/* Column 1 (Valley at x=200): Upper Text (Clean), Lower SVG + Numeral 1 */}
            <div className="flex flex-col justify-between items-center px-4">
              {/* Upper Text Block */}
              <div className="w-full max-w-[280px] pt-4">
                <h3 className="font-display font-bold text-xl lg:text-2xl text-ink tracking-tight">
                  Diagnostic Matching
                </h3>
                <p className="text-xs sm:text-[13px] text-ink/70 font-body leading-relaxed mt-1.5 max-w-[230px]">
                  Calibrate your true engineering aptitude across 15+ sub-domains with our 3-min diagnostic quiz.
                </p>
                <button
                  onClick={onOpenQuiz}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-forest hover:text-forest-dark cursor-pointer group"
                >
                  <span>Try Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Lower SVG + Numeral 1 (Placed at the bottom valley as indicated) */}
              <div className="relative w-full max-w-[280px] flex items-center justify-center mb-6">
                <span className="font-display font-black text-8xl lg:text-9xl text-[#DCD7C9]/60 absolute -top-8 right-2 select-none pointer-events-none z-0">
                  1
                </span>
                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-56 h-56 relative select-none cursor-pointer group z-10"
                  onClick={onOpenQuiz}
                >
                  <Image
                    src="/images/quiz.svg"
                    alt="Diagnostic Matching"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                  />
                </motion.div>
              </div>
            </div>

            {/* Column 2 (Peak at x=500): Upper SVG Elevated MUCH HIGHER, Lower Text + Numeral 2 */}
            <div className="flex flex-col justify-between items-center px-4">
              {/* Upper SVG (Moved Higher Up as requested) */}
              <motion.div
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.9, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-56 h-56 relative select-none cursor-pointer group -mt-14"
              >
                <a href="#mentors" className="block relative w-full h-full">
                  <Image
                    src="/images/mentorship.svg"
                    alt="1-on-1 Senior Pairing"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                  />
                </a>
              </motion.div>

              {/* Lower Text Block + Numeral 2 (Pointing to the crest) */}
              <div className="relative w-full max-w-[280px] pb-8">
                <span className="font-display font-black text-8xl lg:text-9xl text-[#DCD7C9]/60 absolute -top-12 right-0 select-none pointer-events-none">
                  2
                </span>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-ink tracking-tight relative z-10">
                  1-on-1 Senior Pairing
                </h3>
                <p className="text-xs sm:text-[13px] text-ink/70 font-body leading-relaxed mt-1.5 max-w-[230px]">
                  Connect with 400L senior students and alumni for weekly codebase teardowns and SIWES prep.
                </p>
                <a
                  href="#mentors"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-forest hover:text-forest-dark group"
                >
                  <span>Browse Mentors</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Column 3 (Valley at x=800): Upper Text (Clean), Lower SVG + Numeral 3 */}
            <div className="flex flex-col justify-between items-center px-4">
              {/* Upper Text Block */}
              <div className="w-full max-w-[280px] pt-4">
                <h3 className="font-display font-bold text-xl lg:text-2xl text-ink tracking-tight">
                  Execution & Proof
                </h3>
                <p className="text-xs sm:text-[13px] text-ink/70 font-body leading-relaxed mt-1.5 max-w-[230px]">
                  Submit weekly pull requests, pass async code reviews, and earn verified NACOS credentials.
                </p>
                <a
                  href="#skills"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-forest hover:text-forest-dark group"
                >
                  <span>View Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Lower SVG + Numeral 3 (Placed at the bottom valley as indicated) */}
              <div className="relative w-full max-w-[280px] flex items-center justify-center mb-6">
                <span className="font-display font-black text-8xl lg:text-9xl text-[#DCD7C9]/60 absolute -top-8 right-2 select-none pointer-events-none z-0">
                  3
                </span>
                <motion.div
                  initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="w-56 h-56 relative select-none cursor-pointer group z-10"
                >
                  <a href="#skills" className="block relative w-full h-full">
                    <Image
                      src="/images/certification.svg"
                      alt="Execution & Proof"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                    />
                  </a>
                </motion.div>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile Vertical Wave Process (Gracefully stacked for smaller screens) */}
        <div className="md:hidden space-y-14 relative">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-forest/30 -z-0" />

          {/* Step 1 Mobile */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-24 h-24 relative shrink-0">
              <Image src="/images/quiz.svg" alt="Quiz" fill className="object-contain" />
            </div>
            <div className="space-y-1 relative flex-1">
              <span className="font-display font-black text-6xl text-[#DCD7C9]/60 absolute -top-4 right-0 select-none pointer-events-none">
                1
              </span>
              <h3 className="font-display font-bold text-lg text-ink">Diagnostic Matching</h3>
              <p className="text-xs text-ink/70 font-body leading-relaxed">
                Calibrate your true engineering aptitude across 15+ sub-domains with our 3-min diagnostic quiz.
              </p>
              <button
                onClick={onOpenQuiz}
                className="pt-1.5 text-xs font-mono font-semibold text-forest inline-flex items-center gap-1"
              >
                <span>Try Quiz</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Step 2 Mobile */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-24 h-24 relative shrink-0">
              <Image src="/images/mentorship.svg" alt="Mentorship" fill className="object-contain" />
            </div>
            <div className="space-y-1 relative flex-1">
              <span className="font-display font-black text-6xl text-[#DCD7C9]/60 absolute -top-4 right-0 select-none pointer-events-none">
                2
              </span>
              <h3 className="font-display font-bold text-lg text-ink">1-on-1 Senior Pairing</h3>
              <p className="text-xs text-ink/70 font-body leading-relaxed">
                Connect with 400L senior students and alumni for weekly codebase teardowns and SIWES prep.
              </p>
              <a
                href="#mentors"
                className="pt-1.5 text-xs font-mono font-semibold text-forest inline-flex items-center gap-1"
              >
                <span>Browse Mentors</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Step 3 Mobile */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-24 h-24 relative shrink-0">
              <Image src="/images/certification.svg" alt="Certification" fill className="object-contain" />
            </div>
            <div className="space-y-1 relative flex-1">
              <span className="font-display font-black text-6xl text-[#DCD7C9]/60 absolute -top-4 right-0 select-none pointer-events-none">
                3
              </span>
              <h3 className="font-display font-bold text-lg text-ink">Execution & Proof</h3>
              <p className="text-xs text-ink/70 font-body leading-relaxed">
                Submit weekly pull requests, pass async code reviews, and earn verified NACOS credentials.
              </p>
              <a
                href="#skills"
                className="pt-1.5 text-xs font-mono font-semibold text-forest inline-flex items-center gap-1"
              >
                <span>View Tracks</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
