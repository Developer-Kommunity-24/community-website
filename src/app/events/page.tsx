import { Suspense } from "react";
import { BackgroundPattern } from "@/components/background-pattern";
import { EventsTabs } from "@/components/events-tabs";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { getEvents } from "@/lib/get-events";

export const metadata = generatePageMetadata({
  title: "Events",
  description:
    "Discover past and upcoming events from the DK24 community. Join workshops, hackathons, tech talks, and collaborative learning sessions across Mangalore's college tech communities.",
  path: "/events",
});

export default async function EventsPage() {
  const events = await getEvents();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to the start of the day

  const upcomingEvents = events.filter((e) => {
    const eventDate = new Date(e.startDateTime);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date to the start of the day
    return eventDate >= today;
  });
  const pastEvents = events.filter((e) => {
    const eventDate = new Date(e.startDateTime);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date to the start of the day
    return eventDate < today;
  });

  const pastEventsDesc = pastEvents.sort((a, b) => {
    return (
      new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()
    );
  });

  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <PageHeader
          title="Events"
          description="Discover past and upcoming events from the DK24 community"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <CalendarProvider events={events}>
            <EventsTabs
              upcomingEvents={upcomingEvents}
              pastEvents={pastEventsDesc}
            />
          </CalendarProvider>
        </Suspense>
      </div>
    </BackgroundPattern>
  );
}
