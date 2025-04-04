"use server";
import { cookies } from "next/headers";
import { githubRepoArray, githubUser } from "~/schema/githut_schema";
import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

export async function getUserProfileAuth() {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");
  const user = await fetch(`${backendUrl}/git/profile`, {
    headers: {
      Cookie: `token=${cookie?.value};`,
    },
  });
  const data = await user.json();

  const parseData = githubUser.parse(data);
  return parseData;
}

export async function getRecentRepoAuth() {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");
  const repo = await fetch(`${backendUrl}/git/repos`, {
    headers: {
      Cookie: `token=${cookie?.value};`,
    },
  });
  const data = await repo.json();

  const parseData = githubRepoArray.parse(data);
  return parseData;
}
