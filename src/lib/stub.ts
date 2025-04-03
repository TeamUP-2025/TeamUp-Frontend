// Mock data - in a real app, this would be fetched from your database
const projectData = {
    id: 1,
    title: "AI-powered Image Recognition",
    description:
        "Develop a machine learning model for accurate image recognition and classification...",
    longDescription:
        "Our project focuses on pushing the boundaries of image recognition technology...",
    tags: ["Python", "TensorFlow", "Computer Vision", "Deep Learning", "CNN"],
    roadmap: [
        {
            milestone: "Research and Planning",
            description: "Gather requirements, research state-of-the-art techniques...",
            status: "Completed",
        },
        // other milestones...
    ],
    goals: [
        "Achieve 95% accuracy in object recognition across diverse image types",
        // other goals...
    ],
    license: {
        name: "MIT License",
        // license details...
    },
    owner: {
        id: "user-1",
        name: "Alex Morgan",
        email: "alex@teamup.com",
        avatar: "/placeholder.svg?height=40&width=40",
    },
}

// Sample repositories
const sampleRepos = [
    { id: "repo1", name: "project-frontend", owner: "teamup" },
    { id: "repo2", name: "project-backend", owner: "teamup" },
    { id: "repo3", name: "project-docs", owner: "teamup" },
]

// Sample team members
const sampleTeamMembers = [
    {
        id: "user-1",
        name: "Alex Morgan",
        email: "alex@teamup.com",
        role: "Owner",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Python", "Machine Learning", "Project Management"],
    },
    // other team members...
]

// Sample join requests
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
            "I have 3 years of experience in computer vision and deep learning...",
        date: "2023-04-15",
    },
    // other join requests...
]

// Simulated data fetching functions
export async function getProjectById(id: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return projectData
}

export async function getProjectRepositories(projectId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    // In a real app, you would filter repositories by projectId
    return [] // Start with empty repos
}

export async function getProjectTeamMembers(projectId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return sampleTeamMembers
}

export async function getProjectJoinRequests(projectId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return sampleJoinRequests
}

