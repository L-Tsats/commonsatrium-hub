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
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Control Center
            </p>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="max-w-2xl leading-7 text-gray-900">
              Operational hub for account access, tools, setup, announcements,
              Builders Atrium, and support surfaces.
            </p>
          </div>
        </section>

        {!isActiveMember && (
          <section className="rounded-2xl border border-black bg-black p-8 text-white">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl space-y-2">
                <h2 className="text-2xl font-semibold">Membership inactive</h2>
                <p className="leading-7 text-white/80">
                  Your account exists, but tool access and activation features are
                  locked until membership is active.
                </p>
              </div>
              <Link
                href="/start-membership"
                className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
              >
                Resume Membership
              </Link>
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.title} className="rounded-2xl border border-gray-300 bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">{tool.title}</h2>
                {!isActiveMember && (
                  <span className="shrink-0 rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    Locked
                  </span>
                )}
              </div>
              <p className="mt-3 text-base leading-6 text-gray-900">{tool.description}</p>
              <button
                type="button"
                disabled={!isActiveMember}
                className={`mt-5 inline-flex rounded-xl px-4 py-2 text-sm font-medium ${
                  isActiveMember
                    ? "bg-black text-white hover:opacity-90"
                    : "cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-500"
                }`}
              >
                {isActiveMember ? "Open Tool" : "Membership Required"}
              </button>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Access & Setup</h2>
              <Link href="/access-key" className="text-sm font-medium text-gray-900 hover:text-black">
                Open Access Key
              </Link>
            </div>
            <div className="mt-5 space-y-4 text-gray-900">
              <p>Browser tools and compatible devices connect through your account access flow.</p>
              {!isActiveMember ? (
                <div className="rounded-xl border border-gray-300 bg-gray-100 p-4 text-gray-900">
                  Access key generation is available only with an active membership.
                </div>
              ) : (
                <ol className="space-y-2 text-gray-900">
                  <li>1. Open your access key page</li>
                  <li>2. Copy your key</li>
                  <li>3. Paste it into the extension or tool setup flow</li>
                </ol>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Announcements</h2>
              <Link href="/announcements" className="text-sm font-medium text-gray-900 hover:text-black">
                View All
              </Link>
            </div>
            <ul className="mt-5 space-y-3">
              {announcements.map((item) => (
                <li key={item} className="rounded-xl bg-gray-100 px-4 py-3 text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Builders Atrium</h2>
              <Link href="/groups" className="text-sm font-medium text-gray-900 hover:text-black">
                Browse Groups
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {groups.map((group) => (
                <div key={group.name} className="rounded-xl bg-gray-100 p-4">
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="mt-2 leading-7 text-gray-900">{group.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Redirection Tool</h2>
              <Link href="/vent" className="text-sm font-medium text-gray-900 hover:text-black">
                Open
              </Link>
            </div>
            <div className="mt-5 space-y-4 text-gray-900">
              <p>A minimal support surface for moments of friction, distraction, or overload.</p>
              <Link
                href="/vent"
                className="inline-flex rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
              >
                Open Vent Tool
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
