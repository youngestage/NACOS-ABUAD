"use client";

import { useCallback, useEffect, useState } from "react";
import { Award } from "lucide-react";
import { PageShell, SoftPanel, SoftButton, StatusBadge, EmptyState } from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { createClient } from "@/lib/supabase/client";
import { fetchAssignedMentees, type AssignedMentee } from "@/lib/data/mentees";

export default function MentorCertificatesPage() {
  const { user } = useAuth();
  const [mentees, setMentees] = useState<AssignedMentee[]>([]);
  const [signedIds, setSignedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    const assigned = await fetchAssignedMentees(user.id);
    setMentees(assigned);

    const supabase = createClient();
    const { data } = await supabase
      .from("issued_certificates")
      .select("mentee_id")
      .in(
        "mentee_id",
        assigned.map((m) => m.id)
      );
    setSignedIds(new Set((data ?? []).map((c) => c.mentee_id)));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const sign = async (mentee: AssignedMentee) => {
    if (!user) return;
    const supabase = createClient();
    const { error } = await supabase.from("issued_certificates").insert({
      mentee_id: mentee.id,
      title: `${mentee.track} Milestone`,
      track: mentee.track,
      signed_by: user.fullName,
    });
    if (!error) await load();
  };

  const ready = mentees.map((m) => ({ ...m, isReady: m.progress >= 60 }));

  if (!loading && ready.length === 0) {
    return (
      <PageShell
        title="Sign certificates"
        description="Issue NACOS milestone credentials for mentees who completed phase gates."
      >
        <EmptyState title="No mentees yet" description="Certificates open up once you have mentees." />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Sign certificates"
      description="Issue NACOS milestone credentials for mentees who completed phase gates."
    >
      <SoftPanel title="Mentees">
        <ul className="divide-y divide-[var(--line-subtle)]">
          {ready.map((m) => {
            const signed = signedIds.has(m.id);
            return (
              <li
                key={m.id}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
              >
                <Award className={`h-6 w-6 ${m.isReady ? "text-gold" : "text-ink/25"}`} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-ink">{m.track} Milestone</h3>
                  <p className="text-xs text-ink/45">
                    {m.name} · {m.progress}% complete
                  </p>
                </div>
                <StatusBadge tone={signed ? "success" : m.isReady ? "info" : "neutral"}>
                  {signed ? "Signed" : m.isReady ? "Ready to sign" : "Not ready"}
                </StatusBadge>
                <SoftButton
                  disabled={!m.isReady || signed}
                  className="shrink-0"
                  onClick={() => sign(m)}
                >
                  {signed ? "Signed" : "Sign"}
                </SoftButton>
              </li>
            );
          })}
        </ul>
      </SoftPanel>
    </PageShell>
  );
}
