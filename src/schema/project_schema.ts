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
  Goal: z.array(z.object({
    goalName: z.coerce.string(),
    goalDescription: z.coerce.string().nullable()
  })),
  Roadmap: z.array(z.object({
    roadmap: z.coerce.string(),
    roadmapDescription: z.coerce.string().nullable(),
    roadmapStatus: z.coerce.string()
  })),
  Tag: z.array(z.string()),
});

export const projectArray = z.array(project);
