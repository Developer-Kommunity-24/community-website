import { useMemo } from "react";
import { CalendarX2 } from "lucide-react";
import { parseISO, isSameMonth } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AgendaEventCard } from "@/calendar/components/agenda-view/agenda-event-card";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarAgendaView({
  singleDayEvents,
  multiDayEvents,
}: IProps) {
  const { selectedDate } = useCalendar();

  const eventsForMonth = useMemo(() => {
    const allEvents = [...singleDayEvents, ...multiDayEvents];

    return allEvents
      .filter((event) => {
        const eventDate = parseISO(event.startDateTime);
        return isSameMonth(eventDate, selectedDate);
      })
      .sort((a, b) => {
        return (
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
        );
      });
  }, [singleDayEvents, multiDayEvents, selectedDate]);

  const { isLoading } = useCalendar();

  if (isLoading) {
    return (
      <div className="h-full p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex h-24 w-full rounded-xl border p-4">
            <div className="w-24 bg-muted/50 rounded-lg animate-pulse mr-4" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-muted/50 rounded animate-pulse" />
              <div className="h-3 w-1/4 bg-muted/50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full" type="always">
        <div className="flex flex-col h-full p-4">
          {eventsForMonth.length > 0 ? (
            <div className="space-y-4">
              {eventsForMonth.map((event) => (
                <AgendaEventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground min-h-[50vh]">
              <CalendarX2 className="size-10" />
              <p className="text-sm md:text-base">
                No events scheduled for the selected month
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
