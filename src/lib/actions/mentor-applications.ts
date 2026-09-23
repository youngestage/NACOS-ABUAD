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

export async function approveMentorApplication(applicationId: string) {
  const { supabase, adminId } = await requireAdminClient();

  const { data: application, error: fetchError } = await supabase
    .from("mentor_applications")
    .select("user_id, level, specialization")
    .eq("id", applicationId)
    .single();
  if (fetchError || !application) {
    throw new Error(fetchError?.message ?? "Application not found.");
  }

  const { error: appError } = await supabase
    .from("mentor_applications")
    .update({
      status: "approved",
      reviewed_by: adminId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId);
  if (appError) throw new Error(appError.message);

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      role: "mentor",
      mentor_status: "approved",
      level: application.level,
      specialization: application.specialization,
      track: application.specialization,
    })
    .eq("id", application.user_id);
  if (profileError) throw new Error(profileError.message);
}

export async function rejectMentorApplication(applicationId: string) {
  const { supabase, adminId } = await requireAdminClient();

  const { data: application, error: fetchError } = await supabase
    .from("mentor_applications")
    .select("user_id")
    .eq("id", applicationId)
    .single();
  if (fetchError || !application) {
    throw new Error(fetchError?.message ?? "Application not found.");
  }

  const { error: appError } = await supabase
    .from("mentor_applications")
    .update({
      status: "rejected",
      reviewed_by: adminId,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", applicationId);
  if (appError) throw new Error(appError.message);

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ mentor_status: "rejected" })
    .eq("id", application.user_id);
  if (profileError) throw new Error(profileError.message);
}
