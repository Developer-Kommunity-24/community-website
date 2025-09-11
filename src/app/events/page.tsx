import { BackgroundPattern } from "@/components/background-pattern";
import { PageHeader } from "@/components/page-header";
import { getEvents } from "@/lib/get-events";
import { EventsTabs } from "@/components/events-tabs";
import { Suspense } from "react";

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date());
  const pastEvents = events.filter((e) => new Date(e.date) <= new Date());

  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <PageHeader
          title="Events"
          description="Discover past and upcoming events from the DK24 community"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <EventsTabs upcomingEvents={upcomingEvents} pastEvents={pastEvents} />
        </Suspense>
      </div>
    </BackgroundPattern>
  );
}
