export const siteConfig = {
  name: "DK24",
  tagline: "We are connecting college tech communities to learn and build together in public.",
  description:
    "DK24 is a community initiative connecting college tech communities in Mangalore to learn and build together in public.",
  url: "https://dk24.org",

  // Vision and mission
  vision:
    "DK24 is not a replacement for existing college communities, it's a medium for the college communities to interact in a larger scale with other existing communities in other colleges.",
  visionDetail:
    "Reason, as an independent college community, we are just small pockets of resources spread over various places, we can utilize the maximum power when there is sharing of resources and knowledge in between these pockets, and DK24 is the bridge connecting all of them together.",
  mission:
    "The core and the ultimate purpose of DK24 is to foster the learning and building environment among our peers and juniors, where we aim toward project-based learning, which will give rise to the next generation of engineers and tech entrepreneurs.",

  // Long-term goal
  goal: "Our goal is to have a tech ecosystem in Mangalore in the next 10 years, where we will be having a diverse network, that any student who has an idea or the spark to do something, will have the best resource he/she can access in the city.",

  // TEAM structure
  teamStructure: {
    techie: {
      letter: "T",
      title: "Techie",
      years: "1st & 2nd year",
      description:
        "Any number as far as there is supervision. Can possibly be all the members who are there in the college community. Have to prove themselves to get in the community, can be seen by active participation or the work they are doing in their respective campus. Under triage, and supervision.",
      responsibilities: [
        "Learn fundamental technologies and concepts",
        "Contribute to community projects under guidance",
        "Participate in hackathons and coding challenges",
        "Prove themselves through active participation",
      ],
    },
    explorer: {
      letter: "E",
      title: "Explorer",
      years: "2nd & 3rd year",
      description:
        "4 in an institution. Keep on making meaningful contributions to tech and OSS. People who have proved themselves and are constantly doing awesome work in OSS or their college events. The selection of explorers will be done by the advisor of that college and the mentors. Supervise the techies under triage.",
      responsibilities: [
        "Make meaningful contributions to tech and OSS",
        "Lead small to medium-sized projects",
        "Supervise techies under triage",
        "Conduct workshops and knowledge-sharing sessions",
      ],
    },
    advisor: {
      letter: "A",
      title: "Advisor",
      years: "4th year",
      description:
        "2 in an institution (Most likely the college community leader). Keep on making meaningful contributions to tech and OSS. Keep in touch with the techies and explorers. These are the people who are in really good touch with the college, and other companies, and can do the administrative level of works.",
      responsibilities: [
        "Maintain constant flow of explorers and techies in the campus",
        "Set promotion metrics in discussion with Mentors and Explorers",
        "Supervise the explorers",
        "Handle administrative work and connections with companies",
      ],
    },
    mentor: {
      letter: "M",
      title: "Mentor",
      years: "Alumni",
      description:
        "Number will increase as the year passes. Keep on making meaningful contributions to tech and OSS. The advisor after they pass-on their responsibilities to the next upcoming advisor. They will be in the network with all others, and will be making meaningful contributions by the means of support or funds or mentorship to the current TEAM in the college.",
      responsibilities: [
        "Provide mentorship to the current TEAM",
        "Offer support through knowledge, funds, or connections",
        "Make meaningful contributions to tech and OSS",
        "Be accessible to everyone in the network regardless of college",
      ],
    },
  },

  // Founding college communities
  colleges: [
    {
      name: "Sahyadri Open Source Community (SOSC)",
      college: "Sahyadri College of Engineering & Management",
      description:
        "A student-driven open source community focused on promoting open source culture and fostering technical growth through workshops, events, and projects.",
      logo: "/images/colleges/sosc-logo.svg",
      representatives: [{ name: "Suhan Acharya", role: "Community Lead", email: "suhan@sosc.org.in" }],
      website: "https://sosc.org.in",
    },
    {
      name: "DevNation",
      college: "A J Institute of Engineering and Technology",
      description:
        "A community of developers working on innovative projects and organizing technical events to enhance coding skills and promote collaboration.",
      logo: "/images/colleges/devnation-logo.svg",
      representatives: [{ name: "Rakshith Shetty", role: "Community Lead", email: "rakshith@devnation.org" }],
      website: "https://devnation.org",
    },
    {
      name: "FiniteLoop",
      college: "Nitte engineering (NMAIT)",
      description:
        "A coding community focused on algorithmic problem solving, competitive programming, and building practical applications.",
      logo: "/images/colleges/finiteloop-logo.svg",
      representatives: [{ name: "Priya Sharma", role: "Community Lead", email: "priya@finiteloop.club" }],
      website: "https://finiteloop.club",
    },
    {
      name: "Sceptix",
      college: "St. Joseph College of Engineering and Technology",
      description:
        "A technical club that organizes workshops, hackathons, and technical competitions to enhance students' technical skills.",
      logo: "/images/colleges/sceptix-logo.svg",
      representatives: [{ name: "Aditya Nayak", role: "Community Lead", email: "aditya@sceptix.org" }],
      website: "https://sceptix.org",
    },
    {
      name: "SSOSC",
      college: "Srinivas Institute of Engineering and Technology",
      description:
        "A student-run open source community that promotes open source contribution and technical skill development.",
      logo: "/images/colleges/ssosc-logo.svg",
      representatives: [{ name: "Karthik Rao", role: "Community Lead", email: "karthik@ssosc.in" }],
      website: "https://ssosc.in",
    },
    {
      name: "CoRE",
      college: "Vivekananda College of Engineering and Technology",
      description:
        "Community of Research and Engineering that focuses on research-oriented projects and technical skill enhancement.",
      logo: "/images/colleges/core-logo.svg",
      representatives: [{ name: "Nikhil Kumar", role: "Community Lead", email: "nikhil@core-cec.org" }],
      website: "https://core-cec.org",
    },
  ],

  // Events
  events: {
    upcoming: [
      {
        id: "summit-2024",
        title: "DK24 Summit 2024",
        date: "November 8, 2024",
        time: "9:00 AM - 5:00 PM",
        location: "Sahyadri College of Engineering & Management",
        description:
          "The annual summit bringing together all member communities to showcase projects, share learnings, and plan for the upcoming year. Hosted by Sahyadri Open Source Community.",
        registrationLink: "/events/register/summit-2024",
      },
      {
        id: "summit-2025",
        title: "DK24 Summit 2025",
        date: "April 12, 2025",
        time: "9:00 AM - 5:00 PM",
        location: "AJ Institute of Technology",
        description: "The second annual summit of DK24, hosted by DevNation at AJ Institute of Technology.",
        registrationLink: "/events/register/summit-2025",
      },
    ],
    past: [
      {
        id: "summit-2023",
        title: "DK24 Summit 2023",
        date: "December 15, 2023",
        location: "Sahyadri College of Engineering & Management",
        description:
          "The inaugural summit that brought together tech communities from 6 colleges across Mangalore to establish DK24 and set the vision for the future.",
        images: ["/images/events/summit-2023-1.jpg", "/images/events/summit-2023-2.jpg"],
        outcomes: [
          "Established the TEAM model for community structure",
          "Identified 3 collaborative projects to work on",
          "Created a roadmap for the first year of DK24",
        ],
      },
    ],
  },

  // Projects
  projects: {
    ongoing: [
      {
        id: "mangalore-transit",
        title: "Mangalore Transit",
        description:
          "A mobile app that provides real-time information about public transportation in Mangalore, including bus routes, timings, and crowdedness.",
        image: "/images/projects/mangalore-transit.jpg",
        tags: ["Mobile App", "Public Service", "React Native"],
        contributors: [
          { name: "Rahul Sharma", college: "SOSC", role: "Project Lead" },
          { name: "Priya Nayak", college: "Sceptix", role: "Backend Developer" },
          { name: "Karthik M", college: "DevNation", role: "UI/UX Designer" },
        ],
        github: "https://github.com/dk24/mangalore-transit",
        demo: "https://mangalore-transit.dk24.org",
      },
      {
        id: "coastal-cleanup",
        title: "Coastal Cleanup Tracker",
        description:
          "A platform to organize and track beach cleanup activities along the Mangalore coast, with features for volunteer management and impact visualization.",
        image: "/images/projects/coastal-cleanup.jpg",
        tags: ["Web App", "Environmental", "Next.js"],
        contributors: [
          { name: "Akshay Rao", college: "FiniteLoop", role: "Project Lead" },
          { name: "Shreya D'Souza", college: "SSOSC", role: "Frontend Developer" },
          { name: "Nikhil Kumar", college: "CoRE", role: "Backend Developer" },
        ],
        github: "https://github.com/dk24/coastal-cleanup",
        demo: "https://coastal-cleanup.dk24.org",
      },
    ],
    completed: [
      {
        id: "college-events",
        title: "College Events Aggregator",
        description:
          "A centralized platform that aggregates and displays technical events from all colleges in Mangalore, helping students discover opportunities.",
        image: "/images/projects/college-events.jpg",
        tags: ["Web App", "Community", "Vue.js"],
        contributors: [
          { name: "Varun Shenoy", college: "SOSC", role: "Project Lead" },
          { name: "Meghana Rao", college: "FiniteLoop", role: "Frontend Developer" },
          { name: "Arjun Kamath", college: "CoRE", role: "Backend Developer" },
        ],
        github: "https://github.com/dk24/college-events",
        demo: "https://events.dk24.org",
        outcome:
          "Platform has aggregated over 200 events and helped 1000+ students discover technical events across colleges.",
      },
    ],
  },

  // Testimonials
  testimonials: [
    {
      quote:
        "Being part of DK24 has completely transformed my college experience. I've made connections across different colleges and worked on projects I never thought I could.",
      name: "Rahul Sharma",
      role: "Explorer, SOSC",
      avatar: "/images/testimonials/rahul.jpg",
    },
    {
      quote:
        "As a mentor, it's incredibly rewarding to see students from different colleges collaborate and build amazing projects. DK24 is creating the tech ecosystem that Mangalore has needed for years.",
      name: "Priya Nayak",
      role: "Mentor, DevNation Alumni",
      avatar: "/images/testimonials/priya.jpg",
    },
    {
      quote:
        "The TEAM model has given me a clear path for growth. Starting as a Techie and now as an Explorer, I've learned so much from peers across different colleges.",
      name: "Akshay Rao",
      role: "Explorer, FiniteLoop",
      avatar: "/images/testimonials/akshay.jpg",
    },
  ],

  // Social media links
  social: {
    twitter: "https://twitter.com/dk24community",
    github: "https://github.com/dk24",
    linkedin: "https://linkedin.com/company/dk24community",
    instagram: "https://instagram.com/dk24community",
  },
}

