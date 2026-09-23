"use client";

import { useMemo, useState } from "react";
import { PageShell, StatusBadge } from "@/components/app/ui";
import { MENTORS } from "@/data/mock/mentors";
import { TRACKS } from "@/data/mock/tracks";

export default function MenteeMentorsPage() {
  const [track, setTrack] = useState("All");
  const filtered = useMemo(
    () =>
      track === "All" ? MENTORS : MENTORS.filter((m) => m.track === track),
    [track]
  );

  return (
    <PageShell
      title="Browse mentors"
      description="Filter verified mentors by specialization track."
    >
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTrack("All")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
            track === "All"
              ? "bg-forest text-paper border-forest"
              : "bg-white border-line text-ink/70"
          }`}
        >
          All
        </button>
        {TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTrack(t.name)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
              track === t.name
                ? "bg-forest text-paper border-forest"
                : "bg-white border-line text-ink/70"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-line bg-white p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-semibold text-ink">{m.name}</h3>
                <p className="text-xs text-ink/50">
                  {m.level} · {m.track}
                </p>
              </div>
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
            </div>
            <p className="text-sm text-ink/65 flex-1">{m.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {m.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-line-subtle text-ink/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-ink/50 pt-1 border-t border-line">
              <span>★ {m.rating}</span>
              <span>{m.mentees} mentees</span>
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-forest text-paper text-sm font-semibold py-2.5 hover:bg-forest-light"
            >
              Request match
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
