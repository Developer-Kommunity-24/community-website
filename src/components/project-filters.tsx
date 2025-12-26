"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ProjectFiltersProps {
  projects: Project[];
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedTechStack: string[];
  setSelectedTechStack: (stack: string[]) => void;
}

export function ProjectFilters({
  projects,
  selectedType,
  setSelectedType,
  selectedTechStack,
  setSelectedTechStack,
}: ProjectFiltersProps) {
  const [openTechStack, setOpenTechStack] = useState(false);

  // Extract unique project types
  const projectTypes = Array.from(
    new Set(projects.map((p) => p.type).filter(Boolean)),
  ) as string[];

  // Extract unique tech stack (tags)
  const allTechStack = Array.from(
    new Set(projects.flatMap((p) => p.tags)),
  ).sort();

  const toggleTechStack = (tech: string) => {
    setSelectedTechStack(
      selectedTechStack.includes(tech)
        ? selectedTechStack.filter((t) => t !== tech)
        : [...selectedTechStack, tech],
    );
  };

  const clearFilters = () => {
    setSelectedType("all");
    setSelectedTechStack([]);
  };

  const activeFilterCount =
    (selectedType !== "all" ? 1 : 0) + selectedTechStack.length;

  return (
    <div className="flex justify-end mb-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 relative">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">Filter Projects</h4>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Reset all
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <Popover open={openTechStack} onOpenChange={setOpenTechStack}>
                <PopoverTrigger asChild>
                  {/* biome-ignore lint/a11y/useSemanticElements: Shadcn combobox pattern uses button */}
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openTechStack}
                    className="w-full justify-between"
                  >
                    {selectedTechStack.length > 0
                      ? `${selectedTechStack.length} selected`
                      : "Select tech..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-70 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search tech stack..." />
                    <CommandList>
                      <CommandEmpty>No tech found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {allTechStack.map((tech) => (
                          <CommandItem
                            key={tech}
                            value={tech}
                            onSelect={() => toggleTechStack(tech)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedTechStack.includes(tech)
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {tech}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
