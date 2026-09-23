"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { dashboardPathForUser } from "@/lib/auth/guards";

export default function DashboardRedirectPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    router.replace(dashboardPathForUser(user));
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <p className="font-mono text-sm text-ink/60">Routing to your hub…</p>
    </div>
  );
}
