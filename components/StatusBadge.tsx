import { Badge } from "@/components/ui/badge";
import { IssueStatus } from "@prisma/client";

export default function StatusBadge({ status }: { status: IssueStatus }) {
  return (
    <Badge
      variant={
        status === "OPEN"
          ? "destructive"
          : status === "IN_PROGRESS"
            ? "default"
            : "outline"
      }
    >
      {status.toLowerCase().replace("_", " ")}
    </Badge>
  );
}
