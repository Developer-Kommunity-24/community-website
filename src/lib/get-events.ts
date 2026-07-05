"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { endOfMonth } from "date-fns";
import type { IEvent } from "@/types";

const localEventsPath = path.join(process.cwd(), "src/data/local-events.json");
const backendUrl = process.env.BACKEND_URL;

async function readLocalEvents(): Promise<IEvent[]> {
  try {
    const raw = await fs.readFile(localEventsPath, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as IEvent[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function filterEventsByRange(
  events: IEvent[],
  startDate?: Date,
  endDate?: Date,
): IEvent[] {
  if (!startDate || !endDate) return events;
  return events.filter((event) => {
    const eventStartDate = new Date(event.startDateTime);
    const eventEndDate = new Date(event.endDateTime);
    return (
      (eventStartDate >= startDate && eventStartDate <= endDate) ||
      (eventEndDate >= startDate && eventEndDate <= endDate) ||
      (eventStartDate <= startDate && eventEndDate >= endDate)
    );
  });
}

export async function getEvents(
  startDate?: Date,
  endDate?: Date,
): Promise<IEvent[]> {
  const isDev = process.env.NODE_ENV !== "production";
  const useLocalCalendar = process.env.EVENTS_SOURCE === "calendar";
  if (isDev && useLocalCalendar) {
    const localEvents = await readLocalEvents();
    return filterEventsByRange(localEvents, startDate, endDate);
  }

  if (!backendUrl) {
    console.warn("getEvents: Missing BACKEND_URL configuration.");
    return [];
  }

  try {
    const response = await fetch(`${backendUrl}/api/events`, {
      next: { revalidate: 300, tags: ["calendar"] },
    });

    if (!response.ok) {
      throw new Error(`Calendar API request failed with ${response.status}`);
    }

    const data = (await response.json()) as { events?: IEvent[] };
    const events = Array.isArray(data.events) ? data.events : [];
    return filterEventsByRange(events, startDate, endDate);
  } catch (error) {
    console.error("getEvents: Failed to load events from Calendar API.", error);
    return [];
  }
}

const monthMap = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export async function getFilteredEventsByDateRange(
  dateParam: string,
): Promise<IEvent[]> {
  const [monthStr, yearStr] = dateParam.toLowerCase().split("-");
  const monthIndex = monthMap[monthStr as keyof typeof monthMap];
  const year = parseInt(yearStr, 10);

  if (monthIndex === undefined || Number.isNaN(year)) {
    throw new Error("Invalid date parameter");
  }

  const startDate = new Date(year, monthIndex, 1);
  const endDate = endOfMonth(startDate);

  const events = await getEvents(startDate, endDate);

  // Filter events: events starting in this month (top 3 logic)
  const now = new Date();
  const monthEvents = events.filter((e) => {
    const eventDate = new Date(e.startDateTime);
    return eventDate >= startDate && eventDate <= endDate;
  });

  let displayEvents: typeof events = [];

  if (endDate < now) {
    // Past month: Show 3 events, prioritize DK24, then sort by date
    displayEvents = monthEvents
      .sort((a, b) => {
        const aIsDK24 = a.organizationName === "DK24";
        const bIsDK24 = b.organizationName === "DK24";
        if (aIsDK24 && !bIsDK24) return -1;
        if (!aIsDK24 && bIsDK24) return 1;
        return (
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime()
        );
      })
      .slice(0, 3);
  } else if (startDate > now) {
    // Future month: Show top 3 by start date
    displayEvents = monthEvents
      .sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime(),
      )
      .slice(0, 3);
  } else {
    // Current month: Show upcoming events only (if < 3, include past events)
    const upcoming = monthEvents
      .filter((e) => new Date(e.endDateTime) >= now)
      .sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime(),
      );

    if (upcoming.length >= 3) {
      displayEvents = upcoming.slice(0, 3);
    } else {
      const past = monthEvents
        .filter((e) => new Date(e.endDateTime) < now)
        .sort(
          (a, b) =>
            new Date(b.startDateTime).getTime() -
            new Date(a.startDateTime).getTime(),
        ); // Latest past first

      const needed = 3 - upcoming.length;
      const pastToUse = past.slice(0, needed);

      // Combine and sort chronologically
      displayEvents = [...pastToUse, ...upcoming].sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime(),
      );
    }
  }

  return displayEvents;
}
