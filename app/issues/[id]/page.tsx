import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./_components/DeleteIssueButton";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";
import { auth } from "@/auth";
import AssigneeSelect from "./_components/AssigneeSelect";

export default async function IssuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await auth();

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
    include: {
      assignedToUser: true,
    },
  });

  // await delay(3000);

  if (!issue) {
    notFound();
  }

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="col-span-2">
        <IssueDetails issue={issue} />
      </div>

      {session?.user && (
        <div className="flex flex-col gap-6 items-start">
          {/* <AssigneeSelect /> */}
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </div>
      )}
    </div>
  );
}
