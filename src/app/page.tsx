"use client";

import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsStrip from "@/components/landing/StatsStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import SkillDiscoveryPreview from "@/components/landing/SkillDiscoveryPreview";
import MentorPreview from "@/components/landing/MentorPreview";
import MentorCTA from "@/components/landing/MentorCTA";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import QuizModal from "@/components/landing/QuizModal";
import AuthModal from "@/components/landing/AuthModal";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: "login" | "signup" | "mentor";
  }>({
    isOpen: false,
    mode: "login",
  });

  const handleOpenAuth = (mode: "login" | "signup" | "mentor" = "login") => {
    setAuthModalState({
      isOpen: true,
      mode,
    });
  };

  const handleCloseAuth = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-forest selection:text-paper">
      {/* Top Navbar */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenAuth={handleOpenAuth}
        />

        <StatsStrip />

        <HowItWorks
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenAuth={() => handleOpenAuth("signup")}
        />

        <SkillDiscoveryPreview onOpenQuiz={() => setIsQuizOpen(true)} />

        <MentorPreview onOpenAuth={handleOpenAuth} />

        <MentorCTA onOpenMentorApply={() => handleOpenAuth("mentor")} />

        <Testimonials />

        <FinalCTA
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenAuth={handleOpenAuth}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      <AuthModal
        isOpen={authModalState.isOpen}
        mode={authModalState.mode}
        onClose={handleCloseAuth}
      />
    </div>
  );
}
