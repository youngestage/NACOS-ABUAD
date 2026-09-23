"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SoftPanel, StatCard, StatusBadge } from "@/components/app/ui";
import { createClient } from "@/lib/supabase/client";

type TrackRow = { id: string; name: string };

export default function AdminDashboardPage() {
  const { getAllUsers, getApplications } = useAuth();
  const users = getAllUsers();
  const apps = getApplications();
  const pending = apps.filter((a) => a.status === "pending");
  const approvedMentors = users.filter((u) => u.role === "mentor" && u.mentorStatus === "approved");
  const [tracks, setTracks] = useState<TrackRow[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("tracks")
      .select("id, name")
      .order("name")
      .then(({ data }) => setTracks(data ?? []));
  }, []);

  const counts = useMemo(() => {
    const byTrack = new Map<string, { mentors: number; mentees: number }>();
    for (const u of users) {
      if (!u.track) continue;
      const entry = byTrack.get(u.track) ?? { mentors: 0, mentees: 0 };
      if (u.role === "mentor" && u.mentorStatus === "approved") entry.mentors += 1;
      if (u.role === "mentee") entry.mentees += 1;
      byTrack.set(u.track, entry);
    }
    return byTrack;
  }, [users]);

  return (
    <PageShell
      title="Overview"
      description="Chapter operators — users, mentor pipeline, and tracks."
      actions={
        <Link
          href="/admin/applications"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-paper hover:bg-forest-light"
        >
          Review applications <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered users" value={users.length} />
        <StatCard label="Pending applications" value={pending.length} hint="Needs review" />
        <StatCard label="Approved mentors" value={approvedMentors.length} />
        <StatCard label="Active tracks" value={tracks.length} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <SoftPanel title="Pending applications">
          {pending.length === 0 ? (
            <p className="text-sm text-ink/45">Queue is clear.</p>
          ) : (
            <ul className="divide-y divide-[var(--line-subtle)]">
              {pending.slice(0, 4).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{a.fullName}</p>
                    <p className="text-xs text-ink/45">
                      {a.level} · {a.specialization}
                    </p>
                  </div>
                  <StatusBadge tone="warning">Pending</StatusBadge>
                </li>
              ))}
            </ul>
          )}
        </SoftPanel>
        <SoftPanel title="Track load">
          {tracks.length === 0 ? (
            <p className="text-sm text-ink/45">No tracks yet.</p>
          ) : (
            <ul className="divide-y divide-[var(--line-subtle)]">
              {tracks.map((t) => {
                const count = counts.get(t.name) ?? { mentors: 0, mentees: 0 };
                return (
                  <li
                    key={t.id}
                    className="flex items-center justify-between py-3.5 text-sm first:pt-0 last:pb-0"
                  >
                    <span className="font-medium text-ink">{t.name}</span>
                    <span className="text-xs text-ink/40">
                      {count.mentors} mentors · {count.mentees} mentees
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </SoftPanel>
      </section>
    </PageShell>
  );
}
