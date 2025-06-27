import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  isCompleted?: boolean
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6 flex-1">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, i) => (
            <Badge key={i} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-2">Contributors:</h4>
          <ul className="space-y-1">
            {project.contributors.map((contributor, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{contributor.name}</span>
                {contributor.company && (
                  <span className="text-muted-foreground">
                    {" "}
                    - {contributor.role}, {contributor.company}
                  </span>
                )}
                {contributor.college && (
                  <span className="text-muted-foreground">
                    {" "}
                    - {contributor.college}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-between">
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              Code
            </Link>
          </Button>
        )}
        <Button size="sm" asChild className="ml-auto">
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
