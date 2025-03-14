import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    location: string
    description: string
    images?: string[]
    outcomes?: string[]
    registrationLink?: string
    time?: string
  }
  isUpcoming?: boolean
}

export function EventCard({ event, isUpcoming }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      {!isUpcoming && event.images && (
        <div className="relative h-48 w-full">
          <Image src={event.images[0] || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{event.date}</span>
          </div>
          {event.time && (
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">{event.description}</p>

        {!isUpcoming && event.outcomes && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Outcomes:</h4>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              {event.outcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      {isUpcoming && event.registrationLink && (
        <CardFooter className="p-6 pt-0">
          <Button className="w-full" asChild>
            <Link href={event.registrationLink}>Register Now</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

