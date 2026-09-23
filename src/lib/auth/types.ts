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

export interface AuthSession {
  user: MockUser;
  signedInAt: string;
}

export const AUTH_STORAGE_KEY = "nacos_auth_session";
export const AUTH_COOKIE_NAME = "nacos_auth_role";
export const MOCK_STORE_KEY = "nacos_mock_store";
