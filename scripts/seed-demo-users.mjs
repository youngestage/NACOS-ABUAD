// One-off script: creates the three demo accounts used by the "Enter as
// Mentee/Mentor/Admin" chips on /login (only shown when
// NEXT_PUBLIC_ENABLE_DEMO_LOGIN=true). Safe to re-run — skips accounts that
// already exist.
//
// Usage:
//   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-demo-users.mjs

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script."
  );
  process.exit(1);
}

const DEMO_PASSWORD = "NacosDemo123!";

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const accounts = [
  {
    email: "demo.mentee@nacos.dev",
    metadata: {
      full_name: "Demo Mentee",
      matric_number: "DEMO/MENTEE/001",
      role: "mentee",
      mentor_status: "none",
      track: "Fullstack",
      level: "200L",
    },
  },
  {
    email: "demo.mentor@nacos.dev",
    metadata: {
      full_name: "Demo Mentor",
      matric_number: "DEMO/MENTOR/001",
      role: "mentee", // created as mentee to skip the applicant trigger, promoted below
    },
    promoteTo: {
      role: "mentor",
      mentor_status: "approved",
      level: "400L",
      specialization: "Fullstack",
      track: "Fullstack",
    },
  },
  {
    email: "demo.admin@nacos.dev",
    metadata: {
      full_name: "Demo Admin",
      matric_number: "DEMO/ADMIN/001",
      role: "mentee",
    },
    promoteTo: { role: "admin" },
  },
];

for (const account of accounts) {
  const { data: existing } = await admin
    .from("profiles")
    .select("id")
    .eq("email", account.email)
    .maybeSingle();

  let userId = existing?.id;

  if (!userId) {
    const { data, error } = await admin.auth.admin.createUser({
      email: account.email,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: account.metadata,
    });
    if (error) {
      console.error(`Failed to create ${account.email}:`, error.message);
      continue;
    }
    userId = data.user.id;
    console.log(`Created ${account.email}`);
  } else {
    console.log(`${account.email} already exists, skipping create`);
  }

  if (account.promoteTo && userId) {
    const { error } = await admin.from("profiles").update(account.promoteTo).eq("id", userId);
    if (error) console.error(`Failed to promote ${account.email}:`, error.message);
    else console.log(`Promoted ${account.email} ->`, account.promoteTo);
  }
}

console.log("Done. Demo password for all accounts:", DEMO_PASSWORD);
