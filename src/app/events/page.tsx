import { BackgroundPattern } from "@/components/background-pattern";
import { PageHeader } from "@/components/page-header";
import { getEvents } from "@/lib/get-events";
import { EventsTabs } from "@/components/events-tabs";
import { Suspense } from "react";

export default async function EventsPage() {
  const events = await getEvents();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to the start of the day

  const upcomingEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date to the start of the day
    return eventDate >= today;
  });
  const pastEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date to the start of the day
    return eventDate < today;
  });

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
