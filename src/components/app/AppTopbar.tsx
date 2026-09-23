"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";

export function AppTopbar({ onMenu }: { onMenu: () => void }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-paper/90 backdrop-blur px-4 sm:px-6 h-14">
      <button
        type="button"
        onClick={onMenu}
        className="lg:hidden p-2 rounded-lg hover:bg-line-subtle"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="hidden sm:flex flex-1 max-w-md items-center gap-2 rounded-xl border border-line bg-white px-3 py-1.5">
        <Search className="w-4 h-4 text-ink/35" />
        <input
          placeholder="Search mentors, tracks, PRs…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink/35"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      <button
        type="button"
        className="relative p-2 rounded-lg hover:bg-line-subtle"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-ink/60" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-signal" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-line bg-white pl-1.5 pr-3 py-1.5 hover:border-forest/40"
        >
          <span className="w-7 h-7 rounded-lg bg-forest text-paper text-xs font-semibold flex items-center justify-center">
            {user.avatarInitials}
          </span>
          <span className="hidden sm:block text-left">
            <span className="block text-xs font-semibold text-ink leading-tight">
              {user.fullName.split(" ")[0]}
            </span>
            <span className="block text-[10px] font-mono uppercase text-ink/45">
              {user.role}
            </span>
          </span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-white shadow-lg py-1 z-50">
            <Link
              href={`/${user.role === "admin" ? "admin" : user.role}/settings`}
              className="block px-3 py-2 text-sm hover:bg-line-subtle"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
              onClick={() => {
                signOut();
                router.push("/login");
              }}
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
