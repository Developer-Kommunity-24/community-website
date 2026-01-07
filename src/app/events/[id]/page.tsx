import { promises as fs } from "node:fs";
import path from "node:path";
import { Calendar, Clock, MapPin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/lib/get-events";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    id: event.id,
  }));
}

async function getEventImages(eventId: string) {
  const postersDir = path.join(process.cwd(), "public", "events", "posters");
  const recapsDir = path.join(process.cwd(), "public", "events", eventId);

  let posterPath: string | null = null;
  const recapPaths: string[] = [];

  try {
    const posterFiles = await fs.readdir(postersDir);
    for (const file of posterFiles) {
      const extension = path.extname(file);
      const basename = path.basename(file, extension);
      if (basename === eventId) {
        posterPath = `/events/posters/${file}`;
        break;
      }
    }

    try {
      await fs.access(recapsDir);
      const recapFiles = await fs.readdir(recapsDir);
      for (const file of recapFiles) {
        recapPaths.push(`/events/${eventId}/${file}`);
      }
    } catch {}
  } catch (error) {
    console.error("Error reading event images:", error);
  }

  return { posterPath, recapPaths };
}

// biome-ignore lint/suspicious/noExplicitAny: params type is dynamic and handled by Next.js routing
// biome-ignore lint/suspicious/noExplicitAny: params type is dynamic and handled by Next.js routing
export async function generateMetadata({ params }: { params: any }) {
  const { id } = await Promise.resolve(params);
  const allEvents = await getEvents();
  const e = allEvents.find((x) => x.id === id);
  if (!e) return {};

  const { posterPath, recapPaths } = await getEventImages(id);
  const primaryImage = posterPath || recapPaths[0] || "/logo.png";

  return {
    metadataBase: new URL("https://dk24.org"),
    title: e.title,
    description: e.description,
    openGraph: {
      title: e.title,
      description: e.description,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: `${e.title} - DK24 Event`,
        },
      ],
      type: "website",
      siteName: "DK24",
      url: `/events/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: e.title,
      description: e.description,
      images: [primaryImage],
      creator: "@dk24community",
    },
  };
}

export default async function EventPage({
  params,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: params type is dynamic and handled by Next.js routing
  params: any;
}) {
  const resolvedParams = await Promise.resolve(params);
  const eventId = resolvedParams.id;

  if (!eventId || typeof eventId !== "string") {
    notFound();
  }

  const allEvents = await getEvents();
  const event = allEvents.find((event) => event.id === eventId);

  if (!event) {
    notFound();
  }

  const { posterPath, recapPaths } = await getEventImages(eventId);
  const isUpcoming = new Date(event.startDateTime) > new Date();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="md:w-1/2">
          <div className="overflow-hidden hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 border-green-100/50 dark:border-green-800/50 bg-linear-to-b from-white to-green-50/30 dark:from-background dark:to-green-950/20 rounded-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">
                {event?.title}
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center group">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/40 mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
                    <Calendar className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {event?.startDateTime}
                  </span>
                </div>
                {event?.time && (
                  <div className="flex items-center group">
                    <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/40 mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
                      <Clock className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {event?.time}
                    </span>
                  </div>
                )}
                <div className="flex items-center group">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/40 mr-3 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {event?.location}
                  </span>
                </div>
                {!isUpcoming && event.youtubeLink ? (
                  <Link
                    href={event.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/40 mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-800/60 transition-colors">
                      <Youtube className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Watch Recording
                    </span>
                  </Link>
                ) : null}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {event?.description}
              </p>

              {isUpcoming && (
                <div className="mt-8 space-y-3 flex gap-4">
                  {event.registrationLink && (
                    <Button asChild>
                      <Link
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register Now
                      </Link>
                    </Button>
                  )}

                  {event.joinLink && (
                    <Button asChild variant="secondary">
                      <Link
                        href={event.joinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Event
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex md:p-4">
          {posterPath && (
            <div className="relative w-full aspect-square md:aspect-auto flex-1 min-h-75">
              <Image
                src={posterPath || "/placeholder.svg"}
                alt={`${event.title} Poster`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-2xl!"
                priority
              />
            </div>
          )}
        </div>
      </div>
      {recapPaths.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Event Recap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recapPaths.map((src, index) => (
              <div
                key={index}
                className="relative w-full rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`${event.title} Recap Image ${index + 1}`}
                  width={600}
                  height={600}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
