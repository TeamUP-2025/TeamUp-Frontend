"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "~/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createProject } from "~/lib/actions";
import {
  CheckCircle2,
  Circle,
  Clock,
  Check,
  Flag,
  OctagonAlert,
  Edit,
  Trash,
  Plus,
  Save,
  FileText,
  Github,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

// Define the project type
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

interface Roadmap {
  roadmap: string;
  description: string;
  status: string;
}

// Sample repositories - in a real app, these would come from an API
const sampleRepos = [
  { id: "repo1", name: "project-frontend", owner: "teamup" },
  { id: "repo2", name: "project-backend", owner: "teamup" },
  { id: "repo3", name: "project-docs", owner: "teamup" },
];

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
  const [goals, setGoals] = useState<{ text: string; description: string }[]>(
    [],
  );
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

  function updateRoadmap(newRoadmap: any[]) {
    setProject((prev) => ({
      ...prev,
      roadmap: newRoadmap,
    }));
  }

  function updateGoals(newGoals: { text: string; description: string }[]) {
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

// Project Details Component
function ProjectDetails({
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

// Project Repositories Component
function ProjectRepositories({
  repositories,
  setRepositories,
}: {
  repositories: any[];
  setRepositories: Dispatch<SetStateAction<any[]>>;
}) {
  return (
    <Card>
      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle>Git Repository</CardTitle>
        <CardDescription>The project repository</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Connected Repositories</h3>
              <RepositoryActions
                repositories={repositories}
                setRepositories={setRepositories}
              />
            </div>

            {repositories.length > 0 ? (
              <div className="space-y-2">
                {repositories.map((repo) => (
                  <div
                    key={repo.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{repo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {repo.owner}/{repo.name}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => {
                        setRepositories(
                          repositories.filter((r) => r.id !== repo.id),
                        );
                      }}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove repository</span>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <Github className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">
                  No repositories connected
                </h3>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  Connect a GitHub repository to this project
                </p>
                <RepositoryActions
                  repositories={repositories}
                  setRepositories={setRepositories}
                  empty={true}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Repository Actions Component
function RepositoryActions({
  repositories,
  setRepositories,
  empty = false,
}: {
  repositories: any[];
  setRepositories: Dispatch<SetStateAction<any[]>>;
  empty?: boolean;
}) {
  const [selectedRepo, setSelectedRepo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnectRepo = async () => {
    if (!selectedRepo) return;

    try {
      setLoading(true);
      const repo = sampleRepos.find((r) => r.id === selectedRepo);

      if (repo) {
        setRepositories([...repositories, repo]);
      }

      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to connect repository:", error);
      setLoading(false);
    }
  };

  // If this is for the empty state
  if (empty) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            Connect Repository
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Repository</DialogTitle>
            <DialogDescription>
              Select a GitHub repository to connect to this project.
            </DialogDescription>
          </DialogHeader>

          <Select value={selectedRepo} onValueChange={setSelectedRepo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a repository" />
            </SelectTrigger>
            <SelectContent>
              {sampleRepos.map((repo) => (
                <SelectItem key={repo.id} value={repo.id}>
                  {repo.owner}/{repo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConnectRepo}
              disabled={loading || !selectedRepo}
            >
              {loading ? "Connecting..." : "Connect Repository"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Regular connect repository button
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Plus className="mr-2 h-4 w-4" />
          Connect Repository
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Repository</DialogTitle>
          <DialogDescription>
            Select a GitHub repository to connect to this project.
          </DialogDescription>
        </DialogHeader>

        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a repository" />
          </SelectTrigger>
          <SelectContent>
            {sampleRepos.map((repo) => (
              <SelectItem key={repo.id} value={repo.id}>
                {repo.owner}/{repo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConnectRepo}
            disabled={loading || !selectedRepo}
          >
            {loading ? "Connecting..." : "Connect Repository"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Create Project Roadmap Component
function CreateProjectRoadmap({
  roadmap,
  setRoadmap,
}: {
  roadmap: Roadmap[];
  setRoadmap: Dispatch<SetStateAction<Roadmap[]>>;
}) {
  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle>Project Roadmap</CardTitle>
        <CardDescription>
          Track progress through project milestones
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-4">
          <RoadmapsEditor initialRoadmaps={roadmap} setRoadmaps={setRoadmap} />

          <div className="space-y-8">
            {roadmap.map((milestone, index) => (
              <div key={index} className="relative">
                {/* Progress line connecting milestones */}
                {index < roadmap.length - 1 && (
                  <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-muted" />
                )}

                <div className="flex gap-4">
                  {/* Status indicator */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    {milestone.status === "Completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : milestone.status === "In Progress" ? (
                      <Clock className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium leading-none">
                        {milestone.roadmap}
                      </h3>
                      <Badge
                        variant={
                          milestone.status === "Completed"
                            ? "default"
                            : milestone.status === "In Progress"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>

                    <div className="pt-2">
                      <RoadmapStatusControl
                        milestoneIndex={index}
                        currentStatus={milestone.status}
                        updateStatus={(status) => {
                          const updatedRoadmap = [...roadmap];
                          if (updatedRoadmap[index]) {
                            updatedRoadmap[index].status = status;
                            setRoadmap(updatedRoadmap);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Roadmap Status Control Component
function RoadmapStatusControl({
  milestoneIndex,
  currentStatus,
  updateStatus,
}: {
  milestoneIndex: number;
  currentStatus: string;
  updateStatus: (status: string) => void;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setLoading(true);
      setStatus(newStatus); // Optimistically update UI
      updateStatus(newStatus);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update milestone status:", error);
      setStatus(currentStatus); // Revert to original status on error
      setLoading(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={loading}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Update status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Planned">Planned</SelectItem>
        <SelectItem value="In Progress">In Progress</SelectItem>
        <SelectItem value="Completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}

// Roadmaps Editor Component
function RoadmapsEditor({
  initialRoadmaps,
  setRoadmaps,
}: {
  initialRoadmaps: Roadmap[];
  setRoadmaps: Dispatch<SetStateAction<Roadmap[]>>;
}) {
  const [roadmaps, setRoadmapsState] = useState(initialRoadmaps || []);
  const [newRoadmap, setNewRoadmap] = useState({
    roadmap: "",
    description: "",
    status: "Planned",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Update the parent state when local state changes
  const updateParentState = (updatedRoadmaps: Roadmap[]) => {
    setRoadmapsState(updatedRoadmaps);
    if (setRoadmaps) {
      setRoadmaps(updatedRoadmaps);
    }
  };

  const handleAddRoadmap = async () => {
    if (newRoadmap.roadmap.trim() === "" || loading) return;

    try {
      setLoading(true);
      const addedRoadmap = { ...newRoadmap, status: "Planned" };

      const updatedRoadmaps = [...roadmaps, addedRoadmap];
      updateParentState(updatedRoadmaps);
      setNewRoadmap({ roadmap: "", description: "", status: "Planned" });
    } catch (error) {
      console.error("Failed to add roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRoadmap = async (index: number) => {
    if (loading) return;

    try {
      setLoading(true);
      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to update roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRoadmap = async (index: number) => {
    if (loading) return;

    try {
      setLoading(true);

      const updatedRoadmaps = roadmaps.filter((_, i) => i !== index);
      updateParentState(updatedRoadmaps);
    } catch (error) {
      console.error("Failed to remove roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Roadmap Name..."
          value={newRoadmap.roadmap}
          onChange={(e) =>
            setNewRoadmap({ ...newRoadmap, roadmap: e.target.value })
          }
          className="flex-1"
          disabled={loading}
        />
        <Input
          placeholder="Description..."
          value={newRoadmap.description}
          onChange={(e) =>
            setNewRoadmap({ ...newRoadmap, description: e.target.value })
          }
          className="flex-1"
          disabled={loading}
        />
        <Button
          onClick={handleAddRoadmap}
          disabled={loading || newRoadmap.roadmap.trim() === ""}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Roadmap
        </Button>
      </div>

      {roadmaps.map((milestone, index) => (
        <div
          key={index}
          className="flex items-start justify-between rounded-md border p-3"
        >
          <div className="flex flex-1 gap-3">
            {editingIndex === index ? (
              <div className="flex w-full flex-col gap-2">
                <Input
                  value={milestone.roadmap}
                  onChange={(e) => {
                    const updated = [...roadmaps];
                    if (updated[index]) {
                      updated[index].roadmap = e.target.value;
                      setRoadmapsState(updated);
                    }
                  }}
                  disabled={loading}
                />
                <Input
                  value={milestone.description}
                  onChange={(e) => {
                    const updated = [...roadmaps];
                    if (updated[index]) {
                      updated[index].description = e.target.value;
                      setRoadmapsState(updated);
                    }
                  }}
                  disabled={loading}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditRoadmap(index)}
                  disabled={loading}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium leading-none">
                      {milestone.roadmap}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {editingIndex === index ? null : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setEditingIndex(index)}
                  disabled={loading}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit roadmap</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleRemoveRoadmap(index)}
                  disabled={loading}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Remove roadmap</span>
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Project Goals Component
function ProjectGoals({
  goals,
  setGoals,
}: {
  goals: { text: string; description: string }[];
  setGoals: Dispatch<SetStateAction<{ text: string; description: string }[]>>;
}) {
  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle>Project Goals</CardTitle>
        <CardDescription>
          Define clear, measurable objectives that your project aims to achieve.
          Good goals are specific, realistic, and aligned with your project's
          vision. They help team members understand priorities and provide
          direction for development efforts.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-4">
          <GoalsEditor initialGoals={goals} setGoals={setGoals} />

          <div className="space-y-3">
            {goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-start justify-between rounded-md border p-3"
              >
                <div className="flex flex-1 items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{goal.text}</p>
                    {goal.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Goals Editor Component
function GoalsEditor({
  initialGoals,
  setGoals,
}: {
  initialGoals: { text: string; description: string }[];
  setGoals: Dispatch<SetStateAction<{ text: string; description: string }[]>>;
}) {
  const [goalsState, setGoalsState] = useState(initialGoals || []);
  const [newGoal, setNewGoal] = useState({ text: "", description: "" });
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Update parent state when local state changes
  const updateParentState = (
    updatedGoals: { text: string; description: string }[],
  ) => {
    setGoalsState(updatedGoals);
    if (setGoals) {
      setGoals(updatedGoals);
    }
  };

  const handleAddGoal = async () => {
    if (newGoal.text.trim() === "" || loading) return;

    try {
      setLoading(true);

      // Update state
      const updatedGoals = [...goalsState, { ...newGoal }];
      updateParentState(updatedGoals);
      setNewGoal({ text: "", description: "" });
    } catch (error) {
      console.error("Failed to add goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGoal = async (
    index: number,
    updatedGoal: { text: string; description: string },
  ) => {
    if (loading) return;

    try {
      setLoading(true);

      // Update state
      const updatedGoals = [...goalsState];
      updatedGoals[index] = updatedGoal;
      updateParentState(updatedGoals);
      setEditingGoal(null);
    } catch (error) {
      console.error("Failed to update goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGoal = async (index: number) => {
    if (loading) return;

    try {
      setLoading(true);

      // Update state
      const updatedGoals = [...goalsState];
      updatedGoals.splice(index, 1);
      updateParentState(updatedGoals);
    } catch (error) {
      console.error("Failed to remove goal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          placeholder="Goal title..."
          value={newGoal.text}
          onChange={(e) => setNewGoal({ ...newGoal, text: e.target.value })}
          className="flex-1"
          disabled={loading}
        />
        <Input
          placeholder="Goal description"
          value={newGoal.description}
          onChange={(e) =>
            setNewGoal({ ...newGoal, description: e.target.value })
          }
          className="flex-1"
          disabled={loading}
        />
        <Button
          onClick={handleAddGoal}
          disabled={loading || newGoal.text.trim() === ""}
          className="self-start"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {goalsState.map((goal, index) => (
        <div
          key={index}
          className="flex items-start justify-between rounded-md border p-3"
        >
          <div className="flex flex-1 items-start gap-3">
            {editingGoal === index ? (
              <div className="flex w-full flex-col gap-2">
                <Input
                  value={goal.text}
                  onChange={(e) => {
                    const updatedGoals = [...goalsState];
                    if (updatedGoals[index]) {
                      updatedGoals[index].text = e.target.value;
                      setGoalsState(updatedGoals);
                    }
                  }}
                  className="flex-1"
                  disabled={loading}
                  placeholder="Goal title"
                />
                <Input
                  value={goal.description}
                  onChange={(e) => {
                    const updatedGoals = [...goalsState];
                    if (updatedGoals[index]) {
                      updatedGoals[index].description = e.target.value;
                      setGoalsState(updatedGoals);
                    }
                  }}
                  className="flex-1"
                  disabled={loading}
                  placeholder="Goal description"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentGoal = goalsState[index];
                    if (currentGoal) {
                      handleEditGoal(index, currentGoal);
                    }
                  }}
                  disabled={loading}
                  className="self-start"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium">{goal.text}</p>
                  {goal.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {goal.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setEditingGoal(index)}
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit goal</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleRemoveGoal(index)}
                    disabled={loading}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove goal</span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Project LICENSE Component
function ProjectLICENSE({
  license,
  setLicense,
}: {
  license: any;
  setLicense: Dispatch<SetStateAction<any>>;
}) {
  //todo: fetch available LICENSE
  const presetLicenses = [
    {
      name: "MIT License",
      description: "A permissive license that is short and to the point.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Private use",
      ],
      condition: ["License and copyright notice"],
      limitation: ["Liability", "Warranty"],
    },
    {
      name: "GNU GPLv3",
      description:
        "A copyleft license that requires anyone who distributes your code to make the source available.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Patent use",
        "Private use",
      ],
      condition: [
        "Disclose source",
        "License and copyright notice",
        "Same license",
      ],
      limitation: ["Liability", "Warranty"],
    },
    {
      name: "Apache License 2.0",
      description:
        "A permissive license that also provides an express grant of patent rights.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Patent use",
        "Private use",
      ],
      condition: ["License and copyright notice", "State changes"],
      limitation: ["Trademark use", "Liability", "Warranty"],
    },
    {
      name: "Mozilla Public License 2.0",
      description: "A weak copyleft license that is simple to comply with.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Patent use",
        "Private use",
      ],
      condition: [
        "Disclose source",
        "License and copyright notice",
        "Same license (file)",
      ],
      limitation: ["Trademark use", "Liability", "Warranty"],
    },
    {
      name: "BSD 3-Clause",
      description: "A permissive license with very limited restrictions.",
      permission: [
        "Commercial use",
        "Distribution",
        "Modification",
        "Private use",
      ],
      condition: ["License and copyright notice"],
      limitation: ["Liability", "Warranty"],
    },
  ];

  const [selectedLicense, setSelectedLicense] = useState(
    Object.keys(license).length === 0 ? presetLicenses[0] : license,
  );

  const handleLicenseChange = (value: string) => {
    const newLicense = presetLicenses.find((lic) => lic.name === value);
    if (newLicense) {
      setSelectedLicense(newLicense);
      setLicense?.(newLicense); // Call `setLicense` if provided
    }
  };

  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle>Project LICENSE</CardTitle>
        <CardDescription>
          copyright / copyleft LICENSE for your project product.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedLicense.name}</CardTitle>
              {/* License Selection Dropdown */}
              <Select onValueChange={handleLicenseChange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select License" />
                </SelectTrigger>
                <SelectContent>
                  {presetLicenses.map((license) => (
                    <SelectItem key={license.name} value={license.name}>
                      {license.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription>{selectedLicense.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-evenly gap-x-5 gap-y-5 sm:flex-row">
              <ul className="space-y-2">
                <a className="text-lg font-bold">Permission</a>
                {selectedLicense.permission.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Check className="mt-1 h-4 w-4 text-green-500" />
                      <div>
                        <a className="font-light">{item}</a>
                      </div>
                    </li>
                  ),
                )}
              </ul>
              <ul className="space-y-2">
                <a className="text-lg font-bold">Condition</a>
                {selectedLicense.condition.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Flag className="mt-1 h-4 w-4 text-yellow-500" />
                      <div>
                        <a className="font-light">{item}</a>
                      </div>
                    </li>
                  ),
                )}
              </ul>
              <ul className="space-y-2">
                <a className="text-lg font-bold">Limitation</a>
                {selectedLicense.limitation.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <OctagonAlert className="mt-1 h-4 w-4 text-red-500" />
                      <div>
                        <a className="font-light">{item}</a>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
