"use client";

import { useEffect, useState } from "react";
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
import { createClient } from "@/lib/supabase/client";
import { fetchMentorDirectory, type MentorDirectoryEntry } from "@/lib/data/mentors";
import type { Database } from "@/lib/supabase/database.types";

type Milestone = Database["public"]["Tables"]["mentee_milestones"]["Row"];
type SessionRow = Database["public"]["Tables"]["sessions"]["Row"];

export default function MenteeDashboardPage() {
  const { user } = useAuth();
  const [topMentor, setTopMentor] = useState<MentorDirectoryEntry | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [nextSession, setNextSession] = useState<SessionRow | null>(null);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    fetchMentorDirectory().then((mentors) => {
      const inTrack = mentors.find((m) => m.track === user.track);
      setTopMentor(inTrack ?? mentors[0] ?? null);
    });

    supabase
      .from("mentee_milestones")
      .select("*")
      .eq("mentee_id", user.id)
      .then(({ data }) => setMilestones(data ?? []));

    supabase
      .from("sessions")
      .select("*")
      .eq("mentee_id", user.id)
      .eq("status", "Upcoming")
      .order("scheduled_at", { ascending: true })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setNextSession(data));

    supabase
      .from("message_threads")
      .select("id")
      .or(`participant_a.eq.${user.id},participant_b.eq.${user.id}`)
      .then(async ({ data: threads }) => {
        if (!threads?.length) return;
        const { count } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .in(
            "thread_id",
            threads.map((t) => t.id)
          )
          .is("read_at", null)
          .neq("sender_id", user.id);
        setUnread(count ?? 0);
      });
  }, [user]);

  const current = milestones.find((m) => m.status === "current");
  const completedCount = milestones.filter((m) => m.status === "completed").length;
  const pathProgress = milestones.length
    ? Math.round((completedCount / milestones.length) * 100)
    : 0;

  return (
    <PageShell
      title={`Hello, ${user?.fullName.split(" ")[0] ?? "mentee"}`}
      description="Active track and next milestone."
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
        <StatCard label="Active track" value={user?.track ?? "Unset"} hint="From your quiz" />
        <StatCard
          label="Path progress"
          value={`${pathProgress}%`}
          hint={`${completedCount} of ${milestones.length || "0"} milestones`}
        />
        <StatCard label="Unread messages" value={unread} hint="From your mentor" />
        <StatCard label="Upcoming sessions" value={nextSession ? 1 : 0} />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <SoftPanel
          className="xl:col-span-2"
          title={current ? "Next milestone" : "Skill path"}
          actions={current && <StatusBadge tone="info">In progress</StatusBadge>}
        >
          {current ? (
            <>
              <h3 className="font-display text-xl font-semibold text-ink">{current.title}</h3>
              {current.description && (
                <p className="mt-1 text-sm text-ink/55">{current.description}</p>
              )}
              {current.due_label && (
                <p className="mt-3 text-xs text-ink/40">Due · {current.due_label}</p>
              )}
              <div className="mt-4">
                <ProgressBar value={pathProgress} />
              </div>
            </>
          ) : (
            <p className="text-sm text-ink/55">
              No milestones yet — they&apos;ll appear once your mentor sets your path.
            </p>
          )}
          <Link
            href="/mentee/path"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:underline"
          >
            View full path <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </SoftPanel>

        <div className="space-y-5">
          <SoftPanel title="Top mentor match">
            {topMentor ? (
              <>
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
              </>
            ) : (
              <p className="text-sm text-ink/45">No mentors available yet.</p>
            )}
          </SoftPanel>
          <SoftPanel title="Upcoming session">
            {nextSession ? (
              <>
                <p className="text-sm font-medium text-ink">{nextSession.title}</p>
                <p className="mt-1 text-xs text-ink/45">
                  {nextSession.scheduled_at
                    ? new Date(nextSession.scheduled_at).toLocaleString()
                    : "TBD"}{" "}
                  · {nextSession.mode}
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
