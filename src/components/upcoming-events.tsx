"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, MapPin, Clock } from "lucide-react"
import { siteConfig } from "@/config/site"

export function UpcomingEvents() {
  const events = siteConfig.events.upcoming

  return (
    <section className="container mx-auto px-4 py-12 bg-muted/50 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl">Join us for workshops, hackathons, and community gatherings</p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/events">View All Events</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardContent className="p-6 flex-1">
                <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{event.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href={event.registrationLink}>Register Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

