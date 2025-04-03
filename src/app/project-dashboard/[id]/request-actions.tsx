"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import { approveRequest, denyRequest } from "~/lib/actions"

export default function RequestActions({ requestId, projectId }) {
    const [loading, setLoading] = useState(false)

    const handleApproveRequest = async () => {
        if (loading) return

        try {
            setLoading(true)
            await approveRequest(projectId, requestId)
            setLoading(false)
            // Refresh the page to show updated join requests and team members
            window.location.reload()
        } catch (error) {
            console.error("Failed to approve request:", error)
            setLoading(false)
        }
    }

    const handleDenyRequest = async () => {
        if (loading) return

        try {
            setLoading(true)
            await denyRequest(projectId, requestId)
            setLoading(false)
            // Refresh the page to show updated join requests
            window.location.reload()
        } catch (error) {
            console.error("Failed to deny request:", error)
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleDenyRequest}
                disabled={loading}
            >
                <XCircle className="mr-2 h-4 w-4" />
                Deny
            </Button>
            <Button size="sm" onClick={handleApproveRequest} disabled={loading}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
            </Button>
        </div>
    )
}
