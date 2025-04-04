"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { MoreHorizontal, ShieldCheck, ExternalLink, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { removeMember } from "~/action/member";
interface TeamMemberActionsProps {
  member: {
    Name?: string;
    Role: string;
    Login: string;
    Uid: string;
  };
  projectId: string;
}

export default function TeamMemberActions({
  member,
  projectId,
}: TeamMemberActionsProps) {

  const [loading, setLoading] = useState(false);

  const handleRemoveMember = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await removeMember(projectId, member.Uid, member.Role);

      if (result) {
        setLoading(false);
        // Refresh the page to show updated team members
        window.location.reload();
      }

    } catch (error) {
      console.error("Failed to remove team member:", error);
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={loading}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/profile/${member.Login}`}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={handleRemoveMember}
          disabled={loading}
        >
          <Trash className="mr-2 h-4 w-4" />
          Remove from Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
