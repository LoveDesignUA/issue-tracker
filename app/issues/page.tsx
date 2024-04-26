import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import IssuesTableSkeleton from "@/components/skeletons/IssuesTableSkeleton";
import IssuesTable from "@/app/issues/_components/IssuesTable";
import FilterByStatus from "./_components/FilterByStatus";
import prisma from "@/lib/prisma";
import { Issue, IssueStatus, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { modelFields } from "@/prisma/lib";
import IssueSorting from "./_components/IssueSorting";

export default async function IssuesPage({
  searchParams,
}: {
  // searchParams: { [key: string]: string | string[] | undefined };
  // Important
  searchParams: {
    status?: IssueStatus;
    sort?: keyof Issue;
    order: "asc" | "desc";
  };
}) {
  const validSearchStatus = Object.values(IssueStatus).includes(
    searchParams.status as IssueStatus
  );

  // const issueFields = modelFields("Issue");
  const issueFields = Prisma.dmmf.datamodel.models
    .find((model) => model.name === "Issue")
    ?.fields.map((field) => field.name);

  if (searchParams.status && !validSearchStatus) {
    redirect("/issues");
  }

  const issues = await prisma.issue.findMany({
    ...(searchParams.status &&
      validSearchStatus && {
        where: {
          status: searchParams.status,
        },
      }),
    ...(searchParams.sort &&
      issueFields?.includes(searchParams.sort) && {
        orderBy: {
          [searchParams.sort]: searchParams.order ?? "asc",
        },
      }),
  });

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="mb-0">Issues</h2>

        <Button asChild>
          <Link href="/issues/new">Create new issue</Link>
        </Button>
      </div>

      {/* <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable />
      </Suspense> */}

      <div className="mt-12">
        <div className="flex justify-between items-center">
          <FilterByStatus />
          <IssueSorting issueFields={issueFields ?? []} />
        </div>

        <IssuesTable issues={issues} />
      </div>
    </div>
  );
}
