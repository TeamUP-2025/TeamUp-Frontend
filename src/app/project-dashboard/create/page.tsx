"use client";

import { useState } from "react";
import ProjectDashboardClient from "./project-dashboard-client";
import ProjectDetails from "./project-details";
import ProjectRepositories from "./project-repository";
import { Button } from "~/components/ui/button";

export default function CreateProjectPage() {
    // Initialize empty project form state
    const [project, setProject] = useState({
        title: "",
        description: "",
        longDescription: "",
        tags: [],
        roadmap: [],
        goals: [],
        license: { name: "" },
        owner: {
            id: "",
            name: "",
            email: "",
            avatar: "",
        },
    });

    const [repositories, setRepositories] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);

    // Async function for handling form submission
    async function handleCreateProject() {
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
            });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            const newProject = await response.json();
            setProject(newProject); // Update state after creation
        } catch (error) {
            console.error("Error creating project:", error);
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6 pt-4">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {/* Project details form */}
                    <ProjectDetails project={project} setProject={setProject} />

                    {/* Empty Repositories Section */}
                    <ProjectRepositories repositories={repositories} />
                </div>

                {/* Client component with interactive elements */}
                <ProjectDashboardClient
                    initialProject={project}
                    initialRepositories={repositories}
                    initialTeamMembers={teamMembers}
                    initialJoinRequests={joinRequests}
                    onCreateProject={handleCreateProject} // Pass the async function
                />
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mt-5 px-8">
                    <Button>Create</Button>
                </div>
            </main>
        </div>
    );
}
