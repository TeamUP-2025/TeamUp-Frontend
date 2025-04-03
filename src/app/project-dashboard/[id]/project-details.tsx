import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import EditProject from "./edit-project"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ListCollapse, MessageSquareText, HandCoins } from "lucide-react";
import Chat from "~/components/chat/chat_component";
import ChatPage from "~/app/chat_test/[id]/page";


export default function ProjectDetails({ project }) {

    return (
        <Tabs defaultValue="detail" className="lg:col-span-2">
            <TabsList>
                <TabsTrigger value="detail">
                    <ListCollapse  className="mr-2 h-4 w-4" />
                    Project Details
                </TabsTrigger>
                <TabsTrigger value="donation">
                    <HandCoins  className="mr-2 h-4 w-4" />
                    Donation
                </TabsTrigger>
                <TabsTrigger value="chat">
                    <MessageSquareText  className="mr-2 h-4 w-4" />
                    Chat
                </TabsTrigger>
            </TabsList>
            <TabsContent value="detail">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
                            <CardDescription>Manage your project information and settings</CardDescription>
                        </div>
                        <EditProject projectId={project.id} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium leading-none">
                                    Project Title
                                </label>
                                <p className="mt-1 text-lg font-medium">{project.title}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium leading-none">
                                    Short Description
                                </label>
                                <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium leading-none">
                                    Detailed Description
                                </label>
                                <div className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                                    {project.longDescription}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium leading-none">
                                    Tags
                                </label>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="donation">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-2xl font-bold">Donations</CardTitle>
                            <CardDescription>View all donations made to this project</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="rounded-lg bg-muted p-4">
                                <h3 className="text-sm font-medium leading-none">Total Donations</h3>
                                <p className="mt-2 text-3xl font-bold">
                                    ${project.donations?.reduce((total, donation) => total + donation.amount, 0).toFixed(2) || "0.00"}
                                </p>
                            </div>

                            {project.donations && project.donations.length > 0 ? (
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium leading-none">Recent Donations</h3>
                                    <div className="max-h-[300px] overflow-y-auto rounded-md border">
                                        <div className="divide-y">
                                            {project.donations.map((donation, index) => (
                                                <div key={index} className="flex items-center justify-between p-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">{donation.donatorName}</p>
                                                        {donation.createdAt && (
                                                            <p className="text-xs text-muted-foreground">
                                                                {new Date(donation.createdAt).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p className="font-medium">${donation.amount.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                                    <HandCoins className="h-10 w-10 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-semibold">No donations yet</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">This project hasn't received any donations yet.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="chat">
                <ChatPage params={project.id}></ChatPage>
            </TabsContent>
        </Tabs>
    )
}