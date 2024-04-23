import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default function EditIssueButton({ issueId }: { issueId: string }) {
  return (
    <div>
      <Button asChild>
        <Link href={`/issues/${issueId}/edit`}>
          <SquarePen className="size-4 mr-2" />
          Edit issue
        </Link>
      </Button>
    </div>
  );
}
