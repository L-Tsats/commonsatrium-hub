import { redirect } from "next/navigation";
import { getCurrentMembershipState } from "@/lib/membership";

export async function requireActiveMembership() {
  const { isActiveMember } = await getCurrentMembershipState();

  if (!isActiveMember) {
    redirect("/membership-required");
  }
}