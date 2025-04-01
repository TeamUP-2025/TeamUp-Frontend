import { z } from "zod";

export const project = z.object({
  ID: z.coerce.string(),
  Title: z.coerce.string(),
  Description: z.coerce.string(),
  Status: z.string().nullable().optional(),
  License: z.coerce.string(),
  Tags: z.array(z.coerce.string()).default([]),
});

export const projectArray = z.array(project);
