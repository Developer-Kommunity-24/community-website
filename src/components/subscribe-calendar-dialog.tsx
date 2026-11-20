"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { CalendarPlus, Check, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/r/settings/addbyurl";

interface SubscribeCalendarDialogProps {
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
}

export function SubscribeCalendarDialog({
  size = "sm",
  className,
}: SubscribeCalendarDialogProps) {
  const [feedUrl, setFeedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setFeedUrl(`${window.location.origin}/api/v1/calendar/subscribe`);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  const handleEmailSubscribe = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await fetch("/api/v1/email-subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe right now.");
      }

      if (data.status === "already_subscribed") {
        setError(true);
        setMessage(data.message);
      } else {
        setError(false);
        setMessage(data.message || "Subscription successful!");
      }

      setEmail("");
    } catch (err) {
      setError(true);
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={size} className={className}>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Subscribe
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to DK24</DialogTitle>
          <DialogDescription>
            Stay connected with upcoming community events.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5" />
              <h3 className="font-semibold">Calendar Subscription</h3>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Subscribe to DK24 events in your calendar:</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Copy the calendar feed URL using the copy button.</li>
                <li>
                  Click <strong>Go to Google Calendar</strong>.
                </li>
                <li>
                  Paste the copied feed URL and click{" "}
                  <strong>Add calendar</strong>.
                </li>
              </ol>
              <p>
                If you use another calendar application, paste the URL into its
                calendar subscription option.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="min-w-0 flex-1 break-all rounded-md border bg-muted p-3 text-xs">
                {feedUrl || "Loading feed URL..."}
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                disabled={!feedUrl}
                aria-label="Copy calendar feed URL"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {copied && <p className="text-sm text-green-600">Copied!</p>}

            {copyError && (
              <p className="text-sm text-destructive" role="alert">
                Unable to copy the URL. Please copy it manually.
              </p>
            )}

            <Button
              type="button"
              className="w-full"
              disabled={!feedUrl}
              onClick={() =>
                window.open(
                  GOOGLE_CALENDAR_URL,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Go to Google Calendar
            </Button>
          </div>

          <div className="border-t pt-5 space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <h3 className="font-semibold">Email Subscription</h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Receive upcoming DK24 event updates twice a month.
            </p>

            <form onSubmit={handleEmailSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={255}
                required
                disabled={loading}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !email.trim()}
              >
                {loading ? "Subscribing..." : "Subscribe via Email"}
              </Button>
            </form>

            {message && (
              <p
                className={`text-sm ${
                  error ? "text-destructive" : "text-green-600"
                }`}
                role={error ? "alert" : "status"}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
