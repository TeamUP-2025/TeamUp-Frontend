"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import EditProject from "./edit-project"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ListCollapse, MessageSquareText, HandCoins } from "lucide-react"
import ChatPage from "~/components/chat/chat_entry"
import type { project as p, donation as d } from "~/schema/project_schema"
import type z from "zod"

type Project = z.infer<typeof p>
type Donation = z.infer<typeof d>

interface ProjectDetailsProps {
    project: Project
    Socket_url: string
    donation: Donation[]
}

export default function ProjectDetails({ project: initialProject, Socket_url, donation }: ProjectDetailsProps) {
    // Use state to manage the project data within this component
    const [currentProject, setCurrentProject] = useState<Project>(initialProject)

    // Handler function to update the state when EditProject saves changes
    const handleProjectUpdate = (updatedProject: Project) => {
        setCurrentProject(updatedProject)
    }

    // Check if there are any donations
    const hasDonations = donation && donation.length > 0

    return (
        <Tabs defaultValue="detail" className="lg:col-span-2">
            <TabsList>
                <TabsTrigger value="detail">
                    <ListCollapse className="mr-2 h-4 w-4" />
                    Project Details
                </TabsTrigger>
                <TabsTrigger value="donation">
                    <HandCoins className="mr-2 h-4 w-4" />
                    Donation
                </TabsTrigger>
                <TabsTrigger value="chat">
                    <MessageSquareText className="mr-2 h-4 w-4" />
                    Chat
                </TabsTrigger>
            </TabsList>
            <TabsContent value="detail">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
                            <CardDescription>Manage your project information and settings</CardDescription>
                        </div>
                        {/* Pass current project state and the update handler */}
                        <EditProject projectData={currentProject} onProjectUpdate={handleProjectUpdate} />
                    </CardHeader>
                    <CardContent>
                        {/* Display data from the currentProject state */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium leading-none">Project Title</label>
                                <p className="mt-1 text-lg font-medium">{currentProject.Title}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium leading-none">Description</label>
                                <p className="mt-1 text-sm text-muted-foreground">{currentProject.Description}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium leading-none">Tags</label>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {currentProject.Tag.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {/* Show placeholder if no tags */}
                                    {currentProject.Tag.length === 0 && (
                                        <p className="text-sm text-muted-foreground italic">No tags added.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="donation">
                <Card>
                    <CardHeader>
                        <CardTitle>Donations</CardTitle>
                        <CardDescription>View project donations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {hasDonations ? (
                            <div className="space-y-4">
                                {donation.map((don, idx) => (
                                    <div key={idx} className="rounded-md border p-4 shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium">{don.Name ?? "Anonymous"}</p>
                                        </div>
                                        <p className="font-semibold">{don.Amount} THB</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                                <HandCoins className="h-10 w-10 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">No Donations Yet</h3>
                                <p className="mt-2 text-sm text-muted-foreground">This project hasn't received any donations yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="chat">
                {/* Use currentProject state for ID */}
                <ChatPage params={{ id: currentProject.ID, Socket_url: Socket_url }}></ChatPage>
            </TabsContent>
        </Tabs>
    )
}

