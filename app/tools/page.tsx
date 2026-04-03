import Link from "next/link";
import { requireActiveMembership } from "@/lib/require-active-membership";

const tools = [
  {
    name: "Workout System",
    platform: "Mobile App",
    description: "The main structured self-improvement experience. Lives inside the mobile app.",
    steps: ["Activate membership", "Open the mobile product area when available"],
  },
  {
    name: "Focus / Home Mode",
    platform: "Extension + Mobile",
    description: "Environmental control tools for blocking, interruption, and stronger attention boundaries.",
    steps: ["Install the browser extension or mobile tool", "Use your access key to connect the tool", "Confirm activation and begin using"],
  },
  {
    name: "Reading System",
    platform: "Mobile App",
    description: "A calmer reading environment for more intentional digital consumption.",
    steps: ["Activate membership", "Open the reading module when available"],
  },
  {
    name: "Vent",
    platform: "Internal Tool",
    description: "A minimal text-based redirection tool for moments of overload or distraction.",
    steps: ["Open the tool when needed", "Write briefly", "Use it as a pause point, not a destination"],
  },
];

export default async function ToolsPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Tool Access Hub</p>
        <h1 className="mt-2 text-3xl font-semibold">Tools</h1>
        <p className="mt-3 max-w-2xl leading-7 text-black">
          Ecosystem tools available through your account. Core experiences live
          in the mobile app. Browser tools connect through your access key.
        </p>

        <div className="mt-10 space-y-6">
          {tools.map((tool) => (
            <div key={tool.name} className="rounded-xl bg-gray-50 p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">{tool.name}</h2>
                    <span className="rounded-full border px-3 py-1 text-xs font-medium text-black">{tool.platform}</span>
                  </div>
                  <p className="leading-7 text-black">{tool.description}</p>
                </div>
                <div className="w-full max-w-xs shrink-0 rounded-xl bg-white p-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-black">How it works</h3>
                  <ol className="mt-3 space-y-2 text-black">
                    {tool.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">{index + 1}</span>
                        <span className="leading-6">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-black">
          Need to connect a browser extension?{" "}
          <Link href="/access-key" className="font-medium text-black underline underline-offset-4">Get your access key</Link>
        </div>
      </div>
    </main>
  );
}
