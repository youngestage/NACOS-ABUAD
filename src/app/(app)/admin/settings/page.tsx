"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SoftPanel } from "@/components/app/ui";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  return (
    <PageShell
      title="Settings"
      description="Chapter operator preferences."
    >
      <div className="max-w-lg space-y-5">
        <SoftPanel title="Operator">
          <p className="font-semibold text-ink">{user?.fullName}</p>
          <p className="mt-1 text-sm text-ink/55">{user?.email}</p>
        </SoftPanel>
      </div>
    </PageShell>
  );
}
