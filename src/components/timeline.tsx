"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Calendar,
  Users,
  Trophy,
  Rocket,
  Code,
  Network,
  TrendingUp,
} from "lucide-react";

export function Timeline() {
  const timelineEvents = [
    {
      date: "October 2023",
      title: "Initial Discussions",
      description:
        "Representatives from SOSC, DevNation, and FiniteLoop met to discuss the possibility of a unified tech community across colleges in Mangalore.",
      icon: Users,
    },
    {
      date: "November 2023",
      title: "Community Planning",
      description:
        "The TEAM model was conceptualized, and the vision for DK24 was drafted with input from student leaders and faculty advisors.",
      icon: Calendar,
    },
    {
      date: "December 2023",
      title: "DK24 Summit 2023",
      description:
        "The inaugural summit brought together tech communities from 6 colleges to officially establish DK24 and set the vision for the future.",
      highlight: true,
      icon: Trophy,
    },
    {
      date: "January 2024",
      title: "First Collaborative Projects",
      description:
        "Three collaborative projects were initiated with students from different colleges working together in mixed teams.",
      icon: Code,
    },
    {
      date: "February 2024",
      title: "Build for Mangalore Hackathon",
      description:
        "The first major event organized by DK24, bringing together over 200 students to build solutions for local problems.",
      highlight: true,
      icon: Rocket,
    },
    {
      date: "March 2024",
      title: "Mentor Network Launch",
      description:
        "A network of industry professionals and alumni was established to mentor students and provide guidance on projects.",
      icon: Network,
    },
    {
      date: "April 2024",
      title: "Community Growth",
      description:
        "DK24 expanded to include two more college communities, bringing the total to 8 member colleges across Mangalore.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="relative py-12">
      {/* Timeline line with gradient */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-200 via-green-300 to-green-200 dark:from-green-800 dark:via-green-600 dark:to-green-800 transform -translate-x-1/2"></div>

      <div className="space-y-16">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot with icon */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    event.highlight
                      ? "bg-gradient-to-br from-green-400 to-green-500 border-2 border-green-200 dark:border-green-700"
                      : "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-2 border-green-200 dark:border-green-700"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      event.highlight
                        ? "text-white"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  />
                </div>
              </div>

              {/* Content */}
              <div
                className={`md:w-1/2 ml-20 md:ml-0 ${
                  index % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:pl-16 md:text-left"
                }`}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="outline"
                    className="mb-3 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300"
                  >
                    {event.date}
                  </Badge>

                  <Card
                    className={`backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                      event.highlight
                        ? "border-green-300 dark:border-green-600 bg-gradient-to-br from-green-50/50 to-white dark:from-green-900/20 dark:to-background shadow-green-100 dark:shadow-green-900/20"
                        : "border-green-100 dark:border-green-800/50 bg-white/80 dark:bg-background/80 hover:border-green-200 dark:hover:border-green-700"
                    }`}
                  >
                    <CardContent className="p-6">
                      <h3
                        className={`text-xl font-semibold mb-3 ${
                          event.highlight
                            ? "text-green-800 dark:text-green-200"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Subtle accent line */}
                      <div
                        className={`mt-4 h-px w-12 ${
                          index % 2 === 0 ? "md:ml-auto" : ""
                        } ${
                          event.highlight
                            ? "bg-gradient-to-r from-green-400 to-green-500"
                            : "bg-gradient-to-r from-green-200 to-green-300 dark:from-green-700 dark:to-green-600"
                        }`}
                      ></div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
