import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import TeamMemberActions from "./team-member-actions"

export default function TeamMembers({ members }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage the team working on this project</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between rounded-md border p-4">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{member.name}</h3>
                                        <Badge
                                            variant={
                                                member.role === "Owner"
                                                    ? "default"
                                                    : member.role === "Admin"
                                                        ? "outline"
                                                        : "secondary"
                                            }
                                        >
                                            {member.role}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{member.email}</p>
                                    <div className="mt-1 flex flex-wrap gap-1">
                                        {member.skills.map((skill, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Only show actions for members that are not the owner */}
                            {member.role !== "Owner" && (
                                <TeamMemberActions member={member} />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
