"use client"

import type React from "react"

import { useState } from "react"
import {
    CheckCircle2,
    Circle,
    Clock,
    Edit,
    MoreHorizontal,
    Plus,
    Save,
    Trash,
    Users,
    XCircle,
    X,
    Github,
    UserPlus,
    ShieldCheck,
    ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { Progress } from "~/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import Link from "next/link"

// Mock data
const projectData = {
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
            description: "Gather requirements, research state-of-the-art techniques, and plan project architecture",
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
            description: "Integrate the model into a user-friendly application and deploy",
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
        permission: ["Commercial Use", "Distribution", "Modification", "Private Use"],
        condition: ["License and copyright notice"],
        limitation: ["Liability", "Warranty"],
    },
    owner: {
        id: "user-1",
        name: "Alex Morgan",
        email: "alex@teamup.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
}

// Sample repositories data
const sampleRepos = [
    { id: "repo1", name: "project-frontend", owner: "teamup" },
    { id: "repo2", name: "project-backend", owner: "teamup" },
    { id: "repo3", name: "project-docs", owner: "teamup" },
]

// Sample team members data
const sampleTeamMembers = [
    {
        id: "user-1",
        name: "Alex Morgan",
        email: "alex@teamup.com",
        role: "Owner",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Python", "Machine Learning", "Project Management"],
    },
    {
        id: "user-2",
        name: "Jamie Chen",
        email: "jamie@teamup.com",
        role: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Computer Vision", "TensorFlow", "Data Science"],
    },
    {
        id: "user-3",
        name: "Taylor Kim",
        email: "taylor@teamup.com",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Frontend Development", "UI/UX", "React"],
    },
    {
        id: "user-4",
        name: "Jordan Smith",
        email: "jordan@teamup.com",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Backend Development", "Python", "API Design"],
    },
]

// Sample join requests data
const sampleJoinRequests = [
    {
        id: "request-1",
        user: {
            id: "user-5",
            name: "Casey Johnson",
            email: "casey@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            skills: ["Deep Learning", "PyTorch", "Computer Vision"],
            profile: "/users/casey-johnson",
        },
        message:
            "I have 3 years of experience in computer vision and deep learning. I've worked on similar projects and would love to contribute to this one.",
        date: "2023-04-15",
    },
    {
        id: "request-2",
        user: {
            id: "user-6",
            name: "Riley Martinez",
            email: "riley@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            skills: ["Data Science", "Python", "TensorFlow"],
            profile: "/users/riley-martinez",
        },
        message:
            "I'm a data scientist with expertise in image classification. I'm interested in helping with the data preprocessing and model development phases.",
        date: "2023-04-18",
    },
    {
        id: "request-3",
        user: {
            id: "user-7",
            name: "Morgan Lee",
            email: "morgan@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            skills: ["Mobile Development", "React Native", "API Integration"],
            profile: "/users/morgan-lee",
        },
        message:
            "I specialize in mobile app development and would like to help with integrating the model into mobile platforms.",
        date: "2023-04-20",
    },
]

export default function ProjectDashboard() {
    const [project, setProject] = useState(projectData)
    const [isEditing, setIsEditing] = useState(false)
    const [editedProject, setEditedProject] = useState(project)
    const [connectedRepos, setConnectedRepos] = useState<Array<{ id: string; name: string; owner: string }>>([])
    const [teamMembers, setTeamMembers] = useState(sampleTeamMembers)
    const [joinRequests, setJoinRequests] = useState(sampleJoinRequests)
    const [editingGoal, setEditingGoal] = useState<number | null>(null)
    const [newGoal, setNewGoal] = useState("")

    const handleEditToggle = () => {
        if (isEditing) {
            // Save changes
            setProject(editedProject)
        }
        setIsEditing(!isEditing)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setEditedProject((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Calculate progress based on roadmap
    const calculateProgress = () => {
        const total = project.roadmap.length
        const completed = project.roadmap.filter((item) => item.status === "Completed").length
        const inProgress = project.roadmap.filter((item) => item.status === "In Progress").length

        return Math.round(((completed + inProgress * 0.5) / total) * 100)
    }

    // Handle connecting a repository
    const handleConnectRepository = (repo: { id: string; name: string; owner: string }) => {
        if (!connectedRepos.some((r) => r.id === repo.id)) {
            setConnectedRepos((prev) => [...prev, repo])
        }
    }

    // Handle removing a repository
    const handleRemoveRepository = (repoId: string) => {
        setConnectedRepos((prev) => prev.filter((repo) => repo.id !== repoId))
    }

    // Handle updating milestone status
    const handleMilestoneStatusUpdate = (index: number, newStatus: string) => {
        const updatedRoadmap = [...project.roadmap]
        updatedRoadmap[index] = {
            ...updatedRoadmap[index],
            status: newStatus,
        }

        setProject((prev) => ({
            ...prev,
            roadmap: updatedRoadmap,
        }))
    }

    // Handle editing a goal
    const handleEditGoal = (index: number, newText: string) => {
        const updatedGoals = [...project.goals]
        updatedGoals[index] = newText

        setProject((prev) => ({
            ...prev,
            goals: updatedGoals,
        }))
        setEditingGoal(null)
    }

    // Handle adding a new goal
    const handleAddGoal = () => {
        if (newGoal.trim() !== "") {
            setProject((prev) => ({
                ...prev,
                goals: [...prev.goals, newGoal.trim()],
            }))
            setNewGoal("")
        }
    }

    // Handle removing a goal
    const handleRemoveGoal = (index: number) => {
        const updatedGoals = [...project.goals]
        updatedGoals.splice(index, 1)

        setProject((prev) => ({
            ...prev,
            goals: updatedGoals,
        }))
    }

    // Handle promoting a team member to admin
    const handlePromoteMember = (userId: string) => {
        setTeamMembers((prev) => prev.map((member) => (member.id === userId ? { ...member, role: "Admin" } : member)))
    }

    // Handle removing a team member
    const handleRemoveMember = (userId: string) => {
        setTeamMembers((prev) => prev.filter((member) => member.id !== userId))
    }

    // Handle approving a join request
    const handleApproveRequest = (requestId: string) => {
        const request = joinRequests.find((req) => req.id === requestId)
        if (request) {
            // Add user to team members
            setTeamMembers((prev) => [
                ...prev,
                {
                    id: request.user.id,
                    name: request.user.name,
                    email: request.user.email,
                    role: "Member",
                    avatar: request.user.avatar,
                    skills: request.user.skills,
                },
            ])

            // Remove from join requests
            setJoinRequests((prev) => prev.filter((req) => req.id !== requestId))
        }
    }

    // Handle denying a join request
    const handleDenyRequest = (requestId: string) => {
        setJoinRequests((prev) => prev.filter((req) => req.id !== requestId))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-6 pt-4">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
                                <CardDescription>Manage your project information and settings</CardDescription>
                            </div>
                            <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={handleEditToggle}>
                                {isEditing ? (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save
                                    </>
                                ) : (
                                    <>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </>
                                )}
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Project Title
                                    </label>
                                    {isEditing ? (
                                        <Input name="title" value={editedProject.title} onChange={handleInputChange} className="mt-1" />
                                    ) : (
                                        <p className="mt-1 text-lg font-medium">{project.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Short Description
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            name="description"
                                            value={editedProject.description}
                                            onChange={handleInputChange}
                                            className="mt-1 min-h-[100px]"
                                        />
                                    ) : (
                                        <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Detailed Description
                                    </label>
                                    {isEditing ? (
                                        <Textarea
                                            name="longDescription"
                                            value={editedProject.longDescription}
                                            onChange={handleInputChange}
                                            className="mt-1 min-h-[200px]"
                                        />
                                    ) : (
                                        <div className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                                            {project.longDescription}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div>
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Tags
                                        </label>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            {isEditing ? (
                                                // Editable tags with delete button
                                                <>
                                                    {editedProject.tags.map((tag, index) => (
                                                        <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                                                            {tag}
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-4 w-4 rounded-full p-0 hover:bg-muted"
                                                                onClick={() => {
                                                                    const newTags = [...editedProject.tags]
                                                                    newTags.splice(index, 1)
                                                                    setEditedProject((prev) => ({
                                                                        ...prev,
                                                                        tags: newTags,
                                                                    }))
                                                                }}
                                                            >
                                                                <span className="sr-only">Remove {tag} tag</span>
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        </Badge>
                                                    ))}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-6"
                                                        onClick={() => {
                                                            // Add a new tag
                                                            const newTag = prompt("Enter new tag:")
                                                            if (newTag && newTag.trim() !== "") {
                                                                setEditedProject((prev) => ({
                                                                    ...prev,
                                                                    tags: [...prev.tags, newTag.trim()],
                                                                }))
                                                            }
                                                        }}
                                                    >
                                                        <Plus className="mr-1 h-3 w-3" /> Add Tag
                                                    </Button>
                                                </>
                                            ) : (
                                                // Read-only tags
                                                project.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary">
                                                        {tag}
                                                    </Badge>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Git Repository</CardTitle>
                                <CardDescription>The project repository</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Connected repositories list */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium">Connected Repositories</h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8"
                                                onClick={() => handleConnectRepository(sampleRepos[connectedRepos.length % sampleRepos.length])}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Connect Repository
                                            </Button>
                                        </div>

                                        {connectedRepos.length > 0 ? (
                                            <div className="space-y-2">
                                                {connectedRepos.map((repo) => (
                                                    <div key={repo.id} className="flex items-center justify-between rounded-md border p-3">
                                                        <div className="flex items-center space-x-3">
                                                            <Github className="h-5 w-5 text-muted-foreground" />
                                                            <div>
                                                                <p className="font-medium">{repo.name}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {repo.owner}/{repo.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            onClick={() => handleRemoveRepository(repo.id)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                            <span className="sr-only">Remove repository</span>
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                                                <Github className="h-10 w-10 text-muted-foreground" />
                                                <h3 className="mt-2 text-sm font-medium">No repositories connected</h3>
                                                <p className="mt-1 text-xs text-muted-foreground text-center">
                                                    Connect a GitHub repository to this project
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-4"
                                                    onClick={() => handleConnectRepository(sampleRepos[0])}
                                                >
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Connect Repository
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-6">
                    <Tabs defaultValue="roadmap">
                        <TabsList>
                            <TabsTrigger value="roadmap">
                                <Clock className="mr-2 h-4 w-4" />
                                Project Roadmap
                            </TabsTrigger>
                            <TabsTrigger value="goals">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Project Goals
                            </TabsTrigger>
                            <TabsTrigger value="team">
                                <Users className="mr-2 h-4 w-4" />
                                Team Members
                            </TabsTrigger>
                            <TabsTrigger value="requests">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Join Requests
                            </TabsTrigger>
                        </TabsList>

                        {/* Roadmap Tab */}
                        <TabsContent value="roadmap" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Roadmap</CardTitle>
                                    <CardDescription>Track progress through project milestones</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-8">
                                        {project.roadmap.map((milestone, index) => (
                                            <div key={index} className="relative">
                                                {/* Progress line connecting milestones */}
                                                {index < project.roadmap.length - 1 && (
                                                    <div className="absolute left-[15px] top-[30px] h-full w-[2px] bg-muted" />
                                                )}

                                                <div className="flex gap-4">
                                                    {/* Status indicator */}
                                                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                                                        {milestone.status === "Completed" ? (
                                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                                        ) : milestone.status === "In Progress" ? (
                                                            <Clock className="h-5 w-5 text-amber-500" />
                                                        ) : (
                                                            <Circle className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col space-y-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-medium leading-none">{milestone.milestone}</h3>
                                                            <Badge
                                                                variant={
                                                                    milestone.status === "Completed"
                                                                        ? "default"
                                                                        : milestone.status === "In Progress"
                                                                            ? "outline"
                                                                            : "secondary"
                                                                }
                                                            >
                                                                {milestone.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{milestone.description}</p>

                                                        <div className="pt-2">
                                                            <Select
                                                                defaultValue={milestone.status}
                                                                onValueChange={(value) => handleMilestoneStatusUpdate(index, value)}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Update status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Not Started">Not Started</SelectItem>
                                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="w-full">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Overall Progress</span>
                                            <span className="text-sm text-muted-foreground">{calculateProgress()}%</span>
                                        </div>
                                        <Progress value={calculateProgress()} className="mt-2" />
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Goals Tab */}
                        <TabsContent value="goals" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Goals</CardTitle>
                                    <CardDescription>Define and track the objectives of this project</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                placeholder="Add a new goal..."
                                                value={newGoal}
                                                onChange={(e) => setNewGoal(e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button onClick={handleAddGoal}>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Goal
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            {project.goals.map((goal, index) => (
                                                <div key={index} className="flex items-start justify-between rounded-md border p-3">
                                                    <div className="flex items-start gap-3 flex-1">
                                                        <CheckCircle2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                                        <div className="flex-1">
                                                            {editingGoal === index ? (
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        value={goal}
                                                                        onChange={(e) => {
                                                                            const updatedGoals = [...project.goals]
                                                                            updatedGoals[index] = e.target.value
                                                                            setProject((prev) => ({
                                                                                ...prev,
                                                                                goals: updatedGoals,
                                                                            }))
                                                                        }}
                                                                        className="flex-1"
                                                                    />
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => handleEditGoal(index, project.goals[index])}
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm">{goal}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {editingGoal !== index && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                                onClick={() => setEditingGoal(index)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                                <span className="sr-only">Edit goal</span>
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            onClick={() => handleRemoveGoal(index)}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                            <span className="sr-only">Remove goal</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Team Members Tab */}
                        <TabsContent value="team" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Team Members</CardTitle>
                                    <CardDescription>Manage the team working on this project</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {teamMembers.map((member) => (
                                            <div key={member.id} className="flex items-center justify-between rounded-md border p-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar>
                                                        <AvatarImage src={member.avatar} alt={member.name} />
                                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-medium">{member.name}</h3>
                                                            <Badge
                                                                variant={
                                                                    member.role === "Owner"
                                                                        ? "default"
                                                                        : member.role === "Admin"
                                                                            ? "outline"
                                                                            : "secondary"
                                                                }
                                                            >
                                                                {member.role}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                                        <div className="mt-1 flex flex-wrap gap-1">
                                                            {member.skills.map((skill, i) => (
                                                                <Badge key={i} variant="outline" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Only show actions for members that are not the owner */}
                                                {member.role !== "Owner" && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {member.role !== "Admin" && (
                                                                <DropdownMenuItem onClick={() => handlePromoteMember(member.id)}>
                                                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                                                    Promote to Admin
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem>
                                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                                View Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                onClick={() => handleRemoveMember(member.id)}
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Remove from Project
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Join Requests Tab */}
                        <TabsContent value="requests" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Join Requests</CardTitle>
                                    <CardDescription>Review and manage requests to join this project</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {joinRequests.length > 0 ? (
                                        <div className="space-y-6">
                                            {joinRequests.map((request) => (
                                                <div key={request.id} className="rounded-md border">
                                                    <div className="flex items-start gap-4 p-4">
                                                        <Avatar>
                                                            <AvatarImage src={request.user.avatar} alt={request.user.name} />
                                                            <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h3 className="font-medium">{request.user.name}</h3>
                                                                    <p className="text-sm text-muted-foreground">{request.user.email}</p>
                                                                </div>
                                                                <p className="text-xs text-muted-foreground">Requested on {request.date}</p>
                                                            </div>
                                                            <div className="mt-1 flex flex-wrap gap-1">
                                                                {request.user.skills.map((skill, i) => (
                                                                    <Badge key={i} variant="outline" className="text-xs">
                                                                        {skill}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                            <p className="mt-2 text-sm">{request.message}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between border-t p-3">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={request.user.profile}>
                                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                                View Profile
                                                            </Link>
                                                        </Button>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                                onClick={() => handleDenyRequest(request.id)}
                                                            >
                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                Deny
                                                            </Button>
                                                            <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                                                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                                                Approve
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                                            <UserPlus className="h-10 w-10 text-muted-foreground" />
                                            <h3 className="mt-2 text-sm font-medium">No pending join requests</h3>
                                            <p className="mt-1 text-xs text-muted-foreground text-center">
                                                When developers request to join your project, they will appear here
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}

