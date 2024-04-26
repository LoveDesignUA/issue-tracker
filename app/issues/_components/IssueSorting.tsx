"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function IssueSorting({
  issueFields,
}: {
  issueFields: string[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleIssueSorting = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", sortBy);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleIssueOrdering = (orderBy: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("order", orderBy);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-6 items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm">Sort by</span>

        <Select
          onValueChange={handleIssueSorting}
          defaultValue={searchParams.get("sort") ?? undefined}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select field..." />
          </SelectTrigger>
          <SelectContent>
            {issueFields?.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Order</span>

        <Select
          onValueChange={handleIssueOrdering}
          defaultValue={searchParams.get("order") ?? "asc"}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {["asc", "desc"].map((order) => (
              <SelectItem key={order} value={order}>
                {order}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
