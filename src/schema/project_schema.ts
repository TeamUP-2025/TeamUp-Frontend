import { z } from "zod";

export const project = z.object({
  ID: z.coerce.string(),
  Title: z.coerce.string(),
  Description: z.coerce.string(),
  Status: z.string().nullable().optional(),
  License: z.object({
    name: z.coerce.string(),
    description: z.coerce.string(),
    permission: z.coerce.string(),
    condition: z.coerce.string(),
    limitation: z.coerce.string()
  }),
  Goal: z.object({
    goal_name: z.coerce.string(),
    goal_description: z.coerce.string().nullable()
  }),
  // License: z.string(),
  // Goal: z.string(),
  // Tags: z.array(z.coerce.string()).default([]),
});

export const projectArray = z.array(project);
