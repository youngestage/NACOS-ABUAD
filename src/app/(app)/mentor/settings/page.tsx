"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { PageShell } from "@/components/app/ui";

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
    <PageShell title="Settings" description="Mentor profile (stored locally).">
      <form
        onSubmit={save}
        className="max-w-lg rounded-2xl border border-line bg-white p-6 space-y-4"
      >
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Full name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Email
          </label>
          <input
            disabled
            value={user?.email ?? ""}
            className="w-full rounded-xl border border-line bg-line-subtle px-4 py-3 text-sm text-ink/50"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Specialization
          </label>
          <input
            disabled
            value={user?.specialization ?? ""}
            className="w-full rounded-xl border border-line bg-line-subtle px-4 py-3 text-sm text-ink/50"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-forest resize-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-forest text-paper text-sm font-semibold px-5 py-2.5"
        >
          {saved ? "Saved" : "Save changes"}
        </button>
      </form>
    </PageShell>
  );
}
