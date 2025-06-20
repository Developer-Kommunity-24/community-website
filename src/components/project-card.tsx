import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    tags: string[]
    contributors: {
      name: string
      college: string
      role: string
    }[]
    github: string
    demo: string
    outcome?: string
  }
  isCompleted?: boolean
}

export function ProjectCard({ project, isCompleted }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
      </div>
      <CardContent className="p-6 flex-1">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
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
                <span className="text-muted-foreground">
                  {" "}
                  - {contributor.role}, {contributor.college}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {isCompleted && project.outcome && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Outcome:</h4>
            <p className="text-sm text-muted-foreground">{project.outcome}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            Code
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}