"use client";

import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteSummary } from "@/actions/summaryActions";
import { toast } from "sonner";

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteSummary({ summaryId });
      if (!result?.success) {
        toast.error("Error", {
          description: "Failed to delete the summary.",
        });
      }
      toast.success("Deleted successfully", {
        description: "Your summary has been deleted successfully.",
      });
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this summary? This action can not be
            undone~
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className="text-gray-400 bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className=" bg-gray-900 border hover:bg-gray-600"
            onClick={() => handleDelete()}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
