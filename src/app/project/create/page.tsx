"use client";

import { useState } from "react";
import ProjectDashboardClient from "./project-dashboard-client";
import ProjectDetails from "./project-details";
import ProjectRepositories from "./project-repository";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
    const router = useRouter();
    // Initialize empty project form state

    // todo: get user from current logged in session

    const [project, setProject] = useState({
        title: "",
        description: "",
        repoid:[], //UUID
        status:"", //VARCHAR
        roadmap: [],
        goals: [],
        license: {}, //UUID

    });

    const [repositories, setRepositories] = useState([]);
    const [tags, setTags] = useState<String[]>([])
    const [roadmap, setRoadmap] = useState()
    const [goal, setGoal] = useState()

    //repo -> project -> roadmap & goal 
    //     ->current  -> team member
    //tag             -> projectTag

    // todo: get Current User

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
            toast.success(`Created Project ${newProject.title}`);
            // todo: redirect to new project page
            router.push(`/project/${newProject.id}`);
        } catch (error) {
            console.error("Error creating project:", error);
        }

    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6 pt-4">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {/* Project details form */}
                    <ProjectDetails 
                    project={project} setProject={setProject} 
                    tags={tags} setTags={setTags}
                    />
                    
                    {/* Repositories form */}
                    <ProjectRepositories repositories={repositories} setRepositories={setRepositories}/>
                </div>

                {/* Client component with interactive elements */}
                <ProjectDashboardClient
                    project={project} setProject={setProject}
                    roadmap={roadmap} setRoadmap={setRoadmap}
                    goal={goal} setGoal ={setGoal}
                />
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mt-5 px-8">
                    <Button onClick={handleCreateProject}>Create</Button>
                </div>
            </main>
        </div>
    );
}
