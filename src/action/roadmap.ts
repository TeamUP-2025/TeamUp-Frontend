"use server";

import { cookies } from "next/headers";
import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

/**
 * Updates the status of a roadmap milestone
 * @param projectId The project ID
 * @param roadmap The roadmap milestone name
 * @param status The new status
 */
export async function updateRoadmapStatus(
  projectId: string,
  roadmap: string,
  status: string,
): Promise<void> {
  try {
    const cookieStore = await cookies();
    const cookie = await cookieStore.get("token");

    if (!cookie?.value) {
      throw new Error("Authentication required");
    }
    const response = await fetch(`${backendUrl}/project/roadmap/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie.value};`,
      },
      body: JSON.stringify({
        projectId,
        roadmap,
        status,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update roadmap status: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error updating roadmap status:", error);
    throw error;
  }
}

/**
 * Adds a new roadmap milestone
 * @param projectId The project ID
 * @param roadmap The roadmap milestone name
 * @param description The description of the milestone
 */
export async function addRoadmapMilestone(
  projectId: string,
  roadmap: string,
  description: string,
): Promise<void> {
  try {
    const cookieStore = await cookies();
    const cookie = await cookieStore.get("token");

    if (!cookie?.value) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${backendUrl}/project/roadmap/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${cookie.value};`,
      },
      body: JSON.stringify({
        projectId,
        roadmap,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add roadmap milestone: ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("Error adding roadmap milestone:", error);
    throw error;
  }
}
