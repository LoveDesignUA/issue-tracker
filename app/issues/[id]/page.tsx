import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./_components/DeleteIssueButton";
import EditIssueButton from "./_components/EditIssueButton";
import IssueDetails from "./_components/IssueDetails";
import { auth } from "@/auth";
import AssigneeSelect from "./_components/AssigneeSelect";

import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getIssueById = cache((id: string) =>
  prisma.issue.findUnique({
    where: {
      id: id,
    },
    include: {
      assignedToUser: true,
    },
  })
);

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const issue = await getIssueById(params.id);

  if (!issue) {
    notFound();
  }

  return {
    title: `Issue tracker | ${issue.title}`,
    description: issue.description,
  };
}

export default async function IssuePage({
  params: { id },
  searchParams,
}: Props) {
  // export default async function IssuePage({
  //   params: { id },
  // }: {
  //   params: { id: string };
  // }) {
  const session = await auth();

  const issue = await getIssueById(id);

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
