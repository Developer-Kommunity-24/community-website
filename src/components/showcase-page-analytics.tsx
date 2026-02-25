"use client";

import { useShowcaseAnalytics } from "@/hooks/use-showcase-analytics";

/**
 * Client component to track showcase event page analytics
 * Tracks page views and scroll depth for the event submission page
 */
export function ShowcasePageAnalytics() {
  // Initialize analytics tracking
  useShowcaseAnalytics({ totalEvents: 0 });

  // This component renders nothing, it only handles analytics
  return null;
}
