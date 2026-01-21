import { NextResponse } from "next/server";
import { getEvents } from "@/lib/get-events";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const startDate = startParam ? new Date(startParam) : undefined;
  const endDate = endParam ? new Date(endParam) : undefined;

  const events = await getEvents(startDate, endDate);
  return NextResponse.json(events);
}
