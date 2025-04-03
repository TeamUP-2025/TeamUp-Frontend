"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Clock, CheckCircle2, Users, UserPlus } from "lucide-react"
import ProjectRoadmap from "./project-roadmap"
import ProjectGoals from "./project-goal"
import { updateMilestoneStatus} from "~/lib/actions"
import ProjectLICENSE from "./LICENSE"

export default function ProjectDashboardClient({
                                                   initialProject,
                                                   initialRepositories,
                                               }) {
    const [project, setProject] = useState(initialProject)

    // Milestone status update handler
    const handleMilestoneStatusUpdate = async (index, newStatus) => {
        try {
            const updatedRoadmap = [...project.roadmap]
            updatedRoadmap[index] = {
                ...updatedRoadmap[index],
                status: newStatus,
            }

            await updateMilestoneStatus(project.id, index, newStatus)

            setProject((prev) => ({
                ...prev,
                roadmap: updatedRoadmap,
            }))
        } catch (error) {
            console.error("Failed to update milestone status:", error)
        }
    }


    return (
        <div className="mt-6">
            <Tabs defaultValue="roadmap">
                <TabsList>
                    <TabsTrigger value="roadmap">
                        <Clock className="mr-2 h-4 w-4" />
                        Project Roadmap
                    </TabsTrigger>
                    <TabsTrigger value="goals">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Project Goals
                    </TabsTrigger>
                    <TabsTrigger value="LICENSE">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Project LICENSE
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="roadmap" className="mt-4">
                    <ProjectRoadmap
                        roadmap={project.roadmap}
                    />
                </TabsContent>

                <TabsContent value="goals" className="mt-4">
                    <ProjectGoals goals={project.goals} />
                </TabsContent>

                <TabsContent value="LICENSE" className="mt-4">
                    <ProjectLICENSE />
                </TabsContent>
                
            </Tabs>
        </div>
    )
}