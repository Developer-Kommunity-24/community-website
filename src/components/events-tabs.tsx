"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { EventCard } from "@/components/event-card";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/calendar/contexts/calendar-context";
import { useState } from "react";
import { ClientContainer } from "@/calendar/components/client-container";

export function EventsTabs() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "past" ? "past" : "upcoming";
  const [view, setView] = useState<"month" | "agenda">("month");
  const { events } = useCalendar();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to the start of the day

  const _upcomingEvents = events.filter((e) => {
    const eventDate = new Date(e.startDateTime);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date to the start of the day
    return eventDate >= today;
  });
  const _pastEvents = events.filter((e) => {
    const eventDate = new Date(e.startDateTime);
    eventDate.setHours(0, 0, 0, 0); // Normalize event date to the start of the day
    return eventDate < today;
  });

  const pastEventsDesc = _pastEvents.sort((a, b) => {
    return (
      new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()
    );
  });

  return (
    <Tabs defaultValue={defaultTab} className="mt-12">
      <TabsList className="grid w-full md:w-auto grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        <TabsTrigger value="past">Past Events</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="mt-6">
        {/* Small screens: buttons */}
        <div className="flex justify-end gap-2 mb-4 lg:hidden">
          <Button
            variant={view === "month" ? "default" : "outline"}
            onClick={() => setView("month")}
          >
            Month View
          </Button>
          <Button
            variant={view === "agenda" ? "default" : "outline"}
            onClick={() => setView("agenda")}
          >
            Agenda View
          </Button>
        </div>

        {/* Large screens: side-by-side view */}
        <div className="hidden lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            <ClientContainer view="agenda" />
          </div>
          <div className="lg:w-1/2">
            <ClientContainer view="month" hideHeader={true} />
          </div>
        </div>

        {/* Small screens: single view */}
        <div className="lg:hidden">
          <ClientContainer view={view} />
        </div>
      </TabsContent>

      <TabsContent value="past" className="mt-6">
        <h2 className="text-2xl font-bold mb-6 mt-8 lg:mt-0">Past Events</h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pastEventsDesc.length === 0 ? (
            <Card className="overflow-hidden flex flex-col h-full col-span-full bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
              <div className="relative h-48 w-full bg-linear-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg"
                    alt="No events"
                    width={32}
                    height={32}
                    className="opacity-40 text-green-500"
                  />
                </div>
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40" />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-2 text-center text-gray-800 dark:text-gray-200">
                  No Past Events
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                  Events will appear here once they are added by the community.
                </p>
              </CardContent>
            </Card>
          ) : (
            pastEventsDesc.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
