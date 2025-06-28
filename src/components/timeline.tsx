"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface Event {
	id: string;
	title: string;
	date: string;
	location: string;
	description: string;
	images?: string[];
	outcomes?: string[];
	registrationLink?: string;
	time?: string;
}

export function Timeline({ timelineEvents }: { timelineEvents: Event[] }) {
	// const timelineEvents = [
	//   {
	//     date: "October 2023",
	//     title: "Initial Discussions",
	//     description:
	//       "Representatives from SOSC, DevNation, and FiniteLoop met to discuss the possibility of a unified tech community across colleges in Mangalore.",
	//   },
	//   {
	//     date: "November 2023",
	//     title: "Community Planning",
	//     description:
	//       "The TEAM model was conceptualized, and the vision for DK24 was drafted with input from student leaders and faculty advisors.",
	//   },
	//   {
	//     date: "December 2023",
	//     title: "DK24 Summit 2023",
	//     description:
	//       "The inaugural summit brought together tech communities from 6 colleges to officially establish DK24 and set the vision for the future.",
	//     highlight: true,
	//   },
	//   {
	//     date: "January 2024",
	//     title: "First Collaborative Projects",
	//     description:
	//       "Three collaborative projects were initiated with students from different colleges working together in mixed teams.",
	//   },
	//   {
	//     date: "February 2024",
	//     title: "Build for Mangalore Hackathon",
	//     description:
	//       "The first major event organized by DK24, bringing together over 200 students to build solutions for local problems.",
	//     highlight: true,
	//   },
	//   {
	//     date: "March 2024",
	//     title: "Mentor Network Launch",
	//     description:
	//       "A network of industry professionals and alumni was established to mentor students and provide guidance on projects.",
	//   },
	//   {
	//     date: "April 2024",
	//     title: "Community Growth",
	//     description:
	//       "DK24 expanded to include two more college communities, bringing the total to 8 member colleges across Mangalore.",
	//   },
	// ];

	return (
		<div className="relative">
			<div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-border transform -translate-x-1/2"></div>

			<div className="space-y-12">
				{timelineEvents.map((event, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className={`relative flex flex-col md:flex-row ${
							index % 2 === 0 ? "md:flex-row-reverse" : ""
						}`}
					>
						<div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 mt-1.5"></div>

						{/* Content */}
						<div
							className={`md:w-1/2 pl-8 ${
								index % 2 === 1 ? "md:pl-0 md:pr-12" : "md:pr-0 md:pl-12"
							}`}
						>
							<Badge variant="outline" className="mb-2">
								{event.date}
							</Badge>
							<Card className={event.description ? "border-primary" : ""}>
								<CardContent className="p-4">
									<h3 className="text-lg font-semibold mb-2">{event.title}</h3>
									<p className="text-muted-foreground text-sm">
										{event.description}
									</p>
								</CardContent>
							</Card>
						</div>

						<div className="hidden md:block md:w-1/2"></div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
