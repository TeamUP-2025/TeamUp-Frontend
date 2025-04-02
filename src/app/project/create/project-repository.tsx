import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Github } from "lucide-react"
import RepositoryActions from "./repository-actions"

export default function ProjectRepositories({ repositories }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Git Repository</CardTitle>
                <CardDescription>The project repository</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Connected Repositories</h3>
                            <RepositoryActions />
                        </div>

                        {repositories.length > 0 ? (
                            <div className="space-y-2">
                                {repositories.map((repo) => (
                                    <div key={repo.id} className="flex items-center justify-between rounded-md border p-3">
                                        <div className="flex items-center space-x-3">
                                            <Github className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">{repo.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {repo.owner}/{repo.name}
                                                </p>
                                            </div>
                                        </div>
                                        <RepositoryActions repoId={repo.id} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                                <Github className="h-10 w-10 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium">No repositories connected</h3>
                                <p className="mt-1 text-xs text-muted-foreground text-center">
                                    Connect a GitHub repository to this project
                                </p>
                                <RepositoryActions empty={true} />
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
