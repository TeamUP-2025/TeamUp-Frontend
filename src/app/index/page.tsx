"use server";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { getProject } from "~/action/project";
import { ProjectList } from "~/components/project/project_list";
import { ProjectSearch } from "~/components/project/project_search";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  searchParams = await searchParams;
  // Parse search parameters
  const title =
    typeof searchParams.title === "string" ? searchParams.title : undefined;
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;
  const licenseName =
    typeof searchParams.licenseName === "string"
      ? searchParams.licenseName
      : undefined;
  const tagNames = searchParams.tagNames
    ? Array.isArray(searchParams.tagNames)
      ? searchParams.tagNames
      : [searchParams.tagNames]
    : undefined;

  // Fetch projects with search parameters
  const projectsFetch = await getProject({
    title,
    status,
    licenseName,
    tagNames,
  });



  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(projectsFetch.flatMap((project) => project.Tags)),
  ).sort();

  // Get unique licenses from all projects
  const allLicenses = Array.from(
    new Set(projectsFetch.map((project) => project.License)),
  ).sort();

  // Get unique statuses from all projects
  const allStatuses = Array.from(
    new Set(projectsFetch.map((project) => project.Status)),
  ).sort();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Open Source Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Discover projects that match your skills and interests. Contribute
              to open source and build your portfolio.
            </p>
          </div>

          <ProjectSearch
            allTags={allTags}
            allLicenses={allLicenses}
            allStatuses={allStatuses}
            initialValues={{
              title: title || "",
              status: status || "all",
              licenseName: licenseName || "all-licenses",
              selectedTags: tagNames || [],
            }}
          />

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {title ? `Search Results for "${title}"` : "Featured Projects"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {projectsFetch.length > 0
                ? `Found ${projectsFetch.length} projects`
                : "No projects found matching your criteria"}
            </p>
          </div>

          <ProjectList projects={projectsFetch} />

          <Separator className="my-8" />

          <Card>
            <CardHeader>
              <CardTitle>Why Contribute to Open Source?</CardTitle>
              <CardDescription>
                Open source contribution offers numerous benefits for developers
                at all levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold">Build Your Portfolio</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showcase your skills to potential employers with real-world
                    project contributions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Learn New Skills</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Work with experienced developers and learn industry best
                    practices.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Join a Community</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with like-minded developers and build your
                    professional network.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
