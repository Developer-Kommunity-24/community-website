import type { NextResponse } from "next/server";
import { apiResponse } from "@/lib/api-utils";

// Timestamps of requests within the current window

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

/** Clean up expired entries every 60 seconds to prevent memory leaks */
const CLEANUP_INTERVAL_MS = 60_000;
let lastCleanup = Date.now();

function cleanupExpiredEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

interface RateLimitConfig {
  /** Maximum number of requests allowed within the window (default: 60) */
  limit?: number;
  /** Time window in milliseconds (default: 60_000 = 1 minute) */
  windowMs?: number;
}

interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Maximum requests allowed in the window */
  limit: number;
  /** Remaining requests in the current window */
  remaining: number;
  /** Seconds until the window resets */
  resetInSeconds: number;
}

/**
 * Extracts the client IP from request headers.
 * Checks common proxy headers before falling back to a default.
 */
function getClientIP(request: Request): string {
  const headers = new Headers(request.headers);

  // Check standard forwarding headers (set by reverse proxies / Vercel / etc.)
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

/**
 * Check rate limit for a given request.
 *
 * @example
 * ```ts
 * const result = checkRateLimit(request);
 * if (!result.allowed) {
 *   return rateLimitResponse(result);
 * }
 * ```
 */
export function checkRateLimit(
  request: Request,
  config: RateLimitConfig = {},
): RateLimitResult {
  const { limit = 60, windowMs = 60_000 } = config;
  const ip = getClientIP(request);
  const now = Date.now();
  const windowStart = now - windowMs;

  // Lazy cleanup
  cleanupExpiredEntries(windowMs);

  // Get or create entry
  let entry = store.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(ip, entry);
  }

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  const remaining = Math.max(0, limit - entry.timestamps.length);
  const oldestInWindow = entry.timestamps[0] ?? now;
  const resetInSeconds = Math.ceil((oldestInWindow + windowMs - now) / 1000);

  if (entry.timestamps.length >= limit) {
    return { allowed: false, limit, remaining: 0, resetInSeconds };
  }

  // Record this request
  entry.timestamps.push(now);

  return {
    allowed: true,
    limit,
    remaining: remaining - 1,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Returns a standardised 429 Too Many Requests response with
 * rate-limit headers and a Retry-After value.
 */
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  return apiResponse(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": "0",
        "Retry-After": result.resetInSeconds.toString(),
      },
    },
  );
}

/**
 * Adds rate-limit headers to a successful response.
 */
export function withRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult,
): NextResponse {
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  return response;
}
