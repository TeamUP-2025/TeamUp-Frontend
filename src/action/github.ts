"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { githubRepoArray, githubUser } from "~/schema/githut_schema";

export async function getUserProfileAuth() {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");
  const user = await fetch("http://localhost:8080/git/profile", {
    headers: {
      Cookie: `token=${cookie?.value};`,
    },
  });
  const data = await user.json();
  console.log(data);
  const parseData = githubUser.parse(data);
  return parseData;
}

export async function getRecentRepoAuth() {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");
  const repo = await fetch("http://localhost:8080/git/repos", {
    headers: {
      Cookie: `token=${cookie?.value};`,
    },
  });
  const data = await repo.json();
  console.log(data);
  const parseData = githubRepoArray.parse(data);
  return parseData;
}
