import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(255),
});

export async function POST(request: Request) {
  const apiUrl = process.env.DKBOT_API_URL;
  const apiSecret = process.env.DKBOT_API_SECRET;

  if (!apiUrl || !apiSecret) {
    return NextResponse.json(
      { error: "Subscription service is not configured" },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request" },
      { status: 400 },
    );
  }

  const result = subscribeSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${apiUrl.replace(/\/$/, "")}/api/email-subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Key": apiSecret,
        },
        body: JSON.stringify({
          email: result.data.email.toLowerCase(),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Unable to subscribe right now" },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    return NextResponse.json(
      {
        status: data.status,
        message: data.message,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription API request failed:", error);

    return NextResponse.json(
      { error: "Subscription service is unavailable" },
      { status: 502 },
    );
  }
}
