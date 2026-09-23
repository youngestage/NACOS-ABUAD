"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SoftPanel, StatCard, StatusBadge } from "@/components/app/ui";
import { createClient } from "@/lib/supabase/client";
import { fetchAssignedMentees, type AssignedMentee } from "@/lib/data/mentees";
import type { Database } from "@/lib/supabase/database.types";

type PrReview = Database["public"]["Tables"]["pr_reviews"]["Row"];
type SessionRow = Database["public"]["Tables"]["sessions"]["Row"];

export default function MentorDashboardPage() {
  const { user } = useAuth();
  const [mentees, setMentees] = useState<AssignedMentee[]>([]);
  const [reviews, setReviews] = useState<PrReview[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    fetchAssignedMentees(user.id).then(setMentees);
    supabase
      .from("pr_reviews")
      .select("*")
      .eq("mentor_id", user.id)
      .order("submitted_at", { ascending: false })
      .then(({ data }) => setReviews(data ?? []));
    supabase
      .from("sessions")
      .select("*")
      .eq("mentor_id", user.id)
      .order("scheduled_at", { ascending: true })
      .then(({ data }) => setSessions(data ?? []));
  }, [user]);

  const pendingReviews = reviews.filter((r) => r.status !== "Done").length;
  const upcomingSessions = sessions.filter((s) => s.status === "Upcoming");

  return (
    <PageShell
      title={`Mentor desk · ${user?.fullName.split(" ")[0]}`}
      description="Mentees, review queue, and sessions for this week."
      actions={
        <Link
          href="/mentor/reviews"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-paper hover:bg-forest-light"
        >
          Open reviews <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active mentees" value={mentees.length} />
        <StatCard label="Pending reviews" value={pendingReviews} hint="Needs attention" />
        <StatCard label="Sessions this week" value={upcomingSessions.length} />
        <StatCard label="Track" value={user?.specialization ?? "—"} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <SoftPanel
          title="Review queue"
          actions={
            <Link href="/mentor/reviews" className="text-xs font-semibold text-forest">
              View all
            </Link>
          }
        >
          {reviews.length === 0 ? (
            <p className="text-sm text-ink/45">Queue is clear.</p>
          ) : (
            <ul className="divide-y divide-[var(--line-subtle)]">
              {reviews.slice(0, 3).map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-ink">{r.title}</p>
                    <p className="text-xs text-ink/45">{r.repo_url}</p>
                  </div>
                  <StatusBadge tone={r.priority === "High" ? "warning" : "neutral"}>{r.status}</StatusBadge>
                </li>
              ))}
            </ul>
          )}
        </SoftPanel>
        <SoftPanel title="Upcoming sessions">
          {upcomingSessions.length === 0 ? (
            <p className="text-sm text-ink/45">No sessions scheduled.</p>
          ) : (
            <ul className="divide-y divide-[var(--line-subtle)]">
              {upcomingSessions.map((s) => (
                <li key={s.id} className="py-3.5 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-ink">{s.title}</p>
                  <p className="text-xs text-ink/45">
                    {s.scheduled_at ? new Date(s.scheduled_at).toLocaleString() : "TBD"} · {s.mode}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </SoftPanel>
      </section>
    </PageShell>
  );
}
