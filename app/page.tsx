import Link from "next/link";

const ecosystemItems = [
  { title: "Mobile App", description: "The main product experience for structure, progress, and deeper personal systems." },
  { title: "Browser Extensions", description: "Focus and enforcement tools that interrupt distraction loops and support better attention." },
  { title: "Website Control Center", description: "A calm access hub for account, tools, downloads, announcements, and redirection." },
];

const steps = [
  "Create your account",
  "Access your dashboard and tools",
  "Install what supports your environment best",
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        {/* Hero */}
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Commons Atrium</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            A calm digital entry point for focus, structure, and self-improvement.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-black">
            Commons Atrium is a member-based ecosystem that brings together a mobile
            app, browser tools, and a simple control center to help users move away
            from compulsive distraction and toward a more intentional digital environment.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/signup" className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90">Join the Atrium</Link>
            <Link href="/login" className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-gray-50">Login</Link>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {ecosystemItems.map((item) => (
            <div key={item.title} className="rounded-xl bg-gray-50 p-5">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 leading-7 text-black">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Who + How */}
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Who this is for</h2>
            <p className="mt-3 leading-7 text-black">
              Commons Atrium is for people who want a more intentional relationship
              with technology, less mindless scrolling, and a clearer structure around
              focus, redirection, and personal growth inside a member-based environment.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">How it works</h2>
            <ol className="mt-3 space-y-3 text-black">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium">{index + 1}</span>
                  <span className="leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* What the website does */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold">What the website does</h2>
          <p className="mt-3 leading-7 text-black">
            The website is not the main product experience. It serves as the member
            entry point, account layer, control center, download hub, and lightweight
            bridge to internal announcements, Builders Atrium, and redirection tools.
          </p>
        </div>
      </div>
    </main>
  );
}
