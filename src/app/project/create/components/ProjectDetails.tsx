import { Dispatch, SetStateAction } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ProjectType } from "../types";

export function ProjectDetails({
  project,
  setProject,
}: {
  project: ProjectType;
  setProject: Dispatch<SetStateAction<ProjectType>>;
}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 pb-2 pt-4">
        <div>
          <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
          <CardDescription>Create your project</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium leading-none">
              Project Title
            </label>
            <Input
              type="text"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="mt-1 text-lg font-medium"
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none">
              Description
            </label>
            <Textarea
              value={project.longDescription}
              onChange={(e) =>
                setProject({ ...project, longDescription: e.target.value })
              }
              className="mt-1 whitespace-pre-line text-sm text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none">Tags</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={`${tag}-${index}`} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Input
              type="text"
              placeholder="Add a tag..."
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  setProject({
                    ...project,
                    tags: [...project.tags, e.currentTarget.value.trim()],
                  });
                  e.currentTarget.value = "";
                  e.preventDefault();
                }
              }}
              className="mt-2 flex flex-wrap gap-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
