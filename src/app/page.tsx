import { HeroSection } from "@/components/hero-section"
import { VisionSection } from "@/components/vision-section"
import { TeamModelSection } from "@/components/team-model-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      <VisionSection />
      <TeamModelSection />
      <FeaturedProjects />
      <UpcomingEvents />
      <Testimonials />
    </div>
  )
}

