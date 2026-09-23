import type { MockUser } from "./types";

export const DEMO_USERS: MockUser[] = [
  {
    id: "u-mentee-1",
    email: "ada.okoro@abuad.edu.ng",
    fullName: "Ada Okoro",
    matricNumber: "22/CSE/001",
    role: "mentee",
    mentorStatus: "none",
    level: "200L",
    track: "Fullstack",
    avatarInitials: "AO",
    bio: "Second-year CS student exploring fullstack web development.",
    createdAt: "2025-09-12T10:00:00.000Z",
  },
  {
    id: "u-mentor-1",
    email: "chidi.nwosu@abuad.edu.ng",
    fullName: "Chidi Nwosu",
    matricNumber: "20/CSE/014",
    role: "mentor",
    mentorStatus: "approved",
    level: "400L",
    specialization: "Cybersecurity",
    track: "Cybersecurity",
    avatarInitials: "CN",
    bio: "Security-focused mentor helping juniors ship safer projects.",
    createdAt: "2025-08-01T10:00:00.000Z",
  },
  {
    id: "u-mentor-pending",
    email: "funke.ade@abuad.edu.ng",
    fullName: "Funke Adeyemi",
    matricNumber: "21/CSE/033",
    role: "mentor",
    mentorStatus: "pending",
    level: "300L",
    specialization: "Cloud",
    track: "Cloud",
    avatarInitials: "FA",
    bio: "Cloud enthusiast awaiting NACOS committee approval.",
    createdAt: "2026-03-10T10:00:00.000Z",
  },
  {
    id: "u-admin-1",
    email: "admin@nacos.abuad.edu.ng",
    fullName: "NACOS Admin",
    matricNumber: "ADMIN/001",
    role: "admin",
    mentorStatus: "none",
    avatarInitials: "NA",
    bio: "Chapter academic committee operator.",
    createdAt: "2025-01-01T10:00:00.000Z",
  },
];

export function findDemoUserByEmail(email: string): MockUser | undefined {
  return DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export function getDemoUserByRole(
  role: "mentee" | "mentor" | "admin"
): MockUser {
  if (role === "mentor") {
    return DEMO_USERS.find((u) => u.role === "mentor" && u.mentorStatus === "approved")!;
  }
  return DEMO_USERS.find((u) => u.role === role)!;
}
