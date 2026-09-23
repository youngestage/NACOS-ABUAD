"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { PageShell, SectionHeader, StatCard, StatusBadge } from "@/components/app/ui";
import { MENTORS } from "@/data/mock/mentors";
import { TRACKS } from "@/data/mock/tracks";

export default function AdminDashboardPage() {
  const { getAllUsers, getApplications } = useAuth();
  const users = getAllUsers();
  const apps = getApplications();
  const pending = apps.filter((a) => a.status === "pending");

  return (
    <PageShell
      title="Admin overview"
      description="Chapter operators — users, mentor pipeline, and tracks."
      actions={
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 rounded-xl bg-forest text-paper text-sm font-semibold px-4 py-2.5"
        >
          Review applications <ArrowRight className="w-4 h-4" />
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Registered users" value={users.length} />
        <StatCard label="Pending applications" value={pending.length} hint="Needs review" />
        <StatCard label="Listed mentors" value={MENTORS.length} />
        <StatCard label="Active tracks" value={TRACKS.length} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-2">
        <div className="rounded-2xl border border-line bg-white p-5">
          <SectionHeader title="Pending applications" />
          {pending.length === 0 ? (
            <p className="text-sm text-ink/50">Queue is clear.</p>
          ) : (
            <ul className="space-y-3">
              {pending.slice(0, 4).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 border-b border-line last:border-0 pb-3"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{a.fullName}</p>
                    <p className="text-xs text-ink/50">
                      {a.level} · {a.specialization}
                    </p>
                  </div>
                  <StatusBadge tone="warning">Pending</StatusBadge>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl border border-line bg-white p-5">
          <SectionHeader title="Track load" />
          <ul className="space-y-3">
            {TRACKS.map((t) => (
              <li key={t.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{t.name}</span>
                <span className="font-mono text-xs text-ink/45">
                  {t.mentors} mentors · {t.mentees} mentees
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
