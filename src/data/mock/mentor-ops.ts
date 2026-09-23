export interface AssignedMentee {
  id: string;
  name: string;
  level: string;
  track: string;
  progress: number;
  nextMilestone: string;
  lastActive: string;
}

export const ASSIGNED_MENTEES: AssignedMentee[] = [
  {
    id: "me1",
    name: "Ada Okoro",
    level: "200L",
    track: "Fullstack",
    progress: 42,
    nextMilestone: "Project scaffold PR",
    lastActive: "2h ago",
  },
  {
    id: "me2",
    name: "Kemi Balogun",
    level: "100L",
    track: "Cybersecurity",
    progress: 18,
    nextMilestone: "Diagnostic quiz",
    lastActive: "Yesterday",
  },
  {
    id: "me3",
    name: "David Okonkwo",
    level: "300L",
    track: "Fullstack",
    progress: 67,
    nextMilestone: "Midpoint code teardown",
    lastActive: "4h ago",
  },
];

export interface ReviewItem {
  id: string;
  mentee: string;
  title: string;
  repo: string;
  submittedAt: string;
  priority: "High" | "Normal";
  status: "Pending" | "In review" | "Done";
}

export const REVIEW_QUEUE: ReviewItem[] = [
  {
    id: "r1",
    mentee: "Ada Okoro",
    title: "feat: add auth middleware",
    repo: "ada/skills-hub-starter",
    submittedAt: "Today · 09:12",
    priority: "High",
    status: "Pending",
  },
  {
    id: "r2",
    mentee: "David Okonkwo",
    title: "fix: profile settings form",
    repo: "david/nacos-path",
    submittedAt: "Yesterday",
    priority: "Normal",
    status: "In review",
  },
  {
    id: "r3",
    mentee: "Kemi Balogun",
    title: "docs: threat model draft",
    repo: "kemi/sec-lab",
    submittedAt: "2 days ago",
    priority: "Normal",
    status: "Pending",
  },
];

export interface SessionItem {
  id: string;
  title: string;
  with: string;
  when: string;
  mode: "Async" | "Live call" | "Office hours";
  status: "Upcoming" | "Completed";
}

export const SESSIONS: SessionItem[] = [
  {
    id: "s1",
    title: "PR teardown — auth middleware",
    with: "Ada Okoro",
    when: "Thu · 4:00 PM",
    mode: "Async",
    status: "Upcoming",
  },
  {
    id: "s2",
    title: "Track check-in",
    with: "David Okonkwo",
    when: "Fri · 11:00 AM",
    mode: "Live call",
    status: "Upcoming",
  },
  {
    id: "s3",
    title: "Office hours drop-in",
    with: "Cybersecurity cohort",
    when: "Sat · 2:00 PM",
    mode: "Office hours",
    status: "Upcoming",
  },
  {
    id: "s4",
    title: "Milestone review",
    with: "Kemi Balogun",
    when: "Mon · Done",
    mode: "Async",
    status: "Completed",
  },
];
