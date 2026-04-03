import { requireActiveMembership } from "@/lib/require-active-membership";

const groups = [
  { name: "Essay Builders", focus: "Writing", description: "A member-created group for people building essays, articles, and longer-form written work with more consistency.", status: "Open" },
  { name: "Deep Work Sprint", focus: "Focus", description: "A group for members trying to reduce distraction and protect blocks of serious work.", status: "Open" },
  { name: "Indie Project Foundry", focus: "Projects", description: "A space for people building personal projects, products, and ideas without wanting a noisy social environment.", status: "Open" },
  { name: "Reading Discipline Circle", focus: "Reading", description: "A member-created group for people trying to build calmer and more intentional reading habits.", status: "Coming Soon" },
];

export default async function GroupsPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Community Subsystem</p>
        <h1 className="mt-2 text-3xl font-semibold">Builders Atrium</h1>
        <p className="mt-3 max-w-2xl leading-7 text-black">
          A lightweight member-created groups subsystem. Members can form groups
          around shared interests, projects, focus, reading, or creative work.
          The website acts as a calm discovery and entry layer — not a social platform.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-5">
            <h2 className="font-semibold">Member-Created</h2>
            <p className="mt-2 text-black">Groups are created by members, not centrally managed.</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-5">
            <h2 className="font-semibold">Lightweight by Design</h2>
            <p className="mt-2 text-black">Connection and direction — not another platform competing for attention.</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-5">
            <h2 className="font-semibold">Built for Shared Momentum</h2>
            <p className="mt-2 text-black">Groups form around focus, projects, writing, reading, or any shared aim.</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Groups</h2>
          <p className="mt-2 text-black">Sample listings — full group creation and management coming later.</p>
          <div className="mt-5 space-y-4">
            {groups.map((group) => (
              <div key={group.name} className="flex flex-col gap-4 rounded-xl bg-gray-50 p-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    <span className="rounded-full border px-3 py-1 text-xs font-medium text-black">{group.focus}</span>
                    <span className="rounded-full border px-3 py-1 text-xs font-medium text-black">{group.status}</span>
                  </div>
                  <p className="leading-7 text-black">{group.description}</p>
                </div>
                <button type="button" className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">View Group</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
