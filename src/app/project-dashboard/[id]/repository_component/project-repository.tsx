"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Github, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";

interface Repository {
  Repoid: string;
  Name: string;
  Url?: string;
}

interface ProjectRepositoriesProps {
  repositories: Repository;
}

export default function ProjectRepositories({
  repositories,
}: ProjectRepositoriesProps) {
  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "URL Copied",
          description: "Repository URL copied to clipboard",
        });
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };

  // Default clone URL if not provided
  const cloneUrl =
    repositories?.Url || `https://github.com/${repositories?.Name}.git`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Git Repository</CardTitle>
        <CardDescription>The project repository</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Connected Repositories</h3>

            {repositories ? (
              <div className="space-y-2">
                <div
                  key={repositories.Repoid}
                  className="flex flex-col rounded-md border p-3"
                >
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{repositories.Name}</p>
                    </div>
                  </div>

                  <a
                    href={
                      repositories?.Url ||
                      `https://github.com/${repositories?.Name}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Open Repository
                  </a>

                  <div className="mt-3 flex flex-col gap-2">
                    <div className="flex items-center">
                      <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap rounded-l-md bg-muted px-3 py-2 text-sm">
                        git clone {cloneUrl}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-l-none"
                        onClick={() => handleCopyToClipboard(cloneUrl)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <Github className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">
                  No repositories connected
                </h3>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  No GitHub repositories connected to this project
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
