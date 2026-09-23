"use client";

import {
  PageShell,
  SoftPanel,
  ProgressBar,
  StatusBadge,
  SoftButton,
} from "@/components/app/ui";
import { MENTORS } from "@/data/mock/mentors";

export default function MenteeMatchesPage() {
  const ranked = [...MENTORS].sort(
    (a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0)
  );

  return (
    <PageShell
      title="Your matches"
      description="AI matcher recommendations based on your quiz profile."
    >
      <SoftPanel title="Ranked mentors" subtitle="Highest confidence first">
        <ul className="divide-y divide-[var(--line-subtle)]">
          {ranked.map((m, i) => (
            <li
              key={m.id}
              className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-soft-sm bg-soft-tint font-display font-bold text-forest">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-ink">{m.name}</h3>
                  <StatusBadge tone="info">{m.track}</StatusBadge>
                </div>
                <p className="line-clamp-2 text-sm text-ink/55">{m.bio}</p>
                <div className="max-w-xs">
                  <div className="mb-1 flex justify-between text-[11px] text-ink/40">
                    <span>Confidence</span>
                    <span>{m.matchScore}%</span>
                  </div>
                  <ProgressBar value={m.matchScore ?? 0} />
                </div>
              </div>
              <SoftButton variant="soft" className="shrink-0">
                Connect
              </SoftButton>
            </li>
          ))}
        </ul>
      </SoftPanel>
    </PageShell>
  );
}
