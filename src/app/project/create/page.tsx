"use client";

import { useState } from "react";
import ProjectDashboardClient from "./project-dashboard-client";
import ProjectDetails from "./project-details";
import ProjectRepositories from "./project-repository";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";

export default function CreateProjectPage() {
    // Initialize empty project form state

    // todo: get user from current logged in session
    const sampleOwner = {
        id: "user-1",
        name: "Alex Morgan",
        email: "alex@teamup.com",
        avatar: "/placeholder.svg?height=40&width=40",
    }

    const [project, setProject] = useState({
        title: "",
        description: "",
        longDescription: "",
        tags: [],
        roadmap: [],
        goals: [],
        license: { name: "" },
        owner:sampleOwner,
    });

    const [repositories, setRepositories] = useState([]);

    // Async function for handling form submission (placeholder)
    async function handleCreateProject() {
        try {
            const response = await fetch(`/api/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
                //  + current_user + repositories
            });
            console.log(JSON.stringify(project))

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            const newProject = await response.json();
            setProject(newProject);
        } catch (error) {
            console.error("Error creating project:", error);
        }
        toast.success(`Created Project ${newProject.title}`);
        // todo: redirect to new project page
        router.push(`/project/${newProject.id}`);

    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6 pt-4">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {/* Project details form */}
                    <ProjectDetails project={project} setProject={setProject} />
                    
                    {/*todo: current userform*/}

                    {/* Repositories form */}
                    <ProjectRepositories repositories={repositories} setRepositories={setRepositories}/>
                </div>

                {/* Client component with interactive elements */}
                <ProjectDashboardClient
                    initialProject={project}
                    initialRepositories={repositories}
                />
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mt-5 px-8">
                    <Button onClick={handleCreateProject}>Create</Button>
                </div>
            </main>
        </div>
    );
}
