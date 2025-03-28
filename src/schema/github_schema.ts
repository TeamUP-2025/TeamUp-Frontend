import { z } from "zod";

export const githubUser = z.object({
  login: z.coerce.string(), //'ReggieReo',
  name: z.coerce.string(),
  location: z.string().optional(),
  avatar_url: z.coerce.string(),//'https://avatars.githubusercontent.com/u/103312026?v=4',
  html_url: z.coerce.string(),//'https://github.com/ReggieReo',
  company: z.coerce.string(),//'Kasetsart University',
  bio: z.coerce.string(),//'Undergraduate student in Software and Knowledge Engineering, Kasetsart University.',
  public_repos: z.coerce.number(),//22,
  public_gists: z.coerce.number(),//1,
  followers: z.coerce.number(),//12,
  following: z.coerce.number(),
  total_private_repos: z.coerce.number(),//7,
  url: z.coerce.string()//'https://api.github.com/users/ReggieReo',
})

export const githubRepo = z.object({
  id: z.coerce.number(),
  name: z.coerce.string(),
  description: z.coerce.string(),
  language: z.coerce.string(),
  stargazers_count: z.coerce.number(),
  forks_count: z.coerce.number(),
  html_url: z.coerce.string(),
})

export const githubRepoArray = z.array(githubRepo)