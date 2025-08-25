import type { Event } from "@/types";

export const events: Event[] = [
  {
    id: "summit-2024",
    title: "DK24 Summit 2024",
    date: "November 8, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Sahyadri College of Engineering & Management",
    description:
      "The annual summit bringing together all member communities to showcase projects, share learnings, and plan for the upcoming year. Hosted by Sahyadri Open Source Community.",
    registrationLink: "/events/register/summit-2024",
    icon: "calendar",
    highlight: true,
  },
  {
    id: "mcp-intro-2025",
    title: "Everything about MCP",
    date: "August 9, 2025",
    time: "7:30 PM IST",
    location: "Google Meet",
    description:
      "This session introduces the Model Context Protocol (MCP), an open-source standard for connecting LLM agents to external tools, covering its purpose, use-cases, and enhancing coding workflows with GitHub and Figma.",
    registrationLink: "https://meet.google.com/cxj-vzoe-fbu",
    youtubeLink: "https://youtu.be/jdmF71k59Iw",
    icon: "calendar",
    highlight: true,
  },
  {
    id: "devtools-discussion-2025",
    title: "DevTools: Building Performant Web Apps",
    date: "August 24, 2025",
    time: "7:30 PM IST",
    location: "Online",
    description:
      "A community discussion on Chrome DevTools and best practices for building performant web applications.",
    registrationLink: "https://forms.gle/Q8VziJdxnyJLFYH5A",
    youtubeLink: "https://www.youtube.com/watch?v=7O3dfNva1xU",
    icon: "calendar",
    highlight: true
  }
];
