import type { PostHog as PostHogInterface } from "posthog-js";
import posthog from "posthog-js";

// PostHog singleton instance
let posthogInstance: typeof posthog | null = null;

/**
 * Initialize and return the PostHog client instance
 * This ensures PostHog is only initialized once
 */
export function getPostHogClient(): typeof posthog | null {
  // Only initialize in browser environment
  if (typeof window === "undefined") {
    return null;
  }

  // Return existing instance if already initialized
  if (posthogInstance) {
    return posthogInstance;
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  // Skip initialization if environment variables are not set
  if (!posthogKey || !posthogHost) {
    console.warn("PostHog environment variables not set. Analytics disabled.");
    return null;
  }

  // Initialize PostHog with autocapture and automatic page tracking
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: "identified_only", // Only create profiles for identified users
    capture_pageview: "history_change", // Automatically track SPA route changes
    capture_pageleave: true, // Track when users leave pages
    autocapture: {
      // Automatically capture clicks, form submissions, and input changes
      dom_event_allowlist: ["click", "submit", "change"],
      css_selector_allowlist: ["[data-ph-capture]"], // Optional: only capture elements with this attribute
    },
    session_recording: {
      // Session recordings enabled (5K/month free)
      maskAllInputs: true, // Privacy: mask all form inputs
      maskTextSelector: "[data-ph-mask]", // Mask elements with this attribute
    },
    // Add super properties for all events
    property_denylist: ["$initial_referrer", "$initial_referring_domain"], // Save quota
    sanitize_properties: (_properties: Record<string, any>, _event: string) => {
      // Remove sensitive data if accidentally captured
      return _properties;
    },
    loaded: (ph) => {
      // Set super properties that apply to all events
      ph.register({
        community_type: "dk24",
        website_version: "1.0",
      });

      if (process.env.NODE_ENV === "development") {
        console.log("PostHog initialized with autocapture enabled");
      }
    },
  });

  posthogInstance = posthog;
  return posthogInstance;
}

/**
 * Capture a custom event with PostHog
 * @param eventName - Name of the event to track
 * @param properties - Additional properties to attach to the event
 */
export function captureEvent(
  eventName: string,
  properties?: Record<string, unknown>,
): void {
  const client = getPostHogClient();
  if (!client) return;

  client.capture(eventName, properties);
}

/**
 * Capture an error event with PostHog for debugging
 * @param error - Error object or error message
 * @param context - Additional context about where/why the error occurred
 */
export function captureError(
  error: Error | string,
  context?: {
    component?: string;
    action?: string;
    userId?: string;
    [key: string]: unknown;
  },
): void {
  const client = getPostHogClient();
  if (!client) return;

  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;

  client.capture("error_occurred", {
    error_message: errorMessage,
    error_stack: errorStack,
    ...context,
    timestamp: new Date().toISOString(),
  });

  // Also log to console in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.error("PostHog Error Captured:", errorMessage, context);
  }
}

/**
 * Identify a user in PostHog
 * Call this after successful form submissions to track user journey
 * @param userId - Unique identifier for the user (email)
 * @param properties - User properties (name, college, etc.)
 */
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>,
): void {
  const client = getPostHogClient();
  if (!client) return;

  client.identify(userId, properties);
}

/**
 * Reset the PostHog instance (useful for sign out or testing)
 */
export function resetPostHog(): void {
  const client = getPostHogClient();
  if (!client) return;

  client.reset();
}
