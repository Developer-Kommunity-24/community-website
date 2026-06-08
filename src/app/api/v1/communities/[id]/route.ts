import { communities } from "@/constants/member-colleges";
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
import type { Community, CommunityRepresentative } from "@/types";

/**
 * Strips email addresses from POCs and representatives.
 */
function sanitizeCommunity(community: Community) {
  const stripEmail = (
    person: CommunityRepresentative,
  ): Omit<CommunityRepresentative, "email"> => {
    const { email: _email, ...rest } = person;
    return rest;
  };

  return {
    ...community,
    pocs: community.pocs?.map(stripEmail),
    representatives: community.representatives?.map(stripEmail),
  };
}

/** CORS preflight */
export function OPTIONS() {
  return handlePreflight();
}

/**
 * GET /api/v1/communities/[id]
 *
 * Returns a single community by its numeric ID.
 * Returns 404 if the community is not found.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const rl = checkRateLimit(request);
  if (!rl.allowed) return rateLimitResponse(rl);

  try {
    const { id } = await params;
    const communityId = parseInt(id, 10);

    if (Number.isNaN(communityId)) {
      return apiError("Invalid community ID", 400);
    }

    const community = communities.find((c) => c.id === communityId);

    if (!community) {
      return apiError("Resource not found", 404);
    }

    return withRateLimitHeaders(
      apiResponse(
        { version: "v1", community: sanitizeCommunity(community) },
        { cacheTtl: CACHE_TTL.COMMUNITIES },
      ),
      rl,
    );
  } catch (error) {
    console.error("API /v1/communities/[id] error:", error);
    return apiError("Failed to fetch community");
  }
}
