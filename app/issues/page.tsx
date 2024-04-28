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
import ResetButton from "./_components/ResetButton";
import Pagination from "./_components/Pagination";

export default async function IssuesPage({
  searchParams: { status, sort, order, page },
}: {
  // searchParams: { [key: string]: string | string[] | undefined };
  // Important
  searchParams: {
    status?: IssueStatus;
    sort?: keyof Issue;
    order: "asc" | "desc";
    page: string;
  };
}) {
  const validSearchStatus = Object.values(IssueStatus).includes(
    status as IssueStatus
  );

  // const issueFields = modelFields("Issue");
  const issueFields = Prisma.dmmf.datamodel.models
    .find((model) => model.name === "Issue")
    ?.fields.map((field) => field.name);

  if (status && !validSearchStatus) {
    redirect("/issues");
  }

  const currentPage = parseInt(page) || 1;
  const issuesPerPage = 10;
  // нужен отдельный запрос для подсчета общего количества записей
  // по статусу из-за отсутствия skip и take
  const totalIssues = await prisma.issue.count({
    where: {
      status,
    },
  });

  const issues = await prisma.issue.findMany({
    ...(status &&
      validSearchStatus && {
        where: {
          status: status,
        },
      }),
    ...(sort &&
      issueFields?.includes(sort) && {
        orderBy: {
          [sort]: order ?? "asc",
        },
      }),

    skip: (currentPage - 1) * issuesPerPage,
    take: issuesPerPage,
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
        <div className="flex items-center gap-10">
          <FilterByStatus />
          <IssueSorting issueFields={issueFields ?? []} />

          <ResetButton />
        </div>

        <IssuesTable issues={issues} />

        <Pagination
          totalIssues={totalIssues}
          issuesPerPage={issuesPerPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
