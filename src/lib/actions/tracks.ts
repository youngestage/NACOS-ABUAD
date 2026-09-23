"use server";

import { createClient } from "@/lib/supabase/server";

async function requireAdminClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") throw new Error("Not authorized.");

  return supabase;
}

export async function createTrack(name: string, color?: string) {
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("tracks").insert({ name: name.trim(), color });
  if (error) throw new Error(error.message);
}

export async function deleteTrack(id: string) {
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("tracks").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
