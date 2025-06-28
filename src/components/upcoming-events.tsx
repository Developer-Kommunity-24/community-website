import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getEvents } from "@/lib/get-events";
import { EventCard } from "./event-card";

export async function UpcomingEvents() {
	const events = await getEvents();

	const upcomingEvents = events
		.filter((e) => new Date(e.date) > new Date())
		.slice(0, 3);

	return (
		<section className="container mx-auto py-12 max-w-7xl justify-center">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4">
				<div>
					<h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
					<p className="text-muted-foreground max-w-2xl">
						Join us for workshops, hackathons, and community gatherings
					</p>
				</div>
				<Button asChild className="mt-4 md:mt-0">
					<Link href="/events">View All Events</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
				{upcomingEvents.length === 0 ? (
					<Card className="overflow-hidden flex flex-col h-full col-span-full">
						<div className="relative h-48 w-full bg-muted flex items-center justify-center">
							<Image
								src="/placeholder.svg"
								alt="No events"
								fill
								className="object-cover opacity-60"
								style={{ zIndex: 0 }}
							/>
							<div className="absolute inset-0 bg-muted/60" />
						</div>
						<CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
							<h3 className="text-xl font-semibold mb-2 text-center">
								No Upcoming Events
							</h3>
							<p className="text-muted-foreground text-center">
								Events will appear here once they are added by the community.
							</p>
						</CardContent>
					</Card>
				) : (
					upcomingEvents.map((event, index) => (
						<EventCard key={index} event={event} isUpcoming />
					))
				)}
			</div>
		</section>
	);
}
