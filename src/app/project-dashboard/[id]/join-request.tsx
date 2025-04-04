import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { UserPlus, ExternalLink } from "lucide-react";
import Link from "next/link";
import RequestActions from "./request-actions";

interface JoinRequest {
  id: string;
  user: {
    id: string;
    name: string;
    location?: string;
    tags?: string;
    profile?: string;
  };
  status: string;
  coverletter?: string;
}

interface JoinRequestsProps {
  requests: JoinRequest[];
  onApprove: (requestId: string) => Promise<void>;
  onDeny: (requestId: string) => Promise<void>;
  projectId: string;
}

export default function JoinRequests({
  requests,
  onApprove,
  onDeny,
  projectId,
}: JoinRequestsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Requests</CardTitle>
        <CardDescription>
          Developers wanting to join your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests && requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="rounded-md border">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <UserPlus className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-medium">{request.user.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {request.user.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-sm font-medium">Skills:</h5>
                    <p className="text-sm text-muted-foreground">
                      {request.user.tags}
                    </p>
                  </div>
                  {request.coverletter && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium">Cover Letter:</h5>
                      <p className="text-sm text-muted-foreground">
                        {request.coverletter}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between border-t p-3">
                  <Link
                    href={`/users/${request.user.name}`}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                  <RequestActions
                    requestId={request.id}
                    projectId={projectId}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
            <UserPlus className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium">
              No pending join requests
            </h3>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              When developers request to join your project, they will appear
              here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
