"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signupAction } from "./actions";

export default function SignupPage() {
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signupAction(email, password, displayName);

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    // Auto-login after signup, then go straight to membership setup
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        router.push("/login");
        return;
      }

      router.push("/start-membership");
    } catch {
      router.push("/login");
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              New Member
            </p>
            <h1 className="text-3xl font-semibold">Create your account and Continue</h1>
            <p className="leading-7 text-gray-900">
              Start your membership setup and get access to the control center, tools,
              downloads, and the wider Commons Atrium ecosystem.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-800">
                Display Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

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
                placeholder="Create a password"
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
              {loading ? "Creating account..." : "Join the Atrium"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-900">
            <span>Already have an account?</span>
            <Link href="/login" className="font-medium text-black underline underline-offset-4">
              Log in here
            </Link>
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-300 bg-gray-100 p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">What happens next</h2>
            <p className="leading-7 text-gray-900">
              Account creation is part of the membership flow. Commons Atrium is not a
              free-access platform; membership unlocks the internal control environment
              and tool access.
            </p>

            <ol className="space-y-3 pt-2 text-gray-900">
              <li className="rounded-xl bg-white p-4">1. Enter your account details</li>
              <li className="rounded-xl bg-white p-4">2. Continue into membership setup</li>
              <li className="rounded-xl bg-white p-4">3. Unlock the member environment</li>
            </ol>
          </div>
        </aside>
      </div>
    </main>
  );
}
