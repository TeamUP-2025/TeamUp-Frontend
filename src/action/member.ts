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