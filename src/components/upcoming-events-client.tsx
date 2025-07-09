"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, MapPin, Clock, CalendarDays } from "lucide-react";
import type { Event } from "@/types";

const UpcomingEventsClient = ({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: Event[];
  pastEvents: Event[];
}) => {
  const isUpcomingtrue = upcomingEvents.length > 0;
  const displayEvents = isUpcomingtrue ? upcomingEvents : pastEvents;
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
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section id="upcoming-events" className="relative py-16 overflow-hidden">
      {/* Subtle Background Elements - matching other sections */}
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
            <CalendarDays className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-300">
              Events
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {isUpcomingtrue ? "Upcoming Events" : "Past Events"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Join us for workshops, hackathons, and community gatherings
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {displayEvents.map((event, index) => (
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
                {/* Top Accent - consistent with other cards */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-100/40 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

                <CardContent
                  className={`relative pt-8 px-6 ${isUpcomingtrue && "pb-4"} flex-1`}
                >
                  {/* Event Title */}
                  <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Event Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    {event.description}
                  </p>
                </CardContent>

                <CardFooter className={`px-6 pt-0`}>
                  {isUpcomingtrue && (
                    <Button
                      className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-400"
                      asChild
                    >
                      <Link href={event.registrationLink}>Register now</Link>
                    </Button>
                  )}
                </CardFooter>

                {/* Subtle Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {isUpcomingtrue && (
          <div className="mt-10 text-center">
            <Button variant="link">
              <Link href="/events">View All Events →</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEventsClient;
