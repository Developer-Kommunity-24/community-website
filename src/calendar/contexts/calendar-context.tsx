"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useSearchParams } from "next/navigation";

import { getEvents } from "@/lib/get-events";
import { monthMap } from "@/calendar/helpers";

import type { Dispatch, SetStateAction } from "react";
import type { IEvent } from "@/calendar/interfaces";
import type {
  TBadgeVariant,
  TVisibleHours,
  TWorkingHours,
} from "@/calendar/types";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  badgeVariant: TBadgeVariant;
  setBadgeVariant: (variant: TBadgeVariant) => void;
  workingHours: TWorkingHours;
  setWorkingHours: Dispatch<SetStateAction<TWorkingHours>>;
  visibleHours: TVisibleHours;
  setVisibleHours: Dispatch<SetStateAction<TVisibleHours>>;
  events: IEvent[];
  isLoading: boolean;
  hoveredEventId: string | null;
  setHoveredEventId: (id: string | null) => void;
}

const CalendarContext = createContext({} as ICalendarContext);

const WORKING_HOURS = {
  0: { from: 0, to: 0 },
  1: { from: 8, to: 17 },
  2: { from: 8, to: 17 },
  3: { from: 8, to: 17 },
  4: { from: 8, to: 17 },
  5: { from: 8, to: 17 },
  6: { from: 8, to: 12 },
};

const VISIBLE_HOURS = { from: 7, to: 18 };

export function CalendarProvider({
  children,
  initialDate,
}: {
  children: React.ReactNode;
  initialDate?: Date;
}) {
  const searchParams = useSearchParams();
  const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>("colored");
  const [visibleHours, setVisibleHours] =
    useState<TVisibleHours>(VISIBLE_HOURS);
  const [workingHours, setWorkingHours] =
    useState<TWorkingHours>(WORKING_HOURS);

  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const [eventsCache, setEventsCache] = useState<Map<string, IEvent[]>>(
    new Map(),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      const [monthStr, yearStr] = dateParam.toLowerCase().split("-");
      const monthIndex = monthMap[monthStr];
      const year = yearStr ? parseInt(yearStr, 10) : NaN;

      if (monthIndex !== undefined && !Number.isNaN(year)) {
        const newDate = new Date(year, monthIndex, 1);
        setSelectedDate(newDate);
      }
    }
  }, [searchParams]);

  const fetchEventsForMonth = useCallback(
    async (date: Date) => {
      const monthKey = format(date, "yyyy-MM");
      if (eventsCache.has(monthKey)) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);
      const fetchedEvents = await getEvents(monthStart, monthEnd);
      setEventsCache((prev) => new Map(prev).set(monthKey, fetchedEvents));
      setIsLoading(false);
      return;
    },
    [eventsCache],
  );

  useEffect(() => {
    fetchEventsForMonth(selectedDate);
  }, [selectedDate, fetchEventsForMonth]);

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const currentMonthKey = format(selectedDate, "yyyy-MM");
  const currentMonthEvents = eventsCache.get(currentMonthKey) || [];

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate: handleSelectDate,
        badgeVariant,
        setBadgeVariant,
        visibleHours,
        setVisibleHours,
        workingHours,
        setWorkingHours,
        events: currentMonthEvents,
        isLoading,
        hoveredEventId,
        setHoveredEventId,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
