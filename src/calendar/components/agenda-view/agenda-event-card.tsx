"use client";

import { differenceInDays, format, parseISO } from "date-fns";
import { Clock, MapPin } from "lucide-react";

import { EventDetailsDialog } from "@/calendar/components/dialogs/event-details-dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { IEvent } from "@/calendar/interfaces";
import { cn, sanitizeTag } from "@/lib/utils";

interface IProps {
  event: IEvent;
}

export function AgendaEventCard({ event }: IProps) {
  const startDate = parseISO(event.startDateTime);
  const endDate = parseISO(event.endDateTime);

  const startMonth = format(startDate, "MMM");
  const startDay = format(startDate, "d");
  const endDay = format(endDate, "d");
  const isSameMonth = startDate.getMonth() === endDate.getMonth();
  const dateRange =
    startDate.toDateString() === endDate.toDateString()
      ? startDay
      : `${startDay}-${isSameMonth ? endDay : format(endDate, "MMM d")}`;

  const durationInDays = differenceInDays(endDate, startDate) + 1;

  return (
    <EventDetailsDialog event={event}>
      <Card
        className={cn(
          "group relative flex cursor-pointer overflow-hidden border transition-all hover:shadow-md hover:border-primary/50",
          "hover:bg-accent/5",
        )}
      >
        <div className="flex w-full flex-row">
          {/* Date Badge Section */}
          <div className="flex w-24 flex-col items-center justify-center border-r bg-muted/30 p-4 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {startMonth}
            </span>
            <span className="text-xl font-bold text-foreground">
              {dateRange}
            </span>
            <span className="mt-1 text-[10px] font-medium text-muted-foreground">
              {durationInDays > 1 ? `${durationInDays} Days` : "1 Day"}
            </span>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-between p-4 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex flex-col gap-2">
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                {event.organizationName && (
                  <p className="text-sm text-muted-foreground">
                    by {event.organizationName}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  <span>{event.location}</span>
                </div>
                {/* Separator for desktop */}
                <Separator
                  orientation="vertical"
                  className="hidden h-3 sm:block"
                />
                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={String(tag)}
                        variant="secondary"
                        className="h-5 px-1.5 text-[10px] font-normal"
                      >
                        {sanitizeTag(tag)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Time */}
            <div className="mt-4 flex items-center justify-end gap-1.5 text-sm font-medium text-primary sm:mt-0 sm:flex-col sm:items-end sm:justify-start sm:gap-0">
              <Clock className="size-4 sm:hidden" />
              <span>{format(startDate, "h:mm a")}</span>
            </div>
          </div>
        </div>
      </Card>
    </EventDetailsDialog>
  );
}
