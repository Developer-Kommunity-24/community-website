import { NextResponse } from "next/server";

/**
 * Shared CORS and Cache-Control utilities for the public API.
 *
 * CORS: Allows any origin (public API), but restricts to GET only.
 * Cache: Configurable per-endpoint, with stale-while-revalidate for resilience.
 */

// CORS

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": "86400", // Cache preflight for 24 hours
  "X-Content-Type-Options": "nosniff",
};

/**
 * Handles CORS preflight (OPTIONS) requests.
 * Export this as the OPTIONS handler in every API route.
 */

export function handlePreflight(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

// Cache

/** Cache durations in seconds */
export const CACHE_TTL = {
  CALENDAR: 300, // 5 minutes
  COMMUNITIES: 3600, // 1 hour
  PROJECTS: 3600, // 1 hour
} as const;

// Response Builder

interface ApiResponseOptions {
  /** HTTP status code (default: 200) */
  status?: number;
  cacheTtl?: number;
  headers?: Record<string, string>;
}

/**
 * Creates a JSON response with CORS headers, security headers, and
 * optional Cache-Control applied.
 *
 * @example
 * ```ts
 * return apiResponse({ version: "v1", data }, { cacheTtl: CACHE_TTL.PROJECTS });
 * ```
 */

export function apiResponse(
  body: unknown,
  options: ApiResponseOptions = {},
): NextResponse {
  const { status = 200, cacheTtl = 0, headers: extraHeaders = {} } = options;

  const headers: Record<string, string> = {
    ...CORS_HEADERS,
    ...extraHeaders,
  };

  // Apply Cache-Control: public caching with stale-while-revalidate fallback
  if (cacheTtl > 0) {
    headers["Cache-Control"] =
      `public, s-maxage=${cacheTtl}, stale-while-revalidate=${cacheTtl * 2}`;
  } else {
    headers["Cache-Control"] = "no-store";
  }

  return NextResponse.json(body, { status, headers });
}

/**
 * Creates a JSON error response with CORS headers.
 * Never caches error responses.
 */
export function apiError(message: string, status: number = 500): NextResponse {
  return apiResponse({ error: message }, { status, cacheTtl: 0 });
}
