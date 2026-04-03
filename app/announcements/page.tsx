import { requireActiveMembership } from "@/lib/require-active-membership";

const announcements = [
  { category: "Tool Update", title: "YouTube extension setup guide updated", body: "The setup flow has been simplified to make first activation clearer for new users.", date: "March 2026" },
  { category: "Platform Update", title: "Dashboard MVP structure is now in place", body: "The control center now includes tools, access, announcements, groups, and vent entry points.", date: "March 2026" },
  { category: "Community", title: "Creativity groups directory will expand later", body: "The website will remain a lightweight bridge to external group spaces rather than a full social platform.", date: "March 2026" },
  { category: "Redirection", title: "Vent page will support minimal text posting", body: "The goal is to provide a calm interruption surface instead of another feed to get lost in.", date: "March 2026" },
];

export default async function AnnouncementsPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Member Updates</p>
        <h1 className="mt-2 text-3xl font-semibold">Announcements</h1>
        <p className="mt-3 max-w-2xl leading-7 text-black">
          A simple internal feed for product updates, new tools, events, and
          important ecosystem changes for members.
        </p>

        <div className="mt-10 space-y-5">
          {announcements.map((item) => (
            <div key={item.title} className="rounded-xl bg-gray-50 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border px-3 py-1 text-xs font-medium text-black">{item.category}</span>
                <span className="text-sm text-black">{item.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 leading-7 text-black">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
