import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types";

const UpcomingEventsClient = ({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: Event[];
  pastEvents: Event[];
}) => {
  const isUpcoming = upcomingEvents.length > 0;
  const displayEvents = isUpcoming ? upcomingEvents : pastEvents;

  return (
    <section id="upcoming-events" className="relative py-16 overflow-hidden">
      {/* Subtle Background Elements - matching other sections */}
      <div className="absolute inset-0 bg-linear-to-br from-green-50/20 via-white to-green-50/10 dark:from-green-950/5 dark:via-background dark:to-green-950/5" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl -translate-x-28 translate-y-28" />

      <div className="container relative mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 mb-5">
            <CalendarDays className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-300">
              Events
            </span>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Join us for workshops, hackathons, and community gatherings
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="link">
            <Link href={isUpcoming ? "/events" : "/events?tab=past"}>
              View All Events →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsClient;
