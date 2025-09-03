import type { Event } from "@/types";

/* 
For those handling posters and recap images:
Save each poster in the public/events/posters folder, using the poster's {id} as the filename.
Save recap images in the public/events/{id} folder
*/

export const events: Event[] = [
  {
    id: "summit-2024",
    title: "DK24 Summit 2024",
    date: "November 8, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Sahyadri College of Engineering & Management",
    description:
      "The DK24 Summit 2024 united Mangaluru's foremost technical communities—SOSC, GDG SJEC, The Sceptix Club, Finite Loop Club, GLUG PACE, CORE, SSOSC, Team Challengers, DevNation, Kudla Builders, and GDG AJ—for a transformative day of collaboration, innovation, and shared vision. Students from diverse communities engaged in discussions focused on strengthening inter-community connections, supporting innovative projects, building industry partnerships, and expanding Mangaluru's influence in the tech space.",
    registrationLink: "",
    youtubeLink: "https://www.youtube.com/watch?v=SN4vZegGcts",
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
      "In this session, we explored the Model Context Protocol (MCP), an open-source standard for connecting LLM agents to external tools. Participants learned about its core concepts, understood its importance in modern development, and witnessed practical demonstrations of enhancing coding workflows with GitHub and Figma integration. The session was open to students, developers & tech enthusiasts.",
    registrationLink: "https://meet.google.com/cxj-vzoe-fbu",
    youtubeLink: "https://youtu.be/jdmF71k59Iw",
    icon: "calendar",
    highlight: true,
  },
  {
    id: "devtools-discussion-2025",
    title: "Web DevTools",
    date: "August 24, 2025",
    time: "7:30 PM IST",
    location: "Google Meet",
    description:
      "In this session, we explored how to harness the power of browser developer tools to analyze, debug, and optimize web applications for maximum performance. Participants learned what DevTools offers beyond the basics, identified key performance bottlenecks, mastered hands-on debugging & profiling techniques, and discovered best practices for building fast, responsive, and reliable web apps. The session was open to students, developers & tech enthusiasts.",
    registrationLink: "https://forms.gle/Q8VziJdxnyJLFYH5A",
    youtubeLink: "https://www.youtube.com/watch?v=7O3dfNva1xU",
    icon: "calendar",
    highlight: true,
  },
  {
    id: "n8n-discussion-2025",
    title: "Building AI workflows using n8n",
    date: "September 7, 2025",
    time: "7:30 PM IST",
    location: "Discord",
    description:
      "Join us for a hands-on session on n8n, the powerful open-source automation tool that lets you connect apps, APIs, and services with ease. In this session, you'll learn about n8n's core functionality, discover how to link websites, build automated workflows step by step, and witness practical demonstrations. The session is open to students, developers & tech enthusiasts.",
    registrationLink: "https://forms.gle/Yo7BM3QWhwBLeoDL7",
    youtubeLink: "",
    icon: "calendar",
    highlight: true,
  },
];
