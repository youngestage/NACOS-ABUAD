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
import { AppSidebar, type NavItem } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";

export function RoleGate({
  role,
  navItems,
  children,
}: {
  role: UserRole;
  navItems: (user: NonNullable<ReturnType<typeof useAuth>["user"]>) => NavItem[];
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  if (isLoading || !user || !canAccessRolePath(user, role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="font-mono text-sm text-ink/50">Loading hub…</p>
      </div>
    );
  }

  const items = navItems(user);

  return (
    <div className="min-h-screen flex bg-paper">
      <AppSidebar
        items={items}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <AppTopbar onMenu={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
