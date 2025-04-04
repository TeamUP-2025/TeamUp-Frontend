import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import GoalsEditor from "./goal-editor"

export default function ProjectGoals({ goals }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Goals</CardTitle>
                <CardDescription>Define and track the objectives of this project</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <GoalsEditor initialGoals={goals} />

                    <div className="space-y-3">
                        {goals.map((goal, index) => (
                            <div key={index} className="flex items-start justify-between rounded-md border p-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                    <div className="flex-1">
                                        <p className="text-sm">{goal.goalName}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}