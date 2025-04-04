"use server"

import { githubRepoArray } from "~/schema/githut_schema";
import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

export async function getRecentRepoByLogin(login: string) {
    const repo = await fetch(`${backendUrl}/repos/${login}`);
    const data = await repo.json();
    const parseData = githubRepoArray.parse(data);
    return parseData;
  }