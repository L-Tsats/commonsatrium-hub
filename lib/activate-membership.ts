import { prisma } from "@/lib/prisma";

/**
 * Activates membership for a given user.
 * This is the single reusable function for membership activation.
 *
 * Future: Stripe webhook will call this after successful payment.
 * Pattern: stripe success → webhook → activateMembership(userId)
 */
export async function activateMembership(userId: number) {
  return prisma.membership.update({
    where: { userId },
    data: { status: "active" },
  });
}

/**
 * Cancels membership for a given user.
 * Future: Stripe cancellation webhook will call this.
 */
export async function cancelMembership(userId: number) {
  return prisma.membership.update({
    where: { userId },
    data: { status: "canceled" },
  });
}
