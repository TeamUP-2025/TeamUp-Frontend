"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/hooks/use-toast";

interface RoadmapStatusControlProps {
  milestoneIndex: number;
  currentStatus: string;
  onUpdateStatus?: (index: number, newStatus: string) => Promise<void>;
}

export default function RoadmapStatusControl({
  milestoneIndex,
  currentStatus,
  onUpdateStatus,
}: RoadmapStatusControlProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    if (!onUpdateStatus || newStatus === status) return;

    try {
      setLoading(true);
      setStatus(newStatus); // Optimistically update UI

      await onUpdateStatus(milestoneIndex, newStatus);
    } catch (error) {
      console.error("Failed to update milestone status:", error);
      setStatus(currentStatus); // Revert to original status on error
      toast({
        title: "Error",
        description: "Failed to update milestone status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
  );
}
