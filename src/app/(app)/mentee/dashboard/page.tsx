"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SectionHeader, StatCard, StatusBadge, ProgressBar } from "@/components/app/ui";
import { MENTEE_MILESTONES } from "@/data/mock/milestones";
import { MENTORS } from "@/data/mock/mentors";
import { SESSIONS } from "@/data/mock/mentor-ops";

export default function MenteeDashboardPage() {
  const { user } = useAuth();
  const current = MENTEE_MILESTONES.find((m) => m.status === "current");
  const topMentor = MENTORS[0];
  const nextSession = SESSIONS.find((s) => s.status === "Upcoming");

  return (
    <PageShell
      title={`Hello, ${user?.fullName.split(" ")[0] ?? "mentee"}`}
      description="Your match score, active track, and next milestone — all mock data for the hub demo."
      actions={
        <Link
          href="/mentee/quiz"
          className="inline-flex items-center gap-2 rounded-xl bg-forest text-paper text-sm font-semibold px-4 py-2.5 hover:bg-forest-light"
        >
          Retake quiz <ArrowRight className="w-4 h-4" />
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Match confidence" value="88%" hint="Fullstack track" />
        <StatCard label="Active track" value={user?.track ?? "Fullstack"} hint="Recommended" />
        <StatCard label="Path progress" value="42%" hint="3 of 5 milestones" />
        <StatCard label="Unread messages" value="2" hint="From your mentor" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-2">
        <div className="lg:col-span-2 rounded-2xl border border-line bg-white p-5 space-y-4">
          <SectionHeader
            title="Next milestone"
            action={<StatusBadge tone="info">In progress</StatusBadge>}
          />
          <div>
            <h3 className="font-display font-semibold text-xl text-ink">
              {current?.title}
            </h3>
            <p className="text-sm text-ink/60 mt-1">{current?.description}</p>
            <p className="font-mono text-xs text-ink/40 mt-3">
              Due · {current?.dueLabel}
            </p>
            <div className="mt-4">
              <ProgressBar value={42} />
            </div>
            <Link
              href="/mentee/path"
              className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-forest hover:underline"
            >
              View full path <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-white p-5">
            <SectionHeader title="Top mentor match" />
            <p className="font-display font-semibold text-ink">{topMentor.name}</p>
            <p className="text-xs text-ink/50 mt-0.5">
              {topMentor.level} · {topMentor.track}
            </p>
            <p className="text-sm text-ink/65 mt-3 line-clamp-3">{topMentor.bio}</p>
            <Link
              href="/mentee/matches"
              className="inline-flex text-sm font-semibold text-forest mt-3 hover:underline"
            >
              See matches
            </Link>
          </div>
          <div className="rounded-2xl border border-line bg-white p-5">
            <SectionHeader title="Upcoming session" />
            {nextSession ? (
              <>
                <p className="font-medium text-ink text-sm">{nextSession.title}</p>
                <p className="text-xs text-ink/50 mt-1">
                  {nextSession.when} · {nextSession.mode}
                </p>
              </>
            ) : (
              <p className="text-sm text-ink/50">No sessions scheduled.</p>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
