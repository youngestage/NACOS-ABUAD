export type UserRole = "mentee" | "mentor" | "admin";

export type MentorStatus = "none" | "pending" | "approved" | "rejected";

export interface MockUser {
  id: string;
  email: string;
  fullName: string;
  matricNumber: string;
  role: UserRole;
  mentorStatus: MentorStatus;
  level?: string;
  specialization?: string;
  track?: string;
  avatarInitials: string;
  bio?: string;
  createdAt: string;
}

