"use client";

import Link from "next/link";
import { Calendar, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DownloadIcsDialog } from "@/components/download-ics-dialog";
import { DateNavigator } from "@/calendar/components/header/date-navigator";

import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <Calendar className="h-12 w-12" />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-2">
          <DownloadIcsDialog size="default" className="w-full sm:w-auto" />
        </div>

        <Link href="/showcase-event">
          <Button size="default" className="w-full sm:w-auto md:flex hidden">
            <Plus />
            Add Event
          </Button>
        </Link>
      </div>
    </div>
  );
}
