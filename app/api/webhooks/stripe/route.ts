import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { activateMembership, cancelMembership } from "@/lib/activate-membership";
import Stripe from "stripe";

// Required: disable Next.js body parsing so Stripe can verify the raw body
export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.deleted":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      default:
        // Unhandled event — ignore silently
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) return;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;

  // Persist subscription ID and activate membership
  await prisma.membership.update({
    where: { userId: parseInt(userId, 10) },
    data: {
      stripeSubscriptionId: subscriptionId,
      status: "active",
    },
  });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Find membership by subscription ID
  const membership = await prisma.membership.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!membership) return;

  if (subscription.status === "active") {
    await activateMembership(membership.userId);
  } else if (
    subscription.status === "canceled" ||
    subscription.status === "unpaid" ||
    subscription.status === "past_due"
  ) {
    await cancelMembership(membership.userId);
  }
}
