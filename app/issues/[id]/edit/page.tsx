import EditIssueForm from "@/components/forms/EditIssueForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditIssuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
    include: {
      assignedToUser: true,
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto">
      <EditIssueForm issue={issue} />
    </div>
  );
}
