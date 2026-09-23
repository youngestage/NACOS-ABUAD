"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import type { UserRole } from "@/lib/auth/types";
import {
  canAccessRolePath,
  dashboardPathForUser,
  mentorNavRestricted,
} from "@/lib/auth/guards";
import { AppSidebar, type NavGroup } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";

const COLLAPSE_KEY = "nacos.sidebarCollapsed";

export function RoleGate({
  role,
  navGroups,
  searchPlaceholder,
  children,
}: {
  role: UserRole;
  navGroups: (
    user: NonNullable<ReturnType<typeof useAuth>["user"]>
  ) => NavGroup[];
  searchPlaceholder?: string;
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!canAccessRolePath(user, role)) {
      router.replace(dashboardPathForUser(user));
      return;
    }
    if (
      role === "mentor" &&
      mentorNavRestricted(user) &&
      typeof window !== "undefined"
    ) {
      const path = window.location.pathname;
      const allowed =
        path.startsWith("/mentor/application") ||
        path.startsWith("/mentor/settings");
      if (!allowed) {
        router.replace("/mentor/application");
      }
    }
  }, [user, isLoading, role, router]);

  const toggleCollapse = () => {
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  if (isLoading || !user || !canAccessRolePath(user, role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <p className="text-sm text-ink/45">Loading hub…</p>
      </div>
    );
  }

  const groups = navGroups(user);

  return (
    <div className="flex min-h-screen bg-paper">
      <AppSidebar
        groups={groups}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar
          onMenu={() => setMobileOpen(true)}
          searchPlaceholder={searchPlaceholder}
        />
        <main className="flex-1 overflow-x-hidden px-5 pb-16 pt-2 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
