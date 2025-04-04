import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { CheckCircle2, Edit, Plus, Save, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface Goal {
  text: string;
  description: string;
}

// Project Goals Component
export function ProjectGoals({
  goals,
  setGoals,
}: {
  goals: Goal[];
  setGoals: Dispatch<SetStateAction<Goal[]>>;
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
export function GoalsEditor({
  initialGoals,
  setGoals,
}: {
  initialGoals: Goal[];
  setGoals: Dispatch<SetStateAction<Goal[]>>;
}) {
  const [goalsState, setGoalsState] = useState(initialGoals || []);
  const [newGoal, setNewGoal] = useState({ text: "", description: "" });
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Update parent state when local state changes
  const updateParentState = (updatedGoals: Goal[]) => {
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

  const handleEditGoal = async (index: number, updatedGoal: Goal) => {
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
