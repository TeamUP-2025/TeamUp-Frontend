"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Clock, CheckCircle2, Users, UserPlus } from "lucide-react"
import ProjectRoadmap from "./project-roadmap"
import ProjectGoals from "./project-goal"
import TeamMembers from "./team-members"
import JoinRequests from "./join-request"
import { updateMilestoneStatus, updateGoal, promoteMember, removeMember, approveRequest, denyRequest } from "~/lib/actions"

export default function ProjectDashboardClient({
                                                   initialProject,
                                                   initialRepositories,
                                                   initialTeamMembers,
                                                   initialJoinRequests
                                               }) {
    const [project, setProject] = useState(initialProject)
    const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
    const [joinRequests, setJoinRequests] = useState(initialJoinRequests)

    const calculateProgress = useCallback(() => {
        const total = project.Roadmap.length
        const completed = project.Roadmap.filter((item) => item.roadmapStatus === "Completed").length
        const inProgress = project.Roadmap.filter((item) => item.roadmapStatus === "In Progress").length
        return Math.round(((completed + inProgress * 0.5) / total) * 100)
    }, [project.Roadmap])

    // Milestone status update handler
    const handleMilestoneStatusUpdate = async (index, newStatus) => {
        try {
            const updatedRoadmap = [...project.Roadmap]
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

    // Team member handlers
    const handlePromoteMember = async (userId) => {
        try {
            await promoteMember(project.id, userId)
            setTeamMembers((prev) =>
                prev.map((member) =>
                    member.id === userId ? { ...member, role: "Admin" } : member
                )
            )
        } catch (error) {
            console.error("Failed to promote team member:", error)
        }
    }

    const handleRemoveMember = async (userId) => {
        try {
            await removeMember(project.id, userId)
            setTeamMembers((prev) => prev.filter((member) => member.id !== userId))
        } catch (error) {
            console.error("Failed to remove team member:", error)
        }
    }

    // Join request handlers
    const handleApproveRequest = async (requestId) => {
        try {
            const request = joinRequests.find((req) => req.id === requestId)
            if (request) {
                await approveRequest(project.id, requestId)

                // Add user to team members
                setTeamMembers((prev) => [
                    ...prev,
                    {
                        id: request.user.id,
                        name: request.user.name,
                        email: request.user.email,
                        role: "Member",
                        avatar: request.user.avatar,
                        skills: request.user.skills,
                    },
                ])

                // Remove from join requests
                setJoinRequests((prev) => prev.filter((req) => req.id !== requestId))
            }
        } catch (error) {
            console.error("Failed to approve request:", error)
        }
    }

    const handleDenyRequest = async (requestId) => {
        try {
            await denyRequest(project.id, requestId)
            setJoinRequests((prev) => prev.filter((req) => req.id !== requestId))
        } catch (error) {
            console.error("Failed to deny request:", error)
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
                    <TabsTrigger value="team">
                        <Users className="mr-2 h-4 w-4" />
                        Team Members
                    </TabsTrigger>
                    <TabsTrigger value="requests">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Join Requests
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="roadmap" className="mt-4">
                    <ProjectRoadmap
                        roadmap={project.Roadmap}
                        progress={calculateProgress()}
                    />
                </TabsContent>

                <TabsContent value="goals" className="mt-4">
                    <ProjectGoals goals={project.Goal} />
                </TabsContent>

                <TabsContent value="team" className="mt-4">
                    <TeamMembers
                        members={teamMembers}
                        onPromote={handlePromoteMember}
                        onRemove={handleRemoveMember}
                    />
                </TabsContent>

                <TabsContent value="requests" className="mt-4">
                    <JoinRequests
                        requests={joinRequests}
                        onApprove={handleApproveRequest}
                        onDeny={handleDenyRequest}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}