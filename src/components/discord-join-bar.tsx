"use client"; //client component

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

//interface for props
interface DiscordJoinBarProps {
  onDismiss?: () => void;
}

export function DiscordJoinBar({ onDismiss }: DiscordJoinBarProps) {
  //state mananagement for visibility of the bar
  const [isVisible, setIsVisible] = useState(false);
  //side effect to check local storage for dismissal status on mount
  useEffect(() => {
    const dismissed = localStorage.getItem("discord-join-bar-dismissed");
    if (dismissed !== "true") {
      setIsVisible(true);
    }
  }, []);

  //dismiss handler to hide the bar and set local storage flag
  const handleDimiss = () => {
    setIsVisible(false);
    localStorage.setItem("discord-bar-dismissed", "true");
    onDismiss?.();
  };
  //conditional render( early return) if the bar is not visible
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
        onClick={handleDimiss}
        variant="ghost"
        size="sm"
        className="ml-2 text-primary-foreground/80 cursor-pointer  shrink-0"
      >
        <X size={16} />
      </Button>
    </div>
  );
}
