"use client";

import { PageShell, SoftPanel, StatusBadge } from "@/components/app/ui";
import { SESSIONS } from "@/data/mock/mentor-ops";

export default function MentorSessionsPage() {
  return (
    <PageShell
      title="Sessions"
      description="Live calls, async reviews, and office hours."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {SESSIONS.map((s) => (
          <SoftPanel
            key={s.id}
            title={s.title}
            actions={
              <StatusBadge tone={s.status === "Upcoming" ? "info" : "success"}>
                {s.status}
              </StatusBadge>
            }
          >
            <p className="text-sm text-ink/60">With {s.with}</p>
            <p className="mt-2 text-xs text-ink/40">
              {s.when} · {s.mode}
            </p>
          </SoftPanel>
        ))}
      </div>
    </PageShell>
  );
}
