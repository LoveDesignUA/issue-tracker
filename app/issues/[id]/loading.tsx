import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingIssuePage() {
  return (
    <div>
      <Skeleton className="w-1/3 max-w-screen-sm h-[36px] rounded-full mb-3" />
      <Skeleton className="w-1/6 max-w-screen-sm h-[24px] rounded-full" />

      <div className="mt-6 space-y-3">
        <Skeleton className="w-full max-w-screen-md h-[24px] rounded-full" />
        <Skeleton className="w-full max-w-screen-md h-[24px] rounded-full" />
        <Skeleton className="w-full max-w-screen-md h-[24px] rounded-full" />
      </div>
    </div>
  );
}
