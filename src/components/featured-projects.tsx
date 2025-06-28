"use client"

import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Github, ExternalLink, Code2, Target } from "lucide-react"
import Image from "next/image"

export function FeaturedProjects() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const projects = [
    {
      title: "FileTailored",
      description: "FileTailored is reimagining the file conversion space by solving the #1 pain point for companies and professionals: lack of customization and formatting accuracy in current converters.",
      tags: ["HTML", "CSS", "JavaScript", "FastAPI", "Google Analytics", "Firebase"],
      image: "/Filetailored.png?height=50&width=100",
      github: "#",
      demo: "https://filetailored.com"
    },
    {
      title: "Daily Dine",
      description: "Daily Dine's real-time reservation app reduces restaurant wait times, streamlines dining, and improves customer satisfaction by enabling efficient table pre-booking and crowd management.",
      tags: ["Flutter", "Django", "PostgreSQL"],
      image: "/DailyDine.png?height=200&width=400",
      github: "#", 
      demo: "#"
    },
    {
      title: "EVMA",
      description: "A self-hosted, customizable test platform for competitive programming and assessments with MCQs and coding questions. It offers full control over test creation, scheduling, evaluation, and cheating prevention. Features include a live multi-language code editor, question randomization, centralized question bank, and plugin-based extensibility. Built on a scalable NoSQL backend, it’s a flexible, affordable alternative to platforms like Unstop.",
      tags: ["Flutter", "Django", "PostgreSQL"],
      image: "",
      github: "#", 
      demo: "#"
    }
  ]

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
            <span className="text-xs font-medium text-green-600 dark:text-green-300">Featured Projects</span>
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                {/* Top Accent - consistent with vision cards */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />
                
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={project.image || "/placeholder.svg?height=200&width=400"}
                    alt={project.title}
                    fill
                    className="object-contain group-hover:scale-101 transition-transform duration-500"
                  />
                  {/* Overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="relative px-6 py-4 flex-1">
                  {/* Project Title */}
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Project Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary"
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between gap-3">
                  <Button variant="outline" size="sm" className="flex-1 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20" asChild>
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Github
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-green-400 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400" asChild>
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Project
                    </Link>
                  </Button>
                </CardFooter>
                
                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}