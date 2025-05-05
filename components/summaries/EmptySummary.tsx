import { FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptySummary = () => {
  return (
    <div className="text-center py-12 ">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-600">No Summaries Yet</h2>
        <p className="text-gray-500 max-w-md">Upload your first PDF to get started with AI-Powered summaries.</p>
        <Button variant={"link"} className="mt-4">
          <Link
            href={"/upload"}
            className="flex text-white items-center hover:no-underline "
          >
            Create Your First Summary
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptySummary;
