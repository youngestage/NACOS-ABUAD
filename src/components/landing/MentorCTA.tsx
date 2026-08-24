"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, HeartHandshake, GitPullRequest, CheckCircle2, Star } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";

interface MentorCTAProps {
  onOpenMentorApply: () => void;
}

export default function MentorCTA({ onOpenMentorApply }: MentorCTAProps) {
  return (
    <section id="for-mentors" className="py-20 sm:py-28 bg-paper border-t border-line relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-l from-forest/8 via-[#3DDC84]/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean, Minimalist & Direct Copy */}
          <div className="lg:col-span-6 space-y-6 z-10">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 border border-forest/15 text-xs font-mono font-semibold uppercase tracking-wider text-forest">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>LEADERSHIP PROGRAM</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.12]">
              Prove you can lead an <span className="text-forest">engineering team.</span>
            </h2>

            {/* Concise Subhead */}
            <p className="text-base sm:text-lg text-ink/75 font-body leading-relaxed max-w-lg">
              Guide 2–3 junior students for 1.5 hrs/week, run async pull-request reviews, and earn a verified NACOS Leadership Certificate for your CV.
            </p>

            {/* Minimalist Trust Points */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-ink/75 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> Verified Certificate
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> 1.5 hrs/week Async
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> CV Endorsement
              </span>
            </div>

            {/* Action Button */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenMentorApply}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-forest hover:bg-forest-dark text-paper font-semibold text-sm sm:text-base transition-all duration-150 transform hover:scale-[1.02] shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Apply to Mentor</span>
                <ArrowRight className="w-4 h-4 text-paper/70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Horizontally Aligned High-Contrast CardSwap */}
          <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[400px] flex items-center justify-center lg:justify-end overflow-visible">
            <div className="relative w-full h-full max-w-[440px] flex items-center justify-center">
              <CardSwap
                width={360}
                height={240}
                cardDistance={32}
                verticalDistance={32}
                delay={4200}
                pauseOnHover={true}
                skewAmount={0}
                easing="elastic"
              >
                
                {/* Card 1: Verified GitHub PR Review Receipt (Dark Theme with Crisp White & Green Text) */}
                <Card className="!bg-[#0A130D] text-white border border-[#3DDC84]/30 p-5 sm:p-6 flex flex-col justify-between shadow-2xl">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3DDC84] font-bold bg-[#3DDC84]/15 px-2.5 py-0.5 rounded-full border border-[#3DDC84]/25">
                        <GitPullRequest className="w-3.5 h-3.5" /> PR #48 · Approved
                      </span>
                      <span className="font-mono text-[11px] text-white/70">2h ago</span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="font-mono text-xs text-white/80 font-medium">Repo: nacos-abuad / student-portal</p>
                      <p className="font-body text-xs sm:text-[13px] text-white font-medium leading-relaxed bg-white/10 p-2.5 rounded-lg border border-white/10">
                        &ldquo;Clean modular refactor to TanStack Query. Merged into main 🚀&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/85">
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3DDC84]" /> @damilola_se (500L)
                    </span>
                    <span className="text-[#3DDC84] font-bold">4 Mentees Active</span>
                  </div>
                </Card>

                {/* Card 2: Official Executive Leadership Certificate (Crisp White Card with Deep Black & Forest Text) */}
                <Card className="!bg-white text-ink border border-line p-5 sm:p-6 flex flex-col justify-between shadow-2xl">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/nacoslogo.png"
                          alt="NACOS Seal"
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                        <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
                          Executive Credential
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-ink font-semibold bg-paper px-2 py-0.5 rounded border border-line">
                        #NACOS-LEAD-2026
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-sm sm:text-base text-ink tracking-tight">
                        Engineering Peer Mentor Certificate
                      </h4>
                      <p className="font-body text-xs text-ink/80 leading-relaxed font-normal">
                        Awarded for technical leadership, code reviews, and mentee outcomes in Software Systems.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-line flex items-center justify-between text-[11px] font-mono text-ink/80">
                    <span className="font-medium">Dept. of Sciences</span>
                    <span className="text-forest font-bold">Verified Seal</span>
                  </div>
                </Card>

                {/* Card 3: Career Placement & LinkedIn Endorsement (Forest Green Card with Bright White & Signal Text) */}
                <Card className="!bg-[#16452E] text-white border border-white/25 p-5 sm:p-6 flex flex-col justify-between shadow-2xl">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3DDC84] font-bold bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                        <Star className="w-3.5 h-3.5 fill-[#3DDC84] text-[#3DDC84]" /> Career Endorsement
                      </span>
                      <span className="font-mono text-[11px] text-white/80 font-medium">LinkedIn Ready</span>
                    </div>

                    <p className="font-body text-xs sm:text-[13px] text-white font-medium leading-relaxed italic bg-white/10 p-2.5 rounded-lg border border-white/15">
                      &ldquo;Led 4 junior students through weekly system milestones. Highly recommended for Software Engineering roles.&rdquo;
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/90">
                    <span className="font-medium">SIWES Referral</span>
                    <span className="text-[#3DDC84] font-bold">Paystack · Moniepoint</span>
                  </div>
                </Card>

              </CardSwap>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
