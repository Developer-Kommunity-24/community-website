import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getFilteredEventsByDateRange } from "@/lib/get-events";
import { format } from "date-fns";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return new Response("Missing date parameter", { status: 400 });
    }

    const displayEvents = await getFilteredEventsByDateRange(dateParam);

    const startDate = new Date(dateParam);
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
          padding: "50px 80px 80px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 0) 50%), radial-gradient(circle at 0% 100%, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 0) 50%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.03)",
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
              "linear-gradient(rgba(16, 185, 129, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.5,
          }}
        />

        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "36px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#10b981",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {monthName}
            </span>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Tech Events & Workshops
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 900,
                  color: "#10b981",
                  lineHeight: 0.9,
                }}
              >
                DK24
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Community
              </span>
            </div>
            <div
              style={{
                width: "2px",
                height: "40px",
                backgroundColor: "#e2e8f0",
              }}
            />
            <span
              style={{ fontSize: "22px", color: "#64748b", fontWeight: 600 }}
            >
              dk24.org
            </span>
          </div>
        </div>

        {/* Event Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            position: "relative",
            zIndex: 10,
          }}
        >
          {displayEvents.length > 0 ? (
            displayEvents.map((event) => {
              const now = new Date(); // Define 'now' for use in rendering logic
              const isEventPast = new Date(event.startDateTime) < now;
              const isDK24 = event.organizationName === "DK24";

              return (
                <div
                  key={event.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "28px",
                    background: "rgba(255, 255, 255, 0.98)",
                    padding: "18px 28px",
                    borderRadius: "22px",
                    border: isDK24
                      ? "2px solid rgba(16, 185, 129, 0.2)"
                      : "1px solid rgba(226, 232, 240, 0.6)",
                    boxShadow: "0 4px 15px -5px rgba(0, 0, 0, 0.05)",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Left: Date Box */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "88px",
                      height: "88px",
                      background: isEventPast
                        ? "#f1f5f9"
                        : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      borderRadius: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: isEventPast
                          ? "#94a3b8"
                          : "rgba(255,255,255,0.85)",
                        textTransform: "uppercase",
                      }}
                    >
                      {format(new Date(event.startDateTime), "MMM")}
                    </span>
                    <span
                      style={{
                        fontSize: "38px",
                        fontWeight: 800,
                        color: isEventPast ? "#475569" : "#ffffff",
                        lineHeight: 1,
                      }}
                    >
                      {format(new Date(event.startDateTime), "dd")}
                    </span>
                  </div>

                  {/* Middle: Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      gap: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: isEventPast ? "#64748b" : "#1e293b",
                          maxWidth: "600px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: 1.25,
                        }}
                      >
                        {event.title}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        color: "#64748b",
                        fontSize: "20px",
                        fontWeight: 500,
                      }}
                    >
                      {isDK24 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "2px 10px",
                            background: "rgba(16, 185, 129, 0.1)",
                            borderRadius: "8px",
                            marginRight: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              color: "#059669",
                              textTransform: "uppercase",
                            }}
                          >
                            by DK24
                          </span>
                        </div>
                      )}
                      <span>{event.time}</span>
                      <div
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "2px",
                          backgroundColor: "#cbd5e1",
                        }}
                      />
                      <span
                        style={{
                          maxWidth: "350px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Right: Status */}
                  <div
                    style={{
                      display: "flex",
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: isEventPast
                        ? "#f8fafc"
                        : "rgba(16, 185, 129, 0.05)",
                      border: `1px solid ${
                        isEventPast ? "#e2e8f0" : "rgba(16, 185, 129, 0.15)"
                      }`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: isEventPast ? "#94a3b8" : "#059669",
                        textTransform: "uppercase",
                      }}
                    >
                      {isEventPast ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "80px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "28px",
                border: "2px dashed #e2e8f0",
              }}
            >
              <span
                style={{ fontSize: "28px", color: "#94a3b8", fontWeight: 600 }}
              >
                No scheduled events for {monthName}.
              </span>
              <span
                style={{ fontSize: "18px", color: "#64748b", marginTop: "8px" }}
              >
                Stay tuned on dk24.org
              </span>
            </div>
          )}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        headers: {
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
