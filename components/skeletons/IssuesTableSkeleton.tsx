import { Skeleton } from "@/components/ui/skeleton";

import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

export default function IssuesTableSkeleton() {
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
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-[100px] h-[22px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[64px] h-[22px] rounded-full" />
            </TableCell>
            <TableCell>
              {" "}
              <Skeleton className="w-[100px] h-[22px] rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
