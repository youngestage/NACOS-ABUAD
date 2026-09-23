"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import {
  PageShell,
  SoftPanel,
  SoftInput,
  SoftButton,
} from "@/components/app/ui";

export default function MentorSettingsPage() {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageShell title="Settings" description="Mentor profile.">
      <SoftPanel title="Profile">
        <form onSubmit={save} className="max-w-lg space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/45">Full name</label>
            <SoftInput value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/45">Email</label>
            <SoftInput disabled value={user?.email ?? ""} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/45">Specialization</label>
            <SoftInput disabled value={user?.specialization ?? ""} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink/45">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-soft-sm bg-soft-muted px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-forest/25"
            />
          </div>
          <SoftButton type="submit">{saved ? "Saved" : "Save changes"}</SoftButton>
        </form>
      </SoftPanel>
    </PageShell>
  );
}
