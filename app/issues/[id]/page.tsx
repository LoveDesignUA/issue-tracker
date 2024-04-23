import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import IssueDetails from "./_components/IssueDetails";
import EditIssueButton from "./_components/EditIssueButton";

export default async function IssuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  // await delay(3000);

  if (!issue) {
    notFound();
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-6">
      <IssueDetails issue={issue} />

      <EditIssueButton issueId={issue.id} />
    </div>
  );
}
