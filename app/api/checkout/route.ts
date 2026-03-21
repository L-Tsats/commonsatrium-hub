import { NextResponse } from "next/server";
import { getCurrentSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const sessionUser = await getCurrentSessionUser();

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(sessionUser.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  // Load user + membership from DB
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { membership: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Already active — no need to checkout
  if (user.membership?.status === "active") {
    return NextResponse.json({ error: "Membership already active" }, { status: 400 });
  }

  // Ensure Stripe customer exists
  let stripeCustomerId = user.membership?.stripeCustomerId ?? null;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: String(user.id) },
    });
    stripeCustomerId = customer.id;

    // Persist customer ID immediately
    await prisma.membership.update({
      where: { userId },
      data: { stripeCustomerId },
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  // Create Stripe Checkout Session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/start-membership`,
    metadata: { userId: String(userId) },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
