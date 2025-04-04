import type { Metadata } from "next"
import DonationForm from "~/components/donation/donation-form"
import {getProjectByID} from "~/action/project";

export const metadata: Metadata = {
    title: "Donate",
    description: "Support our cause with a donation",
}

export default async function DonatePage({params}: { params: { id: string } }) {
    const project = await getProjectByID(params.id)
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="container max-w-xl w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Support {project.Title}</h1>
                    <p className="mt-2 text-muted-foreground">Your donation helps {project.Title} continue our important work</p>
                </div>
                <DonationForm projectId={params.id} />
            </div>
        </div>
    )
}
