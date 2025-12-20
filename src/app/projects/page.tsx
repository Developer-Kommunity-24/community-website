import { BackgroundPattern } from "@/components/background-pattern";
import { PageHeader } from "@/components/page-header";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/constants/projects";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Projects",
  description:
    "Explore the collaborative projects built by the DK24 community. Discover open-source initiatives, student projects, and innovative solutions created by Mangalore's tech enthusiasts.",
  path: "/projects",
});

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
