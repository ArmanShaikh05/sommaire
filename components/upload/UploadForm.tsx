"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./UploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadThing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  generatePdfText,
  storeSummaryData,
} from "@/actions/uploadActions";
import { useRouter } from "next/navigation";
import { SummaryViewerSkeleton } from "../summaries/SummarySkeleton";

const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF "
    ),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUplaoder", {
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("Error occured while uploading PDF");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validatedFields = fileSchema.safeParse({ file });

      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ||
            "Invalid File"
        );
        toast.error(
          validatedFields.error.flatten().fieldErrors.file?.[0] ||
            "Invalid File"
        );
        return;
      }

      const toastId = toast.loading("🔃Uploading your file...", {
        description: "Our AI is reading through your document.",
      });

      //upload the file to uploadThing
      const uploadResponse = await startUpload([file]);
      if (!uploadResponse)
        return toast.error("Something went wrong!", {
          description: "Some error occured while uploading the PDF",
          id: toastId,
        });

      toast.loading("✨Processing your file...", {
        description: "Our AI is processing the document.",
        id: toastId,
      });

      const { pdfText, fileTitle } = await generatePdfText({
        fileName: file.name,
        fileUrl: uploadResponse[0].serverData.fileUrl,
      });

      if (!pdfText || !fileTitle) {
        toast.error("Something went wrong!", {
          description: "Failed to extract and generated text from PDF",
          id: toastId,
        });
      }

      toast.loading("✨Generating your summary...", {
        description: "Our AI is generating your summary.",
        id: toastId,
      });

      //parse the pdf using Langchain and summarize the pdf using AI
      const result = await generatePdfSummary(pdfText!);
      const { data = null } = result || {};

      if (data) {
        toast.loading("📑Saving PDF...", {
          description: "Hang tight! We are saving your summary",
          id: toastId,
        });

        if (data.summary) {
          const res = await storeSummaryData({
            fileName: file.name,
            fileUrl: uploadResponse[0].serverData.fileUrl,
            title: fileTitle!,
            summary: data.summary,
          });

          if (res.success === true) {
            toast.success("Processed your file", {
              description: "Here is your summary.",
              id: toastId,
            });

            router.push(`/summaries/${res.data?.summaryId}`);
          } else {
            toast.error("Something went wrong..", {
              description: res.message,
              id: toastId,
            });
          }
        }

        formRef.current?.reset();

        //save the summary to the DB
      }
    } catch (error) {
      console.error("Error occured", error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }

    //redirect to the individual [id] summary page
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        onSubmit={handleSubmit}
        ref={formRef}
        isLoading={isLoading}
      />
      {isLoading && <SummaryViewerSkeleton />}
    </div>
  );
};

export default UploadForm;
