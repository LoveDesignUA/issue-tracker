import prisma from "@/lib/prisma";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

const getIssues = async () => {
  const issues = await prisma.issue.findMany();

  return issues;
};

export default async function IssuesTable() {
  const issues = await getIssues();

  return (
    <Table className="mt-6">
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
              <Badge
                variant={
                  status === "OPEN"
                    ? "destructive"
                    : status === "IN_PROGRESS"
                      ? "default"
                      : "outline"
                }
              >
                {status.toLowerCase().replace("_", " ")}
              </Badge>
            </TableCell>
            <TableCell>{createdAt.toDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
