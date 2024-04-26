"use client";

import { issueStatuses } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterByStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);

    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={handleStatusFilter}
      defaultValue={searchParams.get("status") ?? undefined}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All</SelectItem>
        {issueStatuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status.toLowerCase().replace("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
