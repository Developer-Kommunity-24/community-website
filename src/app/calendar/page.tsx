import { Suspense } from "react";
import { BackgroundPattern } from "@/components/background-pattern";
import { EventsTabs } from "@/components/events-tabs";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { EventsLoadingSkeleton } from "@/components/events-loading-skeleton";
import { monthMap } from "@/calendar/helpers";

export const metadata = generatePageMetadata({
  title: "Calendar",
  description: "Discover the events happening in Mangalore.",
  path: "/calendar",
});

export default async function CalendarPage({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string; eventId?: string }>;
}) {
  let initialDate: Date;
  const awaitedSearchParams = await searchParams;

  if (awaitedSearchParams?.date) {
    const [monthStr, yearStr] = awaitedSearchParams.date
      .toLowerCase()
      .split("-");
    const monthIndex = monthMap[monthStr];
    const year = yearStr ? parseInt(yearStr, 10) : NaN;

    if (monthIndex !== undefined && !Number.isNaN(year)) {
      initialDate = new Date(year, monthIndex, 1);
    } else {
      initialDate = new Date();
    }
  } else {
    initialDate = new Date();
  }
  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <PageHeader title="Discover the events happening in Mangalore." />
        <Suspense fallback={<EventsLoadingSkeleton />}>
          <CalendarProvider
            initialDate={initialDate}
            initialEventId={awaitedSearchParams?.eventId}
          >
            <EventsTabs />
          </CalendarProvider>
        </Suspense>
      </div>
    </BackgroundPattern>
  );
}
