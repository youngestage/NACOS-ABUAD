"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SectionHeader, StatCard, StatusBadge } from "@/components/app/ui";
import { ASSIGNED_MENTEES, REVIEW_QUEUE, SESSIONS } from "@/data/mock/mentor-ops";

export default function MentorDashboardPage() {
  const { user } = useAuth();
  const pendingReviews = REVIEW_QUEUE.filter((r) => r.status !== "Done").length;
  const upcoming = SESSIONS.filter((s) => s.status === "Upcoming").length;

  return (
    <PageShell
      title={`Mentor desk · ${user?.fullName.split(" ")[0]}`}
      description="Mentees, review queue, and sessions for this week."
      actions={
        <Link
          href="/mentor/reviews"
          className="inline-flex items-center gap-2 rounded-xl bg-forest text-paper text-sm font-semibold px-4 py-2.5"
        >
          Open reviews <ArrowRight className="w-4 h-4" />
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Active mentees" value={ASSIGNED_MENTEES.length} />
        <StatCard label="Pending reviews" value={pendingReviews} hint="Needs attention" />
        <StatCard label="Sessions this week" value={upcoming} />
        <StatCard label="Track" value={user?.specialization ?? "—"} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-2">
        <div className="rounded-2xl border border-line bg-white p-5">
          <SectionHeader
            title="Review queue"
            action={
              <Link href="/mentor/reviews" className="text-xs font-semibold text-forest">
                View all
              </Link>
            }
          />
          <ul className="space-y-3">
            {REVIEW_QUEUE.slice(0, 3).map((r) => (
              <li
                key={r.id}
                className="flex items-start justify-between gap-3 border-b border-line last:border-0 pb-3 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{r.title}</p>
                  <p className="text-xs text-ink/50">
                    {r.mentee} · {r.repo}
                  </p>
                </div>
                <StatusBadge tone={r.priority === "High" ? "warning" : "neutral"}>
                  {r.status}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <SectionHeader title="Upcoming sessions" />
          <ul className="space-y-3">
            {SESSIONS.filter((s) => s.status === "Upcoming").map((s) => (
              <li key={s.id} className="border-b border-line last:border-0 pb-3 last:pb-0">
                <p className="text-sm font-medium text-ink">{s.title}</p>
                <p className="text-xs text-ink/50">
                  {s.with} · {s.when} · {s.mode}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
