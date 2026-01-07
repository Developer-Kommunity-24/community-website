import { Suspense } from "react";
import { BackgroundPattern } from "@/components/background-pattern";
import { EventsTabs } from "@/components/events-tabs";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";

export const metadata = generatePageMetadata({
  title: "Events",
  description:
    "Discover past and upcoming events from the DK24 community. Join workshops, hackathons, tech talks, and collaborative learning sessions across Mangalore's college tech communities.",
  path: "/events",
});

export default async function EventsPage() {
  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <PageHeader
          title="Events"
          description="Discover past and upcoming events from the DK24 community"
        />
        <Suspense fallback={<div>Loading...</div>}>
          <CalendarProvider>
            <EventsTabs />
          </CalendarProvider>
        </Suspense>
      </div>
    </BackgroundPattern>
  );
}
