"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  registrationLink?: string;
}

interface EventCalendarProps {
  events: Event[];
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const prevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );
    if (
      newMonth.getFullYear() > currentYear ||
      (newMonth.getFullYear() === currentYear &&
        newMonth.getMonth() >= currentMonthIndex)
    ) {
      setCurrentMonth(newMonth);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const canGoPrevious =
    year > currentYear || (year === currentYear && month > currentMonthIndex);

  const eventsByDay = events.reduce((acc: Record<string, Event[]>, event) => {
    const eventDate = new Date(event.date);
    if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
      const day = eventDate.getDate();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(event);
    }
    return acc;
  }, {});

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card className="bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-background border-green-200/50 dark:border-green-800/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            disabled={!canGoPrevious}
            className={cn(
              "hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20 dark:hover:border-green-700",
              !canGoPrevious && "opacity-50 cursor-not-allowed",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
            {monthNames[month]} {year}
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20 dark:hover:border-green-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-xs font-semibold text-green-600 dark:text-green-400 p-2 bg-green-50/50 dark:bg-green-900/20 rounded-md"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "h-12 p-1 text-center text-sm transition-colors rounded-md",
                day === null
                  ? "text-muted-foreground/30"
                  : "hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer",
                eventsByDay[day as number] &&
                  "bg-green-100 dark:bg-green-900/30 font-bold text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40",
              )}
            >
              {day !== null && (
                <div className="relative h-full flex items-center justify-center">
                  {day}
                  {eventsByDay[day] && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-green-500 shadow-sm"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 rounded-lg border border-green-100 dark:border-green-800/50">
          <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming Events
          </h4>
          {Object.entries(eventsByDay).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(eventsByDay)
                .sort(([dayA], [dayB]) => Number(dayA) - Number(dayB))
                .flatMap(([, events]) => events)
                .map((event, index) => {
                  const eventDate = new Date(event.date);
                  const formattedDate = eventDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });

                  return (
                    <li
                      key={index}
                      className="text-sm p-2 bg-white dark:bg-green-950/20 rounded border border-green-100/50 dark:border-green-800/30"
                    >
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {formattedDate}:
                      </span>
                      <span className="ml-2 text-gray-700 dark:text-gray-300">
                        {event.title}
                      </span>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No events this month
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
