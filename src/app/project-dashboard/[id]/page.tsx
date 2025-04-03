// app/project/[id]/page.tsx (Server Component)
import { getProjectById, getProjectRepositories, getProjectTeamMembers, getProjectJoinRequests } from "~/lib/stub"
import ProjectDashboardClient from "./project-dashboard-client"
import ProjectDetails from "./project-details"
import ProjectRepositories from "./project-repository"
import {getProjectByID} from "~/action/project";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    // Fetch data on the server
    const project = await getProjectByID(params.id)
    const repositories = await getProjectRepositories(params.id)
    const teamMembers = await getProjectTeamMembers(params.id)
    const joinRequests = await getProjectJoinRequests(params.id)

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6 pt-4">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    {/* Server-rendered project details */}
                    <ProjectDetails project={project} />

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
    )
}
