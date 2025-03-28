import { z } from 'zod';

export const license = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  permission: z.array(z.string()),
  condition: z.array(z.string()),
  limitation: z.array(z.string()),
});

export const roadmap = z.object({
  milestone: z.string(),
  description: z.string().optional(),
  status: z.string(),
});

export const project = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
  roadmap: z.array(roadmap).optional(),
  goals: z.array(z.string()).optional(),
  license: license.optional(),
});

export type Project = z.infer<typeof project>;
