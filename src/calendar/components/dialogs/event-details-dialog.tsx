"use client";

import { format, formatDate, isPast, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  Link as LinkIcon,
  MapPin,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, sanitizeTag } from "@/lib/utils";

import type { IEvent } from "@/calendar/interfaces";
import { CalendarContext } from "@/calendar/contexts/calendar-context";

interface IProps {
  event?: IEvent;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EventDetailsDialog({
  event,
  open: propOpen,
  onOpenChange: propOnOpenChange,
}: IProps) {
  const context = React.useContext(CalendarContext);
  const [copied, setCopied] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (propOnOpenChange) {
      propOnOpenChange(newOpen);
    } else if (context?.setSelectedEventId) {
      if (!newOpen) {
        context.setSelectedEventId(undefined);
      }
    }
  };

  const isOpen = propOpen !== undefined ? propOpen : !!event;

  if (!event) return null;

  const startDateTime = parseISO(event.startDateTime);
  const endDateTime = parseISO(event.endDateTime);
  const isEventPast = isPast(endDateTime);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/calendar?date=${formatDate(
        startDateTime,
        "MMM-yyyy",
      ).toLowerCase()}&eventId=${event.id}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="p-4 max-h-[90vh] max-w-[90vw] md:max-w-7xl flex flex-col gap-4"
      >
        <div className="grid flex-1 overflow-auto w-full grid-cols-1 md:grid-cols-5 gap-6 p-4">
          {/* Left Side: Image */}
          {event.posterUrl && (
            <div className="relative h-64 w-full bg-muted/30 overflow-hidden md:col-span-2 md:h-full flex items-center justify-center p-4 rounded-lg">
              {/* Blurred Background */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-50 dark:opacity-30 scale-110"
                style={{ backgroundImage: `url(${event.posterUrl})` }}
              />
              {/* Main Image: center vertically and horizontally */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src={event.posterUrl}
                  alt={event.title}
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className="relative"
                />
              </div>
            </div>
          )}

          {/* Right Side: Details */}
          <div
            className={cn(
              "flex flex-col h-full bg-background gap-4",
              event.posterUrl ? "md:col-span-3" : "md:col-span-5",
            )}
          >
            <DialogHeader className="p-0">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-3xl font-bold leading-tight">
                      {event.title}
                    </DialogTitle>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopyUrl}
                            className="h-8 w-8"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="z-[200]">
                          <p>Click to copy event link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {copied && (
                      <span className="text-sm text-green-500">Copied!</span>
                    )}
                  </div>
                  {event.organizationName && (
                    <div className="text-lg text-muted-foreground">
                      Hosted by {event.organizationName}
                      {event.highlight && (
                        <Badge
                          variant="default"
                          className="ml-2 bg-green-600 hover:bg-green-700 text-white"
                        >
                          DK24
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>

            <Separator />

            <ScrollArea className="flex-1 pr-4 -mr-4">
              <div className="space-y-6">
                {/* Event Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge
                          key={String(tag)}
                          variant="secondary"
                          className="px-2.5 py-1 text-sm"
                        >
                          {sanitizeTag(tag)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-5" />
                      <span className="text-sm font-medium uppercase tracking-wider">
                        Start
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        {format(startDateTime, "MMM d, yyyy")}
                      </p>
                      <p className="text-md text-muted-foreground">
                        {format(startDateTime, "h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-5" />
                      <span className="text-sm font-medium uppercase tracking-wider">
                        End
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        {format(endDateTime, "MMM d, yyyy")}
                      </p>
                      <p className="text-md text-muted-foreground">
                        {format(endDateTime, "h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-5" />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      Location
                    </span>
                  </div>
                  <p className="font-medium text-lg">{event.location}</p>
                </div>

                {/* Description */}
                <DialogDescription asChild>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                      About Event
                    </h4>
                    <div className="prose prose-base dark:prose-invert leading-relaxed text-muted-foreground">
                      {event.description.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </DialogDescription>
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="bg-muted/30 p-4 border-t">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
            {event.youtubeLink && (
              <a
                href={event.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto cursor-pointer text-base"
                >
                  <Youtube className="mr-2 size-5 text-red-600" />
                  Watch Recording
                </Button>
              </a>
            )}
            {!isEventPast && event.joinLink && (
              <a
                href={event.joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button className="w-full sm:w-auto cursor-pointer text-base">
                  <LinkIcon className="mr-2 size-5" />
                  Visit Website
                </Button>
              </a>
            )}
            {!isEventPast && event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  variant="ghost"
                  className="w-full border-2 sm:w-auto cursor-pointer text-base"
                >
                  Register Now
                </Button>
              </a>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
