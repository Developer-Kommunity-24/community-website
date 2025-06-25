import { PageHeader } from "@/components/page-header"
import { ProjectCard } from "@/components/project-card"
import { Card, CardContent } from "@/components/ui/card"
import { projects } from "@/constants/projects"
import Image from "next/image"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <PageHeader
        title="Projects"
        description="Explore the collaborative projects built by the DK24 community"
      />

      <h2 className="text-2xl font-bold mt-12 mb-4">Ongoing Projects</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <Card className="overflow-hidden flex flex-col h-full col-span-full lg:col-span-3">
            <div className="relative h-48 w-full bg-muted flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt="No projects"
                fill
                className="object-cover opacity-60"
                style={{ zIndex: 0 }}
              />
              <div className="absolute inset-0 bg-muted/60" />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-2 text-center">
                No ongoing projects
              </h3>
              <p className="text-muted-foreground text-center">
                Projects will appear here once they are added by the community.
              </p>
            </CardContent>
          </Card>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        )}
      </div>
    </div>
  )
}
