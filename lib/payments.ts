import { getDbConnection } from "@/utils/db";
import Stripe from "stripe";

export const handleCheckoutSessionCompleted = async ({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) => {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    await createOrUpdateUser({
      email: email as string,
      fullName: name as string,
      customerId,
      priceId: priceId as string,
      status: "active",
    });

    await createPayment({
      session,
      priceId,
      email: email as string,
    });
  }
};

const createOrUpdateUser = async ({
  email,
  fullName,
  customerId,
  priceId,
  status,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}) => {
  try {
    const sql = await getDbConnection();
    const user = await sql`Select * from users where email = ${email}`;

    if (user.length === 0) {
      await sql`Insert into users (email, full_name, customer_id, price_id, status) values (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.log("Error creating or updating user", error);
  }
};

const createPayment = async ({
  session,
  priceId,
  email,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  email: string;
}) => {
  try {
    const sql = await getDbConnection();

    const { amount_total, id, status } = session;

    await sql`insert into payments (amount, status, stripe_payment_id, price_id, user_email) values (${amount_total}, ${status}, ${id}, ${priceId}, ${email})`;
  } catch (error) {
    console.error("Error creating payment", error);
  }
};

export const handleSubscriptionDeleted = async ({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const sql = await getDbConnection();

    await sql`update users set status = ${"cancelled"} where customer_id = ${
      subscription.customer
    }`;

    console.log(
      `Subscription ${subscriptionId} deleted and user status updated`
    );
  } catch (error) {
    console.error("Error deleting subscription", error);
  }
};
