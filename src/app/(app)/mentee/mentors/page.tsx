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
import { MENTORS } from "@/data/mock/mentors";
import { TRACKS } from "@/data/mock/tracks";

export default function MenteeMentorsPage() {
  const [track, setTrack] = useState("All");
  const filtered = useMemo(
    () => (track === "All" ? MENTORS : MENTORS.filter((m) => m.track === track)),
    [track]
  );

  return (
    <PageShell
      title="Browse mentors"
      description="Filter verified mentors by specialization track."
    >
      <FilterBar onReset={() => setTrack("All")}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink/45">Track</label>
          <SoftSelect value={track} onChange={(e) => setTrack(e.target.value)}>
            <option value="All">All tracks</option>
            {TRACKS.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </SoftSelect>
        </div>
      </FilterBar>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((m) => (
          <SoftPanel
            key={m.id}
            title={m.name}
            subtitle={`${m.level} · ${m.track}`}
            actions={
              <StatusBadge
                tone={
                  m.availability === "Open"
                    ? "success"
                    : m.availability === "Limited"
                      ? "warning"
                      : "neutral"
                }
              >
                {m.availability}
              </StatusBadge>
            }
          >
            <p className="text-sm text-ink/60">{m.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-soft-muted px-2 py-0.5 text-[11px] text-ink/55"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-soft pt-3 text-xs text-ink/45">
              <span>★ {m.rating}</span>
              <span>{m.mentees} mentees</span>
            </div>
            <SoftButton className="mt-4 w-full">Request match</SoftButton>
          </SoftPanel>
        ))}
      </div>
    </PageShell>
  );
}
