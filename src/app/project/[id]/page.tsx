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
import {getProject, getProjectByID} from "~/action/project";

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {

  const project = await getProjectByID(
      params.id
  );




  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {project.Title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {project.Description}
            </p>
          </div>
          {/*<div className="flex flex-wrap gap-2">*/}
          {/*  {project.Tags.map((tag) => (*/}
          {/*    <Badge key={tag} variant="secondary">*/}
          {/*      {tag}*/}
          {/*    </Badge>*/}
          {/*  ))}*/}
          {/*</div>*/}
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{project.Description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Goals</CardTitle>
            </CardHeader>
            <CardContent>
              {/*<ul className="list-disc space-y-2 pl-5">*/}
              {/*  {project.goals.map((goal, index) => (*/}
              {/*    <li key={index}>{goal}</li>*/}
              {/*  ))}*/}
              {/*</ul>*/}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Project Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              {/*<ul className="space-y-4">*/}
              {/*  {project.roadmap.map((item, index) => (*/}
              {/*    <li key={index} className="flex items-start space-x-2">*/}
              {/*      {item.status === "Completed" && (*/}
              {/*        <CheckCircle2 className="mt-1 h-5 w-5 text-green-500" />*/}
              {/*      )}*/}
              {/*      {item.status === "In Progress" && (*/}
              {/*        <Clock className="mt-1 h-5 w-5 text-yellow-500" />*/}
              {/*      )}*/}
              {/*      {item.status === "Not Started" && (*/}
              {/*        <Circle className="mt-1 h-5 w-5 text-gray-300" />*/}
              {/*      )}*/}
              {/*      <div>*/}
              {/*        <h3 className="font-semibold">{item.milestone}</h3>*/}
              {/*        <p className="text-sm text-gray-500">*/}
              {/*          {item.description}*/}
              {/*        </p>*/}
              {/*      </div>*/}
              {/*    </li>*/}
              {/*  ))}*/}
              {/*</ul>*/}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              {/*<CardTitle>{project.license.name}</CardTitle>*/}
              {/*<CardDescription>{project.license.description}</CardDescription>*/}
            </CardHeader>
            <CardContent>
              <div
                className={
                  "flex flex-col justify-evenly gap-x-5 gap-y-5 sm:flex-row"
                }
              >
                {/*<ul className="space-y-2">*/}
                {/*  <a className={"text-lg font-bold"}>Permission</a>*/}
                {/*  {project.license.permission.map((item, index) => (*/}
                {/*    <li key={index} className="flex items-start space-x-1">*/}
                {/*      <Check className="text-green-500 mt-1 h-4 w-4" />*/}
                {/*      <div>*/}
                {/*        <a className={"font-light"}>{item}</a>*/}
                {/*      </div>*/}
                {/*    </li>*/}
                {/*  ))}*/}
                {/*</ul>*/}
                {/*<ul className="space-y-2">*/}
                {/*  <a className={"text-lg font-bold"}>Condition</a>*/}
                {/*  {project.license.condition.map((item, index) => (*/}
                {/*    <li key={index} className="flex items-start space-x-1">*/}
                {/*      <Flag className="text-yellow-500 mt-1 h-4 w-4" />*/}
                {/*      <div>*/}
                {/*        <a className={"font-light"}>{item}</a>*/}
                {/*      </div>*/}
                {/*    </li>*/}
                {/*  ))}*/}
                {/*</ul>*/}
                {/*<ul className="space-y-2">*/}
                {/*  <a className={"text-lg font-bold"}>Limitation</a>*/}
                {/*  {project.license.limitation.map((item, index) => (*/}
                {/*    <li key={index} className="flex items-start space-x-2">*/}
                {/*      <OctagonAlert className="text-red-500 mt-1 h-4 w-4" />*/}
                {/*      <div>*/}
                {/*        <a className={"font-light"}>{item}</a>*/}
                {/*      </div>*/}
                {/*    </li>*/}
                {/*  ))}*/}
                {/*</ul>*/}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4">
            <Button size="lg">Apply to TeamUP with {project.Title}</Button>
            
            <Button size="lg">
              <Link href={`/project/${params.id}/donate`}>
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
