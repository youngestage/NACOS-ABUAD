"use client";

import { RoleGate } from "@/components/app/RoleGate";
import { adminNav } from "@/components/app/AppSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGate
      role="admin"
      navGroups={() => adminNav()}
      searchPlaceholder="Search users, applications…"
    >
      {children}
    </RoleGate>
  );
}
