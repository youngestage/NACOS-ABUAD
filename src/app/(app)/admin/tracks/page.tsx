"use client";

import { useEffect, useState } from "react";
import {
  PageShell,
  SoftPanel,
  FilterBar,
  SoftInput,
  SoftButton,
  StatusBadge,
  EmptyState,
} from "@/components/app/ui";
import { TRACKS } from "@/data/mock/tracks";

const STORE_KEY = "nacos_admin_tracks";

type TrackRow = {
  id: string;
  name: string;
  mentors: number;
  mentees: number;
};

export default function AdminTracksPage() {
  const [tracks, setTracks] = useState<TrackRow[]>(
    TRACKS.map((t) => ({
      id: t.id,
      name: t.name,
      mentors: t.mentors,
      mentees: t.mentees,
    }))
  );
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setTracks(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: TrackRow[]) => {
    setTracks(next);
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    persist([
      ...tracks,
      { id: `t-${Date.now()}`, name: name.trim(), mentors: 0, mentees: 0 },
    ]);
    setName("");
  };

  return (
    <PageShell
      title="Tracks"
      description="Manage specialization tracks (persisted in localStorage)."
    >
      <FilterBar>
        <form onSubmit={add} className="flex w-full flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1 space-y-1.5">
            <label className="text-xs font-medium text-ink/45">New track</label>
            <SoftInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Track name"
            />
          </div>
          <SoftButton type="submit">Add track</SoftButton>
        </form>
      </FilterBar>

      {tracks.length === 0 ? (
        <EmptyState title="No tracks" description="Add a specialization track above." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((t) => (
            <SoftPanel key={t.id} title={t.name} actions={<StatusBadge tone="info">Active</StatusBadge>}>
              <p className="text-xs text-ink/45">
                {t.mentors} mentors · {t.mentees} mentees
              </p>
              <button
                type="button"
                onClick={() => persist(tracks.filter((x) => x.id !== t.id))}
                className="mt-4 text-xs font-semibold text-red-700 hover:underline"
              >
                Remove
              </button>
            </SoftPanel>
          ))}
        </div>
      )}
    </PageShell>
  );
}
