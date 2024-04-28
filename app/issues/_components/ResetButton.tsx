"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resetHandler = () => {
    const page = searchParams.get("page");
    if (page) return router.replace(`/issues?page=${page}`);

    router.replace("/issues");
  };

  if (
    !searchParams.size ||
    (searchParams.has("page") && searchParams.size === 1)
  ) {
    return null;
  }

  return (
    <div>
      <Button variant="destructive" onClick={resetHandler}>
        <X className="size-3 mr-1" />
        Reset filters
      </Button>
    </div>
  );
}
