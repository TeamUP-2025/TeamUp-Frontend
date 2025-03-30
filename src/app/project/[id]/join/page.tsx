"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function JoinProjectPage() {
    const router = useRouter();
    const params = useParams();


    const projectId = params.id ? Number.parseInt(params.id as string, 10) : null;
    // use id from url to get project (API to be implemented)
    useEffect(() => {
        const fetchData = async () => {
        };
        fetchData();
    }, []);

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

    // mock GitHub user data
    const githubUser = {
        username: "mockuser123",
        avatar: "https://github.com/github.png",
        profileUrl: "https://github.com/mockuser123"
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // todo: add user to userproject db

        toast.success(`Join request sent to project ${project.title}`)
        router.push(`/project/${projectId}`);
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Join {project.title} as {githubUser.username}?</h2>
                        <div className="flex items-center space-x-4 border p-4 rounded-lg">
                            <img src={githubUser.avatar} alt="GitHub Avatar" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-medium">{githubUser.username}</p>
                                <a 
                                    href={githubUser.profileUrl} 
                                    target="_blank" 
                                    className="text-blue-500 hover:underline"
                                >
                                    View GitHub Profile
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button 
                                onClick={() => router.back()}
                                className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            
        </div>
    );
}
