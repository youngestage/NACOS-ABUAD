"use client";

import { RoleGate } from "@/components/app/RoleGate";
import { mentorNav } from "@/components/app/AppSidebar";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate
      role="mentor"
      navGroups={(user) => mentorNav(user)}
      searchPlaceholder="Search mentees, reviews…"
    >
      {children}
    </RoleGate>
  );
}
