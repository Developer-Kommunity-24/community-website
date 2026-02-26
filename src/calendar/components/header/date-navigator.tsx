import { useMemo } from "react";
import { formatDate } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getEventsCount, navigateDate, rangeText } from "@/calendar/helpers";

import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function DateNavigator({ view, events }: IProps) {
  const { selectedDate } = useCalendar();
  const router = useRouter();
  const pathname = usePathname();

  const month = formatDate(selectedDate, "MMMM");
  const year = selectedDate.getFullYear();

  const eventCount = useMemo(
    () => getEventsCount(events, selectedDate, view),
    [events, selectedDate, view],
  );

  const handleNavigation = (direction: "previous" | "next") => {
    const newDate = navigateDate(selectedDate, view, direction);
    const newDateStr = formatDate(newDate, "MMM-yyyy").toLowerCase();
    router.push(`${pathname}?date=${newDateStr}`);
  };

  const handlePrevious = () => handleNavigation("previous");
  const handleNext = () => handleNavigation("next");

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2 flex-nowrap">
        <span className="text-lg font-semibold whitespace-nowrap">
          {month} {year}
        </span>
        <Badge variant="outline" className="px-1.5 whitespace-nowrap">
          {eventCount} events
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="size-6.5 px-0 [&_svg]:size-4.5"
          onClick={handlePrevious}
        >
          <ChevronLeft />
        </Button>

        <p className="text-sm text-muted-foreground">
          {rangeText(view, selectedDate)}
        </p>

        <Button
          variant="outline"
          className="size-6.5 px-0 [&_svg]:size-4.5"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
