import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Github,
  CheckCircle2,
  Circle,
  Clock,
  Check,
  Flag,
  OctagonAlert,
} from "lucide-react";
import JoinProjectPage from "./join-form";

// This would typically come from an API or database
const project = {
  id: 1,
  title: "AI-powered Image Recognition",
  description:
    "Develop a machine learning model for accurate image recognition and classification. This project aims to create a robust system that can identify objects, scenes, and patterns in images with high accuracy. We're looking for collaborators with experience in computer vision, deep learning, and Python programming.",
  longDescription:
    "Our project focuses on pushing the boundaries of image recognition technology. We're implementing state-of-the-art convolutional neural networks and exploring novel architectures to improve accuracy and efficiency. The system will be designed to handle a wide range of image types and will be optimized for both speed and accuracy. Key features we're working on include:\n\n- Multi-object detection and classification\n- Scene understanding and context analysis\n- Real-time processing for video streams\n- Integration with mobile and web platforms\n- Customizable training for specific use cases",
  tags: ["Python", "TensorFlow", "Computer Vision", "Deep Learning", "CNN"],
  roadmap: [
    {
      milestone: "Research and Planning",
      description:
        "Gather requirements, research state-of-the-art techniques, and plan project architecture",
      status: "Completed",
    },
    {
      milestone: "Data Collection and Preprocessing",
      description: "Collect and preprocess diverse image datasets for training",
      status: "In Progress",
    },
    {
      milestone: "Model Development",
      description: "Develop and train initial CNN models",
      status: "Not Started",
    },
    {
      milestone: "Testing and Optimization",
      description: "Conduct thorough testing and optimize model performance",
      status: "Not Started",
    },
    {
      milestone: "Integration and Deployment",
      description:
        "Integrate the model into a user-friendly application and deploy",
      status: "Not Started",
    },
  ],
  goals: [
    "Achieve 95% accuracy in object recognition across diverse image types",
    "Develop a model capable of real-time processing for video streams",
    "Create a user-friendly API for easy integration into various applications",
    "Optimize the model for mobile devices without significant performance loss",
    "Publish research findings and contribute to the open-source community",
  ],
  license: {
    name: "MIT License",
    description:
      "a simple and permissive open-source license that allows developers to use, modify, distribute, and sublicense software with minimal restrictions. Here are the key terms of the MIT License",
    permission: [
      "Commercial Use",
      "Distribution",
      "Modification",
      "Private Use",
    ],
    condition: ["License and copyright notice"],
    limitation: ["Liability", "Warranty"],
  },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you'd fetch the project data based on the ID
  // For this example, we'll use the mock data
  if (Number.parseInt(params.id) !== project.id) {
    notFound();
  }


  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.longDescription}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {project.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {project.roadmap.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    {item.status === "Completed" && (
                      <CheckCircle2 className="mt-1 h-5 w-5 text-green-500" />
                    )}
                    {item.status === "In Progress" && (
                      <Clock className="mt-1 h-5 w-5 text-yellow-500" />
                    )}
                    {item.status === "Not Started" && (
                      <Circle className="mt-1 h-5 w-5 text-gray-300" />
                    )}
                    <div>
                      <h3 className="font-semibold">{item.milestone}</h3>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{project.license.name}</CardTitle>
              <CardDescription>{project.license.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={
                  "flex flex-col justify-evenly gap-x-5 gap-y-5 sm:flex-row"
                }
              >
                <ul className="space-y-2">
                  <a className={"text-lg font-bold"}>Permission</a>
                  {project.license.permission.map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Check className="text-green-500 mt-1 h-4 w-4" />
                      <div>
                        <a className={"font-light"}>{item}</a>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  <a className={"text-lg font-bold"}>Condition</a>
                  {project.license.condition.map((item, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <Flag className="text-yellow-500 mt-1 h-4 w-4" />
                      <div>
                        <a className={"font-light"}>{item}</a>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  <a className={"text-lg font-bold"}>Limitation</a>
                  {project.license.limitation.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <OctagonAlert className="text-red-500 mt-1 h-4 w-4" />
                      <div>
                        <a className={"font-light"}>{item}</a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <JoinProjectPage 
            project={project} />
            
            <Button size="lg">
              <Link href={`/project/${project.id}/donate`}>
                Donate
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Â© 2024 CollabFinder. All rights reserved.
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
