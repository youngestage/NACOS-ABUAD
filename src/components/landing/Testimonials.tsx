"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  badge: string;
  track: string;
  avatarBg: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "I was stuck in tutorial hell trying to learn distributed backend architecture until Damilola walked me through real Redis cache patterns and queue systems. Three weeks later, I cleared my technical assessment and landed a SIWES internship at Paystack.",
    name: "Chidinma Adeleke",
    role: "Computer Science, 300L",
    badge: "Placed at Paystack (Intern)",
    track: "Backend Systems Track",
    avatarBg: "bg-forest text-paper",
    initials: "CA",
  },
  {
    id: 2,
    quote:
      "Having a 500L senior review my Wireshark logs and Python automation scripts every Sunday gave me the confidence to build my first network scanner. It now has over 140 GitHub stars and became the centerpiece of my portfolio.",
    name: "Tobi Ogunlesi",
    role: "Software Engineering, 200L",
    badge: "Shipped Open Source Tool",
    track: "Cybersecurity & Networking",
    avatarBg: "bg-[#2563EB] text-paper",
    initials: "TO",
  },
  {
    id: 3,
    quote:
      "My mentor drilled clean Bloc state management and modular architecture into me every Tuesday evening. When I interviewed for my Moniepoint SIWES placement, the lead engineer commented that my Flutter repo was cleaner than most junior hires.",
    name: "Blessing Eniola",
    role: "Software Engineering, 300L",
    badge: "Moniepoint SIWES Offer",
    track: "Mobile Dev (Flutter)",
    avatarBg: "bg-[#059669] text-paper",
    initials: "BE",
  },
  {
    id: 4,
    quote:
      "Mentoring 3 junior students on NACOS Skills Hub was easily the most talked-about talking point in my graduate job interviews. It proved I could communicate systems clearly and lead engineering discussions effectively.",
    name: "Farouq Mohammed",
    role: "CS Alumni, Class of '24",
    badge: "Now Cloud Associate @ Sterling",
    track: "DevOps & Cloud Mentor",
    avatarBg: "bg-gold text-paper",
    initials: "FM",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-paper border-t border-line relative overflow-hidden flex items-center justify-center">
      
      {/* Aesthetic Flowing Wave Lines Ribbon behind the card (Matching Reference) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none flex items-center justify-center -z-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full object-cover min-w-[1200px] opacity-80"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Primary Dark Forest Green Ribbon Path */}
          <path
            d="M -100,280 C 200,120 400,480 720,300 C 1040,120 1240,480 1540,300"
            stroke="#16452E"
            strokeWidth="58"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.14"
          />
          {/* Secondary Light Signal Green Accent Ribbon Path */}
          <path
            d="M -100,320 C 180,480 420,120 720,300 C 1020,480 1260,120 1540,320"
            stroke="#3DDC84"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.22"
          />
          {/* Subtle Outer Hairline Path */}
          <path
            d="M -100,240 C 200,80 400,440 720,260 C 1040,80 1240,440 1540,260"
            stroke="#008751"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.18"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full relative z-10">
        
        {/* Sleek Dark Testimonial Card inspired by reference */}
        <div className="w-full bg-[#110D17] text-paper rounded-[28px] sm:rounded-[36px] border border-white/10 p-7 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[420px]">
          
          {/* Top Row: Navigation Buttons + Counter & Label */}
          <div className="flex items-center gap-6 relative z-10">
            {/* Arrow Navigators */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-paper/85 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-paper/85 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Counter + Label */}
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-paper/60">
              <span className="font-semibold text-paper/90 tabular-nums">
                {currentIndex + 1} / {testimonials.length}
              </span>
              <span>·</span>
              <span className="text-paper/70 font-medium">What students say</span>
            </div>
          </div>

          {/* Middle: Animated Main Quote */}
          <div className="my-8 sm:my-10 relative z-10 min-h-[140px] sm:min-h-[130px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -25 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-body text-base sm:text-xl lg:text-[1.35rem] leading-relaxed text-paper/95 tracking-normal"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Bottom: Author Avatar Lockup */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3.5"
              >
                {/* Author Avatar Thumbnail */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${current.avatarBg} border border-white/20 flex items-center justify-center font-display font-bold text-sm sm:text-base shrink-0 shadow-md`}
                >
                  {current.initials}
                </div>

                {/* Author Metadata */}
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-paper tracking-tight">
                    {current.name}
                  </h4>
                  <p className="font-mono text-xs text-paper/60">
                    {current.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
