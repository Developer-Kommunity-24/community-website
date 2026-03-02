"use client";
import { cva } from "class-variance-authority";
import { endOfDay, isSameDay, parseISO, startOfDay } from "date-fns";
import { Star } from "lucide-react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { cn } from "@/lib/utils";

import type { IEvent } from "@/calendar/interfaces";
import type { VariantProps } from "class-variance-authority";
import { type RefObject, useEffect, useRef } from "react";

const eventBadgeVariants = cva(
  "mx-1 flex size-auto h-6.5 select-none items-center justify-between gap-1.5 whitespace-nowrap rounded-md border px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer",
  {
    variants: {
      color: {
        // Colored and mixed variants
        blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&_.event-dot]:fill-blue-600",
        green:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&_.event-dot]:fill-green-600",
        red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 [&_.event-dot]:fill-red-600",
        yellow:
          "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&_.event-dot]:fill-yellow-600",
        purple:
          "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 [&_.event-dot]:fill-purple-600",
        orange:
          "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300 [&_.event-dot]:fill-orange-600",
        gray: "border-neutral-200 bg-muted/30 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 [&_.event-dot]:fill-neutral-600",

        // Dot variants
        "blue-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-blue-600",
        "green-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-green-600",
        "red-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-red-600",
        "yellow-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-yellow-600",
        "purple-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-purple-600",
        "orange-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-orange-600",
        "gray-dot":
          "bg-neutral-50 dark:bg-neutral-900 [&_.event-dot]:fill-neutral-600",
      },
      multiDayPosition: {
        first:
          "relative z-10 mr-0 w-[calc(100%_-_3px)] rounded-r-none border-r-0 [&>span]:mr-2.5",
        middle:
          "relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0",
        last: "ml-0 rounded-l-none border-l-0",
        none: "",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  },
);

interface IProps
  extends Omit<
    VariantProps<typeof eventBadgeVariants>,
    "color" | "multiDayPosition"
  > {
  badgeContainerRef: RefObject<HTMLDivElement | null>;
  event: IEvent;
  cellDate: Date;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  className?: string;
  position?: "first" | "middle" | "last" | "none";
}

export function MonthEventBadge({
  badgeContainerRef,
  event,
  cellDate,
  eventCurrentDay,
  eventTotalDays,
  className,
  position: propPosition,
}: IProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // biome-ignore lint: useExhaustiveDependencies
  useEffect(() => {
    const badgeContainer = badgeContainerRef.current;
    const text = textRef.current;

    if (!badgeContainer || !text) return;

    const observer = new ResizeObserver(() => {
      const btnWidth = badgeContainer.offsetWidth;
      const cellIndex =
        daysBetween(itemStart, itemEnd) - daysBetween(cellDate, itemEnd);
      const isSunday = Boolean(cellDate.getDay());

      // How the formula works:
      // 13 -> margin+padding+border of the first event badge
      // - cellIndex is used because each extra day cell adds a border of 1px
      // isSunday is used because the previous day does not have border (saturday day cell does not have border on right).
      // There might be rare cases which may break this formula, hopefully it won't.
      text.style.transform = `translateX(${-btnWidth * cellIndex + (cellIndex > 0 ? 13 - cellIndex + (isSunday ? 2 : 0) : 0)}px)`;
    });

    observer.observe(badgeContainer);

    return () => observer.disconnect();
  }, []);

  const {
    badgeVariant,
    hoveredEventId,
    setHoveredEventId,
    setSelectedEventId,
  } = useCalendar();
  const itemStart = startOfDay(parseISO(event.startDateTime));
  const itemEnd = endOfDay(parseISO(event.endDateTime));

  if (cellDate < itemStart || cellDate > itemEnd) return null;

  let position: "first" | "middle" | "last" | "none" | undefined;

  if (propPosition) {
    position = propPosition;
  } else if (eventCurrentDay && eventTotalDays) {
    position = "none";
  } else if (isSameDay(itemStart, itemEnd)) {
    position = "none";
  } else if (isSameDay(cellDate, itemStart)) {
    position = "first";
  } else if (isSameDay(cellDate, itemEnd)) {
    position = "last";
  } else {
    position = "middle";
  }

  function daysBetween(dateStr1: Date, dateStr2: Date) {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    return Math.floor(
      Math.abs((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)),
    );
  }

  const renderBadgeText = ["last", "none"].includes(position);

  const color = (
    badgeVariant === "dot"
      ? `${event.color ?? "green"}-dot`
      : (event.color ?? "green")
  ) as VariantProps<typeof eventBadgeVariants>["color"];

  const eventBadgeClasses = cn(
    eventBadgeVariants({ color, multiDayPosition: position, className }),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (e.currentTarget instanceof HTMLElement) e.currentTarget.click();
    }
  };

  const fromColorClass = {
    blue: "from-blue-50",
    green: "from-green-50",
    red: "from-red-50",
    yellow: "from-yellow-50",
    purple: "from-purple-50",
    orange: "from-orange-50",
    gray: "from-neutral-100",
  }[event.color ?? "green"];

  const darkFromColorClass = {
    blue: "dark:from-blue-950",
    green: "dark:from-green-950",
    red: "dark:from-red-950",
    yellow: "dark:from-yellow-950",
    purple: "dark:from-purple-950",
    orange: "dark:from-orange-950",
    gray: "dark:from-neutral-900",
  }[event.color ?? "green"];

  let gradientFromClass = `${fromColorClass} ${darkFromColorClass}`;

  if (badgeVariant === "dot") {
    gradientFromClass = "from-neutral-50 dark:from-neutral-900";
  }

  if (event.highlight) {
    gradientFromClass = "from-green-100 dark:from-green-900";
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: The text ellipsis is not working with button element
    <div
      id="BadgeButton"
      role="button"
      tabIndex={0}
      className={cn(
        eventBadgeClasses,
        "relative pr-0",
        hoveredEventId === event.id && "brightness-90",
        event.highlight &&
          "border-green-500 bg-green-100 dark:border-green-700 dark:bg-green-900",

        ["middle", "last"].includes(position) && "pl-0",
      )}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHoveredEventId(event.id)}
      onMouseLeave={() => setHoveredEventId(null)}
      onClick={() => setSelectedEventId(event.id)}
    >
      <div className="flex items-center gap-1.5 overflow-hidden">
        {!["middle", "last"].includes(position) &&
          ["mixed", "dot"].includes(badgeVariant) && (
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              className="event-dot shrink-0"
            >
              <title>{event.title}</title>
              <circle cx="4" cy="4" r="4" />
            </svg>
          )}

        {
          <>
            {event.highlight && ["first", "none"].includes(position) && (
              <Star className="size-3 shrink-0 fill-yellow-400 text-yellow-500 absolute -top-1.25" />
            )}
            <p className="block items-center gap-1 font-semibold" ref={textRef}>
              {/* {eventCurrentDay && (
                <span className="text-xs">
                  Day {eventCurrentDay} of {eventTotalDays} •{" "}
                </span>
              )} */}
              {event.title}
            </p>
          </>
        }
      </div>
      {renderBadgeText && (
        <div
          className={cn(
            "absolute inset-y-0 right-0 w-12 bg-linear-to-l to-transparent",
            position === "none" ? "rounded-md" : "",
            gradientFromClass,
          )}
        />
      )}
    </div>
  );
}
