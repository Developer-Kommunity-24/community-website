"use client";

import { useState, useMemo, useEffect } from "react";
import { Github, ExternalLink, SearchX } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProjectFilters } from "@/components/project-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Project } from "@/types/project";

interface ProjectListProps {
  initialProjects: Project[];
}

const ITEMS_PER_PAGE = 9;

const SKELETON_CARDS = [
  {
    title: "No projects found",
    description:
      "Try adjusting your filters or clearing the tech stack selection to discover more projects.",
    tags: ["All Types", "Tech Stack", "Open Source"],
    contributors: ["Contributor 1", "Contributor 2"],
  },
  {
    title: "Nothing matches your filters",
    description:
      "There are no projects matching your current filter criteria. Try broadening your search.",
    tags: ["Frontend", "Backend", "Fullstack"],
    contributors: ["Member A", "Member B"],
  },
  {
    title: "Explore all projects",
    description:
      "Reset your filters to see all available community projects across every category and tech stack.",
    tags: ["React", "Next.js", "TypeScript"],
    contributors: ["Dev 1", "Dev 2"],
  },
];

function ProjectCardSkeleton({
  title,
  description,
  tags,
  contributors,
}: {
  title: string;
  description: string;
  tags: string[];
  contributors: string[];
}) {
  return (
    <div className="group">
      <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40" />

        {/* Image Section */}
        <div className="relative aspect-video w-full bg-linear-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 overflow-hidden flex flex-col items-center justify-center gap-2 p-4">
          <div className="absolute inset-0 bg-muted/40 dark:bg-muted/20 animate-pulse" />
          <SearchX className="relative z-10 h-10 w-10 text-green-300 dark:text-green-700" />
          <p className="relative z-10 text-xs font-medium text-green-400 dark:text-green-600 tracking-wide uppercase">
            No results
          </p>
        </div>

        <CardContent className="relative px-6 py-4 flex-1">
          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 text-gray-400 dark:text-gray-600">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 dark:text-gray-600 leading-relaxed mb-4 text-sm line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-400 dark:text-green-700 border border-green-200/60 dark:border-green-800/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contributors */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-300 dark:text-gray-700 uppercase tracking-wider">
              Contributors
            </h4>
            <div className="flex flex-wrap gap-2">
              {contributors.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50/50 dark:bg-green-950/20 text-green-400 dark:text-green-700 border border-green-200/40 dark:border-green-800/30"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0 flex justify-between gap-3">
          <button
            type="button"
            disabled
            className="flex-1 h-9 flex items-center justify-center gap-2 rounded-md border border-green-200/50 dark:border-green-800/40 text-green-400 dark:text-green-700 text-sm cursor-not-allowed bg-transparent"
          >
            <Github className="h-4 w-4" />
            GitHub
          </button>
          <button
            type="button"
            disabled
            className="flex-1 h-9 flex items-center justify-center gap-2 rounded-md bg-green-100/50 dark:bg-green-900/10 text-green-400 dark:text-green-700 text-sm cursor-not-allowed"
          >
            <ExternalLink className="h-4 w-4" />
            Visit Project
          </button>
        </CardFooter>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-300/50 to-transparent" />
      </Card>
    </div>
  );
}

export function ProjectList({ initialProjects }: ProjectListProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesType =
        selectedType === "all" || project.categories.includes(selectedType);

      const matchesTechStack =
        selectedTechStack.length === 0 ||
        selectedTechStack.every((tech) => project.tags.includes(tech));

      return matchesType && matchesTechStack;
    });
  }, [initialProjects, selectedType, selectedTechStack]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="mt-8 bg-background min-h-screen">
      <ProjectFilters
        projects={initialProjects}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedTechStack={selectedTechStack}
        setSelectedTechStack={setSelectedTechStack}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedProjects.length === 0
          ? SKELETON_CARDS.map((card, i) => (
              <ProjectCardSkeleton
                key={i}
                title={card.title}
                description={card.description}
                tags={card.tags}
                contributors={card.contributors}
              />
            ))
          : paginatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isCompleted />
            ))}
      </div>

      {filteredProjects.length > ITEMS_PER_PAGE && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage((p) => p - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
