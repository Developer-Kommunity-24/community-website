import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/constants/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

// biome-ignore lint/suspicious/noExplicitAny: params type is dynamic and handled by Next.js routing
export async function generateMetadata({ params }: { params: any }) {
  const { id } = await Promise.resolve(params);
  const project = projects.find((p) => p.id === id);

  if (!project) return {};

  const ogImage = project.image || "/logo.png";

  return {
    metadataBase: new URL("https://dk24.org"),
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - DK24 Project`,
        },
      ],
      type: "website",
      siteName: "DK24",
      url: `/projects/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImage],
      creator: "@dk24community",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: params type is dynamic and handled by Next.js routing
  params: any;
}) {
  const resolvedParams = await Promise.resolve(params);
  const projectId = resolvedParams.id;

  if (!projectId || typeof projectId !== "string") {
    notFound();
  }

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Project Image */}
        {project.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Project Details */}
        <div className={project.image ? "" : "md:col-span-2"}>
          {
            /* Project Type */
            project.type && (
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{project.type}</Badge>
              </div>
            )
          }

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

          <p className="text-lg text-muted-foreground mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-8">
            {project.link && (
              <Button asChild>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Project
                </Link>
              </Button>
            )}
            {project.github && (
              <Button asChild variant="outline">
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Link>
              </Button>
            )}
          </div>
        </div>
        {/* Contributors - placed below image and full-width */}
        {project.contributors && project.contributors.length > 0 && (
          <Card className="md:col-span-2">
            <CardContent className="p-6 w-full">
              <h2 className="text-xl font-semibold mb-4">Contributors</h2>
              <div className="space-y-3">
                {project.contributors.map((contributor, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-medium">{contributor.name}</span>
                    {contributor.role && (
                      <span className="text-sm text-muted-foreground">
                        {contributor.role}
                      </span>
                    )}
                    {contributor.college && (
                      <span className="text-sm text-muted-foreground">
                        {contributor.college}
                      </span>
                    )}
                    {contributor.company && (
                      <span className="text-sm text-muted-foreground">
                        {contributor.company}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
