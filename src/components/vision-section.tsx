"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Code, Globe } from "lucide-react"
import { siteConfig } from "@/config/site"

export function VisionSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  const visionPoints = [
    {
      icon: <Lightbulb className="h-8 w-8 text-green-500" />,
      title: "Innovation",
      description: "Fostering a culture of innovation and creative problem-solving across colleges",
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Collaboration",
      description: "Breaking down silos between college communities to work together",
    },
    {
      icon: <Code className="h-8 w-8 text-green-500" />,
      title: "Learning in Public",
      description: "Encouraging students to share their learning journey and build in the open",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Ecosystem Building",
      description: "Creating a thriving tech ecosystem in Mangalore for the next generation",
    },
  ]

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{siteConfig.vision}</p>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{siteConfig.visionDetail}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {visionPoints.map((point, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">{point.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}