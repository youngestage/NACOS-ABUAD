"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import {
  PageShell,
  SoftPanel,
  StatCard,
  StatusBadge,
  ProgressBar,
} from "@/components/app/ui";
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
      description="Match score, active track, and next milestone."
      actions={
        <Link
          href="/mentee/quiz"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-paper hover:bg-forest-light"
        >
          Retake quiz <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Match confidence" value="88%" hint="Fullstack track" />
        <StatCard label="Active track" value={user?.track ?? "Fullstack"} hint="Recommended" />
        <StatCard label="Path progress" value="42%" hint="3 of 5 milestones" />
        <StatCard label="Unread messages" value="2" hint="From your mentor" />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <SoftPanel
          className="xl:col-span-2"
          title="Next milestone"
          actions={<StatusBadge tone="info">In progress</StatusBadge>}
        >
          <h3 className="font-display text-xl font-semibold text-ink">
            {current?.title}
          </h3>
          <p className="mt-1 text-sm text-ink/55">{current?.description}</p>
          <p className="mt-3 text-xs text-ink/40">Due · {current?.dueLabel}</p>
          <div className="mt-4">
            <ProgressBar value={42} />
          </div>
          <Link
            href="/mentee/path"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:underline"
          >
            View full path <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </SoftPanel>

        <div className="space-y-5">
          <SoftPanel title="Top mentor match">
            <p className="font-semibold text-ink">{topMentor.name}</p>
            <p className="mt-0.5 text-xs text-ink/45">
              {topMentor.level} · {topMentor.track}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-ink/60">{topMentor.bio}</p>
            <Link
              href="/mentee/matches"
              className="mt-3 inline-flex text-sm font-semibold text-forest hover:underline"
            >
              See matches
            </Link>
          </SoftPanel>
          <SoftPanel title="Upcoming session">
            {nextSession ? (
              <>
                <p className="text-sm font-medium text-ink">{nextSession.title}</p>
                <p className="mt-1 text-xs text-ink/45">
                  {nextSession.when} · {nextSession.mode}
                </p>
              </>
            ) : (
              <p className="text-sm text-ink/45">No sessions scheduled.</p>
            )}
          </SoftPanel>
        </div>
      </section>
    </PageShell>
  );
}
