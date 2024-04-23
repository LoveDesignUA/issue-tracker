import { Badge } from "@/components/ui/badge";
import { Issue } from "@prisma/client";

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <div>
      <h2 className="mb-3">{issue.title}</h2>

      <div className="flex items-center gap-3 mb-6">
        <Badge
          variant={
            issue.status === "OPEN"
              ? "destructive"
              : issue.status === "IN_PROGRESS"
                ? "default"
                : "outline"
          }
        >
          {issue.status.toLowerCase().replace("_", " ")}
        </Badge>

        <p className="text-sm mt-0">{issue.createdAt.toDateString()}</p>
      </div>

      <p>{issue.description}</p>
    </div>
  );
}
