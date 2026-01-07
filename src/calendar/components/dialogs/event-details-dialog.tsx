"use client";

import Link from "next/link";
import { format, isPast, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  Link as LinkIcon,
  MapPin,
  Youtube,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sanitizeTag } from "@/lib/utils";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  event: IEvent;
  children: React.ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
  const startDateTime = parseISO(event.startDateTime);
  const endDateTime = parseISO(event.endDateTime);
  const isEventPast = isPast(endDateTime);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-4xl p-0 max-h-[85vh] flex flex-col">
        <div className="grid flex-1 overflow-auto w-full grid-cols-1 md:grid-cols-5">
          {/* Left Side: Image */}
          <div className="relative h-64 w-full bg-muted/30 overflow-hidden md:col-span-2 md:h-full flex items-center justify-center p-4">
            {event.posterUrl ? (
              <>
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
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 p-6 text-center">
                <span className="text-muted-foreground">No Event Poster</span>
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="flex flex-col md:col-span-3 h-full bg-background">
            <DialogHeader className="p-6 pb-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <DialogTitle className="text-2xl font-bold leading-tight">
                    {event.title}
                  </DialogTitle>
                  {event.organizationName && (
                    <div className="text-base text-muted-foreground">
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
                {/* header close removed to avoid duplicate X (global dialog provides close) */}
              </div>
            </DialogHeader>

            <Separator />

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-8">
                {/* Event Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge
                          key={String(tag)}
                          variant="secondary"
                          className="px-2 py-0.5 text-xs"
                        >
                          {sanitizeTag(tag)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Start
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {format(startDateTime, "MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(startDateTime, "h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        End
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {format(endDateTime, "MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(endDateTime, "h:mm a")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Location
                    </span>
                  </div>
                  <p className="font-medium">{event.location}</p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    About Event
                  </h4>
                  <div className="prose prose-sm dark:prose-invert text-sm leading-relaxed text-muted-foreground">
                    {event.description.split("\n").map((line, i) => (
                      <div key={i} className="mb-2 last:mb-0">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <Separator />
          </div>
        </div>

        <Separator />

        <DialogFooter className="bg-muted/10 p-6">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end">
            {event.youtubeLink && (
              <Link
                href={event.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto cursor-pointer"
                >
                  <Youtube className="mr-2 size-4 text-red-600" />
                  Watch Recording
                </Button>
              </Link>
            )}
            {!isEventPast && event.joinLink && (
              <Link
                href={event.joinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button className="w-full sm:w-auto cursor-pointer">
                  <LinkIcon className="mr-2 size-4" />
                  Visit Website
                </Button>
              </Link>
            )}
            {!isEventPast && event.registrationLink && (
              <Link
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Button className="w-full sm:w-auto cursor-pointer">
                  Register Now
                </Button>
              </Link>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
