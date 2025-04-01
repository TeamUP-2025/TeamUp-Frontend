"use server";
import { projectArray } from "~/schema/project_schema";

type SearchParams = {
  title?: string;
  status?: string;
  licenseName?: string;
  tagNames?: string[];
};

export async function getProject(params?: SearchParams) {
  // Build query string from search parameters
  let queryString = "";
  if (params) {
    const searchParams = new URLSearchParams();

    if (params.title) searchParams.append("title", params.title);
    if (params.status) searchParams.append("status", params.status);
    if (params.licenseName)
      searchParams.append("licenseName", params.licenseName);
    if (params.tagNames && params.tagNames.length > 0) {
      searchParams.append("tagNames", params.tagNames.join(","));
    }

    const paramString = searchParams.toString();
    if (paramString) {
      queryString = `?${paramString}`;
    }
  }

  const project = await fetch(`http://localhost:8080/project${queryString}`);
  const data = await project.json();
  const parseData = projectArray.safeParse(data);
  if (!parseData.success) {
    console.log("Failed to parse project data:", parseData.error.message)
    // Return an empty array if parsing fails
    return [];
  }
  return parseData.data;
}
