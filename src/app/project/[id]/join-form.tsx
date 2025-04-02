"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/ui/button";


export default function JoinProjectPage({ project }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // mock GitHub user data
  const githubUser = {
    username: "mockuser123",
    avatar: "https://github.com/github.png",
    profileUrl: "https://github.com/mockuser123",
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // todo: add user to userproject db

    toast.success(`Join request sent to project ${project.title}`);
    router.push(`/project/${project.id}`);
    handleClose(); // Close the modal after submission
  };

  return (
    <>
      <Button size="lg" onClick={handleOpen}>Apply to TeamUP with {project.title}</Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Join {project.title} as {githubUser.username}?
            </h2>
            <div className="flex items-center space-x-4 border p-4 rounded-lg">
              <img
                src={githubUser.avatar}
                alt="GitHub Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{githubUser.username}</p>
                <a
                  href={githubUser.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClose} // Use handleClose instead of router.back()
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
      )}
    </>
  );
}