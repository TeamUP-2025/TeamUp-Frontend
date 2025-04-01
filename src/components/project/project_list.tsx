"use client";

import { Filter, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { project, projectArray } from "~/schema/project_schema";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

// Use the inferred type from Zod schema
type ProjectType = z.infer<typeof project>;

// Create a client component for the project list
export function ProjectList({ projects }: { projects: ProjectType[] }) {
  const ITEMS_PER_LOAD = 5;
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_LOAD);

  const showMoreProjects = () => {
    setVisibleProjects((prev) => prev + ITEMS_PER_LOAD);
  };

  const currentProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < projects.length;

  return (
    <>
    {/* { projects.length > 0 ? */}
      <div className="space-y-6">
        {currentProjects.map((project) => (
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
                    License: {project.License} • Status: {project.Status}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/project/${project.ID}`}>View Details</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {project.Description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.Tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMoreProjects && (
        <div className="mt-6 flex justify-center">
          <Button size="lg" onClick={showMoreProjects}>
            Explore More Projects
          </Button>
        </div>
      )} 
      
    
    </>
  );
}
