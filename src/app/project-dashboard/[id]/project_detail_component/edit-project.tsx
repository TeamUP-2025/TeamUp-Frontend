"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Edit, Save, X, Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import { updateProjectDetail } from "~/action/project"; // Assuming updateProjectDetail is modified to return the updated project
import { project as p } from "~/schema/project_schema";
import { z } from "zod";

type Project = z.infer<typeof p>;

interface EditProjectProps {
  projectData: Project;
  onProjectUpdate: (updatedProject: Project) => void; // Callback to update parent
}

export default function EditProject({
  projectData,
  onProjectUpdate,
}: EditProjectProps) {
  const [isEditing, setIsEditing] = useState(false);
  // Initialize local state with the prop data
  const [project, setProject] = useState<Project>(projectData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to update local state if the prop data changes from the parent
  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

  const handleEditToggle = () => {
    if (isEditing) {
      // This button now acts as a second save button inside the modal
      saveChanges();
    } else {
      // Reset local state to original data when opening modal
      setProject(projectData);
      setError(null); // Clear previous errors
      setIsEditing(true);
    }
  };

  const saveChanges = async () => {
    setError(null); // Clear previous errors
    setLoading(true);
    try {
      // Ensure project state has the latest edits before sending
      const updatedProject = await updateProjectDetail(
        project.ID,
        project.Title,
        project.Description,
        project.Tag,
      );

      // Call the callback function passed from the parent
      onProjectUpdate(updatedProject);

      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update project:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
      // Optionally keep the modal open on error:
      // setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null); // Clear errors on cancel
    // No need to reset state here, as it's reset when opening the modal
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      // Use the correct state keys (Title, Description)
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    const newTag = prompt("Enter new tag:");
    if (newTag && newTag.trim() !== "") {
      const trimmedTag = newTag.trim();
      // Prevent adding duplicate tags
      if (!project.Tag.includes(trimmedTag)) {
        setProject((prev) => ({
          ...prev,
          // Use the correct state key (Tag)
          Tag: [...prev.Tag, trimmedTag],
        }));
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setProject((prev) => ({
      ...prev,
      // Use the correct state key (Tag)
      Tag: prev.Tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <>
      {/* Main Edit Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleEditToggle}
        disabled={loading} // Disable if save is in progress
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="container w-full max-w-2xl">
            <div className="space-y-6 rounded-lg border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Project Details</h2>
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {error && (
                <div
                  className="rounded border border-destructive bg-destructive/10 p-3 text-sm text-destructive"
                  role="alert"
                >
                  <p>
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="projectTitle" className="text-sm font-medium">
                    Project Title
                  </label>
                  <Input
                    id="projectTitle"
                    // Use correct name matching state key
                    name="Title"
                    value={project.Title}
                    onChange={handleInputChange}
                    className="mt-1"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="projectDescription"
                    className="text-sm font-medium"
                  >
                    Short Description
                  </label>
                  <Textarea
                    id="projectDescription"
                    // Use correct name matching state key
                    name="Description"
                    value={project.Description}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[100px]"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {/* Use correct state key (Tag) */}
                    {project.Tag.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 rounded-full p-0 hover:bg-destructive/20 hover:text-destructive"
                          // Pass the tag itself for removal
                          onClick={() => handleRemoveTag(tag)}
                          disabled={loading}
                          aria-label={`Remove ${tag} tag`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-6 px-2"
                      onClick={handleAddTag}
                      disabled={loading}
                    >
                      <Plus className="mr-1 h-3 w-3" /> Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={saveChanges} disabled={loading}>
                  {loading ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
