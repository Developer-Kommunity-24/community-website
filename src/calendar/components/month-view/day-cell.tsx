"use client";
import { useMemo, useRef } from "react";
import { isToday, startOfDay } from "date-fns";
import { MonthEventBadge } from "@/calendar/components/month-view/month-event-badge";

import { cn } from "@/lib/utils";
import { getMonthCellEvents } from "@/calendar/helpers";

import type { ICalendarCell, IEvent } from "@/calendar/interfaces";

interface IProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 2;

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;
  const badgeContainerRef = useRef<HTMLDivElement | null>(null);

  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions],
  );
  const isSunday = date.getDay() === 0;

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-1 border-l border-t py-1.5 lg:pb-2 lg:pt-1",
        isSunday && "border-l-0",
      )}
    >
      <button
        type="button"
        className={cn(
          "cursor-pointer",
          "flex size-6 translate-x-1 items-center justify-center rounded-full text-xs font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:px-2",
          !currentMonth && "opacity-20",
          isToday(date) &&
            "bg-green-100 dark:bg-green-900/30 font-bold text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40",
          cellEvents.length > 0 &&
            !isToday(date) &&
            "bg-green-50 dark:bg-green-900/20 font-bold text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30",
        )}
      >
        {day}
      </button>

      <div
        className={cn(
          "flex min-h-10 flex-col gap-1 lg:h-15.5 lg:gap-2 px-0",
          !currentMonth && "opacity-50",
        )}
      >
        {[0, 1].map((position) => {
          const event = cellEvents.find((e) => e.position === position);
          const eventKey = event
            ? `event-${event.id}-${position}`
            : `empty-${position}`;

          return (
            <div
              key={eventKey}
              className="lg:flex-1 w-full"
              ref={badgeContainerRef}
            >
              {event && (
                <MonthEventBadge
                  // className="w-full"
                  badgeContainerRef={badgeContainerRef}
                  event={event}
                  cellDate={startOfDay(date)}
                />
              )}
            </div>
          );
        })}
      </div>

      {cellEvents.length > MAX_VISIBLE_EVENTS && (
        <p
          className={cn(
            "h-4.5 px-1.5 text-xs font-semibold text-muted-foreground",
            !currentMonth && "opacity-50",
          )}
        >
          <span className="sm:hidden">
            +{cellEvents.length - MAX_VISIBLE_EVENTS}
          </span>
          <span className="hidden sm:inline">
            {" "}
            {cellEvents.length - MAX_VISIBLE_EVENTS} more...
          </span>
        </p>
      )}
    </div>
  );
}
