"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { PageShell, SoftPanel, StatusBadge, EmptyState } from "@/components/app/ui";
import { useAuth } from "@/lib/auth/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";

type Certificate = Database["public"]["Tables"]["issued_certificates"]["Row"];

export default function MenteeCertificatesPage() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("issued_certificates")
      .select("*")
      .eq("mentee_id", user.id)
      .order("issued_at", { ascending: false })
      .then(({ data }) => {
        setCertificates(data ?? []);
        setLoading(false);
      });
  }, [user]);

  if (!loading && certificates.length === 0) {
    return (
      <PageShell title="Certificates" description="Milestone credentials signed by NACOS.">
        <EmptyState
          title="No certificates yet"
          description="Complete milestones with your mentor to earn signed credentials."
        />
      </PageShell>
    );
  }

  return (
    <PageShell title="Certificates" description="Milestone credentials signed by NACOS.">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {certificates.map((c) => (
          <SoftPanel
            key={c.id}
            title={c.title}
            subtitle={c.track ?? undefined}
            actions={<StatusBadge tone="success">Earned</StatusBadge>}
          >
            <div className="mb-2">
              <Award className="h-6 w-6 text-gold" />
            </div>
            <p className="text-[11px] text-ink/40">
              {new Date(c.issued_at).toLocaleDateString()} · {c.signed_by ?? "NACOS Committee"}
            </p>
          </SoftPanel>
        ))}
      </div>
    </PageShell>
  );
}
