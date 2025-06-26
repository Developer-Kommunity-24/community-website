import { PageHeader } from "@/components/page-header";
import { EventCard } from "@/components/event-card";
import { EventCalendar } from "@/components/event-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getEvents } from "@/lib/get-events";

export default async function EventsPage() {
  const events = await getEvents();

  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date());
  const pastEvents = events.filter((e) => new Date(e.date) <= new Date());

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <PageHeader
        title="Events"
        description="Discover past and upcoming events from the DK24 community"
      />

      <Tabs defaultValue="upcoming" className="mt-12">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold mb-6">Events Calendar</h2>
            <EventCalendar events={[...upcomingEvents]} />
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.length === 0 ? (
                <Card className="overflow-hidden flex flex-col h-full col-span-full">
                  <div className="relative h-48 w-full bg-muted flex items-center justify-center">
                    <Image
                      src="/placeholder.svg"
                      alt="No events"
                      fill
                      className="object-cover opacity-60"
                      style={{ zIndex: 0 }}
                    />
                    <div className="absolute inset-0 bg-muted/60" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-2 text-center">
                      No Upcoming Events
                    </h3>
                    <p className="text-muted-foreground text-center">
                      Events will appear here once they are added by the
                      community.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} isUpcoming />
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <h2 className="text-2xl font-bold mb-6 mt-8 lg:mt-0">Past Events</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.length === 0 ? (
              <Card className="overflow-hidden flex flex-col h-full col-span-full">
                <div className="relative h-48 w-full bg-muted flex items-center justify-center">
                  <Image
                    src="/placeholder.svg"
                    alt="No events"
                    fill
                    className="object-cover opacity-60"
                    style={{ zIndex: 0 }}
                  />
                  <div className="absolute inset-0 bg-muted/60" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    No Past Events
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Events will appear here once they are added by the
                    community.
                  </p>
                </CardContent>
              </Card>
            ) : (
              pastEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
