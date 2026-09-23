"use client";

import { CheckCircle2, Circle, Lock } from "lucide-react";
import { PageShell, SoftPanel, StatusBadge } from "@/components/app/ui";
import { MENTEE_MILESTONES } from "@/data/mock/milestones";

export default function MenteePathPage() {
  return (
    <PageShell
      title="Skill path"
      description="Semester-aligned milestones with PR checkpoints."
    >
      <SoftPanel title="Milestones">
        <ol className="relative ml-3 space-y-0 border-l border-soft">
          {MENTEE_MILESTONES.map((ms) => {
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
                    {ms.prRequired && (
                      <StatusBadge tone="info">PR required</StatusBadge>
                    )}
                  </div>
                  <p className="text-sm text-ink/55">{ms.description}</p>
                  <p className="text-[11px] text-ink/40">{ms.dueLabel}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </SoftPanel>
    </PageShell>
  );
}
