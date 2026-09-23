"use client";

import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import type { MockUser } from "@/lib/auth/types";
import {
  PageShell,
  SoftPanel,
  FilterBar,
  SoftInput,
  SoftSelect,
  DataTable,
  StatusBadge,
  type Column,
} from "@/components/app/ui";

export default function AdminUsersPage() {
  const { getAllUsers } = useAuth();
  const users = getAllUsers();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQ =
        !q ||
        u.fullName.toLowerCase().includes(q.toLowerCase()) ||
        u.email.toLowerCase().includes(q.toLowerCase()) ||
        u.matricNumber.toLowerCase().includes(q.toLowerCase());
      const matchRole = role === "all" || u.role === role;
      return matchQ && matchRole;
    });
  }, [users, q, role]);

  const columns: Column<MockUser>[] = [
    {
      key: "fullName",
      header: "Name",
      render: (u) => <span className="font-medium text-ink">{u.fullName}</span>,
    },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Role",
      render: (u) => <StatusBadge tone="info">{u.role}</StatusBadge>,
    },
    {
      key: "mentorStatus",
      header: "Mentor status",
      render: (u) => (
        <StatusBadge
          tone={
            u.mentorStatus === "approved"
              ? "success"
              : u.mentorStatus === "pending"
                ? "warning"
                : u.mentorStatus === "rejected"
                  ? "danger"
                  : "neutral"
          }
        >
          {u.mentorStatus}
        </StatusBadge>
      ),
    },
    {
      key: "matricNumber",
      header: "Matric",
      render: (u) => (
        <span className="font-mono text-xs text-ink/50">{u.matricNumber}</span>
      ),
    },
  ];

  return (
    <PageShell title="Users" description="All accounts in the mock store.">
      <FilterBar onReset={() => { setQ(""); setRole("all"); }}>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink/45">Search</label>
          <SoftInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, email, matric…"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink/45">Role</label>
          <SoftSelect value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="all">All roles</option>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </SoftSelect>
        </div>
      </FilterBar>

      <SoftPanel
        title="Directory"
        subtitle={`${filtered.length} of ${users.length} users`}
      >
        <DataTable
          columns={columns}
          rows={filtered}
          rowKey={(u) => u.id}
        />
      </SoftPanel>
    </PageShell>
  );
}
