"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!isMounted) return;
        setEvents(Array.isArray(data) ? (data as IEvent[]) : []);
      })
      .catch(() => {
        if (isMounted) setEvents([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
        const date = new Date(fallback.getFullYear(), i, 1);
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

  const isDownloadDisabled =
    selectedEventIds.length === 0 && selectedMonths.length === 0;

  const getMonthKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const getEventMonthKeys = (event: IEvent) => {
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];

    const keys: string[] = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const endCursor = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursor <= endCursor) {
      keys.push(getMonthKey(cursor));
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return keys;
  };

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

    const icsContent = buildICalendar(selectedEvents);
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dk24-events.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className={className}>
          <Download className="h-4 w-4 mr-1" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download ICS</DialogTitle>
          <DialogDescription>
            Choose events or months to export.
          </DialogDescription>
        </DialogHeader>
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
            {events.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No events available.
              </div>
            ) : (
              events.map((event) => (
                <label
                  key={event.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedEventIds.includes(event.id)}
                    onChange={() => toggleEvent(event.id)}
                  />
                  <span>{formatEventLabel(event)}</span>
                </label>
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-2 max-h-64 overflow-y-auto border rounded-md p-3 sm:grid-cols-2">
            {monthOptions.map((month) => (
              <label
                key={month.key}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selectedMonths.includes(month.key)}
                  onChange={() => toggleMonth(month.key)}
                />
                <span>{month.label}</span>
              </label>
            ))}
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
      </DialogContent>
    </Dialog>
  );
}
