import BgGradient from "@/components/common/BgGradient";
import SourceInfo from "@/components/summaries/SourceInfo";
import { DbSummaryResponse } from "@/components/summaries/SummaryCard";
import SummaryHeader from "@/components/summaries/SummaryHeader";
import SummaryViewer from "@/components/summaries/SummaryViewer";
import { getUserSummaryById } from "@/lib/getSummary";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const SummaryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const summary = (await getUserSummaryById(id)) as DbSummaryResponse;

  if (!summary) {
    notFound();
  }

  const {
    title,
    summary_text,
    file_name,
    created_at,
    word_count,
    original_file_url,
  } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container flex flex-col mx-auto gap-4">
        <div className="px-4 py-6 sm:px-6 sm:py-12 lg:py-24">
          <div className="flex flex-col">
            <SummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={readingTime}
            />
          </div>
          {file_name && (
            <SourceInfo
              fileName={file_name}
              originalFileUrl={original_file_url}
              createdAt={created_at}
              summaryText={summary_text}
              title={title}
            />
          )}
          <div className="relative mt-4 sm:mt-8 lg:mt-16">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
              <div className=" bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl">
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                  {summary.word_count?.toLocaleString()} words
                </div>

                <div className="relative mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary={summary_text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
