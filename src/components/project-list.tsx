"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchX } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { Card } from "@/components/ui/card";
import { ProjectFilters } from "@/components/project-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EMPTY_STATE_TAGS } from "@/constants/project.constants";
import type { Project } from "@/types/project";

interface ProjectListProps {
  initialProjects: Project[];
}

const ITEMS_PER_PAGE = 9;

function NoProjectsCard() {
  return (
    <div className="col-span-full">
      <Card
        className="relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg"
        style={{ minHeight: "420px" }}
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40" />

        <div className="flex flex-col items-center justify-center h-full py-16 px-8 gap-6">
          {/* Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-xl" />
            <SearchX className="relative z-10 h-16 w-16 text-green-300 dark:text-green-700" />
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-gray-400 dark:text-gray-500">
              No projects found
            </h3>
            <p className="text-gray-400 dark:text-gray-600 text-sm max-w-md leading-relaxed">
              Try adjusting your filters or clearing the tech stack selection to
              discover more projects.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {EMPTY_STATE_TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-400 dark:text-green-700 border border-green-200/60 dark:border-green-800/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

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
        {paginatedProjects.length === 0 ? (
          <NoProjectsCard />
        ) : (
          paginatedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isCompleted />
          ))
        )}
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
