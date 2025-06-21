"use client"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface JoinFormProps {
  type: "individual" | "college"
}

const individualSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0+$)\d{8,12}$/, "Please enter a valid phone number."),
  college: z.string().min(2, "College name must be at least 2 characters."),
  year: z.string().min(1, "Please select a year of study."),
  interests: z.string().min(10, "Please tell us about your interests."),
  motivation: z.string().min(20, "Please tell us why you want to join DK24."),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions."),
})

const collegeSchema = z.object({
  collegeName: z.string().min(2, "College name must be at least 2 characters."),
  communityName: z.string().min(2, "Community name must be at least 2 characters."),
  repName: z.string().min(2, "Representative name must be at least 2 characters."),
  repPosition: z.string().min(2, "Position must be at least 2 characters."),
  repEmail: z.string().email("Please enter a valid email address."),
  repPhone: z.string().regex(/^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0+$)\d{8,12}$/, "Please enter a valid phone number."),
  facultyName: z.string().min(2, "Faculty name must be at least 2 characters."),
  facultyEmail: z.string().email("Please enter a valid email address."),
  communitySize: z.string().regex(/^[0-9]*$/, "Please enter a valid number."),
  communityActivities: z.string().min(20, "Please describe the current activities."),
  expectations: z.string().min(20, "Please tell us what you expect from joining DK24."),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions."),
})

type IndividualFormValues = z.infer<typeof individualSchema>
type CollegeFormValues = z.infer<typeof collegeSchema>

function IndividualForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IndividualFormValues>({
    resolver: zodResolver(individualSchema),
    defaultValues: {
      terms: false,
    },
  })

  const onSubmit: SubmitHandler<IndividualFormValues> = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Individual Form Data:", data)
      reset()
    } catch (error: unknown) {
      console.error("Form submission error:", error)
      setSubmitError("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {submitError && (
          <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" {...register("firstName")} />
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" {...register("lastName")} />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john.doe@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+91 9876543210" {...register("phone")} />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Input id="college" placeholder="Sahyadri College of Engineering & Management" {...register("college")} />
          {errors.college && <p className="text-sm text-destructive">{errors.college.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year of Study</Label>
          <Select {...register("year")}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
              <SelectItem value="alumni">Alumni</SelectItem>
              <SelectItem value="professional">Working Professional</SelectItem>
            </SelectContent>
          </Select>
          {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests">Technical Interests</Label>
          <Textarea
            id="interests"
            placeholder="Web Development, Machine Learning, Open Source, etc."
            {...register("interests")}
          />
          {errors.interests && <p className="text-sm text-destructive">{errors.interests.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">Why do you want to join DK24?</Label>
          <Textarea
            id="motivation"
            placeholder="Tell us why you're interested in joining our community..."
            {...register("motivation")}
          />
          {errors.motivation && <p className="text-sm text-destructive">{errors.motivation.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" {...register("terms")} />
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
        </div>
      </CardContent>

      <CardFooter className="py-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </form>
  )
}

function CollegeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: {
      terms: false,
    },
  })

  const onSubmit: SubmitHandler<CollegeFormValues> = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("College Form Data:", data)
      reset()
    } catch (error: unknown) {
      console.error("Form submission error:", error)
      setSubmitError("An error occurred while submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {submitError && (
          <div className="rounded-md border border-destructive bg-destructive/15 p-3 text-sm text-destructive">
            {submitError}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="collegeName">College Name</Label>
          <Input
            id="collegeName"
            placeholder="Sahyadri College of Engineering & Management"
            {...register("collegeName")}
          />
          {errors.collegeName && <p className="text-sm text-destructive">{errors.collegeName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="communityName">Community/Club Name</Label>
          <Input id="communityName" placeholder="Sahyadri Open Source Community" {...register("communityName")} />
          {errors.communityName && <p className="text-sm text-destructive">{errors.communityName.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repName">Representative Name</Label>
            <Input id="repName" placeholder="John Doe" {...register("repName")} />
            {errors.repName && <p className="text-sm text-destructive">{errors.repName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="repPosition">Position</Label>
            <Input id="repPosition" placeholder="Community Lead" {...register("repPosition")} />
            {errors.repPosition && <p className="text-sm text-destructive">{errors.repPosition.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="repEmail">Email</Label>
            <Input id="repEmail" type="email" placeholder="john.doe@example.com" {...register("repEmail")} />
            {errors.repEmail && <p className="text-sm text-destructive">{errors.repEmail.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="repPhone">Phone Number</Label>
            <Input id="repPhone" type="tel" placeholder="+91 9876543210" {...register("repPhone")} />
            {errors.repPhone && <p className="text-sm text-destructive">{errors.repPhone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="facultyName">Faculty Coordinator Name</Label>
          <Input id="facultyName" placeholder="Dr. Jane Smith" {...register("facultyName")} />
          {errors.facultyName && <p className="text-sm text-destructive">{errors.facultyName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="facultyEmail">Faculty Coordinator Email</Label>
          <Input id="facultyEmail" type="email" placeholder="jane.smith@college.edu" {...register("facultyEmail")} />
          {errors.facultyEmail && <p className="text-sm text-destructive">{errors.facultyEmail.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="communitySize">Community Size (approx. number of active members)</Label>
          <Input id="communitySize" type="number" placeholder="50" {...register("communitySize")} />
          {errors.communitySize && <p className="text-sm text-destructive">{errors.communitySize.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="communityActivities">Current Activities & Initiatives</Label>
          <Textarea
            id="communityActivities"
            placeholder="Describe the current activities and initiatives of your community..."
            {...register("communityActivities")}
          />
          {errors.communityActivities && (
            <p className="text-sm text-destructive">{errors.communityActivities.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectations">What do you expect from joining DK24?</Label>
          <Textarea
            id="expectations"
            placeholder="Tell us what your community hopes to gain from joining DK24..."
            {...register("expectations")}
          />
          {errors.expectations && <p className="text-sm text-destructive">{errors.expectations.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" {...register("terms")} />
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
        </div>
      </CardContent>

      <CardFooter className="py-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </CardFooter>
    </form>
  )
}

export function JoinForm({ type }: JoinFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "individual" ? "Join as an Individual" : "Join as a College Community"}</CardTitle>
      </CardHeader>
      {type === "individual" ? <IndividualForm /> : <CollegeForm />}
    </Card>
  )
}