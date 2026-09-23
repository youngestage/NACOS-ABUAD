"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { PageShell, SoftPanel, StatusBadge, EmptyState } from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Milestone = Database["public"]["Tables"]["mentee_milestones"]["Row"];

export default function MenteePathPage() {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("mentee_milestones")
      .select("*")
      .eq("mentee_id", user.id)
      .order("updated_at", { ascending: true })
      .then(({ data }) => {
        setMilestones(data ?? []);
        setLoading(false);
      });
  }, [user]);

  if (!loading && milestones.length === 0) {
    return (
      <PageShell title="Skill path" description="Semester-aligned milestones with PR checkpoints.">
        <EmptyState
          title="No milestones yet"
          description="Your mentor sets milestones once you're matched — check back soon."
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Skill path"
      description="Semester-aligned milestones with PR checkpoints."
    >
      <SoftPanel title="Milestones">
        <ol className="relative ml-3 space-y-0 border-l border-soft">
          {milestones.map((ms) => {
            const Icon =
              ms.status === "completed"
                ? CheckCircle2
                : ms.status === "current"
                  ? Circle
                  : Lock;
            return (
              <li key={ms.id} className="relative pb-8 pl-8 last:pb-0">
                <span className="absolute -left-[9px] top-1 bg-soft-surface">
                  <Icon
                    className={`h-4 w-4 ${
                      ms.status === "completed"
                        ? "text-forest"
                        : ms.status === "current"
                          ? "text-gold"
                          : "text-ink/30"
                    }`}
                  />
                </span>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-ink">{ms.title}</h3>
                    <StatusBadge
                      tone={
                        ms.status === "completed"
                          ? "success"
                          : ms.status === "current"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {ms.status}
                    </StatusBadge>
                    {ms.pr_required && <StatusBadge tone="info">PR required</StatusBadge>}
                  </div>
                  {ms.description && <p className="text-sm text-ink/55">{ms.description}</p>}
                  {ms.due_label && <p className="text-[11px] text-ink/40">{ms.due_label}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </SoftPanel>
    </PageShell>
  );
}
