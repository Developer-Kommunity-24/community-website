"use client";

import { format, parseISO } from "date-fns";
import { Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { IEvent } from "@/calendar/interfaces";
import { cn, sanitizeTag } from "@/lib/utils";
import { useCalendar } from "@/calendar/contexts/calendar-context";

interface IProps {
  event: IEvent;
  className?: string;
}

export function AgendaEventCard({ event, className }: IProps) {
  const { setSelectedEventId } = useCalendar();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setSelectedEventId(event.id);
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: This div acts as a button for event selection.
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "group relative flex cursor-pointer overflow-hidden border transition-all hover:shadow-md hover:border-primary/50",
        "hover:bg-accent/5 rounded-lg",
        className,
      )}
      onClick={() => setSelectedEventId(event.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="flex w-full flex-row">
        {/* Date Badge Section */}
        <div className="h-full flex justify-center items-center">
          <div className="m-1 flex w-24 h-24 flex-col items-center justify-center bg-background text-center rounded-lg border overflow-hidden">
            <span className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground">
              {startMonth}
            </span>
            <span className="flex w-full items-center justify-center text-xl font-bold text-foreground p-2">
              {dateRange}
            </span>
          </div>
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
            <span className="whitespace-nowrap">
              {format(startDate, "h:mm a")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
