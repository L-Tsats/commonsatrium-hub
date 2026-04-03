import Link from "next/link";

export default function MembershipRequiredPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Access Restricted</p>
        <h1 className="mt-2 text-3xl font-semibold">Active membership required</h1>
        <p className="mt-4 leading-7 text-black">
          This area is available to active members only. Your account exists, but
          tool access, activation features, and member spaces are locked until
          membership is started or resumed.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/start-membership" className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Start or Resume Membership
          </Link>
          <Link href="/dashboard" className="inline-flex rounded-xl border px-4 py-2 text-sm font-medium text-black hover:bg-gray-50">
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">What membership unlocks</h2>
          <ul className="mt-4 space-y-2 text-black">
            <li className="rounded-xl bg-gray-50 px-4 py-3">Tools and ecosystem access</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Access key for browser extensions</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Builders Atrium groups</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Vent redirection tool</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Announcements and updates</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
