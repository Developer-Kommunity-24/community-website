import Link from "next/link";
import { CommunityGuideline } from "@/components/community-guideline"; // Corrected import path
import { PageHeader } from "@/components/page-header";
import { RoleDescription } from "@/components/role-description";
import { TeamStructure } from "@/components/team-structure";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Our Community Structure",
  description:
    "Discover the TEAM model that drives DK24's growth and success. Learn about the roles of Techies, Explorers, Advisors, and Mentors in our community structure.",
  path: "/structure",
});

export default function CommunityStructurePage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <PageHeader
        title="Our Community Structure"
        description="Discover the TEAM model that drives our community's growth and success."
      />

      <div className="mt-4">
        <TeamStructure />
      </div>

      <div className="mt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">
            Role Descriptions
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Each role in our community represents a step in your journey, from
            learning the basics to becoming a leader.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/** biome-ignore lint/a11y/useValidAriaRole: it's a visual card */}
          <RoleDescription
            role="T - Techie"
            years="1st & 2nd year students"
            description="Eager learners who form the foundation of our community, participating in workshops and contributing to projects to build their skills."
            responsibilities={[
              "Attend community events and workshops",
              "Learn fundamental technologies",
              "Contribute to projects with guidance",
              "Engage in coding challenges",
            ]}
          />

          {/** biome-ignore lint/a11y/useValidAriaRole: it's a visual card */}
          <RoleDescription
            role="E - Explorer"
            years="2nd & 3rd year students"
            description="Experienced members who dive deeper into technologies, lead small projects, and guide Techies on their learning path."
            responsibilities={[
              "Lead small to medium-sized projects",
              "Conduct knowledge-sharing sessions",
              "Mentor and support Techies",
              "Explore specialized tech areas",
            ]}
          />

          {/** biome-ignore lint/a11y/useValidAriaRole: it's a visual card */}
          <RoleDescription
            role="A - Advisor"
            years="4th year students"
            description="Seasoned students who provide strategic guidance, bridging the gap between academic projects and industry standards."
            responsibilities={[
              "Offer technical and strategic advice",
              "Connect members with opportunities",
              "Help organize major community events",
              "Share industry best practices",
            ]}
          />

          {/** biome-ignore lint/a11y/useValidAriaRole: it's a visual card */}
          <RoleDescription
            role="M - Mentor"
            years="Alumni & Professionals"
            description="Industry experts who provide invaluable insights, connections, and guidance based on real-world experience."
            responsibilities={[
              "Provide career and industry guidance",
              "Advise on major community projects",
              "Connect students with opportunities",
              "Share knowledge through masterclasses",
            ]}
          />
        </div>
      </div>

      <div className="mt-24">
        <CommunityGuideline />
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Join Our Thriving Community
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Whether you&apos;re just starting or looking to lead, there&apos;s a
          place for you here. Grow your skills, build your network, and make an
          impact.
        </p>
        <Link href="/join">
          <Button size="lg">Become a Member</Button>
        </Link>
      </div>
    </div>
  );
}
