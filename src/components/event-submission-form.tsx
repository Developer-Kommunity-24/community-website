"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";
import { Check, X, Loader2, Info, ExternalLink } from "lucide-react";
import { captureError, captureEvent } from "@/lib/posthog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitFormData } from "@/lib/form-submission";
import {
  type EventSubmissionFormValues,
  eventSubmissionSchema,
  eventTagOptions,
} from "@/lib/forms-config";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export function EventSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isCheckingImage, setIsCheckingImage] = useState(false);
  const [imageCheckError, setImageCheckError] = useState<string | null>(null);
  const [imageCheckWarning, setImageCheckWarning] = useState<string | null>(
    null,
  );
  const [isImageVerified, setIsImageVerified] = useState(false);
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    trigger,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    control,
  } = useForm<EventSubmissionFormValues>({
    resolver: zodResolver(eventSubmissionSchema),
    defaultValues: {
      eventName: "",
      organizationName: "",
      startDateTime: "",
      endDateTime: "",
      eventLocation: "",
      eventWebsite: "",
      registrationLink: "",
      eventDescription: "",
      eventPosterUrl: "",
      eventTags: [],
      submittedBy: "",
      submittedEmail: "",
      emailConsentChecked: false,
      isEmailVerified: false,
    },
    mode: "onChange",
  });

  const formatDateTimeLocal = (d: Date) => {
    return format(d, "yyyy-MM-dd'T'HH:mm:ss.SSS");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: only run on mount
  useEffect(() => {
    const currentStart = getValues("startDateTime");
    const currentEnd = getValues("endDateTime");
    if (!currentStart && !currentEnd) {
      const now = new Date();
      const start = new Date(now);
      start.setHours(10, 0, 0, 0);
      const end = new Date(start);
      end.setHours(17, 0, 0, 0);
      setValue("startDateTime", formatDateTimeLocal(start));
      setValue("endDateTime", formatDateTimeLocal(end));
    }
  }, [getValues, setValue]);

  const selectedTags = watch("eventTags");
  const startDateTime = watch("startDateTime");

  const validateImageUrl = async (url: string) => {
    if (!url) {
      setImageCheckError(null);
      setImageCheckWarning(null);
      setIsCheckingImage(false);
      setIsImageVerified(false);
      return true;
    }

    try {
      new URL(url);
    } catch {
      setIsImageVerified(false);
      setImageCheckError("Please enter a valid URL.");
      return false;
    }

    // Domain Check
    const blockedDomains = [
      "drive.google.com",
      "docs.google.com",
      "photos.google.com",
      "dropbox.com",
      "icloud.com",
    ];
    try {
      const urlObj = new URL(url);
      const isBlocked = blockedDomains.some((domain) =>
        urlObj.hostname.includes(domain),
      );

      if (isBlocked) {
        const domainMatch = blockedDomains.find((d) =>
          urlObj.hostname.includes(d),
        );
        const errorMsg = `${domainMatch} doesn't serve direct image URLs. Please use a hosting service.`;
        setImageCheckError(errorMsg);
        setIsImageVerified(false);
        return false;
      }
    } catch {
      // Handled above
    }

    // Extension Check
    const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];
    const hasValidExtension = validExtensions.some((ext) =>
      url.toLowerCase().split("?")[0].endsWith(ext),
    );

    if (!hasValidExtension) {
      setImageCheckWarning(
        "URL doesn't end with a known image extension. Make sure it serves a raw image file.",
      );
    } else {
      setImageCheckWarning(null);
    }

    setIsCheckingImage(true);
    setImageCheckError(null);
    setIsImageVerified(false);

    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        setIsCheckingImage(false);
        setImageCheckError(null);
        setIsImageVerified(true);
        clearErrors("eventPosterUrl");
        resolve(true);
      };

      img.onerror = () => {
        setIsCheckingImage(false);
        const errorMsg =
          "URL looks valid but the image couldn't load. Check the link is publicly accessible.";
        setImageCheckError(errorMsg);
        setIsImageVerified(false);
        setError("eventPosterUrl", {
          type: "manual",
          message: errorMsg,
        });
        resolve(false);
      };
    });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const currentTags = selectedTags || [];
    if (checked) {
      setValue("eventTags", [...currentTags, tag]);
    } else {
      setValue(
        "eventTags",
        currentTags.filter((t) => t !== tag),
      );
    }
    trigger("eventTags");
  };

  const onSubmit: SubmitHandler<EventSubmissionFormValues> = async (data) => {
    // Re-validate image before submission
    if (data.eventPosterUrl) {
      const isValidImage = await validateImageUrl(data.eventPosterUrl);
      if (!isValidImage) {
        setSubmitError("Please provide a valid image URL.");
        return;
      }
    }

    const isFormValid = await trigger();
    if (!isFormValid) {
      setSubmitError("Please fix all validation errors before showcasing.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...data,
        startDateTime: `${data.startDateTime}+05:30`,
        endDateTime: `${data.endDateTime}+05:30`,
        isEmailVerified: false,
      };

      await submitFormData("event", payload);
      setSubmitSuccess(true);

      // Track successful event submission
      captureEvent("form_submitted", {
        form_type: "event_submission",
        success: true,
        event_name: data.eventName,
        organization: data.organizationName,
        tags: data.eventTags,
      });

      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Failed to showcase event. Please try again.");

      // Track event submission error
      captureError(error instanceof Error ? error : "Event submission failed", {
        component: "EventSubmissionForm",
        action: "form_submission",
        form_type: "event_submission",
        submitted_by: data.submittedBy,
        submitted_email: data.submittedEmail,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
              Event Showcased Successfully!
            </h3>
            <p className="text-muted-foreground">
              Thank you for showcasing your event. Our team will review it and
              get back to you soon. All showcased events are verified before
              getting published. If urgent, please email us.
            </p>
            <Button
              onClick={() => {
                setSubmitSuccess(false);
                reset();
              }}
              variant="outline"
            >
              Showcase Another Event
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <CardContent className="space-y-8">
          {submitError && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-destructive text-sm">{submitError}</p>
            </div>
          )}

          {/* Event Details Section */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  {...register("eventName")}
                  placeholder="AI Innovations Summit 2026"
                />
                {errors.eventName && (
                  <p className="text-destructive text-sm">
                    {errors.eventName.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  {...register("organizationName")}
                  placeholder="TechFuture"
                />
                {errors.organizationName && (
                  <p className="text-destructive text-sm">
                    {errors.organizationName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="startDateTime">
                  Start Date & Time * (IST, +5:30)
                </Label>
                <Controller
                  name="startDateTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      value={field.value ? new Date(field.value) : new Date()}
                      minDate={new Date()}
                      onChange={(date) => {
                        const formattedDate = formatDateTimeLocal(date);
                        field.onChange(formattedDate);
                        const start = new Date(date);
                        const endCandidate = new Date(start);
                        endCandidate.setHours(17, 0, 0, 0);

                        let finalEnd = endCandidate;
                        if (start.getTime() > endCandidate.getTime()) {
                          finalEnd = new Date(
                            start.getTime() + 2 * 60 * 60 * 1000,
                          );
                        }
                        setValue("endDateTime", formatDateTimeLocal(finalEnd));
                        trigger("endDateTime");
                      }}
                    />
                  )}
                />
                {errors.startDateTime && (
                  <p className="text-destructive text-sm">
                    {errors.startDateTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="endDateTime">
                  End Date & Time * (IST, +5:30)
                </Label>
                <Controller
                  name="endDateTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      value={field.value ? new Date(field.value) : new Date()}
                      minDate={
                        startDateTime ? new Date(startDateTime) : undefined
                      }
                      onChange={(date) =>
                        field.onChange(formatDateTimeLocal(date))
                      }
                    />
                  )}
                />
                {errors.endDateTime && (
                  <p className="text-destructive text-sm">
                    {errors.endDateTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="eventLocation">Event Location *</Label>
              <Input
                id="eventLocation"
                {...register("eventLocation")}
                placeholder="TMA Pai, Mangalore"
              />
              {errors.eventLocation && (
                <p className="text-destructive text-sm">
                  {errors.eventLocation.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="eventDescription">Event Description *</Label>
              <Textarea
                id="eventDescription"
                {...register("eventDescription")}
                placeholder="A two-day conference on AI, ML, and applied research..."
                className="min-h-25"
              />
              {errors.eventDescription && (
                <p className="text-destructive text-sm">
                  {errors.eventDescription.message}
                </p>
              )}
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-8">
            <h3 className="text-lg font-medium">Links & Media</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="eventWebsite">Event Website</Label>
                <Input
                  id="eventWebsite"
                  type="url"
                  {...register("eventWebsite")}
                  placeholder="https://techfuture.org/ai-summit-2026"
                />
                {errors.eventWebsite && (
                  <p className="text-destructive text-sm">
                    {errors.eventWebsite.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="registrationLink">Registration Link</Label>
                <Input
                  id="registrationLink"
                  type="url"
                  {...register("registrationLink")}
                  placeholder="https://register.techfuture.org/ai-summit-2026"
                />
                {errors.registrationLink && (
                  <p className="text-destructive text-sm">
                    {errors.registrationLink.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="eventPosterUrl">Event Poster URL</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Poster URL Information</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm leading-none">About Event Poster URLs</h4>
                      <p className="text-sm text-muted-foreground">
                        A direct image URL points directly to an image file (e.g., ends in .jpg or .png).
                      </p>
                      <ul className="text-xs list-disc list-inside text-muted-foreground space-y-1">
                        <li>Google Drive/Photos links are <strong>not</strong> supported.</li>
                        <li>The link must be publicly accessible.</li>
                        <li>Recommended tools: image2url.com, postimages.org, imgbb.com</li>
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="relative">
                <Input
                  id="eventPosterUrl"
                  type="url"
                  {...register("eventPosterUrl", {
                    onBlur: (e) => validateImageUrl(e.target.value),
                    onChange: () => {
                      setIsImageVerified(false);
                      setImageCheckWarning(null);
                      if (imageCheckError) {
                        setImageCheckError(null);
                        clearErrors("eventPosterUrl");
                      }
                    },
                  })}
                  placeholder="https://cdn.techfuture.org/posters/ai-summit-2026.png"
                  className={`pr-10 ${imageCheckError || (errors.eventPosterUrl && errors.eventPosterUrl.type !== "manual")
                      ? "border-destructive focus-visible:ring-destructive"
                      : imageCheckWarning
                        ? "border-yellow-500 focus-visible:ring-yellow-500"
                        : isImageVerified
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                    }`}
                />
                <div className="absolute right-3 top-2.5 flex items-center gap-2">
                  {isCheckingImage && (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  )}
                  {!isCheckingImage &&
                    watch("eventPosterUrl") &&
                    isImageVerified &&
                    !errors.eventPosterUrl && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  {!isCheckingImage &&
                    watch("eventPosterUrl") &&
                    (imageCheckError || (errors.eventPosterUrl && errors.eventPosterUrl.type !== "manual")) && (
                      <X className="h-5 w-5 text-destructive" />
                    )}
                </div>
              </div>

              {/* Validation Messages */}
              {(errors.eventPosterUrl || imageCheckError) && (
                <p className="text-destructive text-sm">
                  {imageCheckError || errors.eventPosterUrl?.message}
                </p>
              )}
              {!imageCheckError && imageCheckWarning && (
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                  {imageCheckWarning}
                </p>
              )}
              {!imageCheckError && !imageCheckWarning && isImageVerified && (
                <p className="text-green-600 dark:text-green-400 text-sm">
                  URL is valid! Image preview below.
                </p>
              )}

              {/* Helper Text & Hosting Tools Toggle */}
              <div className="space-y-2 mt-2">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Must be a direct image URL (ending in .png, .jpg, etc.).
                </p>
                <button
                  type="button"
                  onClick={() => setShowHelpPanel(!showHelpPanel)}
                  className="text-xs text-primary hover:underline flex items-center gap-1 transition-all"
                >
                  Need help? See free hosting tools →
                </button>

                {showHelpPanel && (
                  <div className="p-3 bg-muted/40 rounded-md border border-border/50 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Recommended Tools:</p>
                    <div className="grid grid-cols-1 gap-2">
                      <a
                        href="https://image2url.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors group"
                      >
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span>image2url.com — Free image to URL converter</span>
                      </a>
                      <a
                        href="https://postimages.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors group"
                      >
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span>postimages.org — Permanent free image hosting</span>
                      </a>
                      <a
                        href="https://imgbb.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors group"
                      >
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span>imgbb.com — Simple, fast image hosting</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Preview Section */}
              {isImageVerified && watch("eventPosterUrl") && !imageCheckError && (
                <div className="pt-2 animate-in zoom-in-95 duration-300">
                  <div className="relative border rounded-lg overflow-hidden bg-muted/30 aspect-video flex items-center justify-center group shadow-sm">
                    <img
                      src={watch("eventPosterUrl")}
                      alt="Event poster preview"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={() => {
                        setIsImageVerified(false);
                        const errorMsg = "URL looks valid but the image couldn't load. Check the link is publicly accessible.";
                        setImageCheckError(errorMsg);
                        setError("eventPosterUrl", {
                          type: "manual",
                          message: errorMsg,
                        });
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      Live Preview
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Tags Section */}
          <div className="space-y-8">
            <h3 className="text-lg font-medium">Event Tags *</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {eventTagOptions.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag}
                    checked={selectedTags?.includes(tag) || false}
                    onCheckedChange={(checked) =>
                      handleTagChange(tag, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={tag}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
            {errors.eventTags && (
              <p className="text-destructive text-sm">
                {errors.eventTags.message}
              </p>
            )}
          </div>

          {/* Submitter Information */}
          <div className="space-y-8">
            <h3 className="text-lg font-medium">Your Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Label htmlFor="submittedBy">Your Name *</Label>
                <Input
                  id="submittedBy"
                  {...register("submittedBy")}
                  placeholder="Jane Doe"
                />
                {errors.submittedBy && (
                  <p className="text-destructive text-sm">
                    {errors.submittedBy.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="submittedEmail">Your Email *</Label>
                <Input
                  id="submittedEmail"
                  type="email"
                  {...register("submittedEmail")}
                  placeholder="jane.doe@techfuture.org"
                />
                {errors.submittedEmail && (
                  <p className="text-destructive text-sm">
                    {errors.submittedEmail.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="space-y-8 mb-2">
            <div className="flex items-start space-x-2">
              <Controller
                name="emailConsentChecked"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="emailConsentChecked"
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                )}
              />
              <Label
                htmlFor="emailConsentChecked"
                className="text-sm leading-relaxed cursor-pointer"
              >
                I certify that all details are correct *
              </Label>
            </div>
            {errors.emailConsentChecked && (
              <p className="text-destructive text-sm">
                {errors.emailConsentChecked.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={
              isSubmitting || !isValid || isCheckingImage || !!imageCheckError
            }
            className="w-full pt-2"
          >
            {isSubmitting ? "Showcasing..." : "Showcase Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
