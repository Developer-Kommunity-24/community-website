import { Calendar, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

import type { Event } from "@/types";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  event: Event;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const eventDate = new Date(event.startDateTime);

  return (
    <Card
      className={cn(
        "overflow-hidden h-full border-green-100/50 dark:border-green-800/50 bg-linear-to-b from-white to-green-50/30 dark:from-background dark:to-green-950/20",
        className,
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
            {event?.title}
          </h3>
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm w-16">
            <div className="flex h-6 w-full items-center justify-center rounded-t-lg bg-primary text-center text-xs font-semibold text-primary-foreground">
              {format(eventDate, "MMM").toUpperCase()}
            </div>
            <div className="flex w-full items-center justify-center text-lg font-bold p-1">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="space-y-3 mb-4 px-6">
          {event?.time && (
            <div className="flex items-start group flex-nowrap">
              <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/40 mr-3">
                <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {event?.time}
              </span>
            </div>
          )}
          <div className="flex items-start group">
            <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/40 mr-3">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {event?.location}
            </span>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed px-6 pb-6">
          {event?.description}
        </p>
      </div>
    </Card>
  );
}
