export const TRACKS = [
  { id: "cyber", name: "Cybersecurity", color: "#16452E", mentors: 14, mentees: 48 },
  { id: "cloud", name: "Cloud", color: "#008751", mentors: 9, mentees: 31 },
  { id: "devops", name: "DevOps", color: "#C89B3C", mentors: 7, mentees: 22 },
  { id: "fullstack", name: "Fullstack", color: "#235F41", mentors: 18, mentees: 67 },
  { id: "mobile", name: "Mobile", color: "#3DDC84", mentors: 6, mentees: 19 },
  { id: "ai", name: "AI", color: "#0E2E1F", mentors: 11, mentees: 40 },
] as const;

export type TrackName = (typeof TRACKS)[number]["name"];
