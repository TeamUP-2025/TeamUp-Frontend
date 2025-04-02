import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

export default function ProjectDetails({ project, setProject }) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                    <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
                    <CardDescription>Create your project</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Project Title
                        </label>
                        <Input
                            type="text"
                            value={project.title}
                            onChange={(e) => setProject({ ...project, title: e.target.value })}
                            className="mt-1 text-lg font-medium"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Short Description
                        </label>
                        <Input
                            type="text"
                            value={project.description}
                            onChange={(e) => setProject({ ...project, description: e.target.value })}
                            className="mt-1 text-sm text-muted-foreground"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Detailed Description
                        </label>
                        <Textarea
                            value={project.longDescription}
                            onChange={(e) => setProject({ ...project, longDescription: e.target.value })}
                            className="mt-1 whitespace-pre-line text-sm text-muted-foreground"
                        />
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
                        <Input
                            type="text"
                            placeholder="Add a tag..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.target.value.trim()) {
                                    setProject({ ...project, tags: [...project.tags, e.target.value.trim()] });
                                    e.target.value = "";
                                    e.preventDefault();
                                }
                            }}
                            className="mt-2 flex flex-wrap gap-2"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}