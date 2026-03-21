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

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-gray-200 bg-white p-8">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Member Access
            </p>
            <h1 className="text-3xl font-semibold">Log in to Commons Atrium</h1>
            <p className="leading-7 text-gray-900">
              Access the control center, your tools, announcements, Builders Atrium,
              and the rest of your member environment from here.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-900">
            <span>Don&apos;t have an account yet?</span>
            <Link href="/signup" className="font-medium text-black underline underline-offset-4">
              Create one here
            </Link>
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-300 bg-gray-100 p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Why login is required</h2>
            <p className="leading-7 text-gray-900">
              Commons Atrium is a member-based ecosystem. The website acts as the
              account layer, control center, and access hub for the broader product.
            </p>

            <div className="space-y-3 pt-2">
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-800">
                Access your dashboard and internal pages
              </div>
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-800">
                Connect paid tools through your account
              </div>
              <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-800">
                Reach announcements, Builders Atrium, and support tools
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
