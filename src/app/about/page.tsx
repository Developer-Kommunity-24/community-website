import { PageHeader } from "@/components/page-header"
import { Timeline } from "@/components/timeline"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 md:px-12 lg:px-24">
      <PageHeader
        title="About DK24"
        description="Learn about our vision, mission, and journey to connect college tech communities"
      />

      <div className="grid gap-16 mt-16">
        <section>
          <h2 className="text-3xl font-bold mb-8">Our Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Vision</h3>
              <p className="text-muted-foreground">
                To create a thriving tech ecosystem in Mangalore where students with ideas can access the best resources
                in the city, fostering innovation and collaboration across college boundaries.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Mission</h3>
              <p className="text-muted-foreground">
                We connect college tech communities to learn and build together in public, breaking down silos between
                institutions and creating a unified tech community that empowers students to grow through collaborative
                projects and knowledge sharing.
              </p>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Long-term Goals</h2>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">10-Year Tech Ecosystem Vision</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Establish Mangalore as a recognized tech hub in India</li>
              <li>Create pathways for students to transition from education to industry</li>
              <li>Foster 100+ open-source projects with real-world impact</li>
              <li>Build a mentor network of 500+ industry professionals</li>
              <li>Develop a self-sustaining community model that can be replicated in other regions</li>
            </ul>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Core Values & Principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Collaboration",
                description: "Breaking down barriers between colleges to work together",
              },
              {
                title: "Learning in Public",
                description: "Sharing knowledge and experiences openly for collective growth",
              },
              {
                title: "Building Real Solutions",
                description: "Creating projects that solve actual problems in society",
              },
              {
                title: "Community First",
                description: "Prioritizing the growth and well-being of our community members",
              },
            ].map((value, index) => (
              <Card key={index} className="p-4">
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
          <Timeline />
        </section>
      </div>
    </div>
  )
}