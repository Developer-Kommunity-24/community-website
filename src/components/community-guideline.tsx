"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const steps = [
  {
    title: "Techie to Explorer",
    description:
      "Demonstrate consistent participation, complete learning paths, and contribute to 2-3 projects.",
  },
  {
    title: "Explorer to Advisor",
    description:
      "Lead a significant project, mentor Techies, and develop expertise in a specific area.",
  },
  {
    title: "Advisor to Mentor",
    description:
      "Graduate, gain industry experience, and commit to supporting the next generation.",
  },
];

export function CommunityGuideline() {
  return (
    <div className="bg-muted/50 rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Your Journey Through the Community
      </h3>
      <div className="relative">
        <div
          className="absolute left-3.5 top-5 bottom-10 w-1 bg-border rounded-full md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:h-1 md:w-auto md:bottom-auto"
          aria-hidden="true"
        />
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold z-10">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="hidden md:block text-muted-foreground" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
