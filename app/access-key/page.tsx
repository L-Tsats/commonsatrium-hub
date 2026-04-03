import { requireActiveMembership } from "@/lib/require-active-membership";
import { getOrCreateCurrentAccessKey } from "@/lib/access-key";
import CopyButton from "./CopyButton";

export default async function AccessKeyPage() {
  await requireActiveMembership();
  const accessKey = await getOrCreateCurrentAccessKey();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Extension Access</p>
        <h1 className="mt-2 text-3xl font-semibold">Access Key</h1>
        <p className="mt-3 max-w-2xl leading-7 text-black">
          Your access key connects eligible tools — like browser extensions — to
          your member account. It is one-time use and tied to your account.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-xl font-semibold">Your Key</h2>
            <div className="mt-4 rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-black">Key</p>
              <p className="mt-3 break-all font-mono text-base text-black">{accessKey.key}</p>
              <CopyButton text={accessKey.key} />
            </div>
            <div className="mt-4 rounded-xl border p-4">
              <p className="text-sm font-medium text-black">Status</p>
              <p className={`mt-1 text-sm ${accessKey.isConsumed ? "text-red-600" : "text-green-700"}`}>
                {accessKey.isConsumed
                  ? "Already used — contact support if you need a replacement"
                  : "Ready to use"}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Where this is used</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="font-medium text-black">Browser Extensions</p>
                <p className="mt-2 leading-6 text-black">
                  Paste this key into the extension setup screen to connect it to your account.
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="font-medium text-black">Mobile Home Blocker</p>
                <p className="mt-2 leading-6 text-black">
                  The same activation model will support compatible mobile tools in a future update.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">How to use it</h2>
          <ol className="mt-4 space-y-3 text-black">
            {["Install the browser extension or compatible tool.", "Open the setup or activation screen inside that tool.", "Copy your access key from this page.", "Paste the key into the tool and confirm activation."].map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">{index + 1}</span>
                <span className="leading-7">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
