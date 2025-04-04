"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createProject } from "~/action/project";
import { Clock, CheckCircle2, FileText } from "lucide-react";

// Import components
import { ProjectDetails } from "./components/ProjectDetails";
import { ProjectRepositories } from "./components/ProjectRepositories";
import { CreateProjectRoadmap } from "./components/Roadmap";
import { ProjectGoals } from "./components/Goals";
import { ProjectLICENSE } from "./components/License";

// Import types
import { ProjectType, Roadmap, Goal, License } from "./types";
import { useAuth } from "~/context/AuthContext";

export default function CreateProjectPage() {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    // Inform the user they need to log in
    return <p>Please log in to create a project.</p>;
  }
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
    repository: null,
    status: "Active",
  });

  const [repository, setRepository] = useState<any>(null);
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
      repository,
    }));
  }, [repository]);

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      project.title.trim() !== "" &&
      project.longDescription.trim() !== "" &&
      project.tags.length > 0 &&
      roadmap.length > 0 &&
      goals.length > 0 &&
      Object.keys(license).length > 0 &&
      project.repository !== null
    );
  };

  // Async function for handling form submission
  async function handleCreateProject() {
    if (!isFormValid()) {
      if (!project.title) {
        toast.error("Please fill in the project title");
      } else if (!project.longDescription) {
        toast.error("Please provide a project description");
      } else if (project.tags.length === 0) {
        toast.error("Please add at least one tag");
      } else if (roadmap.length === 0) {
        toast.error("Please create a project roadmap");
      } else if (goals.length === 0) {
        toast.error("Please add at least one project goal");
      } else if (Object.keys(license).length === 0) {
        toast.error("Please select a license");
      } else if (!project.repository) {
        toast.error("Please add a repository");
      }
      return;
    }

    try {
      setLoading(true);

      // Use the server action to create the project
      const result = await createProject({
        ...project,
        repositories: project.repository ? [project.repository] : [],
        description: project.longDescription.substring(0, 150), // Create a short description from the long one
      });

      if (result.success) {
        toast.success(`Created Project ${project.title}`);
        // Redirect to projects dashboard
        router.push(`/project-dashboard/${result.projectId}`);
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

            {/* Repository form */}
            <div className="md:col-span-1">
              <ProjectRepositories
                repository={repository}
                setRepository={setRepository}
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
              disabled={loading || !isFormValid()}
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
