"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { siteConfig } from "@/config/site"

export function Testimonials() {
  const testimonials = siteConfig.testimonials

  return (
    <section className="container mx-auto px-6 py-12 justify-center max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Community Voices</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hear from the students and mentors who are part of {siteConfig.name}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-muted-foreground flex-1 mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}