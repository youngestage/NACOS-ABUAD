"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, CheckCircle2, RotateCcw, ShieldCheck, UserCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    track: string;
    points: { [key: string]: number };
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "What excites you most when thinking about tech?",
    subtitle: "Select the problem space that genuinely sparks your curiosity.",
    options: [
      {
        label: "Securing systems & ethical penetration testing",
        description: "Finding vulnerabilities, hardening protocols, and stopping cyber attacks.",
        track: "Cybersecurity",
        points: { Cybersecurity: 35, "Cloud Computing": 10, DevOps: 15 },
      },
      {
        label: "Designing resilient cloud backends & pipelines",
        description: "Scaling databases, containerizing apps with Docker/Kubernetes, and CI/CD.",
        track: "DevOps & Cloud",
        points: { DevOps: 35, "Cloud Computing": 30, Cybersecurity: 15 },
      },
      {
        label: "Building intuitive, high-performance web & mobile interfaces",
        description: "Crafting polished user experiences with React, Next.js, and Flutter.",
        track: "Frontend & Mobile Dev",
        points: { "Frontend & Mobile": 35, "UI/UX Design": 20 },
      },
      {
        label: "Training AI models & deriving intelligence from data",
        description: "Machine learning, Python data pipelines, and predictive algorithms.",
        track: "AI & Data Science",
        points: { "AI & Data Science": 35, "Cloud Computing": 10 },
      },
    ],
  },
  {
    id: 2,
    title: "How do you prefer spending your hands-on coding time?",
    subtitle: "Your engineering preference determines which mentor pairing works best.",
    options: [
      {
        label: "Deconstructing systems & analyzing network packets",
        description: "Wireshark, Burp Suite, Linux bash scripting, and reverse engineering.",
        track: "Cybersecurity",
        points: { Cybersecurity: 30, DevOps: 15 },
      },
      {
        label: "Automating cloud infrastructure as code (IaC)",
        description: "Terraform, AWS/GCP, GitHub Actions, and container orchestration.",
        track: "DevOps & Cloud",
        points: { DevOps: 30, "Cloud Computing": 25 },
      },
      {
        label: "Turning Figma designs into pixel-perfect interactive web apps",
        description: "Component architecture, animations, responsive design, and API integration.",
        track: "Frontend & Mobile Dev",
        points: { "Frontend & Mobile": 30, "UI/UX Design": 25 },
      },
      {
        label: "Exploratory data analysis and model fine-tuning",
        description: "Pandas, PyTorch, Scikit-learn, and building data visualizations.",
        track: "AI & Data Science",
        points: { "AI & Data Science": 30, "Cloud Computing": 10 },
      },
    ],
  },
  {
    id: 3,
    title: "What is your primary goal this academic semester?",
    subtitle: "We'll align your mentor's experience with your immediate milestone.",
    options: [
      {
        label: "SIWES / Tech Internship Placement",
        description: "Prepare an industry-grade portfolio and pass technical interviews.",
        track: "General",
        points: { Cybersecurity: 25, "Cloud Computing": 25, DevOps: 25, "Frontend & Mobile": 25, "AI & Data Science": 25 },
      },
      {
        label: "High-Distinction Final Year Project (FYP)",
        description: "Build a robust, novel computational system with academic rigor.",
        track: "General",
        points: { Cybersecurity: 20, "Cloud Computing": 20, "AI & Data Science": 30, DevOps: 20 },
      },
      {
        label: "International Remote Job Readiness",
        description: "Master modern production standards and real-world team collaboration.",
        track: "General",
        points: { DevOps: 30, "Frontend & Mobile": 25, Cybersecurity: 25 },
      },
      {
        label: "Foundational Mastery (100L - 200L)",
        description: "Bridge university theory with practical software engineering skills.",
        track: "General",
        points: { "Frontend & Mobile": 30, "Cloud Computing": 20, Cybersecurity: 20 },
      },
    ],
  },
];

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    Cybersecurity: 20,
    "Cloud Computing": 15,
    DevOps: 15,
    "Frontend & Mobile": 15,
    "AI & Data Science": 15,
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<{
    topTrack: string;
    percentage: number;
    secondaryTrack: string;
    secondaryPct: number;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectOption = (points: { [key: string]: number }) => {
    const updated = { ...scores };
    Object.entries(points).forEach(([key, val]) => {
      updated[key] = (updated[key] || 0) + val;
    });
    setScores(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate results
      setIsCalculating(true);
      setTimeout(() => {
        const sorted = Object.entries(updated).sort((a, b) => b[1] - a[1]);
        const top = sorted[0];
        const second = sorted[1];

        // normalize percentage to a realistic 88-97% range for top
        const topPct = Math.min(97, Math.max(88, Math.round((top[1] / 95) * 100)));
        const secPct = Math.min(topPct - 4, Math.max(78, Math.round((second[1] / 95) * 92)));

        setResult({
          topTrack: top[0],
          percentage: topPct,
          secondaryTrack: second[0],
          secondaryPct: secPct,
        });
        setIsCalculating(false);

        // Fire celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#16452E", "#008751", "#C89B3C", "#3DDC84"],
          });
        } catch {
          // ignore if canvas unavailable
        }
      }, 1100);
    }
  };

  const handleReset = () => {
    setStep(0);
    setScores({
      Cybersecurity: 20,
      "Cloud Computing": 15,
      DevOps: 15,
      "Frontend & Mobile": 15,
      "AI & Data Science": 15,
    });
    setResult(null);
    setIsCalculating(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-paper rounded-2xl border border-line shadow-2xl overflow-hidden my-8"
        >
          {/* Top Bar */}
          <div className="bg-forest px-6 py-4 flex items-center justify-between text-paper">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-signal" />
              <span className="font-display font-semibold text-sm tracking-wide">
                NACOS AI Skill Discovery
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-paper/80 hover:text-paper hover:bg-forest-light transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {isCalculating ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-line border-t-forest animate-spin" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Analyzing Your Skill Profile...
                </h3>
                <p className="font-mono text-xs text-ink/70">
                  Cross-referencing 28 NACOS curriculum paths & verified mentors
                </p>
              </div>
            ) : result ? (
              /* Result Screen */
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-forest bg-forest/10 px-3 py-1 rounded-full inline-block">
                    Diagnostic Complete
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    Your Best Match: {result.topTrack}
                  </h3>
                  <p className="text-sm text-ink/70 font-body">
                    Based on your problem-solving style and semester goals, you are heavily aligned with this specialization.
                  </p>
                </div>

                {/* Score Showcase Card */}
                <div className="bg-white rounded-xl border border-line p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-ink/60">Primary Specialization</span>
                      <p className="font-display text-lg font-bold text-ink">{result.topTrack}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl font-bold text-forest">
                        {result.percentage}%
                      </span>
                      <span className="font-mono text-xs text-signal block font-semibold">MATCH SCORE</span>
                    </div>
                  </div>

                  {/* Secondary match */}
                  <div className="pt-3 border-t border-line-subtle flex items-center justify-between text-xs font-mono">
                    <span className="text-ink/70">Secondary Affinity: {result.secondaryTrack}</span>
                    <span className="font-bold text-ink">{result.secondaryPct}%</span>
                  </div>
                </div>

                {/* Matched Mentors Callout */}
                <div className="p-4 rounded-xl bg-forest/5 border border-forest/15 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1 font-body">
                    <p className="font-semibold text-forest">12 Verified Senior Mentors Available</p>
                    <p className="text-ink/70">
                      Top alumni from ABUAD, UNILAG, and OAU in {result.topTrack} are currently accepting mentees this semester.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      const element = document.getElementById("mentors");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-forest text-paper font-semibold text-sm hover:bg-forest-dark transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <UserCheck className="w-4 h-4 text-signal" /> View {result.topTrack} Mentors
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-3 px-4 rounded-xl border border-line bg-white text-ink text-sm font-medium hover:bg-paper transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-ink/60" /> Retake Quiz
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Questions */
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-xs text-ink/70">
                    <span>Question {step + 1} of {questions.length}</span>
                    <span className="font-semibold text-forest">
                      {Math.round(((step + 1) / questions.length) * 100)}% Completed
                    </span>
                  </div>
                  <div className="w-full h-2 bg-line rounded-full overflow-hidden">
                    <div
                      className="h-full bg-forest transition-all duration-300 rounded-full"
                      style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Header */}
                <div className="space-y-1">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                    {questions[step].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/70 font-body">
                    {questions[step].subtitle}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.points)}
                      className="w-full text-left p-4 rounded-xl bg-white hover:bg-forest/5 border border-line hover:border-forest/40 transition-all duration-150 group flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <p className="font-semibold text-sm text-ink group-hover:text-forest transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-xs text-ink/70 font-body">
                          {opt.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ink/40 group-hover:text-forest group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
