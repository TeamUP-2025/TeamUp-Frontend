import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import EditProject from "./edit-project"

export default function ProjectDetails({ project, setProject }) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
                    <CardDescription>Manage your project information and settings</CardDescription>
                </div>
                <EditProject projectId={project.id} />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Project Title
                        </label>
                        <p className="mt-1 text-lg font-medium">{project.title}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Short Description
                        </label>
                        <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Detailed Description
                        </label>
                        <div className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                            {project.longDescription}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Tags
                        </label>
                        <div className="mt-1 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}