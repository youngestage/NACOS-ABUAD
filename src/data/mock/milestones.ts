export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  dueLabel: string;
  prRequired: boolean;
}

export const MENTEE_MILESTONES: Milestone[] = [
  {
    id: "ms1",
    title: "Diagnostic quiz completed",
    description: "Baseline skill profile and recommended track.",
    status: "completed",
    dueLabel: "Week 1",
    prRequired: false,
  },
  {
    id: "ms2",
    title: "Mentor match confirmed",
    description: "Connected with a verified mentor in your track.",
    status: "completed",
    dueLabel: "Week 1",
    prRequired: false,
  },
  {
    id: "ms3",
    title: "Project scaffold PR",
    description: "Open a starter repo and submit your first pull request.",
    status: "current",
    dueLabel: "Week 3",
    prRequired: true,
  },
  {
    id: "ms4",
    title: "Midpoint code teardown",
    description: "Async review of core feature with mentor feedback.",
    status: "locked",
    dueLabel: "Week 6",
    prRequired: true,
  },
  {
    id: "ms5",
    title: "Milestone certificate",
    description: "Earn a NACOS-signed certificate for the completed track phase.",
    status: "locked",
    dueLabel: "Week 10",
    prRequired: false,
  },
];

export interface Certificate {
  id: string;
  title: string;
  track: string;
  earned: boolean;
  date?: string;
  signedBy?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "c1",
    title: "Skill Discovery Foundations",
    track: "General",
    earned: true,
    date: "2026-02-14",
    signedBy: "NACOS Committee",
  },
  {
    id: "c2",
    title: "Fullstack Milestone I",
    track: "Fullstack",
    earned: false,
  },
  {
    id: "c3",
    title: "Peer Mentorship Participation",
    track: "General",
    earned: false,
  },
];
