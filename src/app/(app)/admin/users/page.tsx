"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, StatusBadge } from "@/components/app/ui";

export default function AdminUsersPage() {
  const { getAllUsers } = useAuth();
  const users = getAllUsers();

  return (
    <PageShell title="Users" description="All accounts in the mock store.">
      <div className="rounded-2xl border border-line bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-line-subtle/80 text-left font-mono text-[11px] uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Mentor status</th>
              <th className="px-4 py-3">Matric</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ink">{u.fullName}</td>
                <td className="px-4 py-3 text-ink/60">{u.email}</td>
                <td className="px-4 py-3">
                  <StatusBadge tone="info">{u.role}</StatusBadge>
                </td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ink/50">
                  {u.matricNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
