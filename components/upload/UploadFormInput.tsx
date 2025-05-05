"use client";

import React, { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const UploadFormInput = ({
  onSubmit,
  ref,
  isLoading,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ref: RefObject<HTMLFormElement | null>;
  isLoading: boolean;
}) => {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
      <div className="flex justify-end items-center gap-1">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className={cn(isLoading && "opacity-50 cursor-not-allowed")}
          disabled={isLoading}
        />
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
            </>
          ) : (
            "Upload your PDF"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
