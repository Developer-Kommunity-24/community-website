import type { Event } from "@/types";

/* 
For those handling posters and recap images:
Save each poster in the public/events/posters folder, using the poster's {id} as the filename.
Save recap images in the public/events/{id} folder with any names you prefer.
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
    joinLink: "",
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
    joinLink: "",
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
    joinLink: "",
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
      "The DK24 Consortium presented a hands-on session on building AI workflows using n8n, the open-source automation tool that seamlessly connects apps, APIs, and services. In this recorded event, viewers explored what n8n is, how it works, how to link a website to n8n, and saw a step-by-step workflow building with a live demo. This session was perfect for students, developers, and tech enthusiasts eager to automate and streamline their processes.",
    registrationLink: "https://forms.gle/Yo7BM3QWhwBLeoDL7",
    youtubeLink: "https://youtu.be/5dV6nKQXiis",
    joinLink: "https://discord.gg/qU7HCcTM?event=1412492054168207512",
    icon: "calendar",
    highlight: true,
  },
];
