"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Clock, CheckCircle2, Users, UserPlus } from "lucide-react";
import ProjectRoadmap from "./road_map_component/project-roadmap";
import ProjectGoals from "./project-goal";
import TeamMembers from "./teammember_component/team-members";
import JoinRequests from "./request_component/join-request";
import { addRoadmapMilestone } from "~/lib/actions";

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
            projectId={project.ID}
          />
        </TabsContent>

        <TabsContent value="goals" className="mt-4">
          <ProjectGoals goals={project.Goal} />
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <TeamMembers members={teamMembers} projectId={project.ID} />
        </TabsContent>

        <TabsContent value="requests" className="mt-4">
          <JoinRequests requests={joinRequests} projectId={project.ID} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
