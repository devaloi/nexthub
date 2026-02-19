import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").default(""),
});

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().max(5000, "Description is too long").default(""),
  status: z.enum(["open", "in_progress", "closed"]).default("open"),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
});

export const labelSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Invalid hex color"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type IssueInput = z.infer<typeof issueSchema>;
export type LabelInput = z.infer<typeof labelSchema>;

export interface ActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}
