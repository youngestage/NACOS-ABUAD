"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  PageShell,
  SoftPanel,
  SoftButton,
  StatusBadge,
} from "@/components/app/ui";

const QUESTIONS = [
  {
    id: 1,
    title: "What excites you most?",
    options: [
      { label: "Securing systems", track: "Cybersecurity" },
      { label: "Cloud & pipelines", track: "Cloud" },
      { label: "Web & mobile UI", track: "Fullstack" },
      { label: "AI & data", track: "AI" },
    ],
  },
  {
    id: 2,
    title: "Preferred hands-on work?",
    options: [
      { label: "Threat analysis", track: "Cybersecurity" },
      { label: "Infrastructure as code", track: "DevOps" },
      { label: "Shipping product features", track: "Fullstack" },
      { label: "Model experiments", track: "AI" },
    ],
  },
  {
    id: 3,
    title: "Semester goal?",
    options: [
      { label: "Internship prep", track: "Fullstack" },
      { label: "Strong FYP", track: "AI" },
      { label: "Campus leadership", track: "Cloud" },
      { label: "Open-source PRs", track: "DevOps" },
    ],
  },
];

export default function MenteeQuizPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const pick = (track: string) => {
    const next = { ...scores, [track]: (scores[track] ?? 0) + 1 };
    setScores(next);
    if (step + 1 >= QUESTIONS.length) {
      setDone(true);
      confetti({ particleCount: 80, spread: 0.6, origin: { y: 0.7 } });
    } else {
      setStep(step + 1);
    }
  };

  const winner =
    Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Fullstack";

  const reset = () => {
    setStep(0);
    setScores({});
    setDone(false);
  };

  return (
    <PageShell
      title="Diagnostic quiz"
      description="Three quick questions to refine your track recommendation."
    >
      <SoftPanel className="max-w-xl">
        {!done ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <StatusBadge tone="info">
                Question {step + 1} / {QUESTIONS.length}
              </StatusBadge>
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink">
              {QUESTIONS[step].title}
            </h2>
            <div className="space-y-2">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => pick(opt.track)}
                  className="w-full rounded-soft-sm bg-soft-muted px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:bg-soft-tint"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <StatusBadge tone="success">Complete</StatusBadge>
            <h2 className="font-display text-2xl font-bold text-ink">
              Recommended track: {winner}
            </h2>
            <p className="text-sm text-ink/55">
              Mock result only. Connect with mentors in this track from Matches.
            </p>
            <div className="flex flex-wrap gap-2">
              <SoftButton variant="soft" onClick={reset}>
                <RotateCcw className="h-4 w-4" /> Retake
              </SoftButton>
              <Link
                href="/mentee/matches"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-paper hover:bg-forest-light"
              >
                View matches <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </SoftPanel>
    </PageShell>
  );
}
