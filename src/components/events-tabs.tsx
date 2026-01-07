"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ClientContainer } from "@/calendar/components/client-container";

export function EventsTabs() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "past" ? "past" : "upcoming";

  return (
    <Tabs defaultValue={defaultTab} className="mt-8">
      <TabsContent value="upcoming">
        {/* Mobile View with Tabs for transitioning between Month and Agenda */}
        <div className="lg:hidden">
          <Tabs defaultValue="month" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger
                  value="agenda"
                  className="inline-flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  Agenda
                </TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              <Link href="/showcase-event">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </Link>
            </div>
            <TabsContent value="agenda" className="mt-0">
              <ClientContainer view="agenda" />
            </TabsContent>
            <TabsContent value="month" className="mt-0">
              <ClientContainer view="month" hideHeader={false} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View: Side-by-Side */}
        <div className="hidden lg:flex lg:gap-6 items-stretch">
          <div className="lg:w-1/2">
            <ClientContainer view="agenda" hideHeader={true} />
          </div>
          <div className="lg:w-1/2">
            <ClientContainer view="month" />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="past">
        <div className="py-10 text-center text-muted-foreground">
          Past events archive coming soon.
        </div>
      </TabsContent>
    </Tabs>
  );
}
