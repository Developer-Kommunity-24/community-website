import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "filetailored",
    title: "FileTailored",
    description:
      "FileTailored is reimagining the file conversion space by solving the #1 pain point for companies and professionals: lack of customization and formatting accuracy in current converters.",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "FastAPI",
      "Google Analytics",
      "Firebase",
    ],
    image: "/projects/filetailored.png?height=50&width=100",
    contributors: [
      {
        name: "Nuhayd Shaik",
        company: "FileTailored",
        role: "Chief Operations Officer",
      },
    ],
    github: "",
    link: "https://filetailored.com",
  },
  {
    id: "daily-dine",
    title: "Daily Dine",
    description:
      "Daily Dine's real-time reservation app reduces restaurant wait times, streamlines dining, and improves customer satisfaction by enabling efficient table pre-booking and crowd management.",
    tags: ["Flutter", "Django", "PostgreSQL"],
    image: "/projects/daily-dine.png?height=200&width=400",
    contributors: [
      {
        name: "Nikhil Bajantri",
        college: "Srinivas Institute of Technology",
      },
    ],
    github: "",
    link: "https://filetailored.com",
  },
  {
    id: "evma",
    title: "EVMA",
    description:
      "A self-hostable test platform for competitive programming and assessments with MCQs, coding questions, and customizable features for evaluation and monitoring.",
    tags: ["Flutter", "Django", "PostgreSQL"],
    image: "",
    github: "https://github.com/so-sc/scem-evMan",
    contributors: [],
    link: "",
  },
];
