import { NextResponse } from "next/server";
import { getEvents } from "@/lib/get-events";

// GET /api/events
// Query params (optional):
// - start: ISO-8601 date string (e.g. 2026-02-01T00:00:00Z)
// - end: ISO-8601 date string (e.g. 2026-02-28T23:59:59Z)
// Response: JSON array of events (IEvent[])
// Errors: 400 if start/end are invalid date strings

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const startDate = startParam ? new Date(startParam) : undefined;
  const endDate = endParam ? new Date(endParam) : undefined;

  if (startParam && startDate && Number.isNaN(startDate.getTime())) {
    return NextResponse.json({ error: "Invalid start date" }, { status: 400 });
  }

  if (endParam && endDate && Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ error: "Invalid end date" }, { status: 400 });
  }

  const events = await getEvents(startDate, endDate);
  return NextResponse.json(events);
}
