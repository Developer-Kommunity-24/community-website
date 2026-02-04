"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import type { IEvent } from "@/calendar/interfaces";
import { buildICalendar } from "@/lib/export-ics";

interface DownloadIcsDialogProps {
  buttonLabel?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
}

export function DownloadIcsDialog({
  buttonLabel = "Download ICS",
  size = "sm",
  variant = "outline",
  className,
}: DownloadIcsDialogProps) {
  const [mode, setMode] = useState<"event" | "month">("event");
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    setErrorMessage(null);
    setIsLoading(true); // Set loading state to true

    const currentDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);

    import("@/lib/get-events")
      .then(({ getEvents }) => {
        getEvents(currentDate, oneYearFromNow)
          .then((data) => {
            if (!isMounted) return;
            setEvents(Array.isArray(data) ? (data as IEvent[]) : []);
          })
          .catch((error) => {
            if (!isMounted) return;
            console.error("Error fetching events", error);
            setEvents([]);
            setErrorMessage("Could not fetch events.");
          })
          .finally(() => {
            if (isMounted) setIsLoading(false); // Set loading state to false
          });
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error("Error loading getEvents function", error);
        setErrorMessage("Could not load events.");
        setIsLoading(false); // Set loading state to false
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const monthOptions = useMemo(() => {
    const buckets = new Map<
      string,
      { key: string; label: string; date: Date }
    >();

    events.forEach((event) => {
      const date = new Date(event.startDateTime);
      if (Number.isNaN(date.getTime())) return;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!buckets.has(key)) {
        const label = date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
        buckets.set(key, {
          key,
          label,
          date: new Date(date.getFullYear(), date.getMonth(), 1),
        });
      }
    });

    if (buckets.size === 0) {
      const fallback = new Date();
      for (let i = 0; i < 12; i += 1) {
        const date = new Date(
          fallback.getFullYear(),
          fallback.getMonth() + i,
          1,
        );
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const label = date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
        buckets.set(key, { key, label, date });
      }
    }

    return Array.from(buckets.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
  }, [events]);

  const getEventMonthKeys = useCallback((event: IEvent) => {
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];

    const keys: string[] = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const endCursor = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursor <= endCursor) {
      const monthKey = `${cursor.getFullYear()}-${String(
        cursor.getMonth() + 1,
      ).padStart(2, "0")}`;
      keys.push(monthKey);
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return keys;
  }, []);

  const monthOptionsWithCount = useMemo(() => {
    return monthOptions.map((month) => {
      const eventCount = events.filter((event) =>
        getEventMonthKeys(event).includes(month.key),
      ).length;
      return {
        ...month,
        eventCount,
      };
    });
  }, [monthOptions, events, getEventMonthKeys]);

  const formatEventLabel = (event: IEvent) => {
    const date = new Date(event.startDateTime);
    const monthLabel = Number.isNaN(date.getTime())
      ? ""
      : date.toLocaleString("en-US", { month: "short", year: "numeric" });
    return monthLabel ? `${event.title} — ${monthLabel}` : event.title;
  };

  const toggleEvent = (eventId: string) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const toggleMonth = (monthName: string) => {
    setSelectedMonths((prev) =>
      prev.includes(monthName)
        ? prev.filter((m) => m !== monthName)
        : [...prev, monthName],
    );
  };

  const hasSelection = selectedEventIds.length > 0 || selectedMonths.length > 0;
  const hasValidSelectedEvents = events.some((event) => {
    const matchesEventId =
      selectedEventIds.length > 0 && selectedEventIds.includes(event.id);
    const matchesSelectedMonth =
      selectedMonths.length > 0 &&
      getEventMonthKeys(event).some((key) => selectedMonths.includes(key));
    if (!matchesEventId && !matchesSelectedMonth) return false;
    return getEventMonthKeys(event).length > 0;
  });
  const isDownloadDisabled = !hasSelection || !hasValidSelectedEvents;

  const handleDownload = () => {
    const eventsById = new Map<string, IEvent>();

    events
      .filter((event) => selectedEventIds.includes(event.id))
      .forEach((event) => {
        eventsById.set(event.id, event);
      });

    events
      .filter((event) =>
        getEventMonthKeys(event).some((key) => selectedMonths.includes(key)),
      )
      .forEach((event) => {
        eventsById.set(event.id, event);
      });

    const selectedEvents = Array.from(eventsById.values());

    if (selectedEvents.length === 0) return;

    let url: string | undefined;

    try {
      const icsContent = buildICalendar(selectedEvents);
      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
      });
      url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "dk24-events.ics";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download ICS file:", error);
      if (typeof window !== "undefined") {
        window.alert("Failed to download calendar file. Please try again.");
      }
    } finally {
      if (url) {
        URL.revokeObjectURL(url);
      }
    }
  };

  const renderMonthOptions = () => {
    return (
      <div className="flex flex-col gap-2">
        {monthOptionsWithCount.map((month) => (
          <div key={month.key} className="flex items-center">
            <input
              type="checkbox"
              id={month.key}
              name={month.key}
              className="mr-2"
              checked={selectedMonths.includes(month.key)}
              onChange={() => toggleMonth(month.key)}
            />
            <label htmlFor={month.key} className="grow">
              {month.label}
            </label>
            <span className="text-sm text-gray-500">
              {month.eventCount} events
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          <Download className="h-4 w-4 mr-1" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[92vw] max-w-[92vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Download ICS</DialogTitle>
          <DialogDescription>
            Select events or months to download as an ICS file.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="text-center py-4">Loading events...</div> // Loading state UI
        ) : errorMessage ? (
          <div className="text-center text-red-500 py-4">{errorMessage}</div>
        ) : events.length === 0 ? (
          <div className="text-center py-4">No events available.</div>
        ) : (
          <div>
            <div className="flex gap-2">
              <Button
                variant={mode === "event" ? "default" : "outline"}
                type="button"
                onClick={() => setMode("event")}
              >
                Event
              </Button>
              <Button
                variant={mode === "month" ? "default" : "outline"}
                type="button"
                onClick={() => setMode("month")}
              >
                Month
              </Button>
            </div>

            {mode === "event" ? (
              <div className="grid gap-2 max-h-64 overflow-auto border rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="select-all-events"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedEventIds(events.map((event) => event.id));
                      } else {
                        setSelectedEventIds([]);
                      }
                    }}
                    checked={selectedEventIds.length === events.length}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="select-all-events"
                    className="text-sm font-medium"
                  >
                    Select All Events
                  </label>
                </div>

                {events.map((event) => {
                  const inputId = `event-${event.id}`;
                  return (
                    <label
                      key={event.id}
                      htmlFor={inputId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        id={inputId}
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedEventIds.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                      />
                      <span>{formatEventLabel(event)}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="select-all-months"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMonths(
                          monthOptions.map((month) => month.key),
                        );
                      } else {
                        setSelectedMonths([]);
                      }
                    }}
                    checked={selectedMonths.length === monthOptions.length}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="select-all-months"
                    className="text-sm font-medium"
                  >
                    Select All Months
                  </label>
                </div>
                {renderMonthOptions()}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                type="button"
                disabled={isDownloadDisabled}
                onClick={handleDownload}
              >
                Download ICS
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
