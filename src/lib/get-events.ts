import { events } from "@/constants/events";
import type { Event } from "@/types";

export async function getEvents(): Promise<Event[]> {
  // TODO: Add DB Logic here :D

  return events.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}
