"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "sonner";

export default function DeleteIssueButton({ issueId }: { issueId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const deleteIssueHandler = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/issues/${issueId}`, {
          method: "DELETE",
        });

        if (res.status === 401) {
          toast.error("Not authenticated");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to delete issue");
        }

        toast.success("Issue deleted successfully");

        router.push("/issues");
      } catch (error) {
        //   console.error("Error deleting issue: ", error);
        toast.error((error as Error).message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="size-4 mr-2" />
          Delete issue
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the issue
            and remove its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction asChild> */}
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={deleteIssueHandler}
            className="min-w-[78px]"
          >
            {isPending ? <PulseLoader color="white" size={8} /> : "Delete"}
          </Button>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
