import prisma from "@/lib/prisma";
import LatestIssues from "@/components/LatestIssues";
import IssueSummary from "@/components/IssueSummary";
import IssuesBarChart from "@/components/IssuesBarChart";

export default async function DashboardPage() {
  const latestIssues = await prisma.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      assignedToUser: {
        select: {
          image: true,
        },
      },
    },
  });

  const openedIssues = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const inProgressIssues = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closedIssues = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  const issuesCount = {
    Opened: openedIssues,
    "In progress": inProgressIssues,
    Closed: closedIssues,
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div className="space-y-10">
        <IssueSummary issuesCount={issuesCount} />

        <IssuesBarChart issuesCount={issuesCount} />
      </div>

      <LatestIssues latestIssues={latestIssues} />
    </div>
  );
}
