"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SoftPanel, SoftButton } from "@/components/app/ui";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  const resetDemo = () => {
    localStorage.removeItem("nacos_mock_store");
    localStorage.removeItem("nacos_admin_tracks");
    window.location.reload();
  };

  return (
    <PageShell
      title="Settings"
      description="Chapter operator preferences and demo utilities."
    >
      <div className="max-w-lg space-y-5">
        <SoftPanel title="Operator">
          <p className="font-semibold text-ink">{user?.fullName}</p>
          <p className="mt-1 text-sm text-ink/55">{user?.email}</p>
        </SoftPanel>
        <SoftPanel
          title="Reset mock data"
          subtitle="Clears applications, custom users, and track edits, then reloads seed data."
        >
          <SoftButton variant="soft" onClick={resetDemo}>
            Reset demo store
          </SoftButton>
        </SoftPanel>
      </div>
    </PageShell>
  );
}
