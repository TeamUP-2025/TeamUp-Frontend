"use server"

import { githubRepoArray } from "~/schema/githut_schema";

export async function getRecentRepoByLogin(login: string) {
    const repo = await fetch(`http://localhost:8080/repos/${login}`);
    const data = await repo.json();
    const parseData = githubRepoArray.parse(data);
    return parseData;
  }