import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function EventsLoadingSkeleton() {
  return (
    <div className="mt-12">
      <div className="grid w-full md:w-auto grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="mt-6">
        <div className="flex justify-end gap-2 mb-4 lg:hidden">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="hidden lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            <Skeleton className="h-100 w-full" />
          </div>
          <div className="lg:w-1/2">
            <Skeleton className="h-100 w-full" />
          </div>
        </div>

        <div className="lg:hidden">
          <Skeleton className="h-100 w-full" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-8 lg:mt-0">
        <Skeleton className="h-8 w-48" />
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden flex flex-col h-full">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
