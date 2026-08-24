"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion, animate, motion } from "framer-motion";

interface StatItemProps {
  endValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel?: string;
  className?: string;
}

function MetricItem({
  endValue,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  sublabel,
  className = "",
}: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      setValue(endValue);
      return;
    }

    if (isInView) {
      const controls = animate(0, endValue, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate(latest) {
          setValue(latest);
        },
      });

      return () => controls.stop();
    }
  }, [isInView, endValue, prefersReduced]);

  const formattedValue =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${className}`}
    >
      <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ink tracking-tight flex items-baseline">
        <span>{prefix}</span>
        <span className="tabular-nums">{formattedValue}</span>
        <span className="text-forest ml-0.5">{suffix}</span>
      </div>
      <div className="mt-1.5 sm:mt-2 space-y-0.5">
        <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink/85">
          {label}
        </p>
        {sublabel && (
          <p className="text-[11px] sm:text-xs font-mono text-ink/55 leading-relaxed">
            {sublabel}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-10 sm:py-16 bg-paper border-t border-line/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          
          {/* Metric 1: Top-Left on Mobile, 1st on Desktop */}
          <MetricItem
            endValue={140}
            suffix="+"
            label="Active Mentors"
            sublabel="Verified senior & alumni leads"
            className=""
          />

          {/* Metric 2: Top-Right on Mobile, 2nd on Desktop */}
          <MetricItem
            endValue={1280}
            suffix="+"
            label="Students Matched"
            sublabel="Across 15+ sub-domains"
            className="border-l border-line"
          />

          {/* Metric 3: Bottom-Left on Mobile, 3rd on Desktop */}
          <MetricItem
            endValue={91.4}
            suffix="%"
            decimals={1}
            label="Completion Rate"
            sublabel="Verified milestone submissions"
            className="border-t border-line/60 pt-6 sm:pt-8 lg:border-t-0 lg:pt-4 lg:border-l lg:border-line"
          />

          {/* Metric 4: Bottom-Right on Mobile, 4th on Desktop */}
          <MetricItem
            endValue={28}
            suffix="+"
            label="Skill Tracks"
            sublabel="Curated career roadmaps"
            className="border-l border-line border-t border-line/60 pt-6 sm:pt-8 lg:border-t-0 lg:pt-4"
          />

        </div>
      </div>
    </section>
  );
}
