import Link from "next/link";

export default function MembershipSuccessPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-300 bg-white p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
          Membership
        </p>

        <h1 className="mt-3 text-3xl font-semibold">You&apos;re in.</h1>

        <p className="mt-4 leading-7 text-gray-900">
          Your membership is now active. The full member environment is unlocked.
        </p>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
