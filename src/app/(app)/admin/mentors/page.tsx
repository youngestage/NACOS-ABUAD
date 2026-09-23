"use client";

import { PageShell, SoftPanel, StatusBadge } from "@/components/app/ui";
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
      description="Approved accounts plus public directory seed."
    >
      <SoftPanel title="Approved accounts" subtitle={`${approved.length} mentors`}>
        {approved.length === 0 ? (
          <p className="text-sm text-ink/45">No approved mentors yet.</p>
        ) : (
          <ul className="divide-y divide-[var(--line-subtle)]">
            {approved.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-semibold text-ink">{u.fullName}</p>
                  <p className="text-xs text-ink/45">
                    {u.level} · {u.specialization}
                  </p>
                </div>
                <StatusBadge tone="success">Approved</StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </SoftPanel>

      <h2 className="text-base font-semibold text-ink">Public directory</h2>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {MENTORS.map((m) => (
          <SoftPanel
            key={m.id}
            title={m.name}
            subtitle={`${m.level} · ${m.track}`}
            actions={
              <StatusBadge
                tone={m.availability === "Open" ? "success" : "neutral"}
              >
                {m.availability}
              </StatusBadge>
            }
          >
            <p className="text-sm text-ink/55 line-clamp-2">{m.bio}</p>
          </SoftPanel>
        ))}
      </div>
    </PageShell>
  );
}
