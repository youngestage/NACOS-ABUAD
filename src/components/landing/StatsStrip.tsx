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
  showDivider?: boolean;
}

function MetricItem({
  endValue,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  sublabel,
  showDivider = true,
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
      className={`flex flex-col justify-center px-6 sm:px-8 py-4 ${
        showDivider ? "border-l border-line" : ""
      }`}
    >
      <div className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight flex items-baseline">
        <span>{prefix}</span>
        <span className="tabular-nums">{formattedValue}</span>
        <span className="text-forest ml-0.5">{suffix}</span>
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink/80">
          {label}
        </p>
        {sublabel && (
          <p className="text-[11px] font-mono text-ink/50">
            {sublabel}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="py-10 sm:py-14 bg-paper">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          <MetricItem
            endValue={140}
            suffix="+"
            label="Active Mentors"
            sublabel="Verified senior & alumni leads"
            showDivider={false}
          />
          <MetricItem
            endValue={1280}
            suffix="+"
            label="Students Matched"
            sublabel="Across 15+ sub-domains"
            showDivider={true}
          />
          <MetricItem
            endValue={91.4}
            suffix="%"
            decimals={1}
            label="Completion Rate"
            sublabel="Verified milestone submissions"
            showDivider={true}
          />
          <MetricItem
            endValue={28}
            suffix="+"
            label="Skill Tracks"
            sublabel="Curated career roadmaps"
            showDivider={true}
          />
        </div>
      </div>
    </section>
  );
}
