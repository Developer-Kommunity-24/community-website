"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { projects } from "@/constants/projects";

export function FeaturedProjects() {
	if (projects.length === 0) return null;

	return (
		<section className="container mx-auto py-12 justify-center max-w-7xl">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 px-4">
				<div>
					<h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
					<p className="text-muted-foreground max-w-2xl">
						Collaborative projects built by students across different colleges
					</p>
				</div>
				<Button asChild className="mt-4 md:mt-0">
					<Link href="/projects">View All Projects</Link>
				</Button>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
				{projects.map((project, index) => (
					<div key={index}>
						<Card className="h-full flex flex-col overflow-hidden">
							<div className="relative h-48 w-full">
								<Image
									src={project.image || "/placeholder.svg?height=200&width=400"}
									alt={project.title}
									fill
									className="object-cover"
								/>
							</div>
							<CardContent className="p-6 flex-1">
								<h3 className="text-xl font-semibold mb-2">{project.title}</h3>
								<p className="text-muted-foreground mb-4">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, i) => (
										<Badge key={i} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</CardContent>
							<CardFooter className="p-6 pt-0 flex justify-between">
								<Button variant="outline" size="sm" asChild>
									<Link
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Github className="h-4 w-4 mr-2" />
										Code
									</Link>
								</Button>
								<Button size="sm" asChild>
									<Link
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										<ExternalLink className="h-4 w-4 mr-2" />
										Demo
									</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				))}
			</div>
		</section>
	);
}
