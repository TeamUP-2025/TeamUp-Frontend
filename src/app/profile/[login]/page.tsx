import Link from "next/link";
import {
  Github,
  MapPin,
  LinkIcon,
  Calendar,
  Star,
  GitBranch,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getRecentRepoByLogin } from "~/action/repo";
import { getUserProfileByLogin } from "~/action/user";


export default async function ProfilePage({
  params,
}: {
  params: { login: string };
}) {
  const { login } = await params;
    const [user, repos] = await Promise.all([
      getUserProfileByLogin(login),
      getRecentRepoByLogin(login),
    ])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback>
                  {user.login.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">@{user.login}</p>
              </div>
            </div>
            {user.bio && (
              <p className="mx-auto max-w-2xl text-center">{user.bio}</p>
            )}
            <div className="flex flex-wrap justify-center gap-4">
              {user.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{user.followers}</div>
                <div className="text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user.following}</div>
                <div className="text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {user.public_repos + user.total_private_repos}
                </div>
                <div className="text-gray-500">Repositories</div>
              </div>
            </div>
          </div>

          {/* repositroy */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Recent Repositories</h2>
            {repos.map((repo) => (
              <Card key={repo.Repoid}>
                <CardHeader>
                  <CardTitle>{repo.Name}</CardTitle>
                  <CardDescription>{repo.Description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{repo.Language}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.Star}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="h-4 w-4" />
                        <span>{repo.Fork}</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={repo.Url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Repo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 CollabFinder. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
