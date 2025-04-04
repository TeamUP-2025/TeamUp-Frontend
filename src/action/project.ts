"use server";
import { project, searchProjectArray } from "~/schema/project_schema";
import { z } from "zod";
import { env } from "~/env";
import { cookies } from "next/headers";

// Use the BACKEND_URL directly without modification
const backendUrl = env.BACKEND_URL;

type SearchParams = {
  title?: string;
  status?: string;
  licenseName?: string;
  tagNames?: string[];
};

interface CreateProjectParams {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  roadmap: any[];
  goals: { text: string; description: string }[];
  license: any;
  repositories: any[];
}

export async function createProject(params: CreateProjectParams) {
  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");
  try {
    const project = await fetch(`${backendUrl}/project/create`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie?.value};`,
      },
    });

    if (!project.ok) {
      console.error(`Server responded with status: ${project.status}`);
      return {
        success: false,
        projectId: "",
        error: `Server error: ${project.status}`,
      };
    }

    const responseText = await project.text();

    // Check if response is empty
    if (!responseText) {
      return {
        success: false,
        projectId: "",
        error: "Empty response from server",
      };
    }

    const result = { success: true, projectId: responseText };
    console.log(result);
    return result;
  } catch (fetchError) {
    console.error("Fetch error:", fetchError);
    return { success: false, projectId: "", error: String(fetchError) };
  }
}

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

  const project = await fetch(`${backendUrl}/project/${queryString}`);
  const data = await project.json();
  const parseData = searchProjectArray.safeParse(data);

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
  const projectfromID = await fetch(`${backendUrl}/project/${projectID}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId: projectID,
      coverLetter: coverLetter,
      uID: uID,
    }),
  });

  const data = await projectfromID.json();
  console.log(projectID, coverLetter, data);
  return data;
}

export async function getProjectByID(projectID: string) {
  "use server";

  const projectfromID = await fetch(`${backendUrl}/project/${projectID}`);
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

export async function updateProjectDetail(
  projectId: string,
  title: string,
  description: string,
  tags: string[], // Changed 'tag' to 'tags' for clarity, matches body key
): Promise<z.infer<typeof project>> {
  // Return the Zod type
  // "use server"; // Not needed inside the function

  const response = await fetch(
    `${backendUrl}/project/update`, // Correct endpoint
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Ensure keys match the backend Go struct tags (`json:"..."`)
        projectId: projectId,
        title: title,
        description: description,
        tags: tags, // Key is 'tags'
      }),
    },
  );

  if (!response.ok) {
    // Handle errors from the update request
    const errorText = await response.text();
    console.error(
      `Failed to update project ${projectId}: ${response.status} ${errorText}`,
    );
    throw new Error(`Failed to update project (status: ${response.status})`);
  }

  // --- Re-fetch the updated project data ---
  // After a successful update, call getProjectByID to get the fresh data
  try {
    const updatedProjectData = await getProjectByID(projectId);
    return updatedProjectData; // Return the newly fetched, parsed, and validated data
  } catch (fetchError) {
    console.error(
      `Failed to re-fetch project ${projectId} after update:`,
      fetchError,
    );
    // Decide how to handle this: maybe throw a different error,
    // or return the old data (less ideal)
    throw new Error(`Project updated, but failed to fetch updated details.`);
  }
}

export async function getUserProjects() {
  "use server";

  const cookieStore = await cookies();
  const cookie = await cookieStore.get("token");

  try {
    const response = await fetch(`${backendUrl}/project/project/member`, {
      headers: {
        Cookie: `token=${cookie?.value};`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch user projects: ${response.status}`);
      return [];
    }

    const data = await response.json();

    // Transform the data to match the project schema format
    const transformedData = data.map((project: any) => ({
      ID: project.Projectid,
      Title: project.Title,
      Description: project.Description,
      Status: project.Status || "Active",
      Role: project.Role,
      Tags: project.Tags || [],
      License: project.License || "Unknown",
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return [];
  }
}


export async function getProjectApplicationByProjectID(projectID: string) {
  "use server";

  const projectAppfromID = await fetch(`${backendUrl}/project/${projectID}/application`);
  const data = await projectAppfromID.json();
  return data;

}

export async function getProjectTeamByProjectID(projectID: string) {
  "use server";

  const projectfromID = await fetch(`${backendUrl}/project/${projectID}/team`);
  const data = await projectfromID.json();
  return data;
}