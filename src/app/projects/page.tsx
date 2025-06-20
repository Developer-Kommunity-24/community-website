import { PageHeader } from "@/components/page-header"
import { ProjectCard } from "@/components/project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectsPage() {
  const ongoingProjects = [
    {
      id: "mangalore-transit",
      title: "Mangalore Transit",
      description:
        "A mobile app that provides real-time information about public transportation in Mangalore, including bus routes, timings, and crowdedness.",
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
      tags: ["Web App", "Environmental", "Next.js"],
      contributors: [
        { name: "Akshay Rao", college: "FiniteLoop", role: "Project Lead" },
        { name: "Shreya D'Souza", college: "SSOSC", role: "Frontend Developer" },
        { name: "Nikhil Kumar", college: "CoRE", role: "Backend Developer" },
      ],
      github: "https://github.com/dk24/coastal-cleanup",
      demo: "https://coastal-cleanup.dk24.org",
    },
    {
      id: "student-mentor",
      title: "Student-Mentor Connect",
      description:
        "A platform connecting students with industry mentors based on their interests, career goals, and technical skills.",
      image: "/placeholder.svg",
      tags: ["Web App", "Education", "React"],
      contributors: [
        { name: "Divya Hegde", college: "SOSC", role: "Project Lead" },
        { name: "Rohan Bhat", college: "DevNation", role: "Full Stack Developer" },
        { name: "Suhas K", college: "Sceptix", role: "UI/UX Designer" },
      ],
      github: "https://github.com/dk24/student-mentor",
      demo: "https://mentor-connect.dk24.org",
    },
  ]

  const completedProjects = [
    {
      id: "college-events",
      title: "College Events Aggregator",
      description:
        "A centralized platform that aggregates and displays technical events from all colleges in Mangalore, helping students discover opportunities.",
      image: "/placeholder.svg",
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
    {
      id: "local-marketplace",
      title: "Local Artisans Marketplace",
      description:
        "An e-commerce platform for local artisans in Mangalore to showcase and sell their products, helping preserve traditional crafts.",
      image: "/placeholder.svg",
      tags: ["Web App", "E-commerce", "MERN Stack"],
      contributors: [
        { name: "Shreya Nayak", college: "Sceptix", role: "Project Lead" },
        { name: "Karan Shetty", college: "SOSC", role: "Frontend Developer" },
        { name: "Pooja Rao", college: "DevNation", role: "Backend Developer" },
      ],
      github: "https://github.com/dk24/local-marketplace",
      demo: "https://artisans.dk24.org",
      outcome: "Platform has onboarded 25 local artisans who have collectively made over ₹1,50,000 in sales.",
    },
  ]

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <PageHeader title="Projects" description="Explore the collaborative projects built by the DK24 community" />

      <Tabs defaultValue="ongoing" className="mt-12">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.map((project, index) => (
              <ProjectCard key={index} project={project} isCompleted />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}