import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { UserPlus, ExternalLink } from "lucide-react"
import Link from "next/link"
import RequestActions from "./request-actions"

export default function JoinRequests({ requests }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Join Requests</CardTitle>
                <CardDescription>Review and manage requests to join this project</CardDescription>
            </CardHeader>
            <CardContent>
                {requests.length > 0 ? (
                    <div className="space-y-6">
                        {requests.map((request) => (
                            <div key={request.id} className="rounded-md border">
                                <div className="flex items-start gap-4 p-4">
                                    <Avatar>
                                        <AvatarImage src={request.user.avatar} alt={request.user.name} />
                                        <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium">{request.user.name}</h3>
                                                <p className="text-sm text-muted-foreground">{request.user.email}</p>
                                            </div>
                                            <p className="text-xs text-muted-foreground">Requested on {request.date}</p>
                                        </div>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {request.user.skills.map((skill, i) => (
                                                <Badge key={i} variant="outline" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-sm">{request.message}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t p-3">
                                    <Link href={request.user.profile} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        View Profile
                                    </Link>
                                    <RequestActions requestId={request.id} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                        <UserPlus className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-medium">No pending join requests</h3>
                        <p className="mt-1 text-xs text-muted-foreground text-center">
                            When developers request to join your project, they will appear here
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}