"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { MoreHorizontal, ShieldCheck, ExternalLink, Trash } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { promoteMember, removeMember } from "~/lib/actions"
import Link from "next/link"

export default function TeamMemberActions({ member, projectId }) {
    const [loading, setLoading] = useState(false)

    const handlePromoteMember = async () => {
        if (loading) return

        try {
            setLoading(true)
            await promoteMember(projectId, member.id)
            setLoading(false)
            // Refresh the page to show updated member roles
            window.location.reload()
        } catch (error) {
            console.error("Failed to promote team member:", error)
            setLoading(false)
        }
    }

    const handleRemoveMember = async () => {
        if (loading) return

        try {
            setLoading(true)
            await removeMember(projectId, member.id)
            setLoading(false)
            // Refresh the page to show updated team members
            window.location.reload()
        } catch (error) {
            console.error("Failed to remove team member:", error)
            setLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={loading}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {member.role !== "Admin" && (
                    <DropdownMenuItem onClick={handlePromoteMember} disabled={loading}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Promote to Admin
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link href={`/users/${member.id}`}>
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
    )
}