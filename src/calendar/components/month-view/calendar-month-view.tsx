import { useMemo } from "react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { DayCell } from "@/calendar/components/month-view/day-cell";

import {
  getCalendarCells,
  calculateMonthEventPositions,
} from "@/calendar/helpers";

import type { IEvent } from "@/calendar/interfaces";
import { Card, CardContent } from "@/components/ui/card";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarMonthView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate } = useCalendar();

  const allEvents = [...multiDayEvents, ...singleDayEvents];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const eventPositions = useMemo(
    () =>
      calculateMonthEventPositions(
        multiDayEvents,
        singleDayEvents,
        selectedDate,
      ),
    [multiDayEvents, singleDayEvents, selectedDate],
  );

  return (
    <Card className="bg-linear-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-background border-green-200/50 dark:border-green-800/50 py-0 h-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-7 divide-x">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="flex items-center justify-center py-2 text-xs font-semibold text-green-600 dark:text-green-400"
            >
              <span>{day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 overflow-hidden">
          {cells.map((cell) => (
            <DayCell
              key={cell.date.toISOString()}
              cell={cell}
              events={allEvents}
              eventPositions={eventPositions}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
