import { BackgroundPattern } from "@/components/background-pattern";
import { EventSubmissionForm } from "@/components/event-submission-form";
import { PageHeader } from "@/components/page-header";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Submit Event",
  description:
    "Submit your tech event to be featured on DK24. Share conferences, meetups, workshops, and other tech events with the Mangalore tech community.",
  path: "/showcase-event",
});

export default function SubmitEventPage() {
  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <PageHeader
          title="Showcase Your Event"
          description="Get your tech event on the Mangalore Tech Calendar."
        />

        <div className="mt-12">
          <EventSubmissionForm />
        </div>
      </div>
    </BackgroundPattern>
  );
}
