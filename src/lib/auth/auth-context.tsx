"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEMO_USERS,
  findDemoUserByEmail,
  getDemoUserByRole,
} from "./demo-users";
import { clearAuthCookie, setAuthCookie } from "./cookies";
import {
  AUTH_STORAGE_KEY,
  MOCK_STORE_KEY,
  type AuthSession,
  type MockUser,
  type UserRole,
} from "./types";

interface SignUpInput {
  fullName: string;
  email: string;
  matricNumber: string;
  track?: string;
}

interface MentorApplyInput {
  fullName: string;
  email: string;
  matricNumber: string;
  level: string;
  specialization: string;
}

interface MockStore {
  users: MockUser[];
  applications: MentorApplication[];
}

export interface MentorApplication {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  matricNumber: string;
  level: string;
  specialization: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  note?: string;
}

interface AuthContextValue {
  user: MockUser | null;
  isLoading: boolean;
  signIn: (email: string, _password?: string) => { ok: boolean; error?: string };
  signInAsDemo: (role: "mentee" | "mentor" | "admin") => void;
  signUp: (input: SignUpInput) => { ok: boolean; error?: string };
  applyMentor: (input: MentorApplyInput) => { ok: boolean; error?: string };
  signOut: () => void;
  updateProfile: (patch: Partial<MockUser>) => void;
  getApplications: () => MentorApplication[];
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  getAllUsers: () => MockUser[];
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SEED_APPLICATIONS: MentorApplication[] = [
  {
    id: "app-1",
    userId: "u-mentor-pending",
    fullName: "Funke Adeyemi",
    email: "funke.ade@abuad.edu.ng",
    matricNumber: "21/CSE/033",
    level: "300L",
    specialization: "Cloud",
    status: "pending",
    submittedAt: "2026-03-10T10:00:00.000Z",
    note: "AWS Solutions Architect associate prep + campus cloud club lead.",
  },
  {
    id: "app-2",
    userId: "u-ext-1",
    fullName: "Ibrahim Sule",
    email: "ibrahim.sule@abuad.edu.ng",
    matricNumber: "19/CSE/008",
    level: "Alumni",
    specialization: "DevOps",
    status: "pending",
    submittedAt: "2026-03-18T14:30:00.000Z",
    note: "Two years SRE experience; wants to mentor CI/CD tracks.",
  },
];

function loadStore(): MockStore {
  if (typeof window === "undefined") {
    return { users: [...DEMO_USERS], applications: [...SEED_APPLICATIONS] };
  }
  try {
    const raw = localStorage.getItem(MOCK_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as MockStore;
      if (parsed.users?.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  return { users: [...DEMO_USERS], applications: [...SEED_APPLICATIONS] };
}

function saveStore(store: MockStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_STORE_KEY, JSON.stringify(store));
}

function loadSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function saveSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    clearAuthCookie();
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setAuthCookie(session.user.role);
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState<MockStore>({
    users: [...DEMO_USERS],
    applications: [...SEED_APPLICATIONS],
  });

  useEffect(() => {
    const s = loadStore();
    setStore(s);
    const session = loadSession();
    if (session?.user) {
      const fresh =
        s.users.find((u) => u.id === session.user.id) ?? session.user;
      setUser(fresh);
      setAuthCookie(fresh.role);
    }
    setIsLoading(false);
  }, []);

  const persistUser = useCallback(
    (next: MockUser | null, nextStore?: MockStore) => {
      if (nextStore) {
        setStore(nextStore);
        saveStore(nextStore);
      }
      setUser(next);
      if (next) {
        saveSession({ user: next, signedInAt: new Date().toISOString() });
      } else {
        saveSession(null);
      }
    },
    []
  );

  const signIn = useCallback(
    (email: string, _password?: string) => {
      const fromStore = store.users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      const demo = findDemoUserByEmail(email);
      const found = fromStore ?? demo;
      if (!found) {
        return {
          ok: false,
          error: "No account found. Use a demo chip or sign up first.",
        };
      }
      persistUser(found);
      return { ok: true };
    },
    [persistUser, store.users]
  );

  const signInAsDemo = useCallback(
    (role: "mentee" | "mentor" | "admin") => {
      const demo = getDemoUserByRole(role);
      const fromStore = store.users.find((u) => u.id === demo.id) ?? demo;
      persistUser(fromStore);
    },
    [persistUser, store.users]
  );

  const signUp = useCallback(
    (input: SignUpInput) => {
      const exists = store.users.some(
        (u) => u.email.toLowerCase() === input.email.trim().toLowerCase()
      );
      if (exists) {
        return { ok: false, error: "An account with this email already exists." };
      }
      const newUser: MockUser = {
        id: `u-${Date.now()}`,
        email: input.email.trim().toLowerCase(),
        fullName: input.fullName.trim(),
        matricNumber: input.matricNumber.trim(),
        role: "mentee",
        mentorStatus: "none",
        track: input.track ?? "Fullstack",
        level: "100L",
        avatarInitials: initialsFromName(input.fullName),
        bio: "New mentee on NACOS Skills Hub.",
        createdAt: new Date().toISOString(),
      };
      const nextStore = { ...store, users: [...store.users, newUser] };
      persistUser(newUser, nextStore);
      return { ok: true };
    },
    [persistUser, store]
  );

  const applyMentor = useCallback(
    (input: MentorApplyInput) => {
      const email = input.email.trim().toLowerCase();
      let existing = store.users.find((u) => u.email === email);
      const appId = `app-${Date.now()}`;

      if (existing?.role === "admin") {
        return { ok: false, error: "Admin accounts cannot apply as mentors." };
      }

      if (!existing) {
        existing = {
          id: `u-${Date.now()}`,
          email,
          fullName: input.fullName.trim(),
          matricNumber: input.matricNumber.trim(),
          role: "mentor",
          mentorStatus: "pending",
          level: input.level,
          specialization: input.specialization,
          track: input.specialization,
          avatarInitials: initialsFromName(input.fullName),
          bio: "Mentor applicant awaiting review.",
          createdAt: new Date().toISOString(),
        };
      } else {
        existing = {
          ...existing,
          role: "mentor",
          mentorStatus: "pending",
          level: input.level,
          specialization: input.specialization,
          track: input.specialization,
          fullName: input.fullName.trim(),
          matricNumber: input.matricNumber.trim(),
        };
      }

      const application: MentorApplication = {
        id: appId,
        userId: existing.id,
        fullName: existing.fullName,
        email: existing.email,
        matricNumber: existing.matricNumber,
        level: input.level,
        specialization: input.specialization,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      const users = store.users.some((u) => u.id === existing!.id)
        ? store.users.map((u) => (u.id === existing!.id ? existing! : u))
        : [...store.users, existing];

      const applications = [
        application,
        ...store.applications.filter((a) => a.email !== email),
      ];

      persistUser(existing, { users, applications });
      return { ok: true };
    },
    [persistUser, store]
  );

  const signOut = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const updateProfile = useCallback(
    (patch: Partial<MockUser>) => {
      if (!user) return;
      const next = { ...user, ...patch };
      const users = store.users.map((u) => (u.id === user.id ? next : u));
      persistUser(next, { ...store, users });
    },
    [persistUser, store, user]
  );

  const getApplications = useCallback(() => store.applications, [store.applications]);

  const getAllUsers = useCallback(() => store.users, [store.users]);

  const approveApplication = useCallback(
    (id: string) => {
      const app = store.applications.find((a) => a.id === id);
      if (!app) return;
      const applications = store.applications.map((a) =>
        a.id === id ? { ...a, status: "approved" as const } : a
      );
      const users = store.users.map((u) =>
        u.id === app.userId || u.email === app.email
          ? {
              ...u,
              role: "mentor" as UserRole,
              mentorStatus: "approved" as const,
              level: app.level,
              specialization: app.specialization,
              track: app.specialization,
            }
          : u
      );
      const nextStore = { users, applications };
      setStore(nextStore);
      saveStore(nextStore);
      if (user && (user.id === app.userId || user.email === app.email)) {
        const refreshed = users.find((u) => u.id === user.id)!;
        persistUser(refreshed, nextStore);
      }
    },
    [persistUser, store, user]
  );

  const rejectApplication = useCallback(
    (id: string) => {
      const app = store.applications.find((a) => a.id === id);
      if (!app) return;
      const applications = store.applications.map((a) =>
        a.id === id ? { ...a, status: "rejected" as const } : a
      );
      const users = store.users.map((u) =>
        u.id === app.userId || u.email === app.email
          ? { ...u, mentorStatus: "rejected" as const }
          : u
      );
      const nextStore = { users, applications };
      setStore(nextStore);
      saveStore(nextStore);
      if (user && (user.id === app.userId || user.email === app.email)) {
        const refreshed = users.find((u) => u.id === user.id)!;
        persistUser(refreshed, nextStore);
      }
    },
    [persistUser, store, user]
  );

  const refreshUser = useCallback(() => {
    if (!user) return;
    const fresh = store.users.find((u) => u.id === user.id);
    if (fresh) setUser(fresh);
  }, [store.users, user]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signInAsDemo,
      signUp,
      applyMentor,
      signOut,
      updateProfile,
      getApplications,
      approveApplication,
      rejectApplication,
      getAllUsers,
      refreshUser,
    }),
    [
      user,
      isLoading,
      signIn,
      signInAsDemo,
      signUp,
      applyMentor,
      signOut,
      updateProfile,
      getApplications,
      approveApplication,
      rejectApplication,
      getAllUsers,
      refreshUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
