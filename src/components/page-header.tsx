"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
	title: string;
	description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<div className="text-center">
			<motion.h1
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-4xl font-bold tracking-tight"
			>
				{title}
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
			>
				{description}
			</motion.p>
		</div>
	);
}
