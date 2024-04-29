import EditIssueForm from "@/components/forms/EditIssueForm";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

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
    description: `Edit issue page for ${issue.title}`,
  };
}

export default async function EditIssuePage({
  params: { id },
  searchParams,
}: Props) {
  const issue = await getIssueById(id);

  if (!issue) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto">
      <EditIssueForm issue={issue} />
    </div>
  );
}
