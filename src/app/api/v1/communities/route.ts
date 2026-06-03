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
 * Strips email addresses from POCs and representatives
 * to prevent exposing private contact information publicly.
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
 * GET /api/v1/communities
 *
 * Returns all communities with email addresses removed for privacy.
 */
export async function GET(request: Request) {
  const rl = checkRateLimit(request);
  if (!rl.allowed) return rateLimitResponse(rl);

  try {
    const sanitized = communities.map(sanitizeCommunity);

    return withRateLimitHeaders(
      apiResponse(
        { version: "v1", count: sanitized.length, communities: sanitized },
        { cacheTtl: CACHE_TTL.COMMUNITIES },
      ),
      rl,
    );
  } catch (error) {
    console.error("API /v1/communities error:", error);
    return apiError("Failed to fetch communities");
  }
}
