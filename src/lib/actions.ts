"use server";

export async function createProject(projectData: ProjectType) {
  // Here you would create the project in your database
  console.log(`creating project with data:`, projectData);
  // Return success
  return { success: true };
}

interface ProjectType {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  roadmap: any[];
  goals: { text: string; description: string }[];
  license: any;
  repositories: any[];
}
