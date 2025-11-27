import { BackgroundPattern } from "@/components/background-pattern";
import { PageHeader } from "@/components/page-header";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/constants/projects";

export default function ProjectsPage() {
  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <PageHeader
          title="Projects"
          description="Explore the collaborative projects built by the DK24 community"
        />

        <ProjectList initialProjects={projects} />
      </div>
    </BackgroundPattern>
  );
}
