import { requireActiveMembership } from "@/lib/require-active-membership";

const groups = [
  {
    name: "Essay Builders",
    focus: "Writing",
    description:
      "A member-created group for people building essays, articles, and longer-form written work with more consistency.",
    status: "Open",
  },
  {
    name: "Deep Work Sprint",
    focus: "Focus",
    description:
      "A group for members trying to reduce distraction and protect blocks of serious work.",
    status: "Open",
  },
  {
    name: "Indie Project Foundry",
    focus: "Projects",
    description:
      "A space for people building personal projects, products, and ideas without wanting a noisy social environment.",
    status: "Open",
  },
  {
    name: "Reading Discipline Circle",
    focus: "Reading",
    description:
      "A member-created group for people trying to build calmer and more intentional reading habits.",
    status: "Coming Soon",
  },
];

export default async function GroupsPage() {
  await requireActiveMembership();

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-2xl border border-gray-300 bg-white p-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">
              Community Subsystem
            </p>
            <h1 className="text-3xl font-semibold">Builders Atrium</h1>
            <p className="leading-7 text-black">
              A lightweight member-created groups subsystem. Members can form groups
              around shared interests, projects, focus, reading, or creative work.
              The website acts as a calm discovery and entry layer — not a social platform.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold">Member-Created</h2>
            <p className="mt-3 leading-7 text-black">
              Groups are created by members, not centrally managed.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold">Lightweight by Design</h2>
            <p className="mt-3 leading-7 text-black">
              Connection and direction — not another platform competing for attention.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold">Built for Shared Momentum</h2>
            <p className="mt-3 leading-7 text-black">
              Groups form around focus, projects, writing, reading, or any shared aim.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300 bg-white p-6">
          <h2 className="text-2xl font-semibold">Groups</h2>
          <p className="mt-2 text-black">
            Sample listings — full group creation and management coming later.
          </p>

          <div className="mt-6 grid gap-5">
            {groups.map((group) => (
              <article
                key={group.name}
                className="rounded-2xl border border-gray-300 bg-gray-100 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold">{group.name}</h3>
                      <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-black">
                        {group.focus}
                      </span>
                      <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-black">
                        {group.status}
                      </span>
                    </div>
                    <p className="leading-7 text-black">{group.description}</p>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                  >
                    View Group
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
