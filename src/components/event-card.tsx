import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

import type { Event } from "@/types";

export interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="block hover:no-underline">
      <Card className="overflow-hidden h-full hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 border-green-100/50 dark:border-green-800/50 bg-gradient-to-b from-white to-green-50/30 dark:from-background dark:to-green-950/20">
        <div className="p-6">
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
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {event?.description}
          </p>
        </div>
      </Card>
    </Link>
  );
}
