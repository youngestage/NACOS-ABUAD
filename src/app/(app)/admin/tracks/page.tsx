"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  PageShell,
  SoftPanel,
  FilterBar,
  SoftInput,
  SoftButton,
  StatusBadge,
  EmptyState,
} from "@/components/app/ui";
import { createClient } from "@/lib/supabase/client";
import { createTrack, deleteTrack } from "@/lib/actions/tracks";
import { useAuth } from "@/lib/auth/auth-context";

type TrackRow = { id: string; name: string; color: string | null };

export default function AdminTracksPage() {
  const { getAllUsers } = useAuth();
  const [tracks, setTracks] = useState<TrackRow[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTracks = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("tracks").select("*").order("name");
    setTracks(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTracks();
  }, [loadTracks]);

  const counts = useMemo(() => {
    const users = getAllUsers();
    const byTrack = new Map<string, { mentors: number; mentees: number }>();
    for (const u of users) {
      if (!u.track) continue;
      const entry = byTrack.get(u.track) ?? { mentors: 0, mentees: 0 };
      if (u.role === "mentor" && u.mentorStatus === "approved") entry.mentors += 1;
      if (u.role === "mentee") entry.mentees += 1;
      byTrack.set(u.track, entry);
    }
    return byTrack;
  }, [getAllUsers]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError("");
    try {
      await createTrack(name.trim());
      setName("");
      await loadTracks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add track.");
    }
  };

  const remove = async (id: string) => {
    setError("");
    try {
      await deleteTrack(id);
      await loadTracks();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove track.");
    }
  };

  return (
    <PageShell title="Tracks" description="Manage specialization tracks.">
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

      {error && (
        <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && tracks.length === 0 ? (
        <EmptyState title="No tracks" description="Add a specialization track above." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((t) => {
            const count = counts.get(t.name) ?? { mentors: 0, mentees: 0 };
            return (
              <SoftPanel key={t.id} title={t.name} actions={<StatusBadge tone="info">Active</StatusBadge>}>
                <p className="text-xs text-ink/45">
                  {count.mentors} mentors · {count.mentees} mentees
                </p>
                <button
                  type="button"
                  onClick={() => remove(t.id)}
                  className="mt-4 text-xs font-semibold text-red-700 hover:underline"
                >
                  Remove
                </button>
              </SoftPanel>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
