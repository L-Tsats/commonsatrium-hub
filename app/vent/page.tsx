import { requireActiveMembership } from "@/lib/require-active-membership";

export default async function VentPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Redirection Tool
            </p>
            <h1 className="text-3xl font-semibold">Vent</h1>
            <p className="leading-7 text-gray-900">
              A minimal internal tool for moments of friction, distraction, or mental
              overload. Write briefly. Use it as a pause point, not a destination.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-lg font-semibold">Write</h2>
          <p className="mt-2 text-base text-gray-800">
            Keep it brief. This is not a journal or a feed.
          </p>

          <div className="mt-5 space-y-4">
            <textarea
              placeholder="Write briefly about what you are feeling, resisting, or trying to redirect..."
              className="min-h-[160px] w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Submit
              </button>
              <button
                type="button"
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
