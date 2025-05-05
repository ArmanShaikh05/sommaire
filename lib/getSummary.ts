import { getDbConnection } from "@/utils/db";

export const getUserSummaryById = async (id: string) => {
  try {
    const sql = await getDbConnection();

    const summary =
      await sql`Select id, user_id, title, original_file_url, summary_text, created_at, updated_at, status, file_name, length(summary_text) - length(replace(summary_text, ' ', '')) + 1 as word_count from pdf_summaries where  id = ${id}`;

    return summary[0];
  } catch (error) {
    console.error(`Error in fetching summary by id of id= ${id} `, error);
    return null;
  }
};
