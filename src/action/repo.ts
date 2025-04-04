"use server";

import { githubRepoArray } from "~/schema/githut_schema";
import { env } from "~/env";
import { cookies } from "next/headers";

const backendUrl = env.BACKEND_URL;

export async function getRecentRepoByLogin(login: string) {
  const repo = await fetch(`${backendUrl}/repos/${login}`);
  const data = await repo.json();
  const parseData = githubRepoArray.parse(data);
  return parseData;
}

export async function getRepoByUid() {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");
  const repo = await fetch(`${backendUrl}/repos/uid`, {
    headers: {
      Cookie: `token=${cookie?.value};`,
    },
  });
  const data = await repo.json();
  const parseData = githubRepoArray.parse(data);
  return parseData;
}

export async function getProjectRepositories(projectId: string) {
  try {
    const repo = await fetch(`${backendUrl}/repo/${projectId}`);
    if (!repo.ok) {
      console.error(`Failed to fetch repositories: ${repo.status}`);
      return [];
    }
    const data = await repo.json();
    return data;
  } catch (error) {
    console.error("Error fetching project repositories:", error);
    return [];
  }
}
