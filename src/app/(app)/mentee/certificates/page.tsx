"use client";

import { Award, Lock } from "lucide-react";
import { PageShell, StatusBadge } from "@/components/app/ui";
import { CERTIFICATES } from "@/data/mock/milestones";

export default function MenteeCertificatesPage() {
  return (
    <PageShell
      title="Certificates"
      description="Milestone credentials signed by NACOS (demo)."
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {CERTIFICATES.map((c) => (
          <article
            key={c.id}
            className={`rounded-2xl border p-5 ${
              c.earned
                ? "border-forest/30 bg-white"
                : "border-line bg-white/70 opacity-80"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              {c.earned ? (
                <Award className="w-6 h-6 text-gold" />
              ) : (
                <Lock className="w-5 h-5 text-ink/30" />
              )}
              <StatusBadge tone={c.earned ? "success" : "neutral"}>
                {c.earned ? "Earned" : "Locked"}
              </StatusBadge>
            </div>
            <h3 className="font-display font-semibold text-ink">{c.title}</h3>
            <p className="text-xs text-ink/50 mt-1">{c.track}</p>
            {c.earned && (
              <p className="font-mono text-[11px] text-ink/40 mt-4">
                {c.date} · {c.signedBy}
              </p>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
