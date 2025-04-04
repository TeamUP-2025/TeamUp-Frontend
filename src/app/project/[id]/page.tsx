import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Github,
  CheckCircle2,
  Circle,
  Clock,
  Check,
  Flag,
  OctagonAlert,
} from "lucide-react";
import JoinProjectPage from "./join-form";
import { getProject, getProjectByID } from "~/action/project";
import { useAuth } from "~/context/AuthContext";

// Helper function to determine the order priority of a milestone status
const getStatusPriority = (status: string): number => {
  switch (status) {
    case "Completed":
      return 1;
    case "In Progress":
      return 2;
    case "Planned":
    default:
      return 3;
  }
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const project = await getProjectByID(id);

  // Sort roadmap items by status priority
  const sortedRoadmap = [...project.Roadmap].sort((a, b) => {
    return (
      getStatusPriority(a.roadmapStatus) - getStatusPriority(b.roadmapStatus)
    );
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {project.Title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {project.Description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.Tag.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.Description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {project.Goal.map((goal, index) => (
                  <li key={index}>
                    <span className="font-semibold">{goal.goalName}</span>
                    {goal.goalDescription && (
                      <p className="text-sm text-gray-500">
                        {goal.goalDescription}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {sortedRoadmap.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Progress line connecting milestones */}
                    {index < sortedRoadmap.length - 1 && (
                      <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-muted" />
                    )}

                    <div className="flex gap-4">
                      {/* Status indicator */}
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                        {item.roadmapStatus === "Completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : item.roadmapStatus === "In Progress" ? (
                          <Clock className="h-5 w-5 text-amber-500" />
                        ) : item.roadmapStatus === "Planned" ? (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <h3 className="font-medium leading-none">
                          {item.roadmap}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.roadmapDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{project.License.name}</CardTitle>
              <CardDescription>{project.License.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={
                  "flex flex-col justify-evenly gap-x-5 gap-y-5 sm:flex-row"
                }
              >
                <ul className="space-y-2">
                  <span className="text-lg font-bold">Permission</span>
                  {project.License.permission.split(", ").map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Check className="mt-1 h-4 w-4 text-green-500" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  <span className="text-lg font-bold">Condition</span>
                  {project.License.condition.split(", ").map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Flag className="mt-1 h-4 w-4 text-yellow-500" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  <span className="text-lg font-bold">Limitation</span>
                  {project.License.limitation.split(", ").map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <OctagonAlert className="mt-1 h-4 w-4 text-red-500" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <JoinProjectPage project={project} />

            <Button size="lg">
              <Link href={`/project/${id}/donate`}>Donate</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Â© 2024 CollabFinder. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
