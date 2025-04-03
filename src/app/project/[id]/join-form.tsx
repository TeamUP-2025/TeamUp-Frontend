"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { requestJoinProject } from "~/action/project";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/AuthContext";
import {  project as p} from "~/schema/project_schema";


export default function JoinProjectPage({ project } : { project : z.infer<typeof p>}) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDisable, setIsDisable] = useState(!auth.isLoggedIn);
  const [coverLetter, setCoverLetter] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
   await requestJoinProject(project.ID, coverLetter)

   const sucess = true;

   if (sucess) {
    toast.success(`Join request sent to project ${project.Title}`);
   }  else {
    toast.error(`You are already an member`)
   } 
  //  else {
  //   toast.error(`The request is already existed.`)
  //  }

    // setIsDisable(true)
    handleClose(); 
  };

  return (
    <>
      <Button size="lg" onClick={handleOpen} disabled={isDisable}>Apply to TeamUP with {project.Title}</Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Join {project.Title} as {auth.login}?
            </h2>
            <div className="mt-4">
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                Introduce yourself
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the project owner about yourself and why you want to join..."
                className="w-full p-2 border border-gray-300 rounded-md h-32 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClose}
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