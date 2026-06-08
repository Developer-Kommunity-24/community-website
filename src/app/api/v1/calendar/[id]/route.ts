import {
  apiError,
  apiResponse,
  CACHE_TTL,
  handlePreflight,
} from "@/lib/api-utils";
import { getEvents } from "@/lib/get-events";
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
 * GET /api/v1/calendar/[id]
 *
 * Returns a single event by its ID.
 * Returns 404 if the event is not found.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const rl = checkRateLimit(request);
  if (!rl.allowed) return rateLimitResponse(rl);

  try {
    const { id } = await params;
    const events = await getEvents();
    const event = events.find((e) => e.id === id);

    if (!event) {
      return apiError("Resource not found", 404);
    }

    return withRateLimitHeaders(
      apiResponse({ version: "v1", event }, { cacheTtl: CACHE_TTL.CALENDAR }),
      rl,
    );
  } catch (error) {
    console.error("API /v1/calendar/[id] error:", error);
    return apiError("Failed to fetch event");
  }
}
