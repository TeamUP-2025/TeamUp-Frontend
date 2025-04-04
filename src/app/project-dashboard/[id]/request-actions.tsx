"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface RequestActionsProps {
  requestId: string;
  projectId: string;
}

export default function RequestActions({
  requestId,
  projectId,
}: RequestActionsProps) {
  const [loading, setLoading] = useState(false);

  const handleApproveRequest = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/project/application/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          userId: requestId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to approve request: ${response.status}`);
      }

      setLoading(false);
      // Refresh the page to show updated join requests and team members
      window.location.reload();
    } catch (error) {
      console.error("Failed to approve request:", error);
      setLoading(false);
    }
  };

  const handleDenyRequest = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch(`/api/project/application/deny`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          userId: requestId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to deny request: ${response.status}`);
      }

      setLoading(false);
      // Refresh the page to show updated join requests
      window.location.reload();
    } catch (error) {
      console.error("Failed to deny request:", error);
      setLoading(false);
    }
  };

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
  );
}
