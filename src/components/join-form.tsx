"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitFormData } from "@/lib/form-submission";
import {
  type CollegeFormValues,
  collegeInitialValues,
  collegeSchema,
  type IndividualFormValues,
  individualInitialValues,
  individualSchema,
} from "@/lib/forms-config";

interface JoinFormProps {
  type: "individual" | "college";
}

function IndividualForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<IndividualFormValues>({
    resolver: zodResolver(individualSchema),
    defaultValues: individualInitialValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IndividualFormValues> = async (data) => {
    const isFormValid = await trigger();
    if (!isFormValid) {
      setSubmitError("Please fix all validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitFormData(
        "https://formcarry.com/s/tfkkggHgbkY",
        {
          _subject: "New Individual Application - DK24",
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          college: data.college,
          year: data.year,
          interests: data.interests,
          motivation: data.motivation,
        },
      );

      if (response.status >= 200 && response.status < 300) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error(`Submission failed with status ${response.status}`);
      }
    } catch {
      setSubmitError(
        "An error occurred while submitting the form. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {submitError && (
          <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="rounded-md border border-green-500 bg-green-50 p-3 text-sm text-green-700">
            Form submitted successfully! Thank you for your application.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName")}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName")}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 9876543210"
            {...register("phone")}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Input
            id="college"
            placeholder="Sahyadri College of Engineering & Management"
            {...register("college")}
            disabled={isSubmitting}
          />
          {errors.college && (
            <p className="text-sm text-destructive">{errors.college.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year of Study</Label>
          <Input
            id="year"
            placeholder="Select year"
            {...register("year")}
            disabled={isSubmitting}
          />
          {errors.year && (
            <p className="text-sm text-destructive">{errors.year.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Technical Interests</Label>
          <Textarea
            id="interests"
            placeholder="Tell us about your technical interests, programming languages you know, projects you've worked on, etc."
            {...register("interests")}
            disabled={isSubmitting}
          />
          {errors.interests && (
            <p className="text-sm text-destructive">
              {errors.interests.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">Why do you want to join DK24?</Label>
          <Textarea
            id="motivation"
            placeholder="Tell us what motivates you to join DK24, what you hope to learn, and how you plan to contribute to the community."
            {...register("motivation")}
            disabled={isSubmitting}
          />
          {errors.motivation && (
            <p className="text-sm text-destructive">
              {errors.motivation.message}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="py-4 cursor-pointer">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </form>
  );
}

function CollegeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: collegeInitialValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<CollegeFormValues> = async (data) => {
    const isFormValid = await trigger();
    if (!isFormValid) {
      setSubmitError("Please fix all validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitFormData(
        "https://formcarry.com/s/tfkkggHgbkY",
        {
          _subject: "New College Application - DK24",
          collegeName: data.collegeName,
          communityName: data.communityName,
          repName: data.repName,
          repPosition: data.repPosition,
          repEmail: data.repEmail,
          repPhone: data.repPhone,
          facultyName: data.facultyName,
          facultyEmail: data.facultyEmail,
          communitySize: data.communitySize,
          communityActivities: data.communityActivities,
          expectations: data.expectations,
        },
      );

      if (response.status >= 200 && response.status < 300) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error(`Submission failed with status ${response.status}`);
      }
    } catch {
      setSubmitError(
        "An error occurred while submitting the form. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {submitError && (
          <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="rounded-md border border-green-500 bg-green-50 p-3 text-sm text-green-700">
            Form submitted successfully! Thank you for your application.
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="collegeName">College Name</Label>
          <Input
            id="collegeName"
            placeholder="Sahyadri College of Engineering & Management"
            {...register("collegeName")}
            disabled={isSubmitting}
          />
          {errors.collegeName && (
            <p className="text-sm text-destructive">
              {errors.collegeName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="communityName">Community/Club Name</Label>
          <Input
            id="communityName"
            placeholder="Sahyadri Open Source Community"
            {...register("communityName")}
            disabled={isSubmitting}
          />
          {errors.communityName && (
            <p className="text-sm text-destructive">
              {errors.communityName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repName">Representative Name</Label>
            <Input
              id="repName"
              placeholder="John Doe"
              {...register("repName")}
              disabled={isSubmitting}
            />
            {errors.repName && (
              <p className="text-sm text-destructive">
                {errors.repName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="repPosition">Position</Label>
            <Input
              id="repPosition"
              placeholder="Community Lead"
              {...register("repPosition")}
              disabled={isSubmitting}
            />
            {errors.repPosition && (
              <p className="text-sm text-destructive">
                {errors.repPosition.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repEmail">Email</Label>
            <Input
              id="repEmail"
              type="email"
              placeholder="john.doe@example.com"
              {...register("repEmail")}
              disabled={isSubmitting}
            />
            {errors.repEmail && (
              <p className="text-sm text-destructive">
                {errors.repEmail.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="repPhone">Phone Number</Label>
            <Input
              id="repPhone"
              type="tel"
              placeholder="+91 9876543210"
              {...register("repPhone")}
              disabled={isSubmitting}
            />
            {errors.repPhone && (
              <p className="text-sm text-destructive">
                {errors.repPhone.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="facultyName">Faculty Coordinator Name</Label>
          <Input
            id="facultyName"
            placeholder="Dr. Jane Smith"
            {...register("facultyName")}
            disabled={isSubmitting}
          />
          {errors.facultyName && (
            <p className="text-sm text-destructive">
              {errors.facultyName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="facultyEmail">Faculty Coordinator Email</Label>
          <Input
            id="facultyEmail"
            type="email"
            placeholder="jane.smith@college.edu"
            {...register("facultyEmail")}
            disabled={isSubmitting}
          />
          {errors.facultyEmail && (
            <p className="text-sm text-destructive">
              {errors.facultyEmail.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="communitySize">
            Community Size (approx. number of active members)
          </Label>
          <Input
            id="communitySize"
            type="number"
            placeholder="50"
            {...register("communitySize")}
            disabled={isSubmitting}
          />
          {errors.communitySize && (
            <p className="text-sm text-destructive">
              {errors.communitySize.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="communityActivities">
            Current Activities & Initiatives
          </Label>
          <Textarea
            id="communityActivities"
            placeholder="Describe the current activities and initiatives of your community..."
            {...register("communityActivities")}
            disabled={isSubmitting}
          />
          {errors.communityActivities && (
            <p className="text-sm text-destructive">
              {errors.communityActivities.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectations">
            What do you expect from joining DK24?
          </Label>
          <Textarea
            id="expectations"
            placeholder="Tell us what your community hopes to gain from joining DK24..."
            {...register("expectations")}
            disabled={isSubmitting}
          />
          {errors.expectations && (
            <p className="text-sm text-destructive">
              {errors.expectations.message}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="py-4 cursor-pointer">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </form>
  );
}

export function JoinForm({ type }: JoinFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "individual"
            ? "Join as an Individual"
            : "Join as a College Community"}
        </CardTitle>
      </CardHeader>
      {type === "individual" ? <IndividualForm /> : <CollegeForm />}
    </Card>
  );
}
