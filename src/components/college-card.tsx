import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface CollegeCardProps {
  college: {
    name: string
    college: string
    description: string
    logo: string
    representatives: {
      name: string
      role: string
      email: string
    }[]
    website: string
  }
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={college.logo || "/placeholder.svg?height=100&width=100"}
            alt={college.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{college.name}</h3>
          <p className="text-sm text-muted-foreground">{college.college}</p>
        </div>
      </div>
      <CardContent className="px-6 pb-0">
        <p className="text-muted-foreground mb-4">{college.description}</p>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Representatives:</h4>
          <ul className="space-y-1">
            {college.representatives.map((rep, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{rep.name}</span> - {rep.role}
                <div className="text-sm text-muted-foreground">{rep.email}</div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-6">
        <Button variant="outline" className="w-full" asChild>
          <Link href={college.website} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Website
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}