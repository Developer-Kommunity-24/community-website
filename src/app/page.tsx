import { FeaturedProjects } from "@/components/featured-projects";
import { HeroSection } from "@/components/hero-section";
import { TeamModelSection } from "@/components/team-model-section";
import { Testimonials } from "@/components/testimonials";
import { UpcomingEvents } from "@/components/upcoming-events";
import { VisionSection } from "@/components/vision-section";

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
  );
}
