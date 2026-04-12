"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface DiscordJoinBannerProps {
  onDismiss?: () => void;
}
export function DiscordJoinBar({ onDismiss }: DiscordJoinBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  // Hide the banner if the user has already dismissed it in the past
  useEffect(() => {
    const dismissed = localStorage.getItem("discord-bar-dismissed");
    if (dismissed !== "true") {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("discord-bar-dismissed", "true");
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 flex items-center justify-center text-sm">
      {/*message text and join button */}
      <p className="font-medium text-center">
        Join our Discord community for the latest updates and discussions!
      </p>
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="ml-4 text-primary shrink-0"
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
        variant="ghost"
        size="sm"
        className="ml-2 text-primary-foreground cursor-pointer  shrink-0"
      >
        <X size={16} />
      </Button>
    </div>
  );
}
