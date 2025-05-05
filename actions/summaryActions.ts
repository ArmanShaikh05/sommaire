"use server";

import { getDbConnection } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getUserSummaries = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const sql = await getDbConnection();

    const summaries =
      await sql`Select * from pdf_summaries where user_id = ${userId} order by created_at desc`;

    return {
      success: true,
      message: "Summary fetched successfully",
      data: {
        summaries,
      },
    };
  } catch (error) {
    console.error("something went wrong", error);
  }
};

export const deleteSummary = async ({ summaryId }: { summaryId: string }) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const sql = await getDbConnection();

    const result =
      await sql`delete from pdf_summaries where user_id = ${userId} and id = ${summaryId} RETURNING id`;

    if (result.length > 0) {
      revalidatePath("/dashboard");

      return {
        success: true,
        message: "Summary deleted successfully",
      };
    }

    return {
      success: false,
      message: "Error deleting summary",
    };
  } catch (error) {
    console.error("something went wrong in deleting summary", error);
  }
};

