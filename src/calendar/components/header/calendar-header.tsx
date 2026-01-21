import Link from "next/link";
import { Calendar, Download, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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
          <Button variant="outline" size="sm" type="button" onClick={() => {}}>
            <Download className="h-4 w-4 mr-1" />
            Download ICS
          </Button>
        </div>

        <Link href="/showcase-event">
          <Button className="w-full sm:w-auto md:flex hidden">
            <Plus />
            Add Event
          </Button>
        </Link>
      </div>
    </div>
  );
}
