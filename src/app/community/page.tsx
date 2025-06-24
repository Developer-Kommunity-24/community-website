import { PageHeader } from "@/components/page-header"
import { TeamStructure } from "@/components/team-structure"
import { RoleDescription } from "@/components/role-description"

export default function CommunityStructurePage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <PageHeader title="Community Structure" description="Understanding the TEAM model that powers our community" />

      <div className="mt-16">
        <TeamStructure />
      </div>

      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Role Descriptions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed breakdown of each role in our community structure
          </p>
        </div>

        <div className="grid gap-8">
          <RoleDescription
            role="T - Techie"
            years="1st & 2nd year students"
            description="Techies are the foundation of our community. They are eager learners who participate in workshops, contribute to projects, and develop their technical skills."
            responsibilities={[
              "Attend community events and workshops",
              "Learn fundamental technologies and concepts",
              "Contribute to community projects under guidance",
              "Participate in hackathons and coding challenges",
            ]}
          />

          <RoleDescription
            role="E - Explorer"
            years="2nd & 3rd year students"
            description="Explorers have gained some experience and are now diving deeper into specific technologies. They lead small projects and help guide Techies."
            responsibilities={[
              "Lead small to medium-sized projects",
              "Conduct workshops and knowledge-sharing sessions",
              "Mentor Techies in their learning journey",
              "Explore specialized areas of technology",
            ]}
          />

          <RoleDescription
            role="A - Advisor"
            years="4th year students"
            description="Advisors have substantial experience and provide strategic guidance to projects and initiatives. They bridge the gap between students and industry."
            responsibilities={[
              "Provide technical and strategic advice to projects",
              "Connect community members with opportunities",
              "Help organize major events and initiatives",
              "Share industry insights and best practices",
            ]}
          />

          <RoleDescription
            role="M - Mentor"
            years="Alumni"
            description="Mentors are industry professionals who provide valuable insights, connections, and guidance based on their real-world experience."
            responsibilities={[
              "Provide career guidance and industry perspectives",
              "Review and advise on major community projects",
              "Connect students with industry opportunities",
              "Share specialized knowledge through masterclasses",
            ]}
          />
        </div>
      </div>

      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Progression Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">How to advance through the community ranks</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">How to Progress Through the Ranks</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Techie to Explorer</h4>
                <p className="text-muted-foreground">
                  Demonstrate consistent participation in community activities, complete fundamental learning paths, and
                  contribute to at least 2-3 community projects.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Explorer to Advisor</h4>
                <p className="text-muted-foreground">
                  Successfully lead at least one significant project, mentor multiple Techies, and develop expertise in
                  a specific technology area.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Advisor to Mentor</h4>
                <p className="text-muted-foreground">
                  Graduate and gain industry experience, maintain connection with the community, and commit to
                  supporting the next generation of tech talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}