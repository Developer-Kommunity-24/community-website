import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  isCompleted?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group">
      <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
        {/* Top Accent - consistent with vision cards */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

        {/* Image Section */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 overflow-hidden flex items-center justify-center p-4">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-101 p-3 transition-transform duration-500"
          />
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="relative px-6 py-4 flex-1">
          {/* Project Title */}
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {project?.contributors && project.contributors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contributors
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.contributors.map((contributor, i) => (
                  <div
                    key={i}
                    className="group/contributor relative"
                  >
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-green-50/50 to-green-100/30 dark:from-green-950/30 dark:to-green-900/20 text-green-700 dark:text-green-300 border-green-200/60 dark:border-green-800/50 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-sm hover:shadow-green-500/10 text-xs font-medium px-3 py-1"
                    >
                      <span className="relative">
                        {contributor.name}
                        {contributor.company && (
                          <span className="ml-1.5 text-[10px] text-green-600/70 dark:text-green-400/70">
                            · {contributor.company}
                          </span>
                        )}
                      </span>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}  
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0 flex justify-between gap-3">
          {project.github && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
              asChild
            >
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                Github
              </Link>
            </Button>
          )}
          {project.link && (
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400"
              asChild
            >
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
        </CardFooter>

        {/* Subtle Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
      </Card>
    </div>
  );
}
