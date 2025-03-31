import Link from "next/link"
import { Github, MapPin, LinkIcon, Calendar, Star, GitBranch } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { getRecentRepo, getUserProfile } from "~/action/github"

export default async function ProfilePage() {
    const [user, repos] = await Promise.all([
        getUserProfile(),
        getRecentRepo()
    ])

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-6 px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={user.avatar_url} alt={user.name} />
                                <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h1 className="text-2xl font-bold">{user.name}</h1>
                                <p className="text-gray-500">@{user.login}</p>
                            </div>
                        </div>
                        {user.bio && <p className="text-center max-w-2xl mx-auto">{user.bio}</p>}
                        <div className="flex flex-wrap justify-center gap-4">
                            {user.location && (
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
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
                                <div className="text-2xl font-bold">{user.public_repos + user.total_private_repos}</div>
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
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <Badge variant="secondary">{repo.Language}</Badge>
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4" />
                                                <span>{repo.Star}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <GitBranch className="w-4 h-4" />
                                                <span>{repo.Fork}</span>
                                            </div>
                                        </div>
                                        <Button asChild variant="outline" size="sm">
                                            <a href={repo.Url} target="_blank" rel="noopener noreferrer">
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
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 CollabFinder. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

