"use server"

import { githubUser } from "~/schema/githut_schema";
import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

export async function getUserProfileByLogin(login : string) {
    const user = await fetch(`${backendUrl}/profile/${login}`);
    const originalData = await user.json();
    const formatData = {
      login: originalData.Login,
      name: originalData.Name,
      location: originalData.Location,
      avatar_url: originalData.Avatar,
      html_url: originalData.HtmlUrl,
      bio: originalData.Bio,
      public_repos: originalData.PublicRepos,
      followers: originalData.Followers,
      following: originalData.Following,
      total_private_repos: originalData.TotalPrivateRepos,
    }
    const parseData = githubUser.parse(formatData);
    return parseData;
  }
  
