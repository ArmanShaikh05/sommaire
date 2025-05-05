import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const signature = req.headers.get("Stripe-Signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        await handleCheckoutSessionCompleted({ session, stripe });

        break;
      case "customer.subscription.deleted":
        const subscriptionId = event.data.object.id;

        await handleSubscriptionDeleted({ subscriptionId, stripe });
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Webhook signature verification failed",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    status: "success",
  });
};
