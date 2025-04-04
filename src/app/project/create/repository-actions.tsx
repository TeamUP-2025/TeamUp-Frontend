"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Trash, Plus, Github } from "lucide-react"
import { connectRepository, removeRepository } from "~/lib/actions"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

// Sample repositories - in a real app, these would come from an API
const sampleRepos = [
    { id: "repo1", name: "project-frontend", owner: "teamup" },
    { id: "repo2", name: "project-backend", owner: "teamup" },
    { id: "repo3", name: "project-docs", owner: "teamup" },
]

export default function RepositoryActions({ repoId, empty = false }) {
    const [selectedRepo, setSelectedRepo] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleConnectRepo = async () => {
        if (!selectedRepo) return

        try {
            setLoading(true)
            const repo = sampleRepos.find(r => r.id === selectedRepo)
            await connectRepository(projectId, repo)
            setLoading(false)
            setIsOpen(false)
            // Refresh the page to show updated repositories
            window.location.reload()
        } catch (error) {
            console.error("Failed to connect repository:", error)
            setLoading(false)
        }
    }

    const handleRemoveRepo = async () => {
        try {
            setLoading(true)
            await removeRepository(projectId, repoId)
            setLoading(false)
            // Refresh the page to show updated repositories
            window.location.reload()
        } catch (error) {
            console.error("Failed to remove repository:", error)
            setLoading(false)
        }
    }

    // If this is for removing a repository
    if (repoId) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleRemoveRepo}
                disabled={loading}
            >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove repository</span>
            </Button>
        )
    }

    // If this is for the empty state
    if (empty) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Connect Repository
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Connect Repository</DialogTitle>
                        <DialogDescription>
                            Select a GitHub repository to connect to this project.
                        </DialogDescription>
                    </DialogHeader>

                    <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a repository" />
                        </SelectTrigger>
                        <SelectContent>
                            {sampleRepos.map(repo => (
                                <SelectItem key={repo.id} value={repo.id}>
                                    {repo.owner}/{repo.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConnectRepo} disabled={loading || !selectedRepo}>
                            {loading ? "Connecting..." : "Connect Repository"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    // Regular connect repository button
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Repository
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Connect Repository</DialogTitle>
                    <DialogDescription>
                        Select a GitHub repository to connect to this project.
                    </DialogDescription>
                </DialogHeader>

                <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a repository" />
                    </SelectTrigger>
                    <SelectContent>
                        {sampleRepos.map(repo => (
                            <SelectItem key={repo.id} value={repo.id}>
                                {repo.owner}/{repo.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleConnectRepo} disabled={loading || !selectedRepo}>
                        {loading ? "Connecting..." : "Connect Repository"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
