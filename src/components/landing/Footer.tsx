"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F2EFE5] border-t border-line px-5 sm:px-12 lg:px-16 pt-10 sm:pt-16 pb-0 relative overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
      
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 relative z-10">
        {/* Top Left: Logo Wordmark with NACOS and ABUAD Seals */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
              <Image
                src="/images/nacoslogo.png"
                alt="NACOS Seal"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="w-px h-6 sm:h-7 bg-line" />
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
              <Image
                src="/images/abuadlogo.png"
                alt="ABUAD Seal"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-ink flex items-center gap-1">
              NACOS <span className="text-forest">ABUAD</span>
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-ink/60 -mt-0.5">
              Skills Hub Chapter
            </span>
          </div>
        </Link>

        {/* Top Right: Chapter Info */}
        <div className="flex items-center text-xs font-mono text-ink/70">
          <span>Afe Babalola University Chapter</span>
        </div>
      </div>

      {/* Middle Navigation Links: Clean 2-Column Grid on Mobile, Flex Wrap on Desktop */}
      <div className="max-w-7xl mx-auto w-full my-8 sm:my-12 relative z-10">
        <nav className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3.5 sm:gap-y-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-ink">
          <a
            href="#how-it-works"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-1"
          >
            How it works
          </a>
          <a
            href="#skills"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-1"
          >
            Skill Quiz
          </a>
          <a
            href="#mentors"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-1"
          >
            Find a Mentor
          </a>
          <a
            href="#for-mentors"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-1"
          >
            Become a Mentor
          </a>
          <a
            href="#testimonials"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-1"
          >
            Stories
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-0.5"
          >
            GitHub <ArrowUpRight className="w-3.5 h-3.5 text-ink/50" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-forest transition-colors py-1 inline-flex items-center gap-0.5"
          >
            Social Media <ArrowUpRight className="w-3.5 h-3.5 text-ink/50" />
          </a>
        </nav>
      </div>

      {/* Bottom Section with Giant Typography ABUAD touching the bottom edge across full width */}
      <div className="w-full relative flex flex-col justify-end">
        
        {/* Copyright & Faculty Lockup */}
        <div className="max-w-7xl mx-auto w-full relative z-10 mb-2 sm:mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 text-xs font-mono text-ink/75">
          <span className="font-semibold">
            © {new Date().getFullYear()} NACOS ABUAD
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs text-ink/65">
            <span>Department of Sciences</span>
            <span>·</span>
            <span>College of Sciences</span>
          </div>
        </div>

        {/* Giant "ABUAD" SVG Wordmark: Zero horizontal overflow, bleeding seamlessly off the bottom edge */}
        <div className="w-full select-none pointer-events-none block overflow-hidden -mx-5 sm:-mx-12 lg:-mx-16 w-[calc(100%+2.5rem)] sm:w-[calc(100%+6rem)] lg:w-[calc(100%+8rem)]">
          <svg
            viewBox="0 0 1000 195"
            className="w-full h-auto block -mb-3 sm:-mb-6 md:-mb-8"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="180"
              textAnchor="middle"
              className="font-display font-black"
              fontSize="235"
              letterSpacing="-0.04em"
              fill="#E0DBCF"
            >
              ABUAD
            </text>
          </svg>
        </div>
      </div>

    </footer>
  );
}
