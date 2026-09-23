"use client";

import { useEffect, useState } from "react";
import { PageShell, SoftPanel, StatusBadge } from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { fetchMentorDirectory, type MentorDirectoryEntry } from "@/lib/data/mentors";

export default function AdminMentorsPage() {
  const { getAllUsers } = useAuth();
  const approved = getAllUsers().filter(
    (u) => u.role === "mentor" && u.mentorStatus === "approved"
  );
  const [directory, setDirectory] = useState<MentorDirectoryEntry[]>([]);

  useEffect(() => {
    fetchMentorDirectory().then(setDirectory);
  }, []);

  return (
    <PageShell
      title="Mentors"
      description="Approved accounts and their public directory profile."
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
      {directory.length === 0 ? (
        <p className="text-sm text-ink/45">
          No mentor has filled in their public profile yet.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {directory.map((m) => (
            <SoftPanel
              key={m.id}
              title={m.name}
              subtitle={`${m.level} · ${m.track}`}
              actions={
                <StatusBadge tone={m.availability === "Open" ? "success" : "neutral"}>
                  {m.availability}
                </StatusBadge>
              }
            >
              <p className="text-sm text-ink/55 line-clamp-2">{m.bio}</p>
            </SoftPanel>
          ))}
        </div>
      )}
    </PageShell>
  );
}
