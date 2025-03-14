"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Lightbulb, Compass, Users } from "lucide-react"
import { siteConfig } from "@/config/site"

export function TeamStructure() {
  const { techie, explorer, advisor, mentor } = siteConfig.teamStructure

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-800 mr-4">
                      <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{techie.letter}</h3>
                      <p className="text-lg font-medium">{techie.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{techie.years} students who are eager to learn and contribute</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-800 mr-4">
                      <Compass className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{explorer.letter}</h3>
                      <p className="text-lg font-medium">{explorer.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {explorer.years} students who dive deeper into specific technologies
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-800 mr-4">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{advisor.letter}</h3>
                      <p className="text-lg font-medium">{advisor.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    {advisor.years} students who provide strategic guidance to projects
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-800 mr-4">
                      <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{mentor.letter}</h3>
                      <p className="text-lg font-medium">{mentor.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{mentor.years} who provide industry insights and connections</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-4">How the TEAM Model Works</h3>
            <p className="text-muted-foreground mb-4">
              The TEAM model creates a sustainable structure where knowledge flows from experienced members to
              newcomers, ensuring continuity and growth of the community.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Knowledge Transfer:</strong> Mentors guide Advisors, who guide Explorers, who guide Techies
              </li>
              <li>
                <strong>Progressive Responsibility:</strong> Members take on more responsibility as they move up the
                ranks
              </li>
              <li>
                <strong>Sustainable Growth:</strong> As students graduate, they become mentors, creating a continuous
                cycle
              </li>
              <li>
                <strong>Cross-College Collaboration:</strong> Each role includes members from different colleges,
                fostering collaboration
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

