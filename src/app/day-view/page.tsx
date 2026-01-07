"use client";

import { useEffect, useMemo } from "react";
import { parseISO, isSameDay, format } from "date-fns";
import { useSearchParams } from "next/navigation";

import { BackgroundPattern } from "@/components/background-pattern";
import { PageHeader } from "@/components/page-header";
import {
  CalendarProvider,
  useCalendar,
} from "@/calendar/contexts/calendar-context";
import { AgendaEventCard } from "@/calendar/components/agenda-view/agenda-event-card";
import { CalendarX2 } from "lucide-react";

function DayViewInner() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const { selectedDate, setSelectedDate, events, isLoading } = useCalendar();

  useEffect(() => {
    if (!dateParam) return;
    try {
      const d = parseISO(dateParam);
      if (!Number.isNaN(d.getTime())) setSelectedDate(d);
    } catch {
      // ignore
    }
  }, [dateParam, setSelectedDate]);

  const eventsForDay = useMemo(() => {
    return events.filter((ev) =>
      isSameDay(parseISO(ev.startDateTime), selectedDate),
    );
  }, [events, selectedDate]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <PageHeader title={`Events for ${format(selectedDate, "MMM d, yyyy")}`} />

      {isLoading ? (
        <div className="h-60 p-4">
          <div className="animate-pulse h-6 w-48 bg-muted/50 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl border p-4" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {eventsForDay.length > 0 ? (
            eventsForDay.map((ev) => <AgendaEventCard key={ev.id} event={ev} />)
          ) : (
            <div className="py-20 text-center text-muted-foreground">
              <CalendarX2 className="size-10 mx-auto" />
              <p className="text-sm md:text-base">
                No events scheduled for this day
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DayViewPage() {
  return (
    <BackgroundPattern variant="default">
      <CalendarProvider>
        <DayViewInner />
      </CalendarProvider>
    </BackgroundPattern>
  );
}
