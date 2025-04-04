import { getProjectRepositories } from "~/action/repo";
import ProjectDashboardClient from "./project-dashboard-client";
import ProjectRepositories from "./repository_component/project-repository";
import ProjectDetails from "./project_detail_component/project-details";
import {
  getProjectApplicationByProjectID,
  getProjectByID,
  getProjectTeamByProjectID,
} from "~/action/project";
import { env } from "~/env";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // Fetch data on the server
  const Socket_url = env.SOCKET_URL;
  // const project = await getProjectByID(id);
  // const repositories = await getProjectRepositories(id);
  // const teamMembers = await getProjectTeamByProjectID(id);
  // const applications = await getProjectApplicationByProjectID(id);

  const [project, repositories, teamMembers, applications] = await Promise.all([
    getProjectByID(id),
    getProjectRepositories(id),
    getProjectTeamByProjectID(id),
    getProjectApplicationByProjectID(id),
  ]);

  console.log(applications);
  console.log(teamMembers);

  const joinRequests =
    applications && applications.length > 0
      ? applications.map((application: any) => ({
          id: application.id,
          user: application.user,
          status: application.status,
        }))
      : [];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6 pt-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Server-rendered project details */}
          <ProjectDetails project={project} Socket_url={Socket_url} />

          {/* Server-rendered repositories section */}
          <ProjectRepositories repositories={repositories} />
        </div>

        {/* Client component with interactive elements */}
        <ProjectDashboardClient
          initialProject={project}
          initialRepositories={repositories}
          initialTeamMembers={teamMembers}
          initialJoinRequests={joinRequests}
        />
      </main>
    </div>
  );
}
