"use client";

import { isSameDay, parseISO } from "date-fns";
import { useMemo } from "react";
import { CalendarAgendaView } from "@/components/calendar/agenda-view/calendar-agenda-view";
import { useCalendar } from "@/components/calendar/contexts/calendar-context";
import { CalendarHeader } from "@/components/calendar/header/calendar-header";
import { CalendarMonthView } from "@/components/calendar/month-view/calendar-month-view";
import { getMonthGridRows } from "@/lib/calendar-helpers";

import type { TCalendarView } from "@/types";

interface IProps {
  view: TCalendarView;
  hideHeader?: boolean;
}

export function ClientContainer({ view, hideHeader = false }: IProps) {
  const { selectedDate, events } = useCalendar();

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStartDate = parseISO(event.startDateTime);
      const eventEndDate = parseISO(event.endDateTime);

      if (view === "month" || view === "agenda") {
        const monthStart = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1,
        );
        const monthEnd = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );
        const isInSelectedMonth =
          eventStartDate <= monthEnd && eventEndDate >= monthStart;

        return isInSelectedMonth;
      }
    });
  }, [selectedDate, events, view]);

  const singleDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDateTime);
    const endDate = parseISO(event.endDateTime);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDateTime);
    const endDate = parseISO(event.endDateTime);
    return !isSameDay(startDate, endDate);
  });

  const numRows = useMemo(() => getMonthGridRows(selectedDate), [selectedDate]);

  return (
    <div className="overflow-hidden rounded-xl border h-full">
      {!hideHeader && <CalendarHeader view={view} events={filteredEvents} />}

      {view === "month" && (
        <CalendarMonthView
          singleDayEvents={singleDayEvents}
          multiDayEvents={multiDayEvents}
        />
      )}
      {view === "agenda" && (
        <CalendarAgendaView
          singleDayEvents={singleDayEvents}
          multiDayEvents={multiDayEvents}
          maxVisibleEvents={numRows}
        />
      )}
    </div>
  );
}
