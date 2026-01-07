import { Suspense } from "react";
import { BackgroundPattern } from "@/components/background-pattern";
import { EventsTabs } from "@/components/events-tabs";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { EventsLoadingSkeleton } from "@/components/events-loading-skeleton";

export const metadata = generatePageMetadata({
  title: "Calendar",
  description: "Discover the events happening in Mangalore.",
  path: "/calendar",
});

export default async function CalendarPage() {
  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <PageHeader title="Discover the events happening in Mangalore." />
        <Suspense fallback={<EventsLoadingSkeleton />}>
          <CalendarProvider>
            <EventsTabs />
          </CalendarProvider>
        </Suspense>
      </div>
    </BackgroundPattern>
  );
}
