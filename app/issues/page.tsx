import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import IssuesTableSkeleton from "@/components/skeletons/IssuesTableSkeleton";
import IssuesTable from "@/components/IssuesTable";

export default async function IssuesPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="mb-0">Issues</h2>

        <Button asChild>
          <Link href="/issues/new">Create new issue</Link>
        </Button>
      </div>

      <Suspense fallback={<IssuesTableSkeleton />}>
        <IssuesTable />
      </Suspense>
    </div>
  );
}
