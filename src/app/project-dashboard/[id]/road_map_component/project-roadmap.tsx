import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";
import RoadmapStatusControl from "./roadmap-status-control";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState, useMemo } from "react";
import { updateRoadmapStatus, addRoadmapMilestone } from "~/action/roadmap";

interface Milestone {
  roadmap: string;
  roadmapDescription: string;
  roadmapStatus: string;
}

interface ProjectRoadmapProps {
  roadmap: Milestone[];
  progress: number;
  projectId: string;
}

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

export default function ProjectRoadmap({
  roadmap,
  progress,
  projectId,
}: ProjectRoadmapProps) {
  const [newMilestone, setNewMilestone] = useState({
    roadmap: "",
    description: "",
  });
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sort milestones by status priority
  const sortedRoadmap = useMemo(() => {
    return [...roadmap].sort((a, b) => {
      return (
        getStatusPriority(a.roadmapStatus) - getStatusPriority(b.roadmapStatus)
      );
    });
  }, [roadmap]);

  const handleUpdateStatus = async (index: number, newStatus: string) => {
    try {
      setLoading(true);

      const milestone = sortedRoadmap[index];
      if (milestone) {
        await updateRoadmapStatus(projectId, milestone.roadmap, newStatus);
      } else {
        throw new Error("Milestone not found");
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to update milestone status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestone = async () => {
    if (newMilestone.roadmap.trim() === "" || loading) return;

    try {
      setLoading(true);

      // Otherwise use the server action directly
      await addRoadmapMilestone(
        projectId,
        newMilestone.roadmap,
        newMilestone.description,
      );

      window.location.reload();

      setNewMilestone({ roadmap: "", description: "" });
      setIsAddingMilestone(false);
    } catch (error) {
      console.error("Failed to add milestone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Roadmap</CardTitle>
            <CardDescription>
              Track progress through project milestones
            </CardDescription>
          </div>
          {!isAddingMilestone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingMilestone(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isAddingMilestone && (
          <div className="mb-6 space-y-4 rounded-md border p-4">
            <h3 className="text-sm font-medium">New Milestone</h3>
            <div className="flex flex-col space-y-3">
              <Input
                placeholder="Milestone Name"
                value={newMilestone.roadmap}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, roadmap: e.target.value })
                }
                disabled={loading}
              />
              <Input
                placeholder="Description"
                value={newMilestone.description}
                onChange={(e) =>
                  setNewMilestone({
                    ...newMilestone,
                    description: e.target.value,
                  })
                }
                disabled={loading}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={handleAddMilestone}
                  disabled={loading || newMilestone.roadmap.trim() === ""}
                >
                  Add Milestone
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingMilestone(false);
                    setNewMilestone({ roadmap: "", description: "" });
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {sortedRoadmap.map((milestone, index) => (
            <div key={index} className="relative">
              {/* Progress line connecting milestones */}
              {index < sortedRoadmap.length - 1 && (
                <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-muted" />
              )}

              <div className="flex gap-4">
                {/* Status indicator */}
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                  {milestone.roadmapStatus === "Completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : milestone.roadmapStatus === "In Progress" ? (
                    <Clock className="h-5 w-5 text-amber-500" />
                  ) : milestone.roadmapStatus === "Planned" ? (
                    <Circle className="h-5 w-5 text-muted-foreground" />
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
                        milestone.roadmapStatus === "Completed"
                          ? "default"
                          : milestone.roadmapStatus === "In Progress"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {milestone.roadmapStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {milestone.roadmapDescription}
                  </p>

                  <div className="pt-2">
                    <RoadmapStatusControl
                      milestoneIndex={index}
                      currentStatus={milestone.roadmapStatus}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>Overall Progress</div>
            <div>{progress}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardFooter>
    </Card>
  );
}
