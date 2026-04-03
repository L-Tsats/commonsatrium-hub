import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentMembershipState } from "@/lib/membership";
import CheckoutButton from "./CheckoutButton";

export default async function StartMembershipPage() {
  const { user, isActiveMember } = await getCurrentMembershipState();

  if (!user) {
    redirect("/login");
  }

  if (isActiveMember) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="page-card mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Membership</p>
          <h1 className="mt-3 text-3xl font-semibold">Membership is active</h1>
          <p className="mt-4 leading-7 text-black">Your membership is already active. No action needed.</p>
          <div className="mt-6">
            <Link href="/dashboard" className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">Go to Dashboard</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Membership</p>
        <h1 className="mt-2 text-3xl font-semibold">Start your membership</h1>
        <p className="mt-3 max-w-2xl leading-7 text-black">
          Commons Atrium is a member-only ecosystem. Membership gives access to
          the control center, internal pages, account-linked tools, and the broader
          member environment.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-xl font-semibold">What membership includes</h2>
            <div className="mt-4 space-y-3 text-black">
              <div className="rounded-xl bg-gray-50 p-4">Access to the member dashboard and control center</div>
              <div className="rounded-xl bg-gray-50 p-4">Access to ecosystem tools and setup flows</div>
              <div className="rounded-xl bg-gray-50 p-4">Access to announcements and Builders Atrium</div>
              <div className="rounded-xl bg-gray-50 p-4">Access key generation for eligible paid tools</div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-6">
            <h2 className="text-xl font-semibold">Membership Plan</h2>
            <div className="mt-4 rounded-xl bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-black">Monthly Membership</p>
              <p className="mt-3 text-3xl font-semibold">{process.env.NEXT_PUBLIC_MEMBERSHIP_PRICE ?? "—"}</p>
              <p className="mt-3 leading-7 text-black">Billed monthly. Cancel anytime.</p>
              <CheckoutButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
