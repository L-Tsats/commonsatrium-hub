import { redirect } from "next/navigation";
import { getCurrentMembershipState } from "@/lib/membership";

export async function requireActiveMembership() {
  const { user, isActiveMember } = await getCurrentMembershipState();

  if (!user) {
    redirect("/login");
  }

  if (!isActiveMember) {
    redirect("/membership-required");
  }
}