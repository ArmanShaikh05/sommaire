import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SummaryViewerSkeleton = () => {
  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <div className="flex flex-col gap-4 p-6 h-full">
        <Skeleton className="h-16 full bg-rose-100" />
        <Skeleton className="h-8 mt-10 w-full bg-rose-100" />
        <Skeleton className="h-8 w-full bg-rose-100" />
        <Skeleton className="h-8 w-5/6 bg-rose-100" />
        <div className="mt-auto flex justify-between w-full gap-4 ">
          <Skeleton className="h-10 w-24 bg-rose-100" />
          <Skeleton className="h-10 w-24 bg-rose-100" />
        </div>
      </div>
    </Card>
  );
};
