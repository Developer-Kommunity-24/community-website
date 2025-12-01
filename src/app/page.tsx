import { BackgroundPattern } from "@/components/background-pattern";
import { HeroSection } from "@/components/hero-section";
import { TeamModelSection } from "@/components/team-model-section";
import { UpcomingEvents } from "@/components/upcoming-events";
import { VisionSection } from "@/components/vision-section";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export const metadata = generatePageMetadata({
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

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
