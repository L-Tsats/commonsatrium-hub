/**
 * DEV ONLY — temporary activation endpoint for testing.
 * Remove or gate behind admin auth before production.
 *
 * Future replacement: Stripe webhook at /api/webhooks/stripe
 * will call activateMembership(userId) after successful payment.
 */

import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/session";
import { activateMembership } from "@/lib/activate-membership";

export async function POST() {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(sessionUser.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  await activateMembership(userId);

  return NextResponse.json({ success: true });
}
