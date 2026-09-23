"use client";

import { useMemo, useState } from "react";
import {
  PageShell,
  SoftPanel,
  FilterBar,
  SoftSelect,
  SoftButton,
  StatusBadge,
} from "@/components/app/ui";
import { REVIEW_QUEUE } from "@/data/mock/mentor-ops";

export default function MentorReviewsPage() {
  const [status, setStatus] = useState("all");
  const filtered = useMemo(
    () =>
      status === "all"
        ? REVIEW_QUEUE
        : REVIEW_QUEUE.filter((r) => r.status === status),
    [status]
  );

  return (
    <PageShell
      title="PR reviews"
      description="Async code teardown queue from your mentees."
    >
      <FilterBar onReset={() => setStatus("all")}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink/45">Status</label>
          <SoftSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="In review">In review</option>
            <option value="Done">Done</option>
          </SoftSelect>
        </div>
      </FilterBar>

      <SoftPanel title="Queue" subtitle={`${filtered.length} items`}>
        <ul className="divide-y divide-[var(--line-subtle)]">
          {filtered.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap gap-2">
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
                <h3 className="font-semibold text-ink">{r.title}</h3>
                <p className="mt-1 text-xs text-ink/45">
                  {r.mentee} · {r.repo} · {r.submittedAt}
                </p>
              </div>
              <SoftButton className="shrink-0">Open teardown</SoftButton>
            </li>
          ))}
        </ul>
      </SoftPanel>
    </PageShell>
  );
}
