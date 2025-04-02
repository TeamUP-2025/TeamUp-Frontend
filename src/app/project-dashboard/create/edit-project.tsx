"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Edit, Save, X, Plus } from "lucide-react"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { updateProject } from "~/lib/actions"

export default function EditProject({ projectId }) {
    const [isEditing, setIsEditing] = useState(false)
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(false)

    // Function to fetch the project data when edit mode is enabled
    const enableEditing = async () => {
        if (!project) {
            try {
                setLoading(true)
                // Fetch project data
                const response = await fetch(`/api/projects/${projectId}`)
                const data = await response.json()
                setProject(data)
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch project data:", error)
                setLoading(false)
            }
        }
        setIsEditing(true)
    }

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            saveChanges()
        } else {
            enableEditing()
        }
    }

    const saveChanges = async () => {
        try {
            setLoading(true)
            await updateProject(projectId, project)
            setIsEditing(false)
            setLoading(false)
            // Force page refresh to show updated data
            window.location.reload()
        } catch (error) {
            console.error("Failed to update project:", error)
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProject(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddTag = () => {
        const newTag = prompt("Enter new tag:")
        if (newTag && newTag.trim() !== "") {
            setProject(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
            }))
        }
    }

    const handleRemoveTag = (index) => {
        const newTags = [...project.tags]
        newTags.splice(index, 1)
        setProject(prev => ({
            ...prev,
            tags: newTags,
        }))
    }

    if (isEditing && !project && loading) {
        return <Button variant="outline" size="sm" disabled>Loading...</Button>
    }

    return (
        <>
            <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={handleEditToggle}
                disabled={loading}
            >
                {isEditing ? (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </>
                ) : (
                    <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </>
                )}
            </Button>

            {isEditing && project && (
                <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm">
                    <div className="container flex h-full items-center justify-center">
                        <div className="w-full max-w-2xl space-y-6 rounded-lg border bg-card p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Edit Project Details</h2>
                                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Project Title</label>
                                    <Input
                                        name="title"
                                        value={project.title}
                                        onChange={handleInputChange}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Short Description</label>
                                    <Textarea
                                        name="description"
                                        value={project.description}
                                        onChange={handleInputChange}
                                        className="mt-1 min-h-[100px]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Detailed Description</label>
                                    <Textarea
                                        name="longDescription"
                                        value={project.longDescription}
                                        onChange={handleInputChange}
                                        className="mt-1 min-h-[200px]"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Tags</label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {project.tags.map((tag, index) => (
                                            <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                                                {tag}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-4 w-4 rounded-full p-0 hover:bg-muted"
                                                    onClick={() => handleRemoveTag(index)}
                                                >
                                                    <span className="sr-only">Remove {tag} tag</span>
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </Badge>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-6"
                                            onClick={handleAddTag}
                                        >
                                            <Plus className="mr-1 h-3 w-3" /> Add Tag
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={saveChanges} disabled={loading}>
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}