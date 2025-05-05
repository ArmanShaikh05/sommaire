"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { getDbConnection } from "@/utils/db";
import { formatFileNameAsTitle } from "@/utils/helpers";
import { generateSummaryFromOpenAi } from "@/utils/openai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


type PdfSummary = {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
};

export const generatePdfText = async ({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) => {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed",
    };
  }

  const pdfText = await fetchAndExtractPdfText(fileUrl);
  const formattedFileName = formatFileNameAsTitle(fileName);

  return {
    success: true,
    message: "Pdf text generated successfully",
    pdfText,
    fileTitle: formattedFileName,
  };
};

export const generatePdfSummary = async (pdfText: string) => {
  try {
    if (!pdfText) {
      return {
        success: false,
        message: "No pdf text to generate summary",
      };
    }

    const summary = await generateSummaryFromOpenAi(pdfText);

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "File upload failed",
    };
  }
};

const savePdfSummary = async ({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) => {
  try {
    const sql = await getDbConnection();

    const addedSummary = await sql`INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    ) RETURNING *;`;

    return addedSummary[0];
  } catch (error) {
    console.error("Error in storing summary", error);
  }
};

export const storeSummaryData = async ({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummary) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary to DB, please try again...",
      };
    }

    revalidatePath(`/summaries/${savedSummary?.id}`);

    return {
      success: true,
      message: "PDF success saved successfully..",
      data: {
        summaryId: savedSummary?.id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error in storing the summary in Db",
    };
  }
};
