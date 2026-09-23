"use client";

import { PageShell, StatusBadge } from "@/components/app/ui";
import { MENTORS } from "@/data/mock/mentors";
import { useAuth } from "@/lib/auth/auth-context";

export default function AdminMentorsPage() {
  const { getAllUsers } = useAuth();
  const approved = getAllUsers().filter(
    (u) => u.role === "mentor" && u.mentorStatus === "approved"
  );

  return (
    <PageShell
      title="Mentors"
      description="Directory mentors plus approved accounts from the mock store."
    >
      <div className="space-y-6">
        <section>
          <h2 className="font-display font-semibold text-lg mb-3">
            Approved accounts
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {approved.map((u) => (
              <div
                key={u.id}
                className="rounded-2xl border border-line bg-white p-4"
              >
                <p className="font-semibold text-ink">{u.fullName}</p>
                <p className="text-xs text-ink/50">
                  {u.level} · {u.specialization}
                </p>
                <StatusBadge tone="success">Approved</StatusBadge>
              </div>
            ))}
            {approved.length === 0 && (
              <p className="text-sm text-ink/50">No approved mentors yet.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="font-display font-semibold text-lg mb-3">
            Public directory (seed)
          </h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {MENTORS.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-line bg-white p-4"
              >
                <p className="font-semibold text-ink">{m.name}</p>
                <p className="text-xs text-ink/50 mb-2">
                  {m.level} · {m.track}
                </p>
                <StatusBadge
                  tone={m.availability === "Open" ? "success" : "neutral"}
                >
                  {m.availability}
                </StatusBadge>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
