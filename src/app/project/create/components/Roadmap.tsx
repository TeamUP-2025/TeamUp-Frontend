import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
import {
  CheckCircle2,
  Circle,
  Clock,
  Edit,
  Plus,
  Save,
  Trash,
} from "lucide-react";
import { Roadmap } from "../types";

// Create Project Roadmap Component
export function CreateProjectRoadmap({
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
export function RoadmapStatusControl({
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
export function RoadmapsEditor({
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
