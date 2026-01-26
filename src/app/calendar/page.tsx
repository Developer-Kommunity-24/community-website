import type { Metadata } from "next";
import { Suspense } from "react";
import { BackgroundPattern } from "@/components/background-pattern";
import { EventsTabs } from "@/components/events-tabs";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { EventsLoadingSkeleton } from "@/components/events-loading-skeleton";
import { monthMap } from "@/calendar/helpers";
import { getEvents } from "@/lib/get-events";
import { formatDate } from "date-fns";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ eventId?: string; date?: string }>;
}): Promise<Metadata> {
  const awaitedSearchParams = await searchParams;
  const eventId = awaitedSearchParams.eventId;
  let date = awaitedSearchParams.date;

  if (eventId) {
    const allEvents = await getEvents();
    const event = allEvents.find((e) => e.id === eventId);
    if (event) {
      const primaryImage = event.posterUrl || "/logo.png";

      return generatePageMetadata({
        title: event.title,
        description: event.description,
        image: primaryImage,
        path: `/calendar?eventId=${eventId}`,
      });
    }
  }

  if (date) {
    const [month, year] = date.toLowerCase().split("-");
    if (month && year) {
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
      return generatePageMetadata({
        title: `Events in ${capitalizedMonth} ${year}`,
        description: `Discover upcoming tech events in Mangalore for ${capitalizedMonth} ${year}.`,
        image: `/api/og?date=${date}`,
        path: `/calendar?date=${date}`,
      });
    }
  }

  // defaults to current month (note: even for invalid date param)
  date = formatDate(new Date(), "MMM-yyyy");

  return generatePageMetadata({
    title: "Calendar",
    description: "Discover the events happening in Mangalore.",
    image: `/api/og?date=${date}`,
    path: `/calendar?date=${date}`,
  });
}

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
