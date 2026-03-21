import { auth } from "@/auth";

export async function getCurrentSessionUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  return {
    id: session.user.id,
    email: session.user.email ?? null,
    membershipStatus: session.user.membershipStatus ?? "inactive",
  };
}

export async function requireSessionUser() {
  const user = await getCurrentSessionUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}