"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Layers, Cpu, Users, Award, MessageSquareQuote, LogIn, ArrowRight } from "lucide-react";
import { useLiquidGlass } from "@/lib/liquid-glass";

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenAuth: (mode?: "login" | "signup" | "mentor") => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "How it works",
    href: "#how-it-works",
    icon: <Layers className="w-4 h-4" strokeWidth={2.6} />,
  },
  {
    label: "Skills",
    href: "#skills",
    icon: <Cpu className="w-4 h-4" strokeWidth={2.6} />,
  },
  {
    label: "Mentors",
    href: "#mentors",
    icon: <Users className="w-4 h-4" strokeWidth={2.6} />,
  },
  {
    label: "For Mentors",
    href: "#for-mentors",
    icon: <Award className="w-4 h-4" strokeWidth={2.6} />,
  },
  {
    label: "Stories",
    href: "#testimonials",
    icon: <MessageSquareQuote className="w-4 h-4" strokeWidth={2.6} />,
  },
];

export default function Navbar({ onOpenQuiz, onOpenAuth }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Apply subtle liquid glass refraction only to desktop/closed floating pill
  useLiquidGlass(navRef, {
    scale: -45,
    chroma: 3,
    border: 0,
    mapBlur: 3,
    blur: 0.5,
    saturate: 1.1,
    radius: 9999,
    fallbackBlur: 4,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none">
      
      {/* Floating Dynamic Island / Pill Header */}
      <motion.div
        ref={navRef}
        layout
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={`w-full rounded-full transition-all duration-300 pointer-events-auto border ${
          scrolled
            ? "max-w-2xl bg-white/75 border-white/80 shadow-[0_12px_36px_rgba(15,25,18,0.1)] py-2 px-4 sm:px-5"
            : "max-w-5xl bg-white/60 border-white/70 shadow-[0_8px_28px_rgba(15,25,18,0.05)] py-2.5 sm:py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Logo Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-forest rounded-full shrink-0"
            aria-label="NACOS Skills Hub Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
              <Image
                src="/images/nacoslogo.png"
                alt="NACOS Official Seal"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <AnimatePresence initial={false}>
              {!scrolled ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap hidden sm:flex items-baseline gap-1"
                >
                  <span className="font-display font-bold text-base tracking-tight text-ink">
                    NACOS <span className="text-forest">Skills Hub</span>
                  </span>
                </motion.div>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-display font-bold text-sm text-forest hidden sm:inline"
                >
                  Hub
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Navigation: Morphs between Text and Icons */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item, idx) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center justify-center rounded-full transition-all duration-200 text-ink/80 hover:text-forest ${
                    scrolled
                      ? "p-2 hover:bg-forest/10"
                      : "px-3 py-1 text-xs lg:text-sm font-mono font-medium hover:bg-white/40"
                  }`}
                  aria-label={item.label}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {scrolled ? (
                      <motion.div
                        key="icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="text-ink hover:text-black"
                      >
                        {item.icon}
                      </motion.div>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>

                {/* Floating Tooltip Label when in compact icon mode */}
                {scrolled && hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-ink text-paper rounded-lg text-[11px] font-mono whitespace-nowrap shadow-md pointer-events-none z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenAuth("login")}
              className={`font-mono text-xs font-medium text-ink hover:text-black transition-colors rounded-full ${
                scrolled ? "p-2 text-ink hover:bg-black/5" : "px-3 py-1.5"
              }`}
              title="Log in"
            >
              {scrolled ? <LogIn className="w-4 h-4 text-ink" strokeWidth={2.6} /> : "Log in"}
            </button>

            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-forest hover:bg-forest-dark text-paper font-semibold text-xs sm:text-sm font-body px-4 py-2 transition-all duration-150 transform hover:scale-[1.02] shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-signal shrink-0" />
              <span>Get Started</span>
            </button>
          </div>

          {/* Mobile Toggle & Quick Action */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenQuiz}
              className="px-3 py-1 rounded-full bg-forest text-paper text-xs font-semibold shadow-xs"
            >
              Quiz
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-ink bg-white/60 hover:bg-white border border-line-subtle shadow-xs cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Dedicated Clean Mobile Dropdown Menu (Decoupled from liquid glass canvas) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-sm mt-2.5 p-5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-line shadow-2xl pointer-events-auto flex flex-col gap-3.5 z-50"
          >
            {/* Nav Links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-mono font-medium text-ink hover:text-forest hover:bg-forest/5 transition-colors"
                >
                  <span className="text-forest p-1.5 rounded-lg bg-forest/10">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile Auth and Action CTA */}
            <div className="pt-3 border-t border-line/60 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuiz();
                }}
                className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-paper font-semibold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-signal" />
                <span>Take Diagnostic Quiz</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth("login");
                }}
                className="w-full py-2.5 rounded-xl bg-paper hover:bg-paper/80 border border-line text-ink font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-ink/70" />
                <span>Student / Mentor Sign In</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
