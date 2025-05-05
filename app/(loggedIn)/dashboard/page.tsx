import { getUserSummaries } from "@/actions/summaryActions";
import BgGradient from "@/components/common/BgGradient";
import EmptySummary from "@/components/summaries/EmptySummary";
import SummaryCard, {
  DbSummaryResponse,
} from "@/components/summaries/SummaryCard";
import { Button } from "@/components/ui/button";
import { hasUserReachedUploadCount } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user?.id) return redirect("/sign-in");

  const userId = user?.id;
  const email = user?.emailAddresses[0]?.emailAddress;

  const response = await getUserSummaries();
  const summaryData = response?.data?.summaries as DbSummaryResponse[];

  const { hasReachedLimit, uploadLimit } = await hasUserReachedUploadCount({
    userId,
    email,
  });

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container flex flex-col mx-auto gap-4">
        <div className="px-2 py-12 sm:py-24">
          <div className="flex gap-4 mb-8 justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-rose-500 to-rose-700 text-transparent bg-clip-text">
                Your Summaries
              </h1>
              <p className="text-gray-600">
                Transform your PDFs into concise actionable insights
              </p>
            </div>

            {!hasReachedLimit && (
              <Button variant={"link"}>
                <Link
                  href={"/upload"}
                  className="flex text-white items-center hover:no-underline"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Summary
                </Link>
              </Button>
            )}
          </div>

          {hasReachedLimit && (
            <div className="mb-6">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-rose-800">
                <p className="text-sm">
                  You&apos;ve reached the limit of {uploadLimit} uploads on the
                  basic plan.{" "}
                  <Link
                    href={"/#pricing"}
                    className="text-rose-800 underline underline-offset-4 "
                  >
                    Click here to upgrade to Pro{" "}
                    <ArrowRight className="w-4 h-4 inline-block" />
                  </Link>
                  for unlimited uploads.
                </p>
              </div>
            </div>
          )}

          {summaryData.length === 0 ? (
            <EmptySummary />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaryData &&
                summaryData.length > 0 &&
                summaryData.map((item, index) => (
                  <SummaryCard key={index} {...item} />
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
