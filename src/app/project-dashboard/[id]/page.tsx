// app/project/[id]/page.tsx (Server Component)
import { getProjectTeamMembers, getProjectJoinRequests } from "~/lib/stub";
import { getProjectRepositories } from "~/action/repo";
import ProjectDashboardClient from "./project-dashboard-client";
import ProjectDetails from "./project-details";
import ProjectRepositories from "./project-repository";
import { getProjectByID } from "~/action/project";
import { env } from "~/env";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
    const { id } = await params;
  // Fetch data on the server
  const Socket_url = env.SOCKET_URL;
  const project = await getProjectByID(id);
  const repositories = await getProjectRepositories(id);
  
//   const teamMembers = await getProjectTeamMembers(params.id);
//   const joinRequests = await getProjectJoinRequests(params.id);

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
        {/* <ProjectDashboardClient
                    initialProject={project}
                    initialRepositories={repositories}
                    initialTeamMembers={teamMembers}
                    initialJoinRequests={joinRequests}
                /> */}
      </main>
    </div>
  );
}
