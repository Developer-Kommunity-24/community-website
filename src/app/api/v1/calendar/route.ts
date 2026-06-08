import type { NextRequest } from "next/server";
import {
  apiError,
  apiResponse,
  CACHE_TTL,
  handlePreflight,
} from "@/lib/api-utils";
import { getEvents, getFilteredEventsByDateRange } from "@/lib/get-events";
import {
  checkRateLimit,
  rateLimitResponse,
  withRateLimitHeaders,
} from "@/lib/rate-limit";

export const runtime = "nodejs";

/** CORS preflight */
export function OPTIONS() {
  return handlePreflight();
}

/**
 * GET /api/v1/calendar
 *
 * Returns all events, or events filtered by month when `?date=` is provided.
 *
 * Query params:
 *   - date (optional): month-year string, e.g. "apr-2026"
 *
 * Examples:
 *   GET /api/v1/calendar            → all events
 *   GET /api/v1/calendar?date=apr-2026 → events for April 2026
 */
export async function GET(request: NextRequest) {
  const rl = checkRateLimit(request);
  if (!rl.allowed) return rateLimitResponse(rl);

  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    // If a date filter is provided, return events for that month
    if (dateParam) {
      const events = await getFilteredEventsByDateRange(dateParam);
      return withRateLimitHeaders(
        apiResponse(
          { version: "v1", month: dateParam, count: events.length, events },
          { cacheTtl: CACHE_TTL.CALENDAR },
        ),
        rl,
      );
    }

    // Otherwise, return all events
    const events = await getEvents();
    return withRateLimitHeaders(
      apiResponse(
        { version: "v1", count: events.length, events },
        { cacheTtl: CACHE_TTL.CALENDAR },
      ),
      rl,
    );
  } catch (error) {
    console.error("API /v1/calendar error:", error);
    return apiError("Failed to fetch events");
  }
}
