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
  const events = [
    ...siteConfig.events.upcoming,
    ...siteConfig.events.past,
    {
      id: "summit-2025",
      title: "DK24 Summit 2025",
      date: "November 8, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Sahyadri College of Engineering & Management",
      description:
        "The annual summit bringing together all member communities to showcase projects, share learnings, and plan for the upcoming year. Hosted by Sahyadri Open Source Community.",
      registrationLink: "/events/register/summit-2024",
    },
  ];

  return events.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}
