"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Edit, Trash, Plus, Save, Badge, CheckCircle2, Clock, Circle } from "lucide-react"
import { addRoadmap, updateRoadmap, removeRoadmap } from "~/lib/actions"
import RoadmapStatusControl from "./roadmap-status-control"

export default function RoadmapsEditor({ initialRoadmaps, projectId }) {
  const [roadmaps, setRoadmaps] = useState(initialRoadmaps || [])
  const [newRoadmap, setNewRoadmap] = useState({ roadmap: "", description: "", status: "Pending" })
  const [editingIndex, setEditingIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAddRoadmap = async () => {
    if (newRoadmap.roadmap.trim() === "" || loading) return

    try {
      setLoading(true)
      const addedRoadmap = { ...newRoadmap, status: "Not Started" }
      await addRoadmap(projectId, addedRoadmap)

      setRoadmaps((prev) => [...prev, addedRoadmap])
      setNewRoadmap({ roadmap: "", description: "", status: "Not Started" })
    } catch (error) {
      console.error("Failed to add roadmap:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditRoadmap = async (index) => {
    if (loading) return

    try {
      setLoading(true)
      await updateRoadmap(projectId, roadmaps[index])

      setEditingIndex(null)
    } catch (error) {
      console.error("Failed to update roadmap:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveRoadmap = async (index) => {
    if (loading) return

    try {
      setLoading(true)
      await removeRoadmap(projectId, index)

      setRoadmaps((prev) => prev.filter((_, i) => i !== index))
    } catch (error) {
      console.error("Failed to remove roadmap:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Roadmap Name..."
          value={newRoadmap.roadmap}
          onChange={(e) => setNewRoadmap({ ...newRoadmap, roadmap: e.target.value })}
          className="flex-1"
          disabled={loading}
        />
        <Input
          placeholder="Description..."
          value={newRoadmap.description}
          onChange={(e) => setNewRoadmap({ ...newRoadmap, description: e.target.value })}
          className="flex-1"
          disabled={loading}
        />
        <Button onClick={handleAddRoadmap} disabled={loading || newRoadmap.roadmap.trim() === ""}>
          <Plus className="mr-2 h-4 w-4" />
          Add Roadmap
        </Button>
      </div>

      {roadmaps.map((milestone, index) => (
        <div key={index} className="flex items-start justify-between rounded-md border p-3">
          <div className="flex flex-1 gap-3">
            {editingIndex === index ? (
              <div className="flex flex-col w-full gap-2">
                <Input
                  value={milestone.roadmap}
                  onChange={(e) => {
                    const updated = [...roadmaps]
                    updated[index].roadmap = e.target.value
                    setRoadmaps(updated)
                  }}
                  disabled={loading}
                />
                <Input
                  value={milestone.description}
                  onChange={(e) => {
                    const updated = [...roadmaps]
                    updated[index].description = e.target.value
                    setRoadmaps(updated)
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
                                        <h3 className="font-medium leading-none">{milestone.roadmap}</h3>

                                    </div>
                                    <p className="text-sm text-muted-foreground">{milestone.description}</p>

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
  )
}
