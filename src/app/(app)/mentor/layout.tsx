"use client";

import { RoleGate } from "@/components/app/RoleGate";
import { mentorNav } from "@/components/app/AppSidebar";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate role="mentor" navItems={(user) => mentorNav(user)}>
      {children}
    </RoleGate>
  );
}
