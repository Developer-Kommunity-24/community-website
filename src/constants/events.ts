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
    title: "Everything about Model Context Protocol (MCP)",
    date: "August 9, 2025",
    time: "7:30 PM IST",
    location: "Google Meet",
    description:
      "This session introduced the Model Context Protocol (MCP), an open-source standard that allows LLM-based agents to securely connect with external tools, data, and services to deliver live, structured context. We explored what MCP is, why it’s needed, and looked at real-world examples and use-cases. The discussion also covered ways to enhance coding workflows using MCP servers such as GitHub and Figma. The event was open to students, developers, and tech enthusiasts, welcoming participants without any prior experience.",
    registrationLink: "https://meet.google.com/cxj-vzoe-fbu",
    icon: "calendar",
    highlight: true,
  },
];
