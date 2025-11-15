import { BackgroundPattern } from "@/components/background-pattern";
import { HeroSection } from "@/components/hero-section";
import { TeamModelSection } from "@/components/team-model-section";
import { UpcomingEvents } from "@/components/upcoming-events";
import { VisionSection } from "@/components/vision-section";

export default function Home() {
  return (
    <BackgroundPattern variant="hero">
      <div className="flex flex-col gap-16 py-8">
        <HeroSection />
        <VisionSection />
        <TeamModelSection />
        {/* <FeaturedProjects /> */}
        <UpcomingEvents />
        {/* <Testimonials /> */}
      </div>
    </BackgroundPattern>
  );
}
