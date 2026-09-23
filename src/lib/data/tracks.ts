import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface TrackOption {
  id: string;
  name: string;
}

/** Live track names for selects — falls back to an empty list until loaded. */
export function useTracks(): TrackOption[] {
  const [tracks, setTracks] = useState<TrackOption[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("tracks")
      .select("id, name")
      .order("name")
      .then(({ data }) => setTracks(data ?? []));
  }, []);

  return tracks;
}
