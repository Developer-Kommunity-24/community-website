import projects from "@/data/projects.json";
import {
  apiError,
  apiResponse,
  CACHE_TTL,
  handlePreflight,
} from "@/lib/api-utils";
import {
  checkRateLimit,
  rateLimitResponse,
  withRateLimitHeaders,
} from "@/lib/rate-limit";

/** CORS preflight */
export function OPTIONS() {
  return handlePreflight();
}

/**
 * GET /api/v1/projects
 *
 * Returns all community projects.
 */
export async function GET(request: Request) {
  const rl = checkRateLimit(request);
  if (!rl.allowed) return rateLimitResponse(rl);

  try {
    return withRateLimitHeaders(
      apiResponse(
        { version: "v1", count: projects.length, projects },
        { cacheTtl: CACHE_TTL.PROJECTS },
      ),
      rl,
    );
  } catch (error) {
    console.error("API /v1/projects error:", error);
    return apiError("Failed to fetch projects");
  }
}
