"use client";

import { useEffect, useState } from "react";
import { PageShell, StatusBadge } from "@/components/app/ui";
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
      {
        id: `t-${Date.now()}`,
        name: name.trim(),
        mentors: 0,
        mentees: 0,
      },
    ]);
    setName("");
  };

  const remove = (id: string) => {
    persist(tracks.filter((t) => t.id !== id));
  };

  return (
    <PageShell
      title="Tracks"
      description="Manage specialization tracks (persisted in localStorage)."
    >
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-6 max-w-lg">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New track name"
          className="flex-1 rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-forest"
        />
        <button
          type="submit"
          className="rounded-xl bg-forest text-paper text-sm font-semibold px-5 py-2.5"
        >
          Add track
        </button>
      </form>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {tracks.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-line bg-white p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">{t.name}</h3>
              <StatusBadge tone="info">Active</StatusBadge>
            </div>
            <p className="font-mono text-xs text-ink/45">
              {t.mentors} mentors · {t.mentees} mentees
            </p>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="text-xs font-semibold text-red-700 hover:underline self-start"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
