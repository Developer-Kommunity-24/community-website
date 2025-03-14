"use client"

import type React from "react"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface JoinFormProps {
  type: "individual" | "college"
}

export function JoinForm({ type }: JoinFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "individual"
            ? "Join as an Individual"
            : "Join as a College Community"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === "individual" ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  placeholder="Sahyadri College of Engineering & Management"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                    <SelectItem value="professional">
                      Working Professional
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Technical Interests</Label>
                <Textarea
                  id="interests"
                  placeholder="Web Development, Machine Learning, Open Source, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivation">
                  Why do you want to join DK24?
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Tell us why you're interested in joining our community..."
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  placeholder="Sahyadri College of Engineering & Management"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communityName">Community/Club Name</Label>
                <Input
                  id="communityName"
                  placeholder="Sahyadri Open Source Community"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="repName">Representative Name</Label>
                  <Input id="repName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repPosition">Position</Label>
                  <Input
                    id="repPosition"
                    placeholder="Community Lead"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="repEmail">Email</Label>
                  <Input
                    id="repEmail"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repPhone">Phone Number</Label>
                  <Input
                    id="repPhone"
                    type="tel"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyName">Faculty Coordinator Name</Label>
                <Input id="facultyName" placeholder="Dr. Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facultyEmail">Faculty Coordinator Email</Label>
                <Input
                  id="facultyEmail"
                  type="email"
                  placeholder="jane.smith@college.edu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communitySize">
                  Community Size (approx. number of active members)
                </Label>
                <Input
                  id="communitySize"
                  type="number"
                  placeholder="50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="communityActivities">
                  Current Activities & Initiatives
                </Label>
                <Textarea
                  id="communityActivities"
                  placeholder="Describe the current activities and initiatives of your community..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectations">
                  What do you expect from joining DK24?
                </Label>
                <Textarea
                  id="expectations"
                  placeholder="Tell us what your community hopes to gain from joining DK24..."
                  required
                />
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
