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

export const eventSubmissionSchema = z.object({
  eventName: z.string().min(2, "Event name must be at least 2 characters."),
  organizationName: z
    .string()
    .min(2, "Organization name must be at least 2 characters."),
  startDateTime: z.string().min(1, "Start date and time is required."),
  endDateTime: z.string().min(1, "End date and time is required."),
  eventLocation: z
    .string()
    .min(5, "Event location must be at least 5 characters."),
  eventWebsite: z
    .string()
    .url("Please enter a valid website URL.")
    .optional()
    .or(z.literal("")),
  registrationLink: z
    .string()
    .url("Please enter a valid registration URL.")
    .optional()
    .or(z.literal("")),
  eventDescription: z
    .string()
    .min(50, "Event description must be at least 50 characters."),
  eventPosterUrl: z
    .string()
    .url("Please enter a valid poster image URL.")
    .optional()
    .or(z.literal("")),
  eventTags: z
    .array(z.string())
    .min(1, "Please select at least one event tag."),
  submittedBy: z.string().min(2, "Your name must be at least 2 characters."),
  submittedEmail: z.string().email("Please enter a valid email address."),
  emailConsentChecked: z
    .boolean()
    .refine((val) => val === true, "You must consent to email communications."),
  isEmailVerified: z.boolean(),
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

export const eventSubmissionInitialValues: EventSubmissionFormValues = {
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
  isEmailVerified: false,
  emailConsentChecked: false,
};

export const eventTagOptions = [
  "Conference",
  "Workshop",
  "Meetup",
  "Hackathon",
  "Webinar",
  "Networking",
  "Training",
  "Competition",
  "Panel Discussion",
  "Tech Talk",
  "Career Fair",
  "Startup Event",
];

export type IndividualFormValues = z.infer<typeof individualSchema>;
export type CollegeFormValues = z.infer<typeof collegeSchema>;
export type EventSubmissionFormValues = z.infer<typeof eventSubmissionSchema>;
