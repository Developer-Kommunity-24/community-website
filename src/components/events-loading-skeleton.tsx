import { Skeleton } from "@/components/ui/skeleton";

export function EventsLoadingSkeleton() {
  return (
    <div className="mt-12">
      <div className="lg:flex lg:gap-4">
        <div className="lg:w-1/2">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="lg:w-1/2 mt-4 lg:mt-0">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </div>
  );
}
