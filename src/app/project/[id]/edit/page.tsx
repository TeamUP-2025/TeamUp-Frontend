//call create-edit page component in edit mode
"use client";

import ProjectForm from "~/components/ui/project-form";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams();
    
  const projectId = params.id ? Number.parseInt(params.id as string, 10) : null;

  // use id from url to get project (API to be implemented)
  // mock up project data
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

  if (projectId !== project.id) {
    notFound();
  }

  return (
    <div>
      <ProjectForm 
        mode="edit" 
        project= { project }
      />
    </div>
  );
}