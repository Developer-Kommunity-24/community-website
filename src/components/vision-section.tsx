"use client";

import { motion, type Variants } from "framer-motion";
import { Code, Globe, Lightbulb, Sparkles, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function VisionSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const visionPoints = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Innovation",
      description:
        "Fostering a culture of innovation and creative problem-solving across colleges",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Collaboration",
      description:
        "Breaking down silos between college communities to work together",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Learning in Public",
      description:
        "Encouraging students to share their learning journey and build in the open",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Ecosystem Building",
      description:
        "Creating a thriving tech ecosystem in Mangalore for the next generation",
    },
  ];

  return (
    <section
      id="vision"
      className="relative py-16 overflow-hidden max-w-7xl mx-auto"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-green-50/20 via-white to-green-50/10 dark:from-green-950/5 dark:via-background dark:to-green-950/5" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl -translate-x-28 translate-y-28" />

      <div className="container relative mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 mb-5">
            <Target className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-300">
              Our Vision & Mission
            </span>
          </div>

          <h2 className="md:text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200">
            Building Tomorrow's{" "}
            <span className="text-green-600 dark:text-green-400">
              Tech Ecosystem
            </span>
          </h2>

          {/* Vision Statement with Better Proportions */}
          <div className="max-w-5xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 rounded-xl bg-green-50/50 dark:bg-green-900/10 border border-green-100/80 dark:border-green-800/30 backdrop-blur-sm"
            >
              <div className="absolute top-4 left-4">
                <Sparkles className="h-5 w-5 text-green-400 dark:text-green-500" />
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-medium leading-relaxed mb-6 pl-6">
                "{siteConfig.vision}"
              </blockquote>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed pl-6">
                {siteConfig.visionDetail}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Vision Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                {/* Evenly Spread Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

                <CardContent className="relative pt-8 px-5 pb-5 flex flex-col items-center text-center h-full">
                  {/* Icon with Subtle Background */}
                  <div className="relative mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-green-600 dark:text-green-400">
                        {point.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                    {point.description}
                  </p>

                  {/* Subtle Bottom Accent */}
                  <div className="mt-7 w-8 h-px bg-linear-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-16"
        ></motion.div>
      </div>
    </section>
  );
}
