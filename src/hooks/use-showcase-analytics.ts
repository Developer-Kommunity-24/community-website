"use client";

import { useEffect, useRef } from "react";
import { captureEvent } from "@/lib/posthog";

interface ShowcaseAnalyticsProps {
  totalEvents?: number;
}

/**
 * Custom hook for tracking showcase event page analytics
 * Tracks user interactions: page views, event card views, scroll depth, CTA clicks
 */
export function useShowcaseAnalytics({
  totalEvents = 0,
}: ShowcaseAnalyticsProps = {}) {
  const scrollDepthTracked = useRef<Set<number>>(new Set());

  // Track initial page view with showcase context
  // biome-ignore lint/correctness/useExhaustiveDependencies: Page view should only track once on mount
  useEffect(() => {
    const loadStartTime = performance.now();

    captureEvent("showcase_page_view", {
      total_events: totalEvents,
      page_load_time: Math.round(performance.now() - loadStartTime),
    });
  }, []); // Only on mount

  // Track scroll depth at 25%, 50%, 75%, 100%
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100,
      );

      // Track depth milestones
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (
          scrollPercentage >= milestone &&
          !scrollDepthTracked.current.has(milestone)
        ) {
          scrollDepthTracked.current.add(milestone);
          captureEvent("showcase_scroll_depth", {
            depth_percentage: milestone,
            total_events: totalEvents,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalEvents]);

  /**
   * Track when an event card becomes visible (using Intersection Observer)
   * Should be called from IntersectionObserver callback
   */
  const trackEventView = (eventData: {
    eventId?: string;
    eventName: string;
    organizationName?: string;
    position?: number;
  }) => {
    captureEvent("showcase_event_viewed", {
      event_id: eventData.eventId,
      event_name: eventData.eventName,
      organization: eventData.organizationName,
      position_in_list: eventData.position,
    });
  };

  /**
   * Track when user clicks on an event card
   */
  const trackEventClick = (eventData: {
    eventId?: string;
    eventName: string;
    organizationName?: string;
    position?: number;
  }) => {
    captureEvent("showcase_event_clicked", {
      event_id: eventData.eventId,
      event_name: eventData.eventName,
      organization: eventData.organizationName,
      position_in_list: eventData.position,
      view_type: "showcase",
    });
  };

  /**
   * Track CTA button clicks (e.g., "Submit Your Event")
   */
  const trackCTAClick = (
    ctaType: "submit_event" | "view_calendar" | "learn_more",
  ) => {
    captureEvent("showcase_cta_clicked", {
      cta_type: ctaType,
      total_events: totalEvents,
    });
  };

  /**
   * Track event filtering/sorting
   */
  const trackFilterChange = (filterData: {
    filterType: "search" | "tag" | "date" | "organization";
    filterValue: string;
    resultsCount: number;
  }) => {
    captureEvent("showcase_filter_applied", {
      filter_type: filterData.filterType,
      filter_value: filterData.filterValue,
      results_count: filterData.resultsCount,
    });
  };

  /**
   * Track event card image load failures
   */
  const trackImageError = (eventData: {
    eventId?: string;
    eventName: string;
    imageUrl?: string;
  }) => {
    captureEvent("showcase_image_error", {
      event_id: eventData.eventId,
      event_name: eventData.eventName,
      image_url: eventData.imageUrl,
    });
  };

  return {
    trackEventView,
    trackEventClick,
    trackCTAClick,
    trackFilterChange,
    trackImageError,
  };
}

/**
 * Hook to track Intersection Observer for event card visibility
 * Automatically tracks when cards enter the viewport
 */
export function useEventCardVisibility(
  eventData: {
    eventId?: string;
    eventName: string;
    organizationName?: string;
    position?: number;
  },
  trackEventView: (data: typeof eventData) => void,
) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackEventView(eventData);
          }
        }
      },
      { threshold: 0.5 }, // Track when 50% visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [eventData, trackEventView]);

  return elementRef;
}
