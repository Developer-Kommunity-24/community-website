import { PageHeader } from "@/components/page-header"
import { TeamStructure } from "@/components/team-structure"
import { RoleDescription } from "@/components/role-description"

export default function CommunityStructurePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Community Structure" description="Understanding the TEAM model that powers our community" />

      <div className="mt-12">
        <TeamStructure />
      </div>

      <div className="mt-16 grid gap-8">
        <h2 className="text-3xl font-bold">Role Descriptions</h2>

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

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Progression Path</h2>
        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">How to Progress Through the Ranks</h3>
          <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
            <li>
              <strong>Techie to Explorer:</strong> Demonstrate consistent participation in community activities,
              complete fundamental learning paths, and contribute to at least 2-3 community projects.
            </li>
            <li>
              <strong>Explorer to Advisor:</strong> Successfully lead at least one significant project, mentor multiple
              Techies, and develop expertise in a specific technology area.
            </li>
            <li>
              <strong>Advisor to Mentor:</strong> Graduate and gain industry experience, maintain connection with the
              community, and commit to supporting the next generation of tech talent.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

