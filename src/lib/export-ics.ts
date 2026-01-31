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
