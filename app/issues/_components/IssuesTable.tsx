import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Issue } from "@prisma/client";
import StatusBadge from "@/components/StatusBadge";

export default function IssuesTable({ issues }: { issues: Issue[] }) {
  return (
    <Table className="mt-3">
      <TableCaption>A list of issues</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-foreground">Title</TableHead>
          <TableHead className="font-bold text-foreground">Status</TableHead>
          <TableHead className="font-bold text-foreground">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {issues.map(({ id, title, description, status, createdAt }) => (
          <TableRow key={id}>
            <TableCell>
              <Link href={`/issues/${id}`} className="inline-block w-full">
                {title}
              </Link>
            </TableCell>

            <TableCell>
              <StatusBadge status={status} />
            </TableCell>
            <TableCell>{createdAt.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
