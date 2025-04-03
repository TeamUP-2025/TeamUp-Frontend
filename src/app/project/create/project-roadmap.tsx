import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import RoadmapStatusControl from "./roadmap-status-control"

export default function ProjectRoadmap({ roadmap, progress }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Roadmap</CardTitle>
                <CardDescription>Track progress through project milestones</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {roadmap.map((milestone, index) => (
                        <div key={index} className="relative">
                            {/* Progress line connecting milestones */}
                            {index < roadmap.length - 1 && (
                                <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-muted" />
                            )}

                            <div className="flex gap-4">
                                {/* Status indicator */}
                                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                                    {milestone.status === "Completed" ? (
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    ) : milestone.status === "In Progress" ? (
                                        <Clock className="h-5 w-5 text-amber-500" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium leading-none">{milestone.milestone}</h3>
                                        <Badge
                                            variant={
                                                milestone.status === "Completed"
                                                    ? "default"
                                                    : milestone.status === "In Progress"
                                                        ? "outline"
                                                        : "secondary"
                                            }
                                        >
                                            {milestone.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{milestone.description}</p>

                                    <div className="pt-2">
                                        <RoadmapStatusControl
                                            milestoneIndex={index}
                                            currentStatus={milestone.status}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}