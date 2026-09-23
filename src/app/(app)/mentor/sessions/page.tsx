"use client";

import { PageShell, StatusBadge } from "@/components/app/ui";
import { SESSIONS } from "@/data/mock/mentor-ops";

export default function MentorSessionsPage() {
  return (
    <PageShell
      title="Sessions"
      description="Live calls, async reviews, and office hours."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {SESSIONS.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-line bg-white p-5 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <StatusBadge tone={s.status === "Upcoming" ? "info" : "success"}>
                {s.status}
              </StatusBadge>
              <span className="font-mono text-[11px] text-ink/40">{s.mode}</span>
            </div>
            <h3 className="font-display font-semibold text-ink">{s.title}</h3>
            <p className="text-sm text-ink/60">
              With {s.with}
            </p>
            <p className="font-mono text-xs text-ink/45">{s.when}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
