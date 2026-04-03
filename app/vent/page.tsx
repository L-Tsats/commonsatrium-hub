import { requireActiveMembership } from "@/lib/require-active-membership";

export default async function VentPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Redirection Tool</p>
        <h1 className="mt-2 text-3xl font-semibold">Vent</h1>
        <p className="mt-3 leading-7 text-black">
          A minimal internal tool for moments of friction, distraction, or mental
          overload. Write briefly. Use it as a pause point, not a destination.
        </p>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">Write</h2>
          <p className="mt-2 text-black">Keep it brief. This is not a journal or a feed.</p>
          <div className="mt-4 space-y-4">
            <textarea
              placeholder="Write briefly about what you are feeling, resisting, or trying to redirect..."
              className="min-h-[160px] w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
            <div className="flex gap-3">
              <button type="button" className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">Submit</button>
              <button type="button" className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
