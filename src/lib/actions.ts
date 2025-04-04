"use server";

import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

/**
 * Promotes a team member to Admin role
 */
export async function promoteMember(
  projectId: string,
  userId: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/project/team/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        userId,
        role: "Admin",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to promote member: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error promoting team member:", error);
    throw error;
  }
}

/**
 * Removes a team member from the project
 */
export async function removeMember(
  projectId: string,
  userId: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/project/team/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove member: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error removing team member:", error);
    throw error;
  }
}

/**
 * Approves a join request, adds user to team members
 */
export async function approveRequest(
  projectId: string,
  userId: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/project/application/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to approve request: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
}

/**
 * Denies and removes a join request
 */
export async function denyRequest(
  projectId: string,
  userId: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${backendUrl}/project/application/deny`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to deny request: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error denying request:", error);
    throw error;
  }
}

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
