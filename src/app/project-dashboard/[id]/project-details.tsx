"use client"; // Add this if not already present at the top level

import { useState } from "react"; // Import useState
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import EditProject from "./edit-project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ListCollapse, MessageSquareText, HandCoins } from "lucide-react";
// import Chat from "~/components/chat/chat_component"; // Assuming ChatPage is used
import ChatPage from "~/app/chat_test/[id]/page";
import { project as p } from "~/schema/project_schema";
import z from "zod";

type Project = z.infer<typeof p>;

// Rename the prop for clarity
export default function ProjectDetails({ project: initialProject }: { project: Project }) {
  // Use state to manage the project data within this component
  const [currentProject, setCurrentProject] = useState<Project>(initialProject);

  // Handler function to update the state when EditProject saves changes
  const handleProjectUpdate = (updatedProject: Project) => {
    setCurrentProject(updatedProject);
  };

  return (
    <Tabs defaultValue="detail" className="lg:col-span-2">
      <TabsList>
        <TabsTrigger value="detail">
          <ListCollapse className="mr-2 h-4 w-4" />
          Project Details
        </TabsTrigger>
        <TabsTrigger value="donation">
          <HandCoins className="mr-2 h-4 w-4" />
          Donation
        </TabsTrigger>
        <TabsTrigger value="chat">
          <MessageSquareText className="mr-2 h-4 w-4" />
          Chat
        </TabsTrigger>
      </TabsList>
      <TabsContent value="detail">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">
                Project Details
              </CardTitle>
              <CardDescription>
                Manage your project information and settings
              </CardDescription>
            </div>
            {/* Pass current project state and the update handler */}
            <EditProject
              projectData={currentProject}
              onProjectUpdate={handleProjectUpdate}
            />
          </CardHeader>
          <CardContent>
            {/* Display data from the currentProject state */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium leading-none">
                  Project Title
                </label>
                <p className="mt-1 text-lg font-medium">
                  {currentProject.Title}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium leading-none">
                  Description
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {currentProject.Description}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium leading-none">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {currentProject.Tag.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {/* Show placeholder if no tags */}
                  {currentProject.Tag.length === 0 && (
                     <p className="text-sm text-muted-foreground italic">No tags added.</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="donation">
        {/* Donation content remains the same */}
        <Card>
           <CardHeader>
               <CardTitle>Donations</CardTitle>
               <CardDescription>View project donations (Placeholder)</CardDescription>
           </CardHeader>
           <CardContent>
               <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                   <HandCoins className="h-10 w-10 text-muted-foreground" />
                   <h3 className="mt-4 text-lg font-semibold">Donation Feature</h3>
                   <p className="mt-2 text-sm text-muted-foreground">Donation details would be displayed here.</p>
               </div>
           </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="chat">
        {/* Use currentProject state for ID */}
        <ChatPage params={{ id: currentProject.ID }}></ChatPage>
      </TabsContent>
    </Tabs>
  );
}