import type { IEvent } from "@/calendar/interfaces";

function escapeText(value: string | undefined) {
  if (!value) return "";
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function formatIcsDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return null;
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

/**
 * Builds an iCalendar (ICS) document string for the given events.
 *
 * Each event in the array is converted into a `VEVENT` component inside a
 * single `VCALENDAR` with `VERSION:2.0`, `CALSCALE:GREGORIAN` and
 * `METHOD:PUBLISH`. Dates are rendered in UTC (`YYYYMMDDTHHmmssZ`) and
 * text fields are escaped according to the iCalendar rules for backslashes,
 * commas, semicolons and newlines.
 *
 * Expected `IEvent` fields used by this function:
 * - `startDateTime` (string | Date): Start of the event; required to emit a VEVENT.
 * - `endDateTime`   (string | Date): End of the event; required to emit a VEVENT.
 * - `id`            (string, optional): Used to build a stable UID; falls back to
 *   `${title}-${startDateTime}` if not provided.
 * - `title`         (string): Mapped to `SUMMARY`.
 * - `description`   (string, optional): Mapped to `DESCRIPTION`.
 * - `location`      (string, optional): Mapped to `LOCATION`.
 * - `registrationLink` (string, optional): Preferred URL mapped to `URL`.
 * - `joinLink`      (string, optional): Fallback URL mapped to `URL` if
 *   `registrationLink` is not present.
 *
 * @param events Array of calendar events to export as ICS.
 * @returns A string containing a complete VCALENDAR 2.0 document with CRLF
 * line endings, suitable for serving as a `.ics` file.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc5545
 */
export function buildICalendar(events: IEvent[]): string {
  const now = formatIcsDate(new Date()) ?? "";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DK24//Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:DK24 Events",
  ];

  events.forEach((event) => {
    if (!event.startDateTime || !event.endDateTime) return;

    const start = formatIcsDate(event.startDateTime);
    const end = formatIcsDate(event.endDateTime);
    if (!start || !end) return;

    const uid = event.id || `${event.title}-${event.startDateTime}`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeText(uid)}@dk24.org`,
      `DTSTAMP:${now}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${escapeText(event.title)}`,
      event.description ? `DESCRIPTION:${escapeText(event.description)}` : "",
      event.location ? `LOCATION:${escapeText(event.location)}` : "",
      event.registrationLink
        ? `URL:${escapeText(event.registrationLink)}`
        : event.joinLink
          ? `URL:${escapeText(event.joinLink)}`
          : "",
      "END:VEVENT",
    );
  });

  lines.push("END:VCALENDAR");

  return lines.filter(Boolean).join("\r\n");
}
