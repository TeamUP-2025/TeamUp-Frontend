"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { getUserProjects } from "~/action/project";

// Define the UserProject type
interface UserProject {
  ID: string;
  Title: string;
  Description: string;
  Status: string;
  Role: string;
  Tags: string[];
  License: string;
}

// License type
interface License {
  name: string;
  description: string;
  permission: string[];
  condition: string[];
  limitation: string[];
}

export default async function ProjectListPage() {
  // Fetch user's projects
  const userProjects = (await getUserProjects()) as UserProject[];

  // Split projects by role
  const ownedProjects = userProjects.filter(
    (project: UserProject) => project.Role === "Owner",
  );
  const memberProjects = userProjects.filter(
    (project: UserProject) => project.Role !== "Owner",
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button asChild>
          <Link href="/project/create">Create New Project</Link>
        </Button>
      </div>

      {userProjects.length > 0 ? (
        <div className="space-y-8">
          {ownedProjects.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Projects I Own</h2>
              <div className="grid gap-4">
                {ownedProjects.map((project: UserProject) => (
                  <Card key={project.ID} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            <Link
                              href={`/project/${project.ID}`}
                              className="hover:text-primary hover:underline"
                            >
                              {project.Title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            License: {project.License} • Status:{" "}
                            {project.Status}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/project-dashboard/${project.ID}`}>
                              Manage
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/project/${project.ID}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.Description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.Tags &&
                          project.Tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {memberProjects.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-semibold">
                Projects I'm Contributing To
              </h2>
              <div className="grid gap-4">
                {memberProjects.map((project: UserProject) => (
                  <Card key={project.ID} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            <Link
                              href={`/project/${project.ID}`}
                              className="hover:text-primary hover:underline"
                            >
                              {project.Title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            License: {project.License} • Status:{" "}
                            {project.Status} • Role: {project.Role}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/project-dashboard/${project.ID}`}>
                              Manage
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/project/${project.ID}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {project.Description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.Tags &&
                          project.Tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="py-8 text-center">
              <h3 className="mb-2 text-lg font-medium">
                You don't have any projects yet
              </h3>
              <p className="mb-4 text-muted-foreground">
                Create your first project or join an existing one.
              </p>
              <Button asChild>
                <Link href="/project/create">Create New Project</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
