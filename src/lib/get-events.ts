"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import type { EventSubmissionFormValues } from "@/lib/forms-config";
import type { IEvent } from "@/calendar/interfaces";
import type { TEventColor } from "@/types";
import type { iconsMap } from "@/constants";

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID ?? "",
  serviceAccountAuth,
);

const localEventsPath = path.join(process.cwd(), "src/data/local-events.json");

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
      (eventEndDate >= startDate && eventEndDate <= endDate)
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

  if (
    !process.env.GOOGLE_SHEET_ID ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    return [];
  }

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[3];
    if (!sheet) throw new Error("Sheet not found");

    const rows = await sheet.getRows();
    const res: IEvent[] = rows
      .map((row): IEvent | null => {
        const eventData =
          row.toObject() as unknown as EventSubmissionFormValues & {
            ID: string;
          };
        const isDK24 = eventData.organizationName === "DK24";

        const startDateTime = new Date(eventData.startDateTime);
        const endDateTime = new Date(eventData.endDateTime);

        if (
          Number.isNaN(startDateTime.getTime()) ||
          Number.isNaN(endDateTime.getTime())
        ) {
          return null;
        }

        return {
          id: eventData.ID,
          title: eventData.eventName,
          startDateTime: startDateTime.toISOString(),
          endDateTime: endDateTime.toISOString(),
          time: eventData.startDateTime.split("T")[1]?.substring(0, 5) || "",
          location: eventData.eventLocation,
          description: eventData.eventDescription,
          registrationLink: eventData.registrationLink || "",
          joinLink: eventData.eventWebsite || "",
          icon: "calendar" as keyof typeof iconsMap,
          highlight: isDK24,
          youtubeLink: "",
          color: (isDK24 ? "green" : "gray") as TEventColor,
          organizationName: eventData.organizationName,
          posterUrl: eventData.eventPosterUrl,
          tags: (() => {
            const raw = eventData.eventTags as unknown;
            if (Array.isArray(raw)) return raw as string[];
            if (typeof raw === "string") {
              let s = (raw as string).trim();
              if (s.startsWith("[") && s.endsWith("]")) {
                s = s.slice(1, -1);
              }
              return s
                .split(",")
                .map((t: string) => t.replace(/^['"]|['"]$/g, "").trim())
                .filter(Boolean) as string[];
            }
            return [];
          })(),
        };
      })
      .filter((event): event is IEvent => event !== null);

    return filterEventsByRange(res, startDate, endDate);
  } catch {
    return [];
  }
}
