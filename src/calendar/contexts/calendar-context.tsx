"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

import { monthMap } from "@/calendar/helpers";

import type { Dispatch, SetStateAction } from "react";
import type { IEvent } from "@/calendar/interfaces";
import type {
  TBadgeVariant,
  TVisibleHours,
  TWorkingHours,
} from "@/calendar/types";
import { EventDetailsDialog } from "../components/dialogs/event-details-dialog";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
  selectedEventId: string | undefined;
  setSelectedEventId: (id: string | undefined) => void;
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
  initialEventId,
}: {
  children: React.ReactNode;
  initialDate?: Date;
  initialEventId?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [badgeVariant, setBadgeVariant] = useState<TBadgeVariant>("colored");
  const [visibleHours, setVisibleHours] =
    useState<TVisibleHours>(VISIBLE_HOURS);
  const [workingHours, setWorkingHours] =
    useState<TWorkingHours>(WORKING_HOURS);

  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
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

    const eventIdParam = searchParams.get("eventId");
    if (eventIdParam) {
      setSelectedEventId(eventIdParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (selectedEventId) {
      current.set("eventId", selectedEventId);
    } else {
      current.delete("eventId");
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${window.location.pathname}${query}`);
  }, [selectedEventId, router.replace, searchParams.entries]);

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
      const query = new URLSearchParams({
        start: monthStart.toISOString(),
        end: monthEnd.toISOString(),
      });
      const response = await fetch(`/api/events?${query.toString()}`);
      const fetchedEvents = (await response.json()) as IEvent[];
      setEventsCache((prev) => new Map(prev).set(monthKey, fetchedEvents));
      setIsLoading(false);
      return;
    },
    [eventsCache],
  );

  useEffect(() => {
    fetchEventsForMonth(selectedDate);
  }, [selectedDate, fetchEventsForMonth]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect is for pre-fetching events for the next and previous months
  useEffect(() => {
    const tempDate = new Date(selectedDate);
    tempDate.setMonth(tempDate.getMonth() + 1);
    fetchEventsForMonth(tempDate);
    tempDate.setMonth(tempDate.getMonth() - 2);
    fetchEventsForMonth(tempDate);
  }, []);

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
        selectedEventId,
        setSelectedEventId,
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
      <EventDetailsDialog
        event={
          selectedEventId
            ? currentMonthEvents.find((e) => e.id === selectedEventId)
            : undefined
        }
      ></EventDetailsDialog>
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
