import { requireActiveMembership } from "@/lib/require-active-membership";
import { getOrCreateCurrentAccessKey } from "@/lib/access-key";

export default async function AccessKeyPage() {
  await requireActiveMembership();

  const accessKey = await getOrCreateCurrentAccessKey();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Extension Access
            </p>
            <h1 className="text-3xl font-semibold">Access Key</h1>
            <p className="leading-7 text-black">
              Your access key connects eligible tools — like browser extensions — to
              your member account. It is one-time use and tied to your account.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-xl font-semibold">Your Key</h2>

            <div className="mt-5 rounded-2xl bg-gray-100 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-black">
                Key
              </p>
              <p className="mt-3 break-all font-mono text-base text-black">
                {accessKey.key}
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-gray-300 p-4">
              <p className="text-sm font-medium text-black">Status</p>
              <p className={`mt-1 text-sm ${accessKey.isConsumed ? "text-red-600" : "text-green-700"}`}>
                {accessKey.isConsumed
                  ? "Already used — contact support if you need a replacement"
                  : "Ready to use"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-xl font-semibold">Where this is used</h2>
            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-gray-100 p-4">
                <p className="font-medium text-black">Browser Extensions</p>
                <p className="mt-2 leading-6 text-black">
                  Paste this key into the extension setup screen to connect it to
                  your account.
                </p>
              </div>
              <div className="rounded-xl bg-gray-100 p-4">
                <p className="font-medium text-black">Mobile Home Blocker</p>
                <p className="mt-2 leading-6 text-black">
                  The same activation model will support compatible mobile tools
                  in a future update.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-xl font-semibold">How to use it</h2>
          <ol className="mt-5 space-y-3 text-black">
            {[
              "Install the browser extension or compatible tool.",
              "Open the setup or activation screen inside that tool.",
              "Copy your access key from this page.",
              "Paste the key into the tool and confirm activation.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">
                  {index + 1}
                </span>
                <span className="leading-7">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
