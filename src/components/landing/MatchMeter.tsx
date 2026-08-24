"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface MatchMeterProps {
  percentage?: number;
  label?: string;
  subLabel?: string;
  isCompact?: boolean;
}

export default function MatchMeter({
  percentage = 94,
  label = "Cybersecurity",
  subLabel = "Top Recommendation for your diagnostic profile",
  isCompact = false,
}: MatchMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  const [count, setCount] = useState(prefersReduced ? percentage : 0);

  // Semicircular arc metrics
  // Arc length for radius 76 = Math.PI * 76 ≈ 238.76
  const radius = 76;
  const arcLength = Math.PI * radius;
  const strokeDashoffset = prefersReduced
    ? arcLength * (1 - percentage / 100)
    : isInView
    ? arcLength * (1 - percentage / 100)
    : arcLength;

  useEffect(() => {
    if (prefersReduced) {
      setCount(percentage);
      return;
    }

    if (isInView) {
      let start = 0;
      const duration = 1200; // ms
      const startTime = performance.now();

      const animateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (percentage - start) * ease);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, percentage, prefersReduced]);

  if (isCompact) {
    return (
      <div
        ref={ref}
        className="relative flex items-center justify-center p-2 rounded-xl bg-paper/60 border border-line"
      >
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#DCD8CC"
              strokeWidth="4"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#3DDC84"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 20}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={{
                strokeDashoffset: isInView || prefersReduced
                  ? 2 * Math.PI * 20 * (1 - percentage / 100)
                  : 2 * Math.PI * 20,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute font-mono text-xs font-bold text-ink">
            {count}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="w-full max-w-md mx-auto bg-white rounded-2xl border border-line p-6 shadow-sm relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3DDC84]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar of the meter */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3DDC84] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3DDC84]"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-semibold">
            AI Skill Recommendation
          </span>
        </div>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-forest/5 text-forest font-medium border border-forest/10 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-gold" /> NACOS v2.4 Matcher
        </span>
      </div>

      {/* Semicircular Dial Visualization */}
      <div className="relative flex flex-col items-center justify-center pt-2 pb-1">
        <div className="relative w-56 h-32 flex items-end justify-center overflow-hidden">
          <svg
            className="w-56 h-56 absolute top-0"
            viewBox="0 0 200 200"
            fill="none"
          >
            {/* Background Arc */}
            <path
              d="M 24 100 A 76 76 0 0 1 176 100"
              stroke="#DCD8CC"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            {/* Animated Gauge Path */}
            <motion.path
              d="M 24 100 A 76 76 0 0 1 176 100"
              stroke="#3DDC84"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={arcLength}
              initial={{ strokeDashoffset: arcLength }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.3, ease: "easeOut" }}
            />
          </svg>

          {/* Center Readout */}
          <div className="relative z-10 flex flex-col items-center pb-2 text-center">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink">
                {count}
              </span>
              <span className="font-mono text-xl font-bold text-signal">
                %
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-forest mt-0.5">
              CONFIDENCE MATCH
            </span>
          </div>
        </div>

        {/* Primary Recommended Skill Pill */}
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-paper text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-signal" />
            <span>{label} — {count}% match</span>
          </div>
          <p className="text-xs text-ink/70 mt-1.5 font-body max-w-xs mx-auto">
            {subLabel}
          </p>
        </div>
      </div>

      {/* Secondary Match Metrics (Establishing breadth before quiz) */}
      <div className="mt-5 pt-4 border-t border-line space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-ink/80 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest/40" />
            Cloud Computing Architecture
          </span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3DDC84] rounded-full transition-all duration-1000"
                style={{ width: isInView || prefersReduced ? "87%" : "0%" }}
              />
            </div>
            <span className="font-mono font-bold text-ink">87%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-ink/80 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest/40" />
            DevOps & Infrastructure CI/CD
          </span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3DDC84] rounded-full transition-all duration-1000"
                style={{ width: isInView || prefersReduced ? "82%" : "0%" }}
              />
            </div>
            <span className="font-mono font-bold text-ink">82%</span>
          </div>
        </div>
      </div>

      {/* Verified Mentor Match Footer */}
      <div className="mt-4 pt-3 border-t border-line-subtle flex items-center justify-between text-[11px] text-ink/70">
        <span className="flex items-center gap-1 font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-forest" /> 14 Mentors ready in this track
        </span>
        <span className="font-mono text-forest font-semibold">
          Avg. 4.9★
        </span>
      </div>
    </div>
  );
}
