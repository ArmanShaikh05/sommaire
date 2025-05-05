import { getDbConnection } from "@/utils/db";
import { plans } from "./constants";

export const getUserPlan = async (email: string) => {
  const sql = await getDbConnection();
  const query =
    await sql`select price_id from users where email = ${email} and status = ${"active"}`;
  return query?.[0]?.price_id || null;
};

export const hasUserReachedUploadCount = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}): Promise<{ hasReachedLimit: boolean; uploadLimit: number }> => {
  try {
    const sql = await getDbConnection();
    const [result] =
      await sql`select count(*) as count from pdf_summaries where user_id = ${userId}`;

    const count: number = result?.count || 0;
    const priceId = await getUserPlan(email);
    const isPro = plans.find((plan) => plan.priceId === priceId)?.id === "pro";

    const uploadLimit: number = isPro ? 1000 : 5;

    return { hasReachedLimit: count >= uploadLimit, uploadLimit };
  } catch (error) {
    console.error("error in getting the upload count", error);
    throw new Error("Failed to check upload limit");
  }
};

export const getSubscriptionStatus = async (email: string) => {
  try {
    const sql = await getDbConnection();
    const query =
      await sql`select price_id, status from users where email = ${email} and status = ${"active"} and price_id is not null`;

    return query && query.length > 0;
  } catch (error) {
    console.log("Error fetching status of active user plan", error);
    throw new Error("Error fetching status of active user plan");
  }
};
