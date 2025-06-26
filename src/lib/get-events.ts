import { siteConfig } from "@/config/site";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  images?: string[];
  outcomes?: string[];
  registrationLink?: string;
  time?: string;
}

export async function getEvents(): Promise<Event[]> {
  // TODO: Add DB Logic here :D
  const events = [...siteConfig.events.upcoming];

  return events.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}
