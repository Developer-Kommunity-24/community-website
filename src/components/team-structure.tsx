"use client";

import { motion } from "framer-motion";
import { Compass, GraduationCap, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

interface TeamRoleCardProps {
	letter: string;
	title: string;
	description: string;
	icon: React.ElementType;
	delay: number;
}

function TeamRoleCard({
	letter,
	title,
	description,
	icon: Icon,
	delay,
}: TeamRoleCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay, duration: 0.5 }}
			className="flex flex-col items-center text-center"
		>
			<Card className="w-full h-full flex flex-col justify-between bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
				<CardContent className="p-6 flex flex-col items-center flex-grow">
					<div className="p-4 rounded-full bg-green-100 dark:bg-emerald-800 mb-4">
						<Icon className="h-8 w-8 text-green-700 dark:text-emerald-300" />
					</div>
					<h3 className="text-4xl font-extrabold text-green-800 dark:text-emerald-200 mb-2">
						{letter}
					</h3>
					<p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
						{title}
					</p>
					<p className="text-muted-foreground text-sm flex-grow">
						{description}
					</p>
				</CardContent>
			</Card>
		</motion.div>
	);
}

export function TeamStructure() {
	const { techie, explorer, advisor, mentor } = siteConfig.teamStructure;

	const teamRoles = [
		{
			letter: techie.letter,
			title: techie.title,
			description:
				"Eager learners building foundational skills through workshops and project contributions.",
			icon: Lightbulb,
		},
		{
			letter: explorer.letter,
			title: explorer.title,
			description:
				"Deep divers leading projects and mentoring others, specializing in key technologies.",
			icon: Compass,
		},
		{
			letter: advisor.letter,
			title: advisor.title,
			description:
				"Strategic guides connecting academic insights with industry best practices.",
			icon: Users,
		},
		{
			letter: mentor.letter,
			title: mentor.title,
			description:
				"Industry veterans providing invaluable career guidance and real-world expertise.",
			icon: GraduationCap,
		},
	];

	return (
		<div className="relative py-12">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="flex flex-col items-center"
			>
				<div className="w-full max-w-6xl">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{teamRoles.map((role, index) => (
							<TeamRoleCard
								key={role.letter}
								letter={role.letter}
								title={role.title}
								description={role.description}
								icon={role.icon}
								delay={0.1 + index * 0.1}
							/>
						))}
					</div>

					<div className="mt-20 text-center max-w-4xl mx-auto">
						<h2 className="text-4xl font-bold tracking-tight mb-6">
							How the TEAM Model Empowers Our Community
						</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							The TEAM model is designed for continuous growth and knowledge
							transfer. It ensures that every member, from aspiring beginners to
							seasoned professionals, finds their path to contribute, learn, and
							lead. This structured progression fosters a vibrant ecosystem
							where experience is shared, skills are honed, and innovation
							thrives across all levels of our community.
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
