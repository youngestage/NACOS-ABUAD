"use client";

import { RoleGate } from "@/components/app/RoleGate";
import { menteeNav } from "@/components/app/AppSidebar";

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate role="mentee" navItems={() => menteeNav()}>
      {children}
    </RoleGate>
  );
}
