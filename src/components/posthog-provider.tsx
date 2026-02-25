"use client";

import { useEffect } from "react";
import { getPostHogClient } from "@/lib/posthog";

interface PostHogProviderProps {
  children: React.ReactNode;
}

/**
 * PostHog analytics provider component
 * Initializes PostHog with autocapture enabled
 * Page views and user interactions are tracked automatically
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  // Initialize PostHog on mount
  // Autocapture handles page views, clicks, and form interactions
  useEffect(() => {
    getPostHogClient();
  }, []);

  return <>{children}</>;
}
