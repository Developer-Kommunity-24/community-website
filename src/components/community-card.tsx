import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Community } from "@/types";

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Card className="grid grid-rows-[auto_auto_auto_auto_auto] md:row-span-5 md:grid-rows-subgrid h-full overflow-hidden">
      {/* Row 1: Header */}
      <div className="p-6 pb-2 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src={community.logo || "/placeholder.svg?height=100&width=100"}
            alt={community.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold leading-tight">
            {community.name}
          </h3>
          <p className="text-sm text-muted-foreground">{community.college}</p>
        </div>
      </div>

      {/* Row 2: Description */}
      <div className="px-6 py-2">
        <h4 className="text-sm font-semibold mb-2">Description</h4>
        <div className="text-sm text-muted-foreground">
          {community.description}
        </div>
      </div>

      {/* Row 3: POCs */}
      <div className="px-6 py-2">
        <h4 className="text-sm font-semibold mb-2">POCs</h4>
        <ul className="space-y-2">
          {community.pocs?.map((poc, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{poc.name}</span>
              {poc.role && ` - ${poc.role}`}
              {poc.email && (
                <div className="text-xs text-muted-foreground">{poc.email}</div>
              )}
            </li>
          ))}
          {(!community.pocs || community.pocs.length === 0) && (
            <li className="text-sm text-muted-foreground italic">
              No POCs listed
            </li>
          )}
        </ul>
      </div>

      {/* Row 4: Representatives */}
      <div className="px-6 py-2">
        <h4 className="text-sm font-semibold mb-2">Representatives</h4>
        <ul className="space-y-2">
          {community.representatives?.map((rep, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{rep.name}</span>
              {rep.role && ` - ${rep.role}`}
              {rep.email && (
                <div className="text-xs text-muted-foreground">{rep.email}</div>
              )}
            </li>
          ))}
          {(!community.representatives ||
            community.representatives.length === 0) && (
            <li className="text-sm text-muted-foreground italic">
              No representatives listed
            </li>
          )}
        </ul>
      </div>

      {/* Row 5: Website */}
      <div className="px-6 py-2">
        <h4 className="text-sm font-semibold mb-2">Website</h4>
        {community.website ? (
          <Button variant="outline" className="w-full" asChild>
            <a
              href={community.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </a>
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            No website available
          </p>
        )}
      </div>
    </Card>
  );
}
