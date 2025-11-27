"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectFilters } from "@/components/project-filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Project } from "@/types";

interface ProjectListProps {
  initialProjects: Project[];
}

const ITEMS_PER_PAGE = 9;

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
        selectedType === "all" || project.type === selectedType;

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
    <div className="mt-8">
      <ProjectFilters
        projects={initialProjects}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedTechStack={selectedTechStack}
        setSelectedTechStack={setSelectedTechStack}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedProjects.length === 0 ? (
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
                No projects found
              </h3>
              <p className="text-muted-foreground text-center">
                Try adjusting your filters to see more results.
              </p>
            </CardContent>
          </Card>
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
