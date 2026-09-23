import type { MentorStatus, MockUser, UserRole } from "./types";

export function dashboardPathForUser(user: MockUser): string {
  if (user.role === "admin") return "/admin/dashboard";
  if (user.role === "mentor") {
    if (user.mentorStatus === "pending" || user.mentorStatus === "rejected") {
      return "/mentor/application";
    }
    return "/mentor/dashboard";
  }
  return "/mentee/dashboard";
}

export function canAccessRolePath(
  user: MockUser | null,
  role: UserRole
): boolean {
  if (!user) return false;
  return user.role === role;
}

export function mentorNavRestricted(user: MockUser): boolean {
  return (
    user.role === "mentor" &&
    (user.mentorStatus === "pending" || user.mentorStatus === "rejected")
  );
}

export function statusLabel(status: MentorStatus): string {
  switch (status) {
    case "pending":
      return "Pending review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Not applied";
  }
}
