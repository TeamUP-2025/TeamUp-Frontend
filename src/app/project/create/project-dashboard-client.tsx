"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Clock, CheckCircle2, Users, UserPlus } from "lucide-react"
import CreateProjectRoadmap from "./project-roadmap"
import ProjectGoals from "./project-goal"
import { updateMilestoneStatus} from "~/lib/actions"
import ProjectLICENSE from "./project-LICENSE"

export default function ProjectDashboardClient({
    project, 
    setProject, 
    repositories, 
    setRepositories
}) {

    //project attributes
    const [roadmap, setRoadmap] = useState(project.roadmap)
    const [goal, setGoal] = useState(project.goal)
    const [license, setLicense] = useState(project.license)


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
                    <CreateProjectRoadmap
                        roadmap={project.roadmap}
                    />
                </TabsContent>

                <TabsContent value="goals" className="mt-4">
                    <ProjectGoals goals={project.goals} />
                </TabsContent>

                <TabsContent value="LICENSE" className="mt-4">
                    <ProjectLICENSE license={license} setLicense={setLicense}/>
                </TabsContent>
                
            </Tabs>
        </div>
    )
}