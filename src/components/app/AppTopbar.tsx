"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";

export function AppTopbar({
  onMenu,
  searchPlaceholder = "Search…",
  onSearch,
}: {
  onMenu: () => void;
  searchPlaceholder?: string;
  onSearch?: (q: string) => void;
}) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  if (!user) return null;

  const settingsHref =
    user.role === "admin"
      ? "/admin/settings"
      : user.role === "mentor"
        ? "/mentor/settings"
        : "/mentee/settings";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    else if (user.role === "admin") {
      router.push("/admin/users");
    } else if (user.role === "mentee") {
      router.push("/mentee/mentors");
    } else {
      router.push("/mentor/mentees");
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center gap-4 bg-paper/85 px-5 backdrop-blur-md lg:px-8">
      <button
        type="button"
        onClick={onMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink/55 hover:bg-soft-muted lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <form onSubmit={handleSearch} className="relative min-w-0 flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-11 w-full rounded-full bg-soft-surface pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink/35 focus:ring-2 focus:ring-forest/20"
        />
      </form>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink/55 hover:bg-soft-muted"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-signal" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-full bg-soft-surface py-1.5 pl-1.5 pr-3 hover:bg-soft-muted"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-semibold text-paper">
              {user.avatarInitials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-tight text-ink">
                {user.fullName.split(" ")[0]}
              </span>
              <span className="block text-2xs font-semibold uppercase tracking-wider text-ink/40">
                {user.role}
              </span>
            </span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-soft bg-soft-surface py-1 shadow-lg ring-1 ring-line/60">
              <Link
                href={settingsHref}
                className="block px-3.5 py-2.5 text-sm text-ink/70 hover:bg-soft-muted"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-sm text-red-700 hover:bg-red-50"
                onClick={() => {
                  signOut();
                  router.push("/login");
                }}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
