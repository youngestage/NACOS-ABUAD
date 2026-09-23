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
