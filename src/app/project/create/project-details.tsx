import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"

export default function ProjectDetails({ 
    project, setProject,
    tags, setTags
 }) {
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
                            Description
                        </label>
                        <Textarea
                            value={project.description}
                            onChange={(e) => setProject({ ...project, longDescription: e.target.value })}
                            className="mt-1 whitespace-pre-line text-sm text-muted-foreground"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium leading-none">
                            Tags
                        </label>
                        <div className="mt-1 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <Input
                            type="text"
                            placeholder="Add a tag..."
                            onKeyDown={(e) => {
                                const value = e.currentTarget.value.trim()
                                if (e.key === "Enter" && value) {
                                  if (!tags.includes(value)) {
                                    setTags(prev => [...prev, value])
                                  }
                                  e.currentTarget.value = ""
                                  e.preventDefault()
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