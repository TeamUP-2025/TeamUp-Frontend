"use client"

import { Project } from "~/schema/project";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProjectFormProps {
  mode: "create" | "edit";
  project?: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ mode, project }) => {
  if (mode === "edit" && !project) {
    return <p>Error: No project found for editing.</p>;
  }

  const router = useRouter()

  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [longDescription, setLongDescription] = useState(project?.longDescription || "");
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [roadmap, setRoadmap] = useState(project?.roadmap || []);
  const [goals, setGoals] = useState<string[]>(project?.goals || []);
  const [license, setLicense] = useState(project?.license || {
    name: "",
    description: "",
    permission: [],
    condition: [],
    limitation: []
  });

  const handleAddToList = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (value.trim()) setter((prev) => [...prev, value]);
  };

  const handleRemoveFromList = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter((prev) => prev.filter((item) => item !== value));
  };

  const handleRoadmapChange = (index: number, key: keyof typeof roadmap[number], value: string) => {
    setRoadmap((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // debug
    console.log({ title, description, longDescription, tags, roadmap, goals, license });

    // todo: write changes to database

    if (mode === "create"){
      toast.success("Create Project successful!");
      // redirect to root as placeholder for now
      router.push(`/`); 
    }else {
      toast.success(`Edit Project ${project?.title} successful!`);
      router.push(`/project/${project?.id}`);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h1 className="text-center">{mode === "create" ? "Create Project" : `Edit Project #${project!.id}`}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
        {/* Basic Info */}
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-80 h-16" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-24" />
        <textarea placeholder="Long Description" value={longDescription} onChange={(e) => setLongDescription(e.target.value)} className="w-full h-32" />

        {/* Tags */}
        <div>
          <label>Tags:</label>
          <div className="flex gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="border p-1 rounded bg-gray-200">
                {tag} <button type="button" onClick={() => handleRemoveFromList(setTags, tag)}>✖</button>
              </span>
            ))}
          </div>
          <input type="text" placeholder="Add a tag" onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value) {
              handleAddToList(setTags, e.currentTarget.value);
              e.currentTarget.value = "";
              e.preventDefault();
            }
          }} />
        </div>

        {/* Roadmap */}
        <div>
          <label>Roadmap:</label>
          {roadmap.map((step, idx) => (
            <div key={idx} className="flex gap-2">
              <input type="text" value={step.milestone} onChange={(e) => handleRoadmapChange(idx, "milestone", e.target.value)} placeholder="Milestone" />
              <input type="text" value={step.description || ""} onChange={(e) => handleRoadmapChange(idx, "description", e.target.value)} placeholder="Description (optional)" />
              <select value={step.status} onChange={(e) => handleRoadmapChange(idx, "status", e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button type="button" onClick={() => setRoadmap(roadmap.filter((_, i) => i !== idx))}>✖</button>
            </div>
          ))}
          <button type="button" onClick={() => setRoadmap([...roadmap, { milestone: "", description: "", status: "pending" }])}>Add Roadmap Step</button>
        </div>

        {/* Goals */}
        <div>
          <label>Goals:</label>
          <div>
            {goals.map((goal, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => {
                    const updatedGoals = [...goals];
                    updatedGoals[idx] = e.target.value;
                    setGoals(updatedGoals);
                  }}
                  placeholder={`Goal #${idx + 1}`}
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setGoals(goals.filter((_, i) => i !== idx));
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setGoals([...goals, ""])}
              className="mt-2 text-blue-500"
            >
              Add Goal
            </button>
          </div>
        </div>

        {/* License */}
        <div>
  <label>License:</label>
  
  {/* License preset selector */}
  <select
    value={license.name || ""}
    onChange={(e) => {
      const selectedLicense = e.target.value;
      let licenseDetails: { 
        name: string; 
        description: string; 
        permission: string[]; 
        condition: string[]; 
        limitation: string[]; 
      } = { name: "", description: "", permission: [], condition: [], limitation: [] };
      
      
      // Set default details for the selected license
      switch (selectedLicense) {
        case "MIT License":
          licenseDetails = {
            name: "MIT License",
            description:
              "a simple and permissive open-source license that allows developers to use, modify, distribute, and sublicense software with minimal restrictions. Here are the key terms of the MIT License",
            permission: [
              "Commercial Use",
              "Distribution",
              "Modification",
              "Private Use",
            ],
            condition: ["License and copyright notice"],
            limitation: ["Liability", "Warranty"],
          };
          break;
        case "Apache License 2.0":
          licenseDetails = {
            name: "Apache License 2.0",
            description: "A permissive free software license with conditions on patent use",
            permission: ["Use", "Copy", "Modify", "Merge", "Publish", "Distribute", "Sub-license"],
            condition: ["Include notice of changes", "State changes made"],
            limitation: ["No liability", "Patent rights"],
          };
          break;
        case "GPL v3":
          licenseDetails = {
            name: "GPL v3",
            description: "A free software license that guarantees end users the freedom to run, study, and modify the software.",
            permission: ["Use", "Modify", "Distribute", "Publish"],
            condition: ["Provide source code", "State changes made"],
            limitation: ["No warranty", "Liability limitation"],
          };
          break;
        default:
          licenseDetails = { name: "", 
            description: "", 
            permission: [], 
            condition: [], 
            limitation: [] };
      }

      // If the user selects a preset, mark it as 'not custom' by default
      setLicense(licenseDetails);
    }}
  >
    <option value="">Select a License</option>
    <option value="MIT License">MIT License</option>
    <option value="Apache License 2.0">Apache License 2.0</option>
    <option value="GPL v3">GPL v3</option>
  </select>

  {/* License Description */}
  <textarea
    placeholder="License Description"
    value={license.description}
    onChange={(e) => {
      setLicense({ ...license, description: e.target.value, name: "Custom" });
    }}
    className="w-full h-24"
  />
  
  {/* Permissions (multiline list) */}
  <div>
  <label>Permissions:</label>
  <ul className="list-disc pl-5">
    {license.permission.map((perm, idx) => (
      <li key={idx}>
        <input
          type="text"
          value={perm}
          onChange={(e) => {
            const updatedPermissions = [...license.permission];
            updatedPermissions[idx] = e.target.value;
            setLicense({ ...license, permission: updatedPermissions, name: "Custom" });
          }}
          className="w-full"
        />
      </li>
    ))}
  </ul>
  <button
    type="button"
    onClick={() => {
      setLicense({
        ...license,
        permission: [...license.permission, ""],
        name: "Custom",
      });
    }}
    className="mt-2 text-blue-500"
  >
    Add Permission
  </button>
</div>


  {/* Conditions (multiline list) */}
  <div>
  <label>Conditions:</label>
  <ul className="list-disc pl-5">
    {license.condition.map((cond, idx) => (
      <li key={`condition-${idx}`}>
        <input
          type="text"
          value={cond}
          onChange={(e) => {
            const updatedConditions = [...license.condition];
            updatedConditions[idx] = e.target.value;
            setLicense({ ...license, condition: updatedConditions, name: "Custom" });
          }}
          className="w-full"
        />
      </li>
    ))}
  </ul>
  <button
    type="button"
    onClick={() => {
      setLicense({
        ...license,
        condition: [...license.condition, ""],
        name: "Custom",
      });
    }}
    className="mt-2 text-blue-500"
  >
    Add Condition
  </button>
</div>


  {/* Limitations (multiline list) */}
  <div>
    <label>Limitations:</label>
    <ul className="list-disc pl-5">
    {license.limitation.map((lim, idx) => (
      <li key={idx}>
        <input
          type="text"
          value={lim}
          onChange={(e) => {
            const updatedLimitations = [...license.limitation];
            updatedLimitations[idx] = e.target.value;
            setLicense({ ...license, limitation: updatedLimitations, name: "Custom" });
          }}
          className="w-full"
        />
      </li>
    ))}
  </ul>
    <button
      type="button"
      onClick={() => {
        setLicense({
          ...license,
          limitation: [...license.limitation, ""],
          name: "Custom",
        });
      }}
      className="mt-2 text-blue-500"
    >
      Add Limitation
    </button>
  </div>
</div>

        {/* Submit Button */}
        <button type="submit">{mode === "create" ? "Create Project" : "Save Changes"}</button>
      </form>
    </div>
  );
};

export default React.memo(ProjectForm);
