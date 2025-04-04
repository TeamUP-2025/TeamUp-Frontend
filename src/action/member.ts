"use server";

import { env } from "~/env";

const backendUrl = env.BACKEND_URL;

export async function removeMember(projectID: string, userId: string, role: string) {

    console.log(projectID, userId, role);
  const response = await fetch(`${backendUrl}/project/delete/teammember`, {
    method: "POST",
    body: JSON.stringify({
      projectId: projectID,
      userId: userId,
      role: role,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to remove member: ${response.status}`);
  }

  return true;
}


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