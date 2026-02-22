"use client";

import { useEffect } from "react";
import { captureEvent } from "@/lib/posthog";

interface CalendarAnalyticsProps {
  currentMonth?: number;
  currentYear?: number;
  eventsCount?: number;
  autoTrackPageView?: boolean;
  autoTrackMonthChange?: boolean;
}

/**
 * Custom hook for tracking calendar page analytics
 * Tracks user interactions: page views, date clicks, month changes, event clicks
 */
export function useCalendarAnalytics({
  currentMonth,
  currentYear,
  eventsCount = 0,
  autoTrackPageView = true,
  autoTrackMonthChange = true,
}: CalendarAnalyticsProps = {}) {
  // Track initial page view with calendar context
  // biome-ignore lint/correctness/useExhaustiveDependencies: Page view should only track once on mount
  useEffect(() => {
    if (!autoTrackPageView) return;
    const loadStartTime = performance.now();

    captureEvent("calendar_page_view", {
      current_month: currentMonth,
      current_year: currentYear,
      events_count: eventsCount,
      page_load_time: Math.round(performance.now() - loadStartTime),
    });
  }, []); // Only on mount

  // Track month/year changes
  useEffect(() => {
    if (!autoTrackMonthChange) return;
    if (currentMonth !== undefined && currentYear !== undefined) {
      captureEvent("calendar_month_changed", {
        month: currentMonth,
        year: currentYear,
        events_count: eventsCount,
      });
    }
  }, [currentMonth, currentYear, eventsCount, autoTrackMonthChange]);

  /**
   * Track when user clicks on a specific date
   */
  const trackDateClick = (date: Date, hasEvents: boolean) => {
    captureEvent("calendar_date_clicked", {
      date: date.toISOString().split("T")[0],
      day_of_week: date.toLocaleDateString("en-US", { weekday: "long" }),
      has_events: hasEvents,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  };

  /**
   * Track when user clicks on an event from the calendar
   */
  const trackEventClick = (eventData: {
    eventId?: string;
    eventName: string;
    eventDate: string;
    organizationName?: string;
  }) => {
    captureEvent("calendar_event_clicked", {
      event_id: eventData.eventId,
      event_name: eventData.eventName,
      event_date: eventData.eventDate,
      organization: eventData.organizationName,
      view_type: "calendar",
    });
  };

  /**
   * Track calendar view type changes (month/agenda)
   */
  const trackViewChange = (viewType: "month" | "agenda") => {
    captureEvent("calendar_view_changed", {
      view_type: viewType,
      current_month: currentMonth,
      current_year: currentYear,
    });
  };

  /**
   * Track ICS calendar download
   */
  const trackCalendarDownload = (eventsCount: number) => {
    captureEvent("calendar_downloaded", {
      format: "ics",
      events_count: eventsCount,
      month: currentMonth,
      year: currentYear,
    });
  };

  return {
    trackDateClick,
    trackEventClick,
    trackViewChange,
    trackCalendarDownload,
  };
}
