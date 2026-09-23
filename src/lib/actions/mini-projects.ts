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

  return { supabase, adminId: user.id };
}

export interface MiniProjectInput {
  track: string;
  title: string;
  description?: string;
  weekNumber: number;
  dueAt?: string;
  resourceUrl?: string;
}

export async function createMiniProject(input: MiniProjectInput) {
  const { supabase, adminId } = await requireAdminClient();
  const { error } = await supabase.from("mini_projects").insert({
    track: input.track,
    title: input.title,
    description: input.description || null,
    week_number: input.weekNumber,
    due_at: input.dueAt || null,
    resource_url: input.resourceUrl || null,
    created_by: adminId,
  });
  if (error) throw new Error(error.message);
}

export async function deleteMiniProject(id: string) {
  const { supabase } = await requireAdminClient();
  const { error } = await supabase.from("mini_projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
