"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { updateMilestoneStatus } from "~/lib/actions"

export default function RoadmapStatusControl({ milestoneIndex, currentStatus, projectId }) {
    const [status, setStatus] = useState(currentStatus)
    const [loading, setLoading] = useState(false)

    const handleStatusChange = async (newStatus) => {
        try {
            setLoading(true)
            setStatus(newStatus) // Optimistically update UI
            await updateMilestoneStatus(projectId, milestoneIndex, newStatus)
            setLoading(false)
        } catch (error) {
            console.error("Failed to update milestone status:", error)
            setStatus(currentStatus) // Revert to original status on error
            setLoading(false)
        }
    }

    return (
        <Select
            value={status}
            onValueChange={handleStatusChange}
            disabled={loading}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Planned">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
        </Select>
    )
}
