import * as z from "zod";

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
  isEmailVerified: z.boolean().default(false),
  emailConsentChecked: z.boolean().refine((val) => val === true, {
    message: "You must consent to email communications.",
  }),
});

export type EventSubmissionFormValues = z.infer<typeof eventSubmissionSchema>;

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
