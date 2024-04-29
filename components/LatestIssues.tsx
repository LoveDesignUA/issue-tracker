import StatusBadge from "@/components/StatusBadge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Issue, Prisma } from "@prisma/client";
import { User } from "lucide-react";

// 1: Define a type that includes the relation to `User`
const issueWithUserImage = Prisma.validator<Prisma.IssueDefaultArgs>()({
  include: {
    assignedToUser: {
      select: {
        image: true,
      },
    },
  },
});

// 2: This type will include a user's image
type IssueWithUserImage = Prisma.IssueGetPayload<typeof issueWithUserImage>;

export default function LatestIssues({
  latestIssues,
}: {
  latestIssues: IssueWithUserImage[];
}) {
  console.log({ latestIssues });
  return (
    <div className="border rounded-lg p-6">
      <h2>Latest Issues</h2>
      <ul className="space-y-3">
        {latestIssues.map(({ id, title, status, assignedToUser }) => (
          <li
            key={id}
            className="flex justify-between items-center pb-5 border-b last:border-none"
          >
            <div className="flex flex-col items-start gap-3">
              <p>{title}</p>
              <StatusBadge status={status} />
            </div>

            {assignedToUser ? (
              <Avatar>
                <AvatarImage src={assignedToUser.image ?? ""} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="rounded-full size-10 border flex items-center justify-center text-xs font-medium">
                N/A
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
