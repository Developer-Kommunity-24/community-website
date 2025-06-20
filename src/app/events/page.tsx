import { PageHeader } from "@/components/page-header"
import { EventCard } from "@/components/event-card"
import { EventCalendar } from "@/components/event-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventsPage() {
  const pastEvents = [
    {
      id: "summit-2023",
      title: "DK24 Summit 2023",
      date: "December 15, 2023",
      location: "Sahyadri College of Engineering & Management",
      description:
        "The inaugural summit that brought together tech communities from 6 colleges across Mangalore to establish DK24 and set the vision for the future.",
      images: ["/placeholder.svg", "/placeholder.svg"],
      outcomes: [
        "Established the TEAM model for community structure",
        "Identified 3 collaborative projects to work on",
        "Created a roadmap for the first year of DK24",
      ],
    },
    {
      id: "hackathon-2024",
      title: "Build for Mangalore Hackathon",
      date: "February 10-11, 2024",
      location: "NMAM Institute of Technology",
      description:
        "A 36-hour hackathon focused on building solutions for local problems in Mangalore. Over 200 students from all member colleges participated.",
      images: ["/placeholder.svg", "/placeholder.svg"],
      outcomes: [
        "20 projects addressing local challenges",
        "5 projects selected for further development with mentorship",
        "Established connections with local government bodies for implementation",
      ],
    },
  ]

  const upcomingEvents = [
    {
      id: "workshop-series",
      title: "Web3 Workshop Series",
      date: "June 5-20, 2024",
      location: "Multiple Colleges",
      description:
        "A series of workshops on Web3 technologies, covering blockchain fundamentals, smart contracts, and decentralized applications.",
      registrationLink: "/events/register/workshop-series",
    },
    {
      id: "summer-code-camp",
      title: "Summer Code Camp 2024",
      date: "July 1-15, 2024",
      location: "Virtual",
      description:
        "A two-week intensive coding camp focusing on full-stack development with modern technologies. Open to all students from member colleges.",
      registrationLink: "/events/register/summer-code-camp",
    },
    {
      id: "summit-2024",
      title: "DK24 Summit 2024",
      date: "August 20, 2024",
      location: "St Joseph Engineering College",
      description:
        "The annual summit bringing together all member communities to showcase projects, share learnings, and plan for the upcoming year.",
      registrationLink: "/events/register/summit-2024",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <PageHeader title="Events" description="Discover past and upcoming events from the DK24 community" />

      <Tabs defaultValue="upcoming" className="mt-12">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} isUpcoming />
                ))}
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-2xl font-bold mb-6">Events Calendar</h2>
              <EventCalendar events={[...upcomingEvents]} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Past Events</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}