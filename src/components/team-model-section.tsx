"use client";

import { Compass, GraduationCap, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function TeamModelSection() {
  const teamRoles = [
    {
      letter: siteConfig.teamStructure.techie.letter,
      title: siteConfig.teamStructure.techie.title,
      description: `${siteConfig.teamStructure.techie.years} students who are eager to learn and contribute`,
      icon: <Lightbulb className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      letter: siteConfig.teamStructure.explorer.letter,
      title: siteConfig.teamStructure.explorer.title,
      description: `${siteConfig.teamStructure.explorer.years} students who dive deeper into specific technologies`,
      icon: <Compass className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      letter: siteConfig.teamStructure.advisor.letter,
      title: siteConfig.teamStructure.advisor.title,
      description: `${siteConfig.teamStructure.advisor.years} students who provide strategic guidance to projects`,
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      letter: siteConfig.teamStructure.mentor.letter,
      title: siteConfig.teamStructure.mentor.title,
      description: `${siteConfig.teamStructure.mentor.years} who provide industry insights and connections to students`,
      icon: <GraduationCap className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <section id="team" className="container justify-center max-w-7xl mx-auto py-10 md:py-12 px-4 md:px-6 bg-muted/50 rounded-lg scroll-mt-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl font-bold mb-4">Community Structure</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our TEAM model creates a sustainable structure for knowledge sharing
          and growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {teamRoles.map((role, index) => (
          <div key={index} className="h-full">
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 md:p-6 flex flex-col flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-full ${role.color}`}>
                    {role.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-3xl font-bold ${role.textColor}`}>
                        {role.letter}
                      </span>
                      <span className="text-xl font-semibold">
                        {role.title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex items-end">
                  <p className="text-muted-foreground">{role.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
