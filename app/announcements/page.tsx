import { requireActiveMembership } from "@/lib/require-active-membership";

const announcements = [
  {
    category: "Tool Update",
    title: "YouTube extension setup guide updated",
    body: "The setup flow has been simplified to make first activation clearer for new users.",
    date: "March 2026",
  },
  {
    category: "Platform Update",
    title: "Dashboard MVP structure is now in place",
    body: "The control center now includes tools, access, announcements, groups, and vent entry points.",
    date: "March 2026",
  },
  {
    category: "Community",
    title: "Creativity groups directory will expand later",
    body: "The website will remain a lightweight bridge to external group spaces rather than a full social platform.",
    date: "March 2026",
  },
  {
    category: "Redirection",
    title: "Vent page will support minimal text posting",
    body: "The goal is to provide a calm interruption surface instead of another feed to get lost in.",
    date: "March 2026",
  },
];

export default async function AnnouncementsPage() {
  await requireActiveMembership();
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Member Updates
            </p>
            <h1 className="text-3xl font-semibold">Announcements</h1>
            <p className="leading-7 text-gray-900">
              A simple internal feed for product updates, new tools, events, and
              important ecosystem changes for members.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          {announcements.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-gray-300 bg-white p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-900">
                  {item.category}
                </span>
                <span className="text-sm text-gray-900">{item.date}</span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-gray-900">{item.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}