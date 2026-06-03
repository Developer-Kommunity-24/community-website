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
 * GET /api/v1/projects/[id]
 *
 * Returns a single project by its string ID.
 * Returns 404 if the project is not found.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const rl = checkRateLimit(request);
  if (!rl.allowed) return rateLimitResponse(rl);

  try {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return apiError("Resource not found", 404);
    }

    return withRateLimitHeaders(
      apiResponse({ version: "v1", project }, { cacheTtl: CACHE_TTL.PROJECTS }),
      rl,
    );
  } catch (error) {
    console.error("API /v1/projects/[id] error:", error);
    return apiError("Failed to fetch project");
  }
}
