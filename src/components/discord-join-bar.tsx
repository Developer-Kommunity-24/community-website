"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function DiscordJoinBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("discord-bar-dismissed");
    if (dismissed !== "true") {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("discord-bar-dismissed", "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 flex items-center justify-center text-sm">
      <p className="font-medium">
        Join our Discord community for the latest updates and discussions!
      </p>
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="ml-4 text-primary"
      >
        <a
          href="https://discord.gg/65MJZ2eDNp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Now
        </a>
      </Button>
      <Button
        onClick={handleDismiss}
        className="ml-4 text-primary-foreground/80 cursor-pointer hover:text-primary-foreground"
      >
        <X size={16} className="cursor-pointer" />
      </Button>
    </div>
  );
}
