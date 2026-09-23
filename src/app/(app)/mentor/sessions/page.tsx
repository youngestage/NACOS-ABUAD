"use client";

import { useEffect, useState } from "react";
import { PageShell, SoftPanel, StatusBadge, EmptyState } from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type SessionRow = Database["public"]["Tables"]["sessions"]["Row"] & { menteeName?: string };

export default function MentorSessionsPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("sessions")
      .select("*")
      .eq("mentor_id", user.id)
      .order("scheduled_at", { ascending: true })
      .then(async ({ data }) => {
        const rows = data ?? [];
        const menteeIds = [...new Set(rows.map((r) => r.mentee_id).filter((id): id is string => Boolean(id)))];
        const { data: mentees } = menteeIds.length
          ? await supabase.from("profiles").select("id, full_name").in("id", menteeIds)
          : { data: [] as { id: string; full_name: string }[] };
        setSessions(
          rows.map((r) => ({
            ...r,
            menteeName: mentees?.find((m) => m.id === r.mentee_id)?.full_name,
          }))
        );
        setLoading(false);
      });
  }, [user]);

  if (!loading && sessions.length === 0) {
    return (
      <PageShell title="Sessions" description="Live calls, async reviews, and office hours.">
        <EmptyState title="No sessions scheduled" description="Scheduled sessions will show up here." />
      </PageShell>
    );
  }

  return (
    <PageShell title="Sessions" description="Live calls, async reviews, and office hours.">
      <div className="grid gap-5 sm:grid-cols-2">
        {sessions.map((s) => (
          <SoftPanel
            key={s.id}
            title={s.title}
            actions={
              <StatusBadge tone={s.status === "Upcoming" ? "info" : "success"}>{s.status}</StatusBadge>
            }
          >
            <p className="text-sm text-ink/60">With {s.menteeName ?? "cohort"}</p>
            <p className="mt-2 text-xs text-ink/40">
              {s.scheduled_at ? new Date(s.scheduled_at).toLocaleString() : "TBD"} · {s.mode}
            </p>
          </SoftPanel>
        ))}
      </div>
    </PageShell>
  );
}
