import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getEvents } from "@/lib/get-events";
import { monthMap } from "@/calendar/helpers";
import { format, endOfMonth } from "date-fns";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return new Response("Missing date parameter", { status: 400 });
    }

    // Parse date mmm-yyyy
    const [monthStr, yearStr] = dateParam.toLowerCase().split("-");
    const monthIndex = monthMap[monthStr as keyof typeof monthMap];
    const year = parseInt(yearStr, 10);

    if (monthIndex === undefined || Number.isNaN(year)) {
      return new Response("Invalid date parameter", { status: 400 });
    }

    const startDate = new Date(year, monthIndex, 1);
    const endDate = endOfMonth(startDate);

    const events = await getEvents(startDate, endDate);

    // Filter events: events starting in this month (top 3)
    const upcomingEvents = events
      .filter((e) => {
        const eventDate = new Date(e.startDateTime);
        return eventDate >= startDate && eventDate <= endDate;
      })
      .sort(
        (a, b) =>
          new Date(a.startDateTime).getTime() -
          new Date(b.startDateTime).getTime(),
      )
      .slice(0, 3);

    const monthName = format(startDate, "MMMM yyyy");

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "#ffffff",
          padding: "40px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, rgba(255, 255, 255, 0) 50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.04) 40%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.4,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            marginBottom: "35px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#059669",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {monthName}
            </span>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
                lineHeight: 1,
                textShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
              }}
            >
              Tech Events & Workshops
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "4px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#10b981",
                padding: "6px 16px",
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.12) 100%)",
                borderRadius: "10px",
                border: "1px solid rgba(16, 185, 129, 0.15)",
              }}
            >
              DK24
            </div>
            <span
              style={{ fontSize: "14px", color: "#94a3b8", fontWeight: 500 }}
            >
              Learn & Build
            </span>
          </div>
        </div>

        {/* Events */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
            position: "relative",
            zIndex: 10,
          }}
        >
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  background:
                    "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                  padding: "16px 28px",
                  borderRadius: "16px",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  borderLeft: "6px solid #10b981",
                  width: "100%",
                  boxShadow:
                    "0 4px 12px -2px rgba(15, 23, 42, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "6px",
                    background:
                      "linear-gradient(180deg, #10b981 0%, #059669 100%)",
                    borderRadius: "16px 0 0 16px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "72px",
                    background:
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(5, 150, 105, 0.08) 100%)",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(16, 185, 129, 0.12)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#059669",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {format(new Date(event.startDateTime), "MMM")}
                  </span>
                  <span
                    style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "#0f172a",
                      lineHeight: 1,
                    }}
                  >
                    {format(new Date(event.startDateTime), "dd")}
                  </span>
                </div>

                <div
                  style={{
                    width: "1px",
                    height: "48px",
                    background:
                      "linear-gradient(180deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "720px",
                    }}
                  >
                    {event.title}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#64748b",
                        fontWeight: 500,
                      }}
                    >
                      {event.time}
                    </span>
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#cbd5e1",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#64748b",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "480px",
                      }}
                    >
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                fontSize: 24,
                color: "#64748b",
                background:
                  "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
                padding: "40px",
                borderRadius: "20px",
                textAlign: "center",
                width: "100%",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow:
                  "0 4px 12px -2px rgba(15, 23, 42, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)",
              }}
            >
              No scheduled events discovered for this month.
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "35px",
            right: "80px",
            fontSize: "16px",
            color: "#94a3b8",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            border: "1px solid rgba(226, 232, 240, 0.4)",
          }}
        >
          <span style={{ color: "#059669" }}>dk24.in</span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
          // Cache for 1 hour and revalidate every 24 hours
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("OG Image generation failed:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
