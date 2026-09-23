"use client";

import { Award } from "lucide-react";
import { PageShell, StatusBadge } from "@/components/app/ui";
import { ASSIGNED_MENTEES } from "@/data/mock/mentor-ops";

const SIGNABLE = ASSIGNED_MENTEES.map((m, i) => ({
  id: `cert-${m.id}`,
  mentee: m.name,
  title: `${m.track} Milestone ${i === 2 ? "II" : "I"}`,
  ready: m.progress >= 60,
}));

export default function MentorCertificatesPage() {
  return (
    <PageShell
      title="Sign certificates"
      description="Issue NACOS milestone credentials for mentees who completed phase gates."
    >
      <div className="space-y-3">
        {SIGNABLE.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-line bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <Award className={`w-6 h-6 ${c.ready ? "text-gold" : "text-ink/25"}`} />
            <div className="flex-1">
              <h3 className="font-display font-semibold text-ink">{c.title}</h3>
              <p className="text-xs text-ink/50">{c.mentee}</p>
            </div>
            <StatusBadge tone={c.ready ? "success" : "neutral"}>
              {c.ready ? "Ready to sign" : "Not ready"}
            </StatusBadge>
            <button
              type="button"
              disabled={!c.ready}
              className="rounded-xl bg-forest text-paper text-sm font-semibold px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Sign
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
