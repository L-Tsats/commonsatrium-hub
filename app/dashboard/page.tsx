import Link from "next/link";
import { getCurrentMembershipState } from "@/lib/membership";

const tools = [
  {
    title: "Workout System",
    description: "Main mobile experience for structured personal development.",
  },
  {
    title: "Focus / Home Mode",
    description: "Extension and mobile support for blocking and environmental control.",
  },
  {
    title: "Reading System",
    description: "Mobile-first reading environment for calmer consumption.",
  },
];

const announcements = [
  "New YouTube extension setup guide added.",
  "Dashboard MVP structure is now live.",
  "Builders Atrium will expand later.",
];

const groups = [
  {
    name: "Essay Builders",
    description: "A member-created group for people building written work consistently.",
  },
  {
    name: "Deep Work Sprint",
    description: "A group for members trying to reduce distraction and protect focus.",
  },
];

export default async function DashboardPage() {
  const { isActiveMember } = await getCurrentMembershipState();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
          Control Center
        </p>
        <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
        <p className="mt-3 max-w-2xl leading-7 text-black">
          Operational hub for account access, tools, setup, announcements,
          Builders Atrium, and support surfaces.
        </p>

        {!isActiveMember && (
          <div className="mt-8 rounded-2xl bg-black p-6 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Membership inactive</h2>
                <p className="leading-7 text-white/80">
                  Your account exists, but tool access and activation features are
                  locked until membership is active.
                </p>
              </div>
              <Link
                href="/start-membership"
                className="inline-flex shrink-0 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
              >
                Resume Membership
              </Link>
            </div>
          </div>
        )}

        {/* Tools */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Tools</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.title} className="rounded-xl bg-gray-50 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{tool.title}</h3>
                  {!isActiveMember && (
                    <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium text-black">
                      Locked
                    </span>
                  )}
                </div>
                <p className="mt-2 text-black">{tool.description}</p>
                <button
                  type="button"
                  disabled={!isActiveMember}
                  className={`mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-medium ${
                    isActiveMember
                      ? "bg-black text-white hover:opacity-90"
                      : "cursor-not-allowed border bg-gray-100 text-black"
                  }`}
                >
                  {isActiveMember ? "Open Tool" : "Membership Required"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Access & Setup + Announcements */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Access & Setup</h2>
              <Link href="/access-key" className="text-sm font-medium text-black hover:underline">
                Open Access Key
              </Link>
            </div>
            <div className="mt-4 space-y-3 text-black">
              <p>Browser tools and compatible devices connect through your account access flow.</p>
              {!isActiveMember ? (
                <div className="rounded-xl bg-gray-50 p-4 text-black">
                  Access key generation is available only with an active membership.
                </div>
              ) : (
                <ol className="space-y-2 text-black">
                  <li>1. Open your access key page</li>
                  <li>2. Copy your key</li>
                  <li>3. Paste it into the extension or tool setup flow</li>
                </ol>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Announcements</h2>
              <Link href="/announcements" className="text-sm font-medium text-black hover:underline">
                View All
              </Link>
            </div>
            <ul className="mt-4 space-y-2">
              {announcements.map((item) => (
                <li key={item} className="rounded-xl bg-gray-50 px-4 py-3 text-black">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Builders Atrium + Vent */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Builders Atrium</h2>
              <Link href="/groups" className="text-sm font-medium text-black hover:underline">
                Browse Groups
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {groups.map((group) => (
                <div key={group.name} className="rounded-xl bg-gray-50 p-4">
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="mt-1 text-black">{group.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Redirection Tool</h2>
              <Link href="/vent" className="text-sm font-medium text-black hover:underline">
                Open
              </Link>
            </div>
            <div className="mt-4 space-y-3 text-black">
              <p>A minimal support surface for moments of friction, distraction, or overload.</p>
              <Link
                href="/vent"
                className="inline-flex rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Open Vent Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
