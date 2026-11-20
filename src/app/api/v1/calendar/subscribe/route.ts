import { getEvents } from "@/lib/get-events";
import { buildICalendar } from "@/lib/export-ics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getEvents();
    const calendar = buildICalendar(events);

    return new Response(calendar, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'inline; filename="dk24-events.ics"',
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("Calendar feed generation failed:", error);

    return new Response("Unable to generate calendar feed", {
      status: 500,
    });
  }
}
