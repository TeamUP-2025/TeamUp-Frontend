"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { requestJoinProject } from "~/action/project";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/AuthContext";
import { project as p } from "~/schema/project_schema";

enum Reponse {
  Sucess = 4,
  Pending = 2,
  AlreadyMember = 1,
  Both = 3,
}

export default function JoinProjectPage({
  project,
}: {
  project: z.infer<typeof p>;
}) {
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

    if (coverLetter === "") {
      handleClose();
      toast.error(`Please write cover letter or indroduce yourself.`)
      return;
    }

    const res = await requestJoinProject(project.ID, auth.uid, coverLetter);

    switch (res) {
      case Reponse.Sucess:
        toast.success(`Join request sent to project ${project.Title}`);
        break;
      case Reponse.Pending:
        toast.error(`The request is already existed.`);
        break;
      case Reponse.AlreadyMember:
        toast.error(`You are already a member.`);
        break;
      default:
      toast.error(`There is an error, please try again later.`);
    }

    setIsDisable(true);
    handleClose();
  };

  return (
    <>
      <Button size="lg" onClick={handleOpen} disabled={isDisable}>
        Apply to TeamUP with {project.Title}
      </Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              Join {project.Title} as {auth.login}?
            </h2>
            <div className="mt-4">
              <label
                htmlFor="coverLetter"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Introduce yourself
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the project owner about yourself and why you want to join..."
                className="h-32 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleClose}
                className="mr-2 rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
