"use client";

import { CheckCircle2, Circle, Lock } from "lucide-react";
import { PageShell, StatusBadge } from "@/components/app/ui";
import { MENTEE_MILESTONES } from "@/data/mock/milestones";

export default function MenteePathPage() {
  return (
    <PageShell
      title="Skill path"
      description="Semester-aligned milestones with PR checkpoints."
    >
      <ol className="relative space-y-0 border-l border-line ml-3">
        {MENTEE_MILESTONES.map((ms) => {
          const Icon =
            ms.status === "completed"
              ? CheckCircle2
              : ms.status === "current"
                ? Circle
                : Lock;
          return (
            <li key={ms.id} className="relative pl-8 pb-8 last:pb-0">
              <span className="absolute -left-[9px] top-1 bg-paper">
                <Icon
                  className={`w-4 h-4 ${
                    ms.status === "completed"
                      ? "text-forest"
                      : ms.status === "current"
                        ? "text-gold"
                        : "text-ink/30"
                  }`}
                />
              </span>
              <div className="rounded-2xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-display font-semibold text-ink">{ms.title}</h3>
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
                  {ms.prRequired && (
                    <StatusBadge tone="info">PR required</StatusBadge>
                  )}
                </div>
                <p className="text-sm text-ink/60">{ms.description}</p>
                <p className="font-mono text-[11px] text-ink/40 mt-3">
                  {ms.dueLabel}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </PageShell>
  );
}
