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
  {
    id: "the-web-in-3-dimensions",
    title: "The Web in Three Dimensions",
    date: "October 19, 2025",
    time: "7:00 PM IST",
    location: "Google Meet",
    description:
      "This session provided an introduction to Three.js, a JavaScript library for creating 3D graphics on the web. We explored how modern browsers render 3D scenes and how developers can build interactive visual experiences. Key topics included accessing the GPU with WebGL and the upcoming WebGPU API, fundamental Three.js concepts like scenes, cameras, lights, meshes, and animations, and building interactive 3D web experiences. We also took a quick look at React Three Fiber (R3F) for creating 3D scenes with React components. The session was open to students, developers, and tech enthusiasts.",
    registrationLink: "https://forms.gle/iUxCeN9U4QTmccX26",
    youtubeLink: "",
    joinLink: "https://meet.google.com/cxj-vzoe-fbu",
    icon: "calendar",
    highlight: false,
  },
  {
    id: "devops",
    title: "DevOps",
    date: "Novermber 1, 2025",
    time: "7:30 PM IST",
    location: "Google Meet",
    description:
      "Join us on November 1 for an engaging session on DevOps, a modern approach that bridges software development and IT operations to deliver faster, more reliable applications. Discover how collaboration, automation, and continuous integration/deployment drive innovation in today’s tech landscape. The session will cover the DevOps lifecycle — from planning and coding to deployment and monitoring — along with popular tools like Git, Jenkins, Docker, Kubernetes, and GitHub Actions. Don’t miss a live demonstration of a simple CI/CD pipeline that shows how code changes automatically trigger testing and deployment, ensuring seamless software delivery!",
    registrationLink: "https://forms.gle/FKKth4CAguLR6n6w6",
    youtubeLink: "",
    joinLink: "https://meet.google.com/gkg-pgiu-rjk",
    icon: "calendar",
    highlight: false,
  },
];
