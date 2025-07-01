"use client";

import { motion, type Variants } from "framer-motion";
import { Compass, GraduationCap, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function TeamStructure() {
  const { techie, explorer, advisor, mentor } = siteConfig.teamStructure;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Subtle Background Elements - matching vision section */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-white to-green-50/10 dark:from-green-950/5 dark:via-background dark:to-green-950/5" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl -translate-x-28 translate-y-28" />

      <div className="container relative mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Techie Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group h-full"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                {/* Top Accent - consistent with vision cards */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

                <CardContent className="relative p-5 flex flex-col items-center text-center h-full">
                  {/* Icon with Subtle Background */}
                  <div className="relative mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {techie.letter}
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {techie.title}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {techie.years} students who are eager to learn and
                      contribute
                    </p>
                  </div>

                  {/* Subtle Bottom Accent */}
                  <div className="mt-6 w-8 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Explorer Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group h-full"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

                <CardContent className="relative p-5 flex flex-col items-center text-center h-full">
                  <div className="relative mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Compass className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {explorer.letter}
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {explorer.title}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {explorer.years} students who dive deeper into specific
                      technologies
                    </p>
                  </div>

                  <div className="mt-6 w-8 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Advisor Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group h-full"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

                <CardContent className="relative p-5 flex flex-col items-center text-center h-full">
                  <div className="relative mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {advisor.letter}
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {advisor.title}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {advisor.years} students who provide strategic guidance to
                      projects
                    </p>
                  </div>

                  <div className="mt-6 w-8 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Mentor Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group h-full"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                {/* Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

                <CardContent className="relative p-5 flex flex-col items-center text-center h-full">
                  <div className="relative mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800/50 dark:to-green-700/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {mentor.letter}
                    </h3>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {mentor.title}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {mentor.years} who provide industry insights and
                      connections
                    </p>
                  </div>

                  <div className="mt-6 w-8 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* How TEAM Model Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <Card className="bg-green-50/50 dark:bg-green-900/10 border border-green-100/80 dark:border-green-800/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                  How the TEAM Model Works
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  The TEAM model creates a sustainable structure where knowledge
                  flows from experienced members to newcomers, ensuring
                  continuity and growth of the community.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          Knowledge Transfer
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Mentors guide Advisors, who guide Explorers, who guide
                          Techies
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          Progressive Responsibility
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Members take on more responsibility as they move up
                          the ranks
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          Sustainable Growth
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          As students graduate, they become mentors, creating a
                          continuous cycle
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                          Cross-College Collaboration
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Each role includes members from different colleges,
                          fostering collaboration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
