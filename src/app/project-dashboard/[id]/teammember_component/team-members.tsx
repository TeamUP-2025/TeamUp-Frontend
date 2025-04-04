import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import TeamMemberActions from "./team-member-actions";

interface TeamMember {
  Name?: string;
  Location?: string;
  Avatar?: string;
  Role: string;
  Login: string;
  Uid: string;
}

interface TeamMembersProps {
  members: TeamMember[];
  onPromote: (userId: string) => Promise<void>;
  onRemove: (userId: string) => Promise<void>;
  projectId: string;
}

export default function TeamMembers({
  members = [],
  onPromote,
  onRemove,
  projectId,
}: TeamMembersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Manage the team working on this project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members &&
            members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={member.Avatar}
                      alt={member.Name || "User"}
                    />
                    <AvatarFallback>
                      {member.Name ? member.Name.charAt(0) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {member.Name || "Unknown User"}
                      </h3>
                      <Badge
                        variant={
                          member.Role === "Owner"
                            ? "default"
                            : member.Role === "Admin"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {member.Role}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Only show actions for members that are not the owner */}
                {member.Role !== "Owner" && (
                  <TeamMemberActions member={member} projectId={projectId} />
                )}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
