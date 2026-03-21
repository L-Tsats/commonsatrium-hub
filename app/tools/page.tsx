import Link from "next/link";
import { requireActiveMembership } from "@/lib/require-active-membership";

const tools = [
  {
    name: "Workout System",
    platform: "Mobile App",
    description:
      "The main structured self-improvement experience. Lives inside the mobile app.",
    steps: [
      "Activate membership",
      "Open the mobile product area when available",
    ],
  },
  {
    name: "Focus / Home Mode",
    platform: "Extension + Mobile",
    description:
      "Environmental control tools for blocking, interruption, and stronger attention boundaries.",
    steps: [
      "Install the browser extension or mobile tool",
      "Use your access key to connect the tool",
      "Confirm activation and begin using",
    ],
  },
  {
    name: "Reading System",
    platform: "Mobile App",
    description:
      "A calmer reading environment for more intentional digital consumption.",
    steps: [
      "Activate membership",
      "Open the reading module when available",
    ],
  },
  {
    name: "Vent",
    platform: "Internal Tool",
    description:
      "A minimal text-based redirection tool for moments of overload or distraction.",
    steps: [
      "Open the tool when needed",
      "Write briefly",
      "Use it as a pause point, not a destination",
    ],
  },
];

export default async function ToolsPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Tool Access Hub
            </p>
            <h1 className="text-3xl font-semibold">Tools</h1>
            <p className="leading-7 text-gray-900">
              Ecosystem tools available through your account. Core experiences live
              in the mobile app. Browser tools connect through your access key.
            </p>
          </div>
        </section>

        <section className="grid gap-6">
          {tools.map((tool) => (
            <article
              key={tool.name}
              className="rounded-2xl border border-gray-300 bg-white p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold">{tool.name}</h2>
                    <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-900">
                      {tool.platform}
                    </span>
                  </div>
                  <p className="leading-7 text-gray-900">{tool.description}</p>
                </div>

                <div className="w-full max-w-xs shrink-0 rounded-2xl bg-gray-100 p-5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-black">
                    How it works
                  </h3>
                  <ol className="mt-4 space-y-3 text-gray-900">
                    {tool.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="leading-6">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-gray-300 bg-white p-6">
          <p className="text-sm text-gray-900">
            Need to connect a browser extension?{" "}
            <Link href="/access-key" className="font-medium text-black underline underline-offset-4">
              Get your access key
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
