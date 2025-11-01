import { Calendar, Clock, MapPin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  images?: string[];
  outcomes?: string[];
  registrationLink?: string;
  time?: string;
  youtubeLink?: string;
}

export interface EventCardProps {
  event: Event;
  isUpcoming?: boolean;
}

export function EventCard({ event, isUpcoming }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 border-green-100/50 dark:border-green-800/50 bg-gradient-to-b from-white to-green-50/30 dark:from-background dark:to-green-950/20">
      {!isUpcoming && event?.images && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.images[0] || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">
          {event?.title}
        </h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-start group">
            <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/40 mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
              <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {event?.date}
            </span>
          </div>
          {event?.time && (
            <div className="flex items-start group">
              <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/40 mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
                <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {event?.time}
              </span>
            </div>
          )}
          <div className="flex items-start group">
            <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/40 mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {event?.location}
            </span>
          </div>
          {event.youtubeLink ? (
            <Link
              href={event.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start group"
            >
              <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/40 mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-800/60 transition-colors">
                <Youtube className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Watch Recording
              </span>
            </Link>
          ) : (
            <div className="flex items-start group cursor-not-allowed">
              <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900/40 mr-3">
                <Youtube className="h-4 w-4 text-gray-400 dark:text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-400 dark:text-gray-600">
                No Recording
              </span>
            </div>
          )}
        </div>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {event?.description}
        </p>

        {!isUpcoming && event?.outcomes && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 rounded-lg border border-green-100 dark:border-green-800/50">
            <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              Outcomes
            </h4>
            <ul className="space-y-2">
              {event?.outcomes.map((outcome, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-3 mt-2 flex-shrink-0"></div>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>

      {isUpcoming && event?.registrationLink && (
        <CardFooter className="p-6 pt-0">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white transition-colors duration-200 shadow-md hover:shadow-lg"
            asChild
          >
            <Link href={event.registrationLink}>Register Now</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
