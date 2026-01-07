import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import type { EventSubmissionFormValues } from "./forms-config";
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

const EVENT_COLORS: TEventColor[] = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "gray",
];

export async function getEvents(
  startDate?: Date,
  endDate?: Date,
): Promise<IEvent[]> {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[3];
  if (!sheet) throw new Error("Sheet not found");

  const rows = await sheet.getRows();
  console.log(rows);
  const res: IEvent[] = rows
    .map((row) => {
      const eventData = row.toObject() as unknown as EventSubmissionFormValues;
      const randomColor =
        EVENT_COLORS[Math.floor(Math.random() * EVENT_COLORS.length)];

      return {
        id: row.rowNumber.toString(), // Using row number as a simple ID
        title: eventData.eventName,
        startDateTime: new Date(eventData.startDateTime).toISOString(),
        endDateTime: new Date(eventData.endDateTime).toISOString(),
        time: eventData.startDateTime.split("T")[1]?.substring(0, 5) || "", // Extract time from startDateTime
        location: eventData.eventLocation,
        description: eventData.eventDescription,
        registrationLink: eventData.registrationLink || "",
        joinLink: eventData.eventWebsite || "", // Using eventWebsite as joinLink for now
        icon: "calendar" as keyof typeof iconsMap, // Default icon
        highlight: eventData.organizationName === "DK24",
        youtubeLink: "", // No direct mapping from form, so empty for now
        color: randomColor,
      };
    })
    .filter((event) => {
      if (!startDate || !endDate) return true;
      const eventStartDate = new Date(event.startDateTime);
      const eventEndDate = new Date(event.endDateTime);
      return (
        (eventStartDate >= startDate && eventStartDate <= endDate) ||
        (eventEndDate >= startDate && eventEndDate <= endDate)
      );
    });
  console.log(res);
  return res;
}
