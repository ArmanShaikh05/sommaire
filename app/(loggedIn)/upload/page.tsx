import BgGradient from "@/components/common/BgGradient";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeader from "@/components/upload/uploadHeader";
import { hasUserReachedUploadCount } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const maxDuration = 20;

const Upload = async () => {
  const user = await currentUser();

  if (!user?.id) return redirect("/sign-in");

  const userId = user?.id;
  const email = user?.emailAddresses[0]?.emailAddress;

  const { hasReachedLimit } = await hasUserReachedUploadCount({
    userId,
    email,
  });

  if (hasReachedLimit) redirect("/dashboard");
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </div>
    </section>
  );
};

export default Upload;
