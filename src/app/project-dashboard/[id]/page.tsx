import { getProjectRepositories } from "~/action/repo";
import ProjectDashboardClient from "./project-dashboard-client";
import ProjectRepositories from "./repository_component/project-repository";
import ProjectDetails from "./project_detail_component/project-details";
import {
    getDonationByProjectID,
    getProjectApplicationByProjectID,
    getProjectByID,
    getProjectTeamByProjectID,
} from "~/action/project";
import { env } from "~/env";
import { getServerAuthSession } from "~/lib/auth";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  // Fetch data on the server
  const auth = await getServerAuthSession();
  if (!auth.isLoggedIn) {
    // Inform the user they need to log in
    return <p>Please log in to view this project.</p>;
  }
  const Socket_url = env.SOCKET_URL;

  const [project, repositories, teamMembers, applications] = await Promise.all([
    getProjectByID(id),
    getProjectRepositories(id),
    getProjectTeamByProjectID(id),
    getProjectApplicationByProjectID(id),
  ]);

  const donations = await getDonationByProjectID(id)

  const joinRequests =
    applications && applications.length > 0
      ? applications.map((application: any) => ({
          uid: application.Uid,
          Name: application.Name,
          Location: application.Location,
          Avatar: application.Avatar,
          Coverletter: application.Coverletter,
        }))
      : [];

  console.log(joinRequests);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6 pt-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Server-rendered project details */}
          <ProjectDetails project={project} Socket_url={Socket_url} donation={donations} />

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
