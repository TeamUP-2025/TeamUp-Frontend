import { z } from "zod";

export const githubUser = z.object({
  login: z.coerce.string(), //'ReggieReo',
  name: z.coerce.string(),
  location: z.string().optional(),
  avatar_url: z.coerce.string(),//'https://avatars.githubusercontent.com/u/103312026?v=4',
  html_url: z.coerce.string(),//'https://github.com/ReggieReo',
  bio: z.coerce.string(),//'Undergraduate student in Software and Knowledge Engineering, Kasetsart University.',
  public_repos: z.coerce.number(),//22,
  followers: z.coerce.number(),//12,
  following: z.coerce.number(),
  total_private_repos: z.coerce.number(),//7,
})

export const githubRepo = z.object({
  Repoid: z.coerce.string(),
  Name: z.coerce.string(),
  Description: z.coerce.string(),
  Language: z.coerce.string(),
  Star: z.coerce.number(),
  Fork: z.coerce.number(),
  Url: z.coerce.string(),
})

export const githubRepoArray = z.array(githubRepo)