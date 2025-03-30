import { Filter, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

// Mock data based on the provided example
const projects = [
  {
    id: 1,
    title: "AI-powered Image Recognition",
    description:
      "Develop a machine learning model for accurate image recognition and classification. This project aims to create a robust system that can identify objects, scenes, and patterns in images with high accuracy.",
    tags: ["Python", "TensorFlow", "Computer Vision", "Deep Learning", "CNN"],
    license: {
      name: "MIT License",
    },
    status: "Active",
  },
  {
    id: 2,
    title: "Decentralized File Storage System",
    description:
      "Build a peer-to-peer file storage system using blockchain technology for secure, distributed data storage without central servers.",
    tags: ["Blockchain", "JavaScript", "P2P", "Cryptography", "Storage"],
    license: {
      name: "Apache 2.0",
    },
    status: "Active",
  },
  {
    id: 3,
    title: "Accessible UI Component Library",
    description:
      "Create a comprehensive library of accessible, reusable UI components following WCAG guidelines to help developers build inclusive web applications.",
    tags: ["React", "TypeScript", "Accessibility", "UI", "WCAG"],
    license: {
      name: "MIT License",
    },
    status: "Active",
  },
  {
    id: 4,
    title: "Real-time Collaborative Text Editor",
    description:
      "Develop a web-based text editor that allows multiple users to edit documents simultaneously with conflict resolution and version history.",
    tags: ["JavaScript", "WebSockets", "CRDT", "React", "Node.js"],
    license: {
      name: "GPL-3.0",
    },
    status: "Maintenance",
  },
  {
    id: 5,
    title: "Cross-platform Mobile Game Engine",
    description:
      "Build a lightweight game engine that allows developers to create 2D games that run on multiple mobile platforms from a single codebase.",
    tags: ["C++", "OpenGL", "Game Development", "Mobile", "Cross-platform"],
    license: {
      name: "BSD-3-Clause",
    },
    status: "Active",
  },
  {
    id: 6,
    title: "Privacy-focused Analytics Platform",
    description:
      "Create an analytics solution that provides useful insights while respecting user privacy and complying with regulations like GDPR and CCPA.",
    tags: ["Privacy", "Analytics", "JavaScript", "GDPR", "Data"],
    license: {
      name: "MIT License",
    },
    status: "Planning",
  },
];

// Get unique tags from all projects
const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

// Get unique licenses from all projects
const allLicenses = Array.from(new Set(projects.map((project) => project.license.name))).sort()

// Get unique statuses from all projects
const allStatuses = Array.from(new Set(projects.map((project) => project.status))).sort()

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore Open Source Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Discover projects that match your skills and interests. Contribute
              to open source and build your portfolio.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button>Search</Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Status</h4>
                      <RadioGroup defaultValue="all">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all-status" />
                          <Label htmlFor="all-status">All Statuses</Label>
                        </div>
                        {allStatuses.map((status) => (
                          <div
                            key={status}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={status.toLowerCase()}
                              id={`status-${status.toLowerCase()}`}
                            />
                            <Label htmlFor={`status-${status.toLowerCase()}`}>
                              {status}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">License</h4>
                      <RadioGroup defaultValue="all-licenses">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="all-licenses"
                            id="all-licenses"
                          />
                          <Label htmlFor="all-licenses">All Licenses</Label>
                        </div>
                        {allLicenses.map((license) => (
                          <div
                            key={license}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={license.toLowerCase().replace(/\s+/g, "-")}
                              id={`license-${license.toLowerCase().replace(/\s+/g, "-")}`}
                            />
                            <Label
                              htmlFor={`license-${license.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {license}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Technologies</h4>
                      <div className="max-h-40 space-y-2 overflow-y-auto">
                        {allTags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`tag-${tag.toLowerCase()}`} />
                            <Label htmlFor={`tag-${tag.toLowerCase()}`}>
                              {tag}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button>Apply Filters</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              You might find this Open Source interesting
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        <Link
                          href={`/project/${project.id}`}
                          className="hover:text-primary hover:underline"
                        >
                          {project.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        License: {project.license.name} • Status:{" "}
                        {project.status}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/project/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button size="lg">Explore More Projects</Button>
          </div>

          <Separator className="my-8" />

          <Card>
            <CardHeader>
              <CardTitle>Why Contribute to Open Source?</CardTitle>
              <CardDescription>
                Open source contribution offers numerous benefits for developers
                at all levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold">Build Your Portfolio</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showcase your skills to potential employers with real-world
                    project contributions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Learn New Skills</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Work with experienced developers and learn industry best
                    practices.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Join a Community</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with like-minded developers and build your
                    professional network.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
