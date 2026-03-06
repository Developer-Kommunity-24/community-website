import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Community } from "@/types";

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-2 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src={community.logo || "/placeholder.svg?height=100&width=100"}
            alt={community.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{community.name}</h3>
          <p className="text-sm text-muted-foreground">{community.college}</p>
        </div>
      </div>
      <CardContent className="px-6 pb-0">
        {community.description && (
          <p className="text-muted-foreground mb-4">{community.description}</p>
        )}
        {((community.pocs?.length ?? 0) > 0 ||
          (community.representatives?.length ?? 0) > 0) && (
          <div className="space-y-6 pt-4">
            {community.pocs && community.pocs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">POCs:</h4>
                <ul className="space-y-2">
                  {community.pocs.map((poc, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{poc.name}</span>
                      {poc.role && ` - ${poc.role}`}
                      {poc.email && (
                        <div className="text-sm text-muted-foreground">
                          {poc.email}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {community.representatives &&
              community.representatives.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Representatives:</h4>
                  <ul className="space-y-2">
                    {community.representatives.map((rep, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{rep.name}</span>
                        {rep.role && ` - ${rep.role}`}
                        {rep.email && (
                          <div className="text-sm text-muted-foreground">
                            {rep.email}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
      </CardContent>
      {community.website && (
        <CardFooter className="p-6 mt-auto">
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
        </CardFooter>
      )}
    </Card>
  );
}
