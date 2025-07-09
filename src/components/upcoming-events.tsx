import { getEvents } from "@/lib/get-events";
import UpcomingEventsClient from "./upcoming-events-client";
import { Suspense } from "react";

export async function UpcomingEvents() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date());
  const pastEvents = events.filter((e) => new Date(e.date) <= new Date());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpcomingEventsClient
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
      />
    </Suspense>
  );
}
