"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  totalIssues,
  currentPage,
  issuesPerPage,
}: {
  totalIssues: number;
  currentPage: number;
  issuesPerPage: number;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pagesCount = Math.ceil(totalIssues / issuesPerPage);

  const handleChangePage = (newPage: number) => {
    const newParams = new URLSearchParams(params);

    newParams.set("page", newPage.toString());

    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  if (pagesCount === 1) {
    return null;
  }

  return (
    <div className="mb-12 flex items-center gap-6">
      <p className="my-0">
        Page {currentPage} of {pagesCount}
      </p>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => handleChangePage(1)}
        >
          <ChevronsLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === pagesCount}
          onClick={() => handleChangePage(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === pagesCount}
          onClick={() => handleChangePage(pagesCount)}
        >
          <ChevronsRight size={16} />
        </Button>
      </div>
    </div>
  );
}
