import { Badge } from "@/components/ui/badge";
import { Issue, Prisma } from "@prisma/client";

// 1: Define a type that includes the relation to `User`
const issueWithUser = Prisma.validator<Prisma.IssueDefaultArgs>()({
  include: { assignedToUser: true },
});

// 2: This type will include a user and all their info
type IssueWithUser = Prisma.IssueGetPayload<typeof issueWithUser>;

export default function IssueDetails({ issue }: { issue: IssueWithUser }) {
  return (
    <div>
      <h2 className="mb-3">{issue.title}</h2>

      {issue.assignedToUser ? (
        <p>
          Assigned to {issue.assignedToUser.name}&lt;
          {issue.assignedToUser.email}&gt;
        </p>
      ) : (
        <p>Unassigned</p>
      )}

      <div className="mt-3 flex items-center gap-3 mb-6">
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
