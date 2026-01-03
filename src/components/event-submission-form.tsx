"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitFormData } from "@/lib/form-submission";
import {
  type EventSubmissionFormValues,
  eventSubmissionSchema,
  eventTagOptions,
} from "@/lib/forms-config";

export function EventSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    trigger,
    watch,
    setValue,
    getValues,
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
    const pad = (n: number) => String(n).padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${day}-${month}-${year}T${hours}:${minutes}`;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Auto update prevented
  useEffect(() => {
    const currentStart = (getValues("startDateTime") as string) || "";
    const currentEnd = (getValues("endDateTime") as string) || "";
    if (!currentStart && !currentEnd) {
      const now = new Date();
      const start = new Date(now);
      start.setHours(10, 0, 0, 0);
      const end = new Date(start);
      end.setHours(17, 0, 0, 0);
      setValue("startDateTime", formatDateTimeLocal(start));
      setValue("endDateTime", formatDateTimeLocal(end));
    }
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, setValue]);

  const selectedTags = watch("eventTags");

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
        isEmailVerified: false,
      };

      submitFormData("event", payload);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Failed to showcase event. Please try again.");
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
                <Label htmlFor="startDateTime">Start Date & Time *</Label>
                <Input
                  id="startDateTime"
                  type="datetime-local"
                  {...register("startDateTime", {
                    onChange: (e) => {
                      const val = (e.target as HTMLInputElement).value;
                      if (!val) return;
                      const start = new Date(val);

                      // Desired default end time is 17:00 same day.
                      const endCandidate = new Date(start);
                      endCandidate.setHours(17, 0, 0, 0);

                      // If the selected start is after 17:00, set end to start + 2 hours.
                      let finalEnd = endCandidate;
                      if (start.getTime() > endCandidate.getTime()) {
                        finalEnd = new Date(
                          start.getTime() + 2 * 60 * 60 * 1000,
                        );
                      }

                      setValue("endDateTime", formatDateTimeLocal(finalEnd));
                      trigger("endDateTime");
                    },
                  })}
                />
                {errors.startDateTime && (
                  <p className="text-destructive text-sm">
                    {errors.startDateTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="endDateTime">End Date & Time *</Label>
                <Input
                  id="endDateTime"
                  type="datetime-local"
                  {...register("endDateTime")}
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
              <Label htmlFor="eventPosterUrl">Event Poster URL</Label>
              <Input
                id="eventPosterUrl"
                type="url"
                {...register("eventPosterUrl")}
                placeholder="https://cdn.techfuture.org/posters/ai-summit-2026.png"
              />
              {errors.eventPosterUrl && (
                <p className="text-destructive text-sm">
                  {errors.eventPosterUrl.message}
                </p>
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
          <div className="space-y-8">
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
                I consent that all the details provided are correct *
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
            disabled={isSubmitting || !isValid}
            className="w-full pt-2"
          >
            {isSubmitting ? "Showcasing..." : "Showcase Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
