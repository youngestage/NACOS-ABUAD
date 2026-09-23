"use client";

import { PageShell, ProgressBar, StatusBadge } from "@/components/app/ui";
import { MENTORS } from "@/data/mock/mentors";

export default function MenteeMatchesPage() {
  const ranked = [...MENTORS].sort(
    (a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0)
  );

  return (
    <PageShell
      title="Your matches"
      description="AI matcher recommendations based on your quiz profile (seeded demo)."
    >
      <div className="space-y-3">
        {ranked.map((m, i) => (
          <div
            key={m.id}
            className="rounded-2xl border border-line bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-forest text-paper flex items-center justify-center font-display font-bold">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-semibold text-ink">{m.name}</h3>
                <StatusBadge tone="info">{m.track}</StatusBadge>
              </div>
              <p className="text-sm text-ink/60 line-clamp-2">{m.bio}</p>
              <div className="max-w-xs">
                <div className="flex justify-between text-[11px] font-mono text-ink/45 mb-1">
                  <span>Confidence</span>
                  <span>{m.matchScore}%</span>
                </div>
                <ProgressBar value={m.matchScore ?? 0} />
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-xl border border-forest text-forest text-sm font-semibold px-4 py-2 hover:bg-signal-soft"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
