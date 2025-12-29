import { z } from "zod";

const ProjectTagSchema = z.string().min(1).max(100).trim();
const ProjectCategorySchema = z.union([
  z.literal("Web"),
  z.literal("Mobile"),
  z.literal("Tool"),
  z.string().min(1).max(100).trim() as z.ZodType<string & {}>, // https://github.com/colinhacks/zod/discussions/4934#discussioncomment-13858053
]);

const BaseContributorSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
});

const StudentContributorSchema = BaseContributorSchema.extend({
  kind: z.literal("student"),
  college: z.string().min(1).max(200),
});

const ProfessionalContributorSchema = BaseContributorSchema.extend({
  kind: z.literal("professional"),
  company: z.string().min(1).max(200),
});

const ContributorSchema = z.discriminatedUnion("kind", [
  StudentContributorSchema,
  ProfessionalContributorSchema,
]);

export const ProjectSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  image: z.string().url(),
  tags: z.array(ProjectTagSchema).min(1),
  contributors: z.array(ContributorSchema).min(1),
  github: z.string().url().optional(),
  link: z.string().url().optional(),
  categories: z.array(ProjectCategorySchema).min(1),
});

export type Contributor = z.infer<typeof ContributorSchema>;
export type StudentContributor = z.infer<typeof StudentContributorSchema>;
export type ProfessionalContributor = z.infer<
  typeof ProfessionalContributorSchema
>;
export type Project = z.infer<typeof ProjectSchema>;

export const PartialProjectSchema = ProjectSchema.partial();
export type PartialProject = z.infer<typeof PartialProjectSchema>;
