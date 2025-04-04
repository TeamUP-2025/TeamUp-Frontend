"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createProject } from "~/lib/actions";
import { Clock, CheckCircle2, FileText } from "lucide-react";

// Import components
import { ProjectDetails } from "./components/ProjectDetails";
import { ProjectRepositories } from "./components/ProjectRepositories";
import {
  CreateProjectRoadmap,
  RoadmapsEditor,
  RoadmapStatusControl,
} from "./components/Roadmap";
import { ProjectGoals, GoalsEditor } from "./components/Goals";
import { ProjectLICENSE } from "./components/License";

// Import types
import { ProjectType, Roadmap, Goal, License } from "./types";

export default function CreateProjectPage() {
  const router = useRouter();

  // Initialize empty project form state
  const [project, setProject] = useState<ProjectType>({
    title: "",
    description: "",
    longDescription: "",
    tags: [],
    roadmap: [],
    goals: [],
    license: {},
    repositories: [],
  });

  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Roadmap state
  const [roadmap, setRoadmap] = useState<Roadmap[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [license, setLicense] = useState<any>({});

  // Update parent state when child state changes
  useEffect(() => {
    updateRoadmap(roadmap);
  }, [roadmap]);

  useEffect(() => {
    updateGoals(goals);
  }, [goals]);

  useEffect(() => {
    updateLicense(license);
  }, [license]);

  useEffect(() => {
    setProject((prev) => ({
      ...prev,
      repositories,
    }));
  }, [repositories]);

  // Async function for handling form submission
  async function handleCreateProject() {
    if (!project.title) {
      toast.error("Please fill in the project title");
      return;
    }

    try {
      setLoading(true);

      // Use the server action to create the project
      const result = await createProject({
        ...project,
        description: project.longDescription.substring(0, 150), // Create a short description from the long one
      });

      if (result.success) {
        toast.success(`Created Project ${project.title}`);
        // Redirect to projects dashboard
        router.push("/project-dashboard");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  function updateRoadmap(newRoadmap: Roadmap[]) {
    setProject((prev) => ({
      ...prev,
      roadmap: newRoadmap,
    }));
  }

  function updateGoals(newGoals: Goal[]) {
    setProject((prev) => ({
      ...prev,
      goals: newGoals,
    }));
  }

  function updateLicense(newLicense: any) {
    setProject((prev) => ({
      ...prev,
      license: newLicense,
    }));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 pt-4 md:px-6">
        <h1 className="mb-6 text-3xl font-bold">Create New Project</h1>

        <div className="mx-auto max-w-5xl space-y-6">
          {/* Project details and repositories */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Project details form - spans 2 columns */}
            <div className="md:col-span-2">
              <ProjectDetails project={project} setProject={setProject} />
            </div>

            {/* Repositories form */}
            <div className="md:col-span-1">
              <ProjectRepositories
                repositories={repositories}
                setRepositories={setRepositories}
              />
            </div>
          </div>

          {/* Project Roadmap Section */}
          <div className="mt-4 space-y-4">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Project Roadmap</h2>
            </div>
            <CreateProjectRoadmap roadmap={roadmap} setRoadmap={setRoadmap} />

            {/* Project Goals Section */}
            <div className="mb-2 mt-6 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Project Goals</h2>
            </div>
            <ProjectGoals goals={goals} setGoals={setGoals} />

            {/* Project License Section */}
            <div className="mb-2 mt-6 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Project License</h2>
            </div>
            <ProjectLICENSE license={license} setLicense={setLicense} />
          </div>

          {/* Create button */}
          <div className="pt-4">
            <Button
              onClick={handleCreateProject}
              disabled={loading || !project.title}
              className="w-full px-8 md:w-auto"
              size="lg"
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
