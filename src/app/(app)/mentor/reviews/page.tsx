"use client";

import { PageShell, StatusBadge } from "@/components/app/ui";
import { REVIEW_QUEUE } from "@/data/mock/mentor-ops";

export default function MentorReviewsPage() {
  return (
    <PageShell
      title="PR reviews"
      description="Async code teardown queue from your mentees."
    >
      <div className="space-y-3">
        {REVIEW_QUEUE.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-line bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-1">
                <StatusBadge tone={r.priority === "High" ? "warning" : "neutral"}>
                  {r.priority}
                </StatusBadge>
                <StatusBadge
                  tone={
                    r.status === "Done"
                      ? "success"
                      : r.status === "In review"
                        ? "info"
                        : "neutral"
                  }
                >
                  {r.status}
                </StatusBadge>
              </div>
              <h3 className="font-display font-semibold text-ink">{r.title}</h3>
              <p className="text-xs text-ink/50 mt-1">
                {r.mentee} · {r.repo} · {r.submittedAt}
              </p>
            </div>
            <button
              type="button"
              className="rounded-xl bg-forest text-paper text-sm font-semibold px-4 py-2.5 hover:bg-forest-light shrink-0"
            >
              Open teardown
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
