"use server";

import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

/**
 * Updates a roadmap milestone status
 */
export async function updateMilestoneStatus(
  projectId: string,
  milestoneIndex: number,
  status: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/project/roadmap/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        milestoneIndex,
        status,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update milestone: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating milestone:", error);
    throw error;
  }
}

/**
 * Adds a new roadmap milestone to a project
 */
export async function addRoadmapMilestone(
  projectId: string,
  roadmap: string,
  description: string,
  status: string = "Planned",
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/project/roadmap/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        roadmap,
        description,
        status,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add milestone: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error adding milestone:", error);
    throw error;
  }
}
