import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Github, Plus, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Sample repositories - in a real app, these would come from an API
const sampleRepos = [
  { id: "repo1", name: "project-frontend", owner: "teamup" },
  { id: "repo2", name: "project-backend", owner: "teamup" },
  { id: "repo3", name: "project-docs", owner: "teamup" },
];

// Project Repository Component
export function ProjectRepositories({
  repository,
  setRepository,
}: {
  repository: any;
  setRepository: Dispatch<SetStateAction<any>>;
}) {
  return (
    <Card>
      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle>Git Repository</CardTitle>
        <CardDescription>The project repository</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Connected Repository</h3>
              {!repository && (
                <RepositoryActions
                  repository={repository}
                  setRepository={setRepository}
                />
              )}
            </div>

            {repository ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{repository.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {repository.owner}/{repository.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      setRepository(null);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove repository</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                <Github className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">
                  No repository connected
                </h3>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  Connect a GitHub repository to this project
                </p>
                <RepositoryActions
                  repository={repository}
                  setRepository={setRepository}
                  empty={true}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Repository Actions Component
export function RepositoryActions({
  repository,
  setRepository,
  empty = false,
}: {
  repository: any;
  setRepository: Dispatch<SetStateAction<any>>;
  empty?: boolean;
}) {
  const [selectedRepo, setSelectedRepo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnectRepo = async () => {
    if (!selectedRepo) return;

    try {
      setLoading(true);
      const repo = sampleRepos.find((r) => r.id === selectedRepo);

      if (repo) {
        setRepository(repo);
      }

      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to connect repository:", error);
      setLoading(false);
    }
  };

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
              {sampleRepos.map((repo) => (
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
            <Button
              onClick={handleConnectRepo}
              disabled={loading || !selectedRepo}
            >
              {loading ? "Connecting..." : "Connect Repository"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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
            {sampleRepos.map((repo) => (
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
          <Button
            onClick={handleConnectRepo}
            disabled={loading || !selectedRepo}
          >
            {loading ? "Connecting..." : "Connect Repository"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
