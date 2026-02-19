"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TiltSpotlight } from "@/components/ui/tilt-spotlight";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TiltSpotlight>
      <Link href={`/projects/${project.id}`} className="block h-full">
        <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-shadow duration-300">

          {/* Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300 z-10" />

          {/* Image */}
          <div className="relative aspect-video w-full bg-linear-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 overflow-hidden flex items-center justify-center p-4">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover p-3 transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardContent className="relative px-6 py-4 flex-1">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 4 && (
                <Badge
                  variant="secondary"
                  className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                >
                  +{project.tags.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>

          {/* Fixed Footer (No nested anchor) */}
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between gap-3">
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.github, "_blank");
                }}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            )}

            {project.link && (
              <Button
                size="sm"
                className="flex-1 bg-linear-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.link, "_blank");
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Project
              </Button>
            )}
          </CardFooter>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
        </Card>
      </Link>
    </TiltSpotlight>
  );
}
