import type { UserRole } from "./types";

/**
 * Fixed demo credentials for the one-click login chips on /login. Only
 * rendered when NEXT_PUBLIC_ENABLE_DEMO_LOGIN=true (see login page), and only
 * work once these three accounts have been created in Supabase — see
 * scripts/seed-demo-users.mjs. Never enable this flag in production.
 */
export const DEMO_PASSWORD = "NacosDemo123!";

export const DEMO_ACCOUNTS: Record<"mentee" | "mentor" | "admin", { email: string; role: UserRole }> = {
  mentee: { email: "demo.mentee@nacos.dev", role: "mentee" },
  mentor: { email: "demo.mentor@nacos.dev", role: "mentor" },
  admin: { email: "demo.admin@nacos.dev", role: "admin" },
};
