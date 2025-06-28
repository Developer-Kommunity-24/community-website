import * as z from "zod";

export const individualSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .regex(
      /^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0+$)\d{8,12}$/,
      "Please enter a valid phone number.",
    ),
  college: z.string().min(2, "College name must be at least 2 characters."),
  year: z.string().min(1, "Please select a year of study."),
  interests: z
    .string()
    .min(50, "Please tell us about your interests (minimum 50 characters)."),
  motivation: z
    .string()
    .min(
      100,
      "Please tell us why you want to join DK24 (minimum 100 characters).",
    ),
});

export const collegeSchema = z.object({
  collegeName: z.string().min(2, "College name must be at least 2 characters."),
  communityName: z
    .string()
    .min(2, "Community name must be at least 2 characters."),
  repName: z
    .string()
    .min(2, "Representative name must be at least 2 characters."),
  repPosition: z.string().min(2, "Position must be at least 2 characters."),
  repEmail: z.string().email("Please enter a valid email address."),
  repPhone: z
    .string()
    .regex(
      /^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0+$)\d{8,12}$/,
      "Please enter a valid phone number.",
    ),
  facultyName: z.string().min(2, "Faculty name must be at least 2 characters."),
  facultyEmail: z.string().email("Please enter a valid email address."),
  communitySize: z.string().regex(/^[0-9]*$/, "Please enter a valid number."),
  communityActivities: z
    .string()
    .min(
      100,
      "Please describe the current activities (minimum 100 characters).",
    ),
  expectations: z
    .string()
    .min(
      100,
      "Please tell us what you expect from joining DK24 (minimum 100 characters).",
    ),
});

export const individualInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  college: "",
  year: "",
  interests: "",
  motivation: "",
};

export const collegeInitialValues = {
  collegeName: "",
  communityName: "",
  repName: "",
  repPosition: "",
  repEmail: "",
  repPhone: "",
  facultyName: "",
  facultyEmail: "",
  communitySize: "",
  communityActivities: "",
  expectations: "",
};

export type IndividualFormValues = z.infer<typeof individualSchema>;
export type CollegeFormValues = z.infer<typeof collegeSchema>;
