"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest font-semibold">
          <Mail className="w-3.5 h-3.5" />
          Password reset
        </div>
        <h2 className="font-display font-bold text-3xl text-ink tracking-tight">
          Reset access
        </h2>
        <p className="text-ink/65 font-body text-sm">
          Demo only — we won&apos;t send a real email. Submit to see the success
          state.
        </p>
      </div>

      {sent ? (
        <div className="rounded-xl border border-signal bg-signal-soft p-5 space-y-3">
          <p className="font-display font-semibold text-forest">
            Reset link queued (mock)
          </p>
          <p className="text-sm text-ink/70">
            In production this would email <strong>{email}</strong>. For now,
            return to login and use a demo chip.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline"
          >
            Back to login <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="you@abuad.edu.ng"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest text-paper font-semibold py-3 hover:bg-forest-light transition-colors"
          >
            Send reset link
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      <p className="text-sm text-ink/60">
        <Link href="/login" className="text-forest font-semibold hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
