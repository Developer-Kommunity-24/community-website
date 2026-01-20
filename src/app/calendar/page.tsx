import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Suspense } from "react";
import { BackgroundPattern } from "@/components/background-pattern";
import { EventsTabs } from "@/components/events-tabs";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { EventsLoadingSkeleton } from "@/components/events-loading-skeleton";
import { monthMap } from "@/calendar/helpers";
import { getEvents } from "@/lib/get-events";

async function getEventImages(eventId: string) {
  const postersDir = path.join(process.cwd(), "public", "events", "posters");
  const recapsDir = path.join(process.cwd(), "public", "events", eventId);

  let posterPath: string | null = null;
  const recapPaths: string[] = [];

  try {
    const posterFiles = await fs.readdir(postersDir);
    for (const file of posterFiles) {
      const extension = path.extname(file);
      const basename = path.basename(file, extension);
      if (basename === eventId) {
        posterPath = `/events/posters/${file}`;
        break;
      }
    }

    try {
      await fs.access(recapsDir);
      const recapFiles = await fs.readdir(recapsDir);
      for (const file of recapFiles) {
        recapPaths.push(`/events/${eventId}/${file}`);
      }
    } catch {}
  } catch (error) {
    console.error("Error reading event images:", error);
  }

  return { posterPath, recapPaths };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ eventId?: string }>;
}): Promise<Metadata> {
  const awaitedSearchParams = await searchParams;
  const eventId = awaitedSearchParams.eventId;

  if (eventId) {
    const allEvents = await getEvents();
    const event = allEvents.find((e) => e.id === eventId);
    if (event) {
      const { posterPath, recapPaths } = await getEventImages(eventId);
      const primaryImage =
        event.posterUrl || posterPath || recapPaths[0] || "/logo.png";

      return generatePageMetadata({
        title: event.title,
        description: event.description,
        image: primaryImage,
        path: `/calendar?eventId=${eventId}`,
      });
    }
  }

  return generatePageMetadata({
    title: "Calendar",
    description: "Discover the events happening in Mangalore.",
    path: "/calendar",
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
