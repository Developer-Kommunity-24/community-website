"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Lightbulb, Compass, Users } from "lucide-react"
import { siteConfig } from "@/config/site"

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
      description: `${siteConfig.teamStructure.mentor.years} who provide industry insights and connections`,
      icon: <GraduationCap className="h-6 w-6" />,
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12 bg-muted/50 rounded-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Community Structure</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our TEAM model creates a sustainable structure for knowledge sharing and growth
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamRoles.map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-full ${role.color}`}>{role.icon}</div>
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-3xl font-bold ${role.textColor}`}>{role.letter}</span>
                      <span className="text-xl font-semibold">{role.title}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

