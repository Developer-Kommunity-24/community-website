"use client";

import { motion, Variants } from "framer-motion";
import { Code2 } from "lucide-react";
import { projects } from "@/constants/projects";
import { ProjectCard } from "@/components/project-card";

export function FeaturedProjects() {
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

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Subtle Background Elements - matching vision section */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-white to-green-50/10 dark:from-green-950/5 dark:via-background dark:to-green-950/5" />
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
            <Code2 className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-300">
              Featured Projects
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Collaborative projects built by students across different colleges
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
