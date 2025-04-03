"use server";
import { project, searchProjectArray } from "~/schema/project_schema";

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

  const project = await fetch(`http://localhost:8080/project/${queryString}`);
  const data = await project.json();
  const parseData = searchProjectArray.safeParse(data);
  console.log(data);
  if (!parseData.success) {
    console.log("Failed to parse project data:", parseData.error.message);
    // Return an empty array if parsing fails
    return [];
  }
  return parseData.data;
}

function parseBase64JsonAction(base64EncodedString: string) {
  try {
    // Decode the Base64 string using Node's Buffer
    const jsonString = Buffer.from(base64EncodedString, "base64").toString(
      "utf8",
    );
    // Parse the JSON string into an array of objects
    const jsonArray = JSON.parse(jsonString);
    return jsonArray;
  } catch (error) {
    console.error("Error parsing Base64 JSON:", error);
    throw error;
  }
}

export async function requestJoinProject(
  projectID: string,
  uID: string,
  coverLetter: string,
) {
  const projectfromID = await fetch(
    `http://localhost:8080/project/${projectID}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: projectID,
        coverLetter: coverLetter,
        uID: uID,
      }),
    },
  );

  const data = await projectfromID.json();
  console.log(projectID, coverLetter, data);
  return data;
}

export async function getProjectByID(projectID: string) {
  "use server";

  const projectfromID = await fetch(
    `http://localhost:8080/project/${projectID}`,
  );
  const data = await projectfromID.json();

  // console.log(data);

  const parsedLicense = parseBase64JsonAction(data.License);
  const extractLicnse = parsedLicense[0];

  let parsedGoal = [];
  let parsedRoadmap = [];

  if (data.Goal) {
    try {
      parsedGoal = parseBase64JsonAction(data.Goal);
    } catch (error) {
      console.error("Error parsing Goal:", error);
      parsedGoal = [];
    }
  }

  if (data.Roadmap) {
    try {
      parsedRoadmap = parseBase64JsonAction(data.Roadmap);
    } catch (error) {
      console.error("Error parsing Roadmap:", error);
      parsedRoadmap = [];
    }
  }

  const data_with_license_goal = {
    ID: data.Projectid,
    Title: data.Title,
    Description: data.Description,
    Status: data.Status,
    License: {
      name: extractLicnse.licenseName,
      description: extractLicnse.description,
      permission: extractLicnse.permission,
      condition: extractLicnse.condition,
      limitation: extractLicnse.limitation,
    },
    Goal: parsedGoal.map((goal: any) => ({
      goalName: goal.goalName || "",
      goalDescription: goal.goalDescription || "",
    })),
    Roadmap: parsedRoadmap.map((roadmap: any) => ({
      roadmap: roadmap.roadmap || "",
      roadmapDescription: roadmap.description || "",
      roadmapStatus: roadmap.status || "",
    })),
    Tag: data.Tag,
  };

  const parseData = project.safeParse(data_with_license_goal);
  if (!parseData.success) {
    throw new Error("Failed to parse project data");
  }
  return parseData.data;
}

export async function updateProjectDetail(projectId, title, description, tag) {
  "use server";
  const projectupdate = await fetch(
      `http://localhost:8080/project/update/${projectId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectId,
          title: title,
          description: description,
          tags: tag
        }),
      },
  );
}

