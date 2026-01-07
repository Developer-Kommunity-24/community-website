"use client";

import Link from "next/link";
import { format, isPast, parseISO } from "date-fns";
import {
  Calendar,
  Clock,
  Text,
  MapPin,
  Youtube,
  Link as LinkIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Calendar className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {format(startDateTime, "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {format(endDateTime, "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {event.location}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2">
            <Text className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2">
          {!isEventPast && event.registrationLink && (
            <Link
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button">
                <LinkIcon className="mr-2 size-4" />
                Register
              </Button>
            </Link>
          )}
          {event.joinLink && (
            <Link
              href={event.joinLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button">
                <LinkIcon className="mr-2 size-4" />
                Join Event
              </Button>
            </Link>
          )}
          {event.youtubeLink && (
            <Link
              href={event.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type="button">
                <Youtube className="mr-2 size-4" />
                Watch on YouTube
              </Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
