"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function Home() {
  const router = useRouter();
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleOpenAuth = (mode: "login" | "signup" | "mentor" = "login") => {
    if (mode === "signup") router.push("/signup");
    else if (mode === "mentor") router.push("/mentor/apply");
    else router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink selection:bg-forest selection:text-paper">
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

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

      <Footer />

      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
