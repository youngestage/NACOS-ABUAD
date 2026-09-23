"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageShell } from "@/components/app/ui";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  const resetDemo = () => {
    localStorage.removeItem("nacos_mock_store");
    localStorage.removeItem("nacos_admin_tracks");
    window.location.reload();
  };

  return (
    <PageShell
      title="Admin settings"
      description="Chapter operator preferences and demo utilities."
    >
      <div className="max-w-lg space-y-4">
        <div className="rounded-2xl border border-line bg-white p-5 space-y-2">
          <p className="font-mono text-xs uppercase text-ink/45">Operator</p>
          <p className="font-display font-semibold text-ink">{user?.fullName}</p>
          <p className="text-sm text-ink/60">{user?.email}</p>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5 space-y-3">
          <p className="font-display font-semibold text-ink">Reset mock data</p>
          <p className="text-sm text-ink/60">
            Clears applications, custom users, and track edits from localStorage,
            then reloads seed data.
          </p>
          <button
            type="button"
            onClick={resetDemo}
            className="rounded-xl border border-line text-sm font-semibold px-4 py-2.5 hover:bg-red-50 hover:text-red-700"
          >
            Reset demo store
          </button>
        </div>
      </div>
    </PageShell>
  );
}
