"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { dashboardPathForUser } from "@/lib/auth/guards";
import { TRACKS } from "@/data/mock/tracks";

export default function SignupPage() {
  const { user, isLoading, signUp } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [track, setTrack] = useState("Fullstack");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(dashboardPathForUser(user));
    }
  }, [user, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = signUp({ fullName, email, matricNumber, track });
    if (!result.ok) setError(result.error ?? "Signup failed");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Mentee registration
        </div>
        <h2 className="font-display font-bold text-3xl text-ink tracking-tight">
          Join Skills Hub
        </h2>
        <p className="text-ink/65 font-body text-sm">
          Create a mentee profile. Demo signup stores your session locally.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Full name
          </label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
            placeholder="Ada Okoro"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            ABUAD email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
            placeholder="you@abuad.edu.ng"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Matric number
          </label>
          <input
            required
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
            placeholder="22/CSE/001"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Interest track
          </label>
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
          >
            {TRACKS.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest text-paper font-semibold py-3 hover:bg-forest-light transition-colors"
        >
          Create mentee account
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <p className="text-sm text-ink/60">
        Already registered?{" "}
        <Link href="/login" className="text-forest font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
