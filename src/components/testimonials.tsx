"use client";

import { motion, type Variants } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { testimonials } from "@/constants/testimonials";

export function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="testimonials" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="container relative mx-auto px-6 py-12 justify-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-700 mb-6">
            <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              What Our Community Says
            </span>
          </div>

          <h2 className="text-gray-900 dark:text-white text-4xl md:text-5xl font-bold mb-6 leading-tight py-1">
            Community Voices
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from the students and mentors who are part of{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {siteConfig.name}
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-200/50 dark:border-green-700/50 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
                {/* Card Header Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600" />
                {/* Floating Stars */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-1"></div>
                </div>

                <CardContent className="p-8 flex flex-col h-full relative">
                  {/* Quote Icon with Green Gradient */}
                  <div className="relative mb-6">
                    <Quote className="relative h-10 w-10 text-green-500 dark:text-green-400" />
                  </div>

                  {/* Quote Text */}
                  <div className="flex-1 mb-8">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>

                  {/* Author Section */}
                  <div className="flex items-center">
                    <div className="relative">
                      {/* Avatar Glow Effect */}
                      <Avatar className="relative h-12 w-12 border-2 border-white dark:border-background">
                        <AvatarImage
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="ml-4">
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
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
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center mt-16"
        ></motion.div>
      </div>
    </section>
  );
}
