"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  mode: "login" | "signup" | "mentor";
  onClose: () => void;
}

export default function AuthModal({ isOpen, mode, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "mentor">(mode);
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [level, setLevel] = useState("300L");
  const [specialization, setSpecialization] = useState("Cybersecurity");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setActiveTab(mode);
    setIsSuccess(false);
  }, [mode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      // Auto close or show confirmation
    }, 2000);
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
          className="relative w-full max-w-md bg-paper rounded-2xl border border-line shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="bg-forest px-6 py-4 flex items-center justify-between text-paper">
            <div className="flex items-center gap-2.5">
              <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                <Image
                  src="/images/nacoslogo.png"
                  alt="NACOS Seal"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="font-display font-semibold text-sm">
                {activeTab === "login"
                  ? "Student & Mentor Portal"
                  : activeTab === "mentor"
                  ? "Apply to Become a Mentor"
                  : "Join NACOS Skills Hub"}
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

          <div className="p-6">
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center mx-auto text-forest">
                  <CheckCircle2 className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {activeTab === "login"
                    ? "Welcome Back!"
                    : activeTab === "mentor"
                    ? "Mentor Application Submitted!"
                    : "Registration Received!"}
                </h3>
                <p className="text-xs text-ink/70 font-body max-w-xs mx-auto">
                  {activeTab === "mentor"
                    ? "The NACOS academic committee will review your profile and verify your department standing within 48 hours."
                    : "You’re now connected to the NACOS peer learning network. Check your student inbox."}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 rounded-xl bg-forest text-paper text-xs font-semibold"
                >
                  Continue to Hub
                </button>
              </div>
            ) : (
              <div>
                {/* Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-line/50 rounded-xl mb-5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeTab === "login"
                        ? "bg-white text-forest font-bold shadow-2xs"
                        : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeTab === "signup"
                        ? "bg-white text-forest font-bold shadow-2xs"
                        : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    Mentee
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("mentor")}
                    className={`py-1.5 rounded-lg transition-all ${
                      activeTab === "mentor"
                        ? "bg-white text-forest font-bold shadow-2xs"
                        : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    Mentor
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                  {activeTab !== "login" && (
                    <div>
                      <label className="block text-ink/80 font-mono text-[11px] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Babatunde Adeyemi"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-line focus:border-forest text-ink text-sm outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-ink/80 font-mono text-[11px] mb-1">
                      Student / Academic Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@abuad.edu.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-line focus:border-forest text-ink text-sm outline-none"
                    />
                  </div>

                  {activeTab === "mentor" && (
                    <>
                      <div>
                        <label className="block text-ink/80 font-mono text-[11px] mb-1">
                          Academic Level / Standing
                        </label>
                        <select
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-line focus:border-forest text-ink text-sm outline-none"
                        >
                          <option value="300L">300 Level</option>
                          <option value="400L">400 Level (Senior)</option>
                          <option value="500L">500 Level (Engineering/Senior)</option>
                          <option value="Alumni">Alumni / Postgraduate</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-ink/80 font-mono text-[11px] mb-1">
                          Primary Mentorship Track
                        </label>
                        <select
                          value={specialization}
                          onChange={(e) => setSpecialization(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-line focus:border-forest text-ink text-sm outline-none"
                        >
                          <option value="Cybersecurity">Cybersecurity & Defense</option>
                          <option value="Cloud">Cloud Computing & AWS</option>
                          <option value="DevOps">DevOps & CI/CD Pipelines</option>
                          <option value="Fullstack">Fullstack Web (Next.js / Go)</option>
                          <option value="Mobile">Mobile Dev (Flutter / Kotlin)</option>
                          <option value="AI">AI & Data Science (PyTorch)</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-ink/80 font-mono text-[11px] mb-1">
                      {activeTab === "login" ? "Password or Matric Token" : "Matric / Registration Number"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 21/ENG02/045"
                      value={matricNumber}
                      onChange={(e) => setMatricNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-line focus:border-forest text-ink text-sm outline-none font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-xl bg-forest hover:bg-forest-dark text-paper font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>
                      {activeTab === "login"
                        ? "Enter Skills Hub"
                        : activeTab === "mentor"
                        ? "Submit Mentor Application"
                        : "Create Free Student Account"}
                    </span>
                    <ArrowRight className="w-4 h-4 text-signal" />
                  </button>

                  <div className="pt-2 text-center">
                    <span className="font-mono text-[10px] text-ink/60 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-forest" /> Secured via NACOS Chapter SSO
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
