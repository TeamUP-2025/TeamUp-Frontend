"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Clock, CheckCircle2, Users, UserPlus } from "lucide-react";
import ProjectRoadmap from "./project-roadmap";
import ProjectGoals from "./project-goal";
import TeamMembers from "./teammember_component/team-members";
import JoinRequests from "./join-request";

// Direct implementation functions instead of importing from lib/actions
async function updateMilestoneStatus(
  projectId: string,
  milestoneIndex: number,
  status: string,
): Promise<boolean> {
  const response = await fetch(`/api/project/roadmap/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      milestoneIndex,
      status,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update milestone: ${response.status}`);
  }

  return true;
}

async function promoteMember(
  projectId: string,
  userId: string,
): Promise<boolean> {
  const response = await fetch(`/api/project/team/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      userId,
      role: "Admin",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to promote member: ${response.status}`);
  }

  return true;
}

async function removeMember(
  projectId: string,
  userId: string,
): Promise<boolean> {
  const response = await fetch(`/api/project/team/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to remove member: ${response.status}`);
  }

  return true;
}

async function approveRequest(
  projectId: string,
  userId: string,
): Promise<boolean> {
  const response = await fetch(`/api/project/application/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to approve request: ${response.status}`);
  }

  return true;
}

async function denyRequest(
  projectId: string,
  userId: string,
): Promise<boolean> {
  const response = await fetch(`/api/project/application/deny`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      projectId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to deny request: ${response.status}`);
  }

  return true;
}

// Type definitions
interface Project {
  ID: string;
  Title: string;
  Description: string;
  Status: string | null | undefined;
  Goal: Array<{
    goalName: string;
    goalDescription: string;
  }>;
  Roadmap: Array<{
    roadmap: string;
    roadmapDescription: string;
    roadmapStatus: string;
  }>;
  License: {
    name: string;
    description: string;
    permission: string;
    condition: string;
    limitation: string;
  };
  Tag: string[];
}

interface Repository {
  Repoid: string;
  Uid: string;
  Name: string;
  Url: string;
  Description: string;
  Star: number;
  Fork: number;
  LastUpdated: string;
  Language: string;
}

interface TeamMember {
  Name?: string;
  Location?: string;
  Avatar?: string;
  Role: string;
}

interface JoinRequest {
  id: string;
  user: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    location?: string;
    tags?: string;
    skills?: string[];
  };
  status: string;
  coverletter?: string;
}

interface ProjectDashboardClientProps {
  initialProject: Project;
  initialRepositories: Repository | Repository[];
  initialTeamMembers: TeamMember[];
  initialJoinRequests: JoinRequest[];
}

export default function ProjectDashboardClient({
  initialProject,
  initialRepositories: _initialRepositories,
  initialTeamMembers,
  initialJoinRequests,
}: ProjectDashboardClientProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(initialTeamMembers);
  const [joinRequests, setJoinRequests] =
    useState<JoinRequest[]>(initialJoinRequests);

  const calculateProgress = useCallback(() => {
    const total = project.Roadmap.length;
    const completed = project.Roadmap.filter(
      (item) => item.roadmapStatus === "Completed",
    ).length;
    const inProgress = project.Roadmap.filter(
      (item) => item.roadmapStatus === "In Progress",
    ).length;
    return Math.round(((completed + inProgress * 0.5) / total) * 100);
  }, [project.Roadmap]);

  // Milestone status update handler
  const handleMilestoneStatusUpdate = async (
    index: number,
    newStatus: string,
  ) => {
    try {
      const updatedRoadmap = [...project.Roadmap];
      updatedRoadmap[index] = {
        ...updatedRoadmap[index],
        roadmapStatus: newStatus,
      } as (typeof updatedRoadmap)[number];

      await updateMilestoneStatus(project.ID, index, newStatus);

      setProject((prev) => ({
        ...prev,
        Roadmap: updatedRoadmap,
      }));
    } catch (error) {
      console.error("Failed to update milestone status:", error);
    }
  };

  // Team member handlers
  const handlePromoteMember = async () => {
    try {
      await promoteMember(project.ID, "");
      // Refresh the page to show updated roles
      window.location.reload();
    } catch (error) {
      console.error("Failed to promote team member:", error);
    }
  };

  const handleRemoveMember = async () => {
    try {
      await removeMember(project.ID, "");
      // Refresh the page to show updated team
      window.location.reload();
    } catch (error) {
      console.error("Failed to remove team member:", error);
    }
  };

  // Join request handlers
  const handleApproveRequest = async (requestId: string) => {
    try {
      const request = joinRequests.find((req) => req.id === requestId);
      if (request) {
        await approveRequest(project.ID, requestId);

        // Add user to team members
        setTeamMembers((prev) => [
          ...prev,
          {
            Name: request.user.name,
            Role: "Member",
            Avatar: request.user.avatar,
          },
        ]);

        // Remove from join requests
        setJoinRequests((prev) => prev.filter((req) => req.id !== requestId));
      }
    } catch (error) {
      console.error("Failed to approve request:", error);
    }
  };

  const handleDenyRequest = async (requestId: string) => {
    try {
      await denyRequest(project.ID, requestId);
      setJoinRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Failed to deny request:", error);
    }
  };

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
            onUpdateStatus={handleMilestoneStatusUpdate}
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
            projectId={project.ID}
          />
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <JoinRequests
            requests={joinRequests}
            onApprove={handleApproveRequest}
            onDeny={handleDenyRequest}
            projectId={project.ID}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
