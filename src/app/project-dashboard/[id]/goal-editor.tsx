"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Edit, Trash, Plus, Save } from "lucide-react"
import { addGoal, updateGoal, removeGoal } from "~/lib/actions"

export default function GoalsEditor({ initialGoals, projectId }) {
  const [goals, setGoals] = useState(initialGoals)
  const [newGoal, setNewGoal] = useState("")
  const [editingGoal, setEditingGoal] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAddGoal = async () => {
    if (newGoal.trim() === "" || loading) return

    try {
      setLoading(true)
      await addGoal(projectId, newGoal.trim())

      // Update state optimistically
      setGoals(prev => [...prev, newGoal.trim()])
      setNewGoal("")
      setLoading(false)
    } catch (error) {
      console.error("Failed to add goal:", error)
      setLoading(false)
    }
  }

  const handleEditGoal = async (index, newText) => {
    if (loading) return

    try {
      setLoading(true)
      await updateGoal(projectId, index, newText)

      // Update state optimistically
      const updatedGoals = [...goals]
      updatedGoals[index] = newText
      setGoals(updatedGoals)
      setEditingGoal(null)
      setLoading(false)
    } catch (error) {
      console.error("Failed to update goal:", error)
      setLoading(false)
    }
  }

  const handleRemoveGoal = async (index) => {
    if (loading) return

    try {
      setLoading(true)
      await removeGoal(projectId, index)

      // Update state optimistically
      const updatedGoals = [...goals]
      updatedGoals.splice(index, 1)
      setGoals(updatedGoals)
      setLoading(false)
    } catch (error) {
      console.error("Failed to remove goal:", error)
      setLoading(false)
    }
  }

  return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
              placeholder="Add a new goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="flex-1"
              disabled={loading}
          />
          <Button onClick={handleAddGoal} disabled={loading || newGoal.trim() === ""}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>

        {goals.map((goal, index) => (
            <div key={index} className="flex items-start justify-between rounded-md border p-3">
              <div className="flex items-start gap-3 flex-1">
                {editingGoal === index ? (
                    <div className="flex gap-2 w-full">
                      <Input
                          value={goal.goalName}
                          onChange={(e) => {
                            const updatedGoals = [...goals]
                            updatedGoals[index] = e.target.value
                            setGoals(updatedGoals)
                          }}
                          className="flex-1"
                          disabled={loading}
                      />
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditGoal(index, goals[index])}
                          disabled={loading}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-sm">{goal.goalName}</p>
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
  )
}
