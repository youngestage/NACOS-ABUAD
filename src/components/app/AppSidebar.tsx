"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  GitPullRequest,
  Calendar,
  Award,
  MessageSquare,
  Settings,
  Compass,
  Route,
  Brain,
  ClipboardList,
  Shield,
  Layers,
  FileCheck,
  X,
} from "lucide-react";
import type { MockUser } from "@/lib/auth/types";
import { mentorNavRestricted } from "@/lib/auth/guards";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function menteeNav(): NavItem[] {
  return [
    { href: "/mentee/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/mentee/mentors", label: "Mentors", icon: Users },
    { href: "/mentee/matches", label: "Matches", icon: Compass },
    { href: "/mentee/path", label: "Skill path", icon: Route },
    { href: "/mentee/quiz", label: "Quiz", icon: Brain },
    { href: "/mentee/certificates", label: "Certificates", icon: Award },
    { href: "/mentee/messages", label: "Messages", icon: MessageSquare },
    { href: "/mentee/settings", label: "Settings", icon: Settings },
  ];
}

export function mentorNav(user: MockUser): NavItem[] {
  if (mentorNavRestricted(user)) {
    return [
      { href: "/mentor/application", label: "Application", icon: FileCheck },
      { href: "/mentor/settings", label: "Settings", icon: Settings },
    ];
  }
  return [
    { href: "/mentor/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/mentor/mentees", label: "Mentees", icon: Users },
    { href: "/mentor/reviews", label: "Reviews", icon: GitPullRequest },
    { href: "/mentor/sessions", label: "Sessions", icon: Calendar },
    { href: "/mentor/certificates", label: "Certificates", icon: Award },
    { href: "/mentor/messages", label: "Messages", icon: MessageSquare },
    { href: "/mentor/application", label: "Application", icon: FileCheck },
    { href: "/mentor/settings", label: "Settings", icon: Settings },
  ];
}

export function adminNav(): NavItem[] {
  return [
    { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/applications", label: "Applications", icon: ClipboardList },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/mentors", label: "Mentors", icon: Shield },
    { href: "/admin/tracks", label: "Tracks", icon: Layers },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];
}

export function AppSidebar({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 px-5 py-5 border-b border-line">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <Image
            src="/images/nacoslogo.png"
            alt="NACOS"
            width={28}
            height={28}
            className="shrink-0"
          />
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-ink truncate">
              Skills Hub
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40">
              NACOS ABUAD
            </p>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-line-subtle"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-forest text-paper font-medium"
                  : "text-ink/70 hover:bg-line-subtle hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-line bg-white">
        {nav}
      </aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <button
            type="button"
            className="absolute inset-0 bg-ink/50"
            aria-label="Close overlay"
            onClick={onClose}
          />
          <aside className="relative z-10 w-72 max-w-[85vw] bg-white h-full shadow-xl">
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
