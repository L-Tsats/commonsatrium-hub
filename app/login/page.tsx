"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      setLoading(false);
      if (res?.error) { setError("Invalid email or password."); return; }
      router.push("/dashboard");
    } catch {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Member Access</p>
            <h1 className="mt-2 text-3xl font-semibold">Log in to Commons Atrium</h1>
            <p className="mt-3 leading-7 text-black">
              Access the control center, your tools, announcements, Builders Atrium,
              and the rest of your member environment from here.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-black">Email</label>
                <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-black">Password</label>
                <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black" />
              </div>
              {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50">
                {loading ? "Signing in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-black">
              <span>Don&apos;t have an account yet?</span>
              <Link href="/signup" className="font-medium text-black underline underline-offset-4">Create one here</Link>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-6">
            <h2 className="text-xl font-semibold">Why login is required</h2>
            <p className="mt-3 leading-7 text-black">
              Commons Atrium is a member-based ecosystem. The website acts as the
              account layer, control center, and access hub for the broader product.
            </p>
            <div className="mt-5 space-y-2">
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-black">Access your dashboard and internal pages</div>
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-black">Connect paid tools through your account</div>
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-black">Reach announcements, Builders Atrium, and support tools</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
