"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Edit, Trash, Plus, Save } from "lucide-react"
import { addRoadmap, updateRoadmap, removeRoadmap } from "~/lib/actions"

export default function RoadmapsEditor({ initialRoadmaps, projectId }) {
  const [roadmaps, setRoadmaps] = useState(initialRoadmaps)
  const [newRoadmap, setNewRoadmap] = useState("")
  const [editingRoadmap, setEditingRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAddRoadmap = async () => {
    if (newRoadmap.trim() === "" || loading) return

    try {
      setLoading(true)
      await addRoadmap(projectId, newRoadmap.trim())

      // Update state optimistically
      setRoadmaps(prev => [...prev, newRoadmap.trim()])
      setNewRoadmap("")
      setLoading(false)
    } catch (error) {
      console.error("Failed to add roadmap:", error)
      setLoading(false)
    }
  }

  const handleEditRoadmap = async (index, newText) => {
    if (loading) return

    try {
      setLoading(true)
      await updateRoadmap(projectId, index, newText)

      // Update state optimistically
      const updatedRoadmaps = [...roadmaps]
      updatedRoadmaps[index] = newText
      setRoadmaps(updatedRoadmaps)
      setEditingRoadmap(null)
      setLoading(false)
    } catch (error) {
      console.error("Failed to update roadmap:", error)
      setLoading(false)
    }
  }

  const handleRemoveRoadmap = async (index) => {
    if (loading) return

    try {
      setLoading(true)
      await removeRoadmap(projectId, index)

      // Update state optimistically
      const updatedRoadmaps = [...roadmaps]
      updatedRoadmaps.splice(index, 1)
      setRoadmaps(updatedRoadmaps)
      setLoading(false)
    } catch (error) {
      console.error("Failed to remove roadmap:", error)
      setLoading(false)
    }
  }

  return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
              placeholder="Add a new roadmap..."
              value={newRoadmap}
              onChange={(e) => setNewRoadmap(e.target.value)}
              className="flex-1"
              disabled={loading}
          />
          <Button onClick={handleAddRoadmap} disabled={loading || newRoadmap.trim() === ""}>
            <Plus className="mr-2 h-4 w-4" />
            Add Roadmap
          </Button>
        </div>

        {roadmaps.map((roadmap, index) => (
            <div key={index} className="flex items-start justify-between rounded-md border p-3">
              <div className="flex items-start gap-3 flex-1">
                {editingRoadmap === index ? (
                    <div className="flex gap-2 w-full">
                      <Input
                          value={roadmap}
                          onChange={(e) => {
                            const updatedGoals = [...roadmaps]
                            updatedGoals[index] = e.target.value
                            setRoadmaps(updatedGoals)
                          }}
                          className="flex-1"
                          disabled={loading}
                      />
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditRoadmap(index, roadmaps[index])}
                          disabled={loading}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                ) : (
                    <>
                      <div className="flex-1">
                        <p className="text-sm">{roadmap}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setEditingRoadmap(index)}
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
                      </div>
                    </>
                )}
              </div>
            </div>
        ))}
      </div>
  )
}
