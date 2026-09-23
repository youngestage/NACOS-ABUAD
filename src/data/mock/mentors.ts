export interface MockMentorCard {
  id: string;
  name: string;
  level: string;
  track: string;
  rating: number;
  mentees: number;
  availability: "Open" | "Limited" | "Full";
  tags: string[];
  bio: string;
  matchScore?: number;
}

export const MENTORS: MockMentorCard[] = [
  {
    id: "m1",
    name: "Chidi Nwosu",
    level: "400L",
    track: "Cybersecurity",
    rating: 4.9,
    mentees: 6,
    availability: "Open",
    tags: ["Web App Sec", "OWASP", "CTF"],
    bio: "Leads campus red-team drills and reviews secure coding PRs weekly.",
    matchScore: 94,
  },
  {
    id: "m2",
    name: "Amaka Eze",
    level: "Alumni",
    track: "Fullstack",
    rating: 4.8,
    mentees: 8,
    availability: "Limited",
    tags: ["Next.js", "Postgres", "API Design"],
    bio: "Shipped two production SaaS apps; focuses on project milestones.",
    matchScore: 88,
  },
  {
    id: "m3",
    name: "Tunde Bakare",
    level: "500L",
    track: "AI",
    rating: 4.7,
    mentees: 5,
    availability: "Open",
    tags: ["Python", "NLP", "ML Ops"],
    bio: "Guides mentees from notebook experiments to deployable models.",
    matchScore: 81,
  },
  {
    id: "m4",
    name: "Ngozi Okafor",
    level: "400L",
    track: "Cloud",
    rating: 4.9,
    mentees: 4,
    availability: "Open",
    tags: ["AWS", "Terraform", "K8s"],
    bio: "Cloud club lead; async architecture reviews within 48 hours.",
    matchScore: 76,
  },
  {
    id: "m5",
    name: "Emeka Obi",
    level: "Alumni",
    track: "DevOps",
    rating: 4.6,
    mentees: 7,
    availability: "Full",
    tags: ["CI/CD", "Docker", "Monitoring"],
    bio: "SRE at a fintech; mentors pipeline reliability and on-call basics.",
    matchScore: 72,
  },
  {
    id: "m6",
    name: "Zainab Yusuf",
    level: "300L",
    track: "Mobile",
    rating: 4.8,
    mentees: 3,
    availability: "Open",
    tags: ["Flutter", "UI Kit", "Play Store"],
    bio: "Published two apps; great for juniors shipping first mobile MVP.",
    matchScore: 69,
  },
];
