"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { dashboardPathForUser } from "@/lib/auth/guards";
import { TRACKS } from "@/data/mock/tracks";

const LEVELS = ["300L", "400L", "500L", "Alumni"];

export default function MentorApplyPage() {
  const { user, isLoading, applyMentor } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [level, setLevel] = useState("300L");
  const [specialization, setSpecialization] = useState("Cybersecurity");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(dashboardPathForUser(user));
    }
  }, [user, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = applyMentor({
      fullName,
      email,
      matricNumber,
      level,
      specialization,
    });
    if (!result.ok) setError(result.error ?? "Application failed");
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          Mentor application
        </div>
        <h2 className="font-display font-bold text-3xl text-ink tracking-tight">
          Apply to mentor
        </h2>
        <p className="text-ink/65 font-body text-sm">
          Applications are reviewed by the NACOS academic committee (mocked —
          pending until an admin approves).
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
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
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
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-xs uppercase tracking-wider text-ink/50">
              Track
            </label>
            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-forest"
            >
              {TRACKS.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
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
          Submit application
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <p className="text-sm text-ink/60">
        Prefer mentee access?{" "}
        <Link href="/signup" className="text-forest font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
