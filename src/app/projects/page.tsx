import { PageHeader } from "@/components/page-header"
import { Project, ProjectCard } from "@/components/project-card"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundPattern } from "@/components/background-pattern"
import Image from "next/image"

export default function ProjectsPage() {
  const ongoingProjects: Array<Project> = []
  const completedProjects: Array<Project> = []

  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
      <PageHeader title="Projects" description="Explore the collaborative projects built by the DK24 community" />

      <Tabs defaultValue="ongoing" className="mt-12">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingProjects.length === 0 ? (
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
                  <h3 className="text-xl font-semibold mb-2 text-center">No ongoing projects</h3>
                  <p className="text-muted-foreground text-center">
                    Projects will appear here once they are added by the community.
                  </p>
                </CardContent>
              </Card>
            ) : (
              ongoingProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedProjects.length === 0 ? (
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
                  <h3 className="text-xl font-semibold mb-2 text-center">No completed projects</h3>
                  <p className="text-muted-foreground text-center">
                    Projects will appear here once they are added by the community.
                  </p>
                </CardContent>
              </Card>
            ) : (
              completedProjects.map((project, index) => (
                <ProjectCard key={index} project={project} isCompleted />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </BackgroundPattern>
  )
}